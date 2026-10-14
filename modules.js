// modules.js - limpeza automática + bandeja, central de apps, drivers, análise de hardware e atualizador
const { app, ipcMain, shell, Tray, Menu, nativeImage, Notification } = require('electron');
const path = require('path'), fs = require('fs'), os = require('os'), https = require('https'), crypto = require('crypto');
const { spawn, execFile } = require('child_process');

module.exports = function (X) {
  const { runx, ps, out, load, save, log, clean, regGet, showWindow, getJSON, newer, GITHUB_REPO } = X;
  const psT = (c, ms) => new Promise(r => execFile('powershell', ['-NoProfile', '-Command', c], { windowsHide: true, maxBuffer: 1 << 26, timeout: ms }, (e, o) => r({ ok: !e, out: (o || '').trim() })));

  // ---------- Limpeza automática + bandeja ----------
  const ITEMS = ['temp', 'prefetch', 'wu', 'thumbs', 'bin'], DAYS = { daily: 1, weekly: 7, monthly: 30 };
  const autoGet = () => ({ freq: 'never', items: ['temp', 'thumbs'], binAuth: false, startup: false, background: true, last: 0, ...(load().auto || {}) });
  let tray = null, timer = null;
  const monitorOn = () => autoGet().freq !== 'never';
  async function runAuto() {
    const a = autoGet(), items = a.items.filter(i => ITEMS.includes(i) && (i !== 'bin' || a.binAuth)), res = {};
    for (const i of items) { try { res[i] = await clean[i](); } catch { res[i] = false; } }
    const ok = Object.values(res).filter(Boolean).length, c = load(); c.auto = { ...autoGet(), last: Date.now() }; save(c);
    log(`limpeza automática: ${ok}/${items.length} ${JSON.stringify(res)}`);
    try { new Notification({ title: 'Luquinhas Boost', body: `Limpeza automática: ${ok} de ${items.length} itens concluídos.` }).show(); } catch {}
    return { ok, total: items.length };
  }
  function checkDue() { const a = autoGet(), d = DAYS[a.freq]; if (d && a.items.length && Date.now() - (a.last || 0) >= d * 86400000) runAuto(); }
  function ensureTray() {
    if (tray && !tray.isDestroyed()) return;
    let img = nativeImage.createFromPath(path.join(__dirname, process.platform === 'win32' ? 'icon.ico' : 'icon.png'));
    if (img.isEmpty()) img = nativeImage.createFromPath(path.join(__dirname, 'icon.png')).resize({ width: 32, height: 32 });
    tray = new Tray(img);
    tray.setToolTip('Luquinhas Boost');
    tray.setContextMenu(Menu.buildFromTemplate([{ label: 'Abrir Luquinhas Boost', click: showWindow }, { type: 'separator' }, { label: 'Encerrar', click: () => app.quit() }]));
    tray.on('click', showWindow); tray.on('double-click', showWindow);
  }
  function setupMonitor() {
    const a = autoGet(), on = a.freq !== 'never';
    ensureTray(); // a bandeja existe sempre; so o agendamento da limpeza depende da frequencia
    if (!on) { if (timer) { clearInterval(timer); timer = null; } return; }
    if (!timer) timer = setInterval(checkDue, 30 * 60 * 1000);
  }
  // chamado quando a janela fecha e o programa segue na bandeja (aviso so na primeira vez)
  function onHidden() {
    const c = load(); if (c.trayHint) return; c.trayHint = true; save(c);
    try { new Notification({ title: 'Luquinhas Boost', body: 'O programa continua em segundo plano na bandeja (perto do relógio). Para fechar de vez: botão direito no ícone → Encerrar.' }).show(); } catch {}
  }
  // ---------- Iniciar com o Windows ----------
  // Como administrador usa uma tarefa agendada (abre elevado no logon, sem pedir UAC); sem admin usa o item de inicialização comum.
  const TASK = 'LuquinhasBoost', qps = x => "'" + String(x).replace(/'/g, "''") + "'", selfExe = () => process.env.PORTABLE_EXECUTABLE_FILE || process.execPath;
  const hasTask = async () => (await ps(`if(Get-ScheduledTask -TaskName '${TASK}' -ErrorAction SilentlyContinue){'1'}`)).out.trim() === '1';
  async function applyStartup() {
    const want = !!autoGet().startup, adm = X.isAdmin ? !!X.isAdmin() : false, canTask = app.isPackaged && process.platform === 'win32';
    let task = canTask ? await hasTask() : false, note = '';
    if (canTask) {
      const c = load();
      if (want && adm && (!task || c.startupExe !== selfExe())) {
        const r = await ps(`$u="$env:USERDOMAIN\\$env:USERNAME";$a=New-ScheduledTaskAction -Execute ${qps(selfExe())} -Argument '--hidden';$t=New-ScheduledTaskTrigger -AtLogOn -User $u;$t.Delay='PT20S';$p=New-ScheduledTaskPrincipal -UserId $u -LogonType Interactive -RunLevel Highest;$s=New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -ExecutionTimeLimit ([TimeSpan]::Zero);Register-ScheduledTask -TaskName '${TASK}' -Action $a -Trigger $t -Principal $p -Settings $s -Force -ErrorAction Stop | Out-Null`);
        task = r.ok && await hasTask(); if (task) { c.startupExe = selfExe(); save(c); }
      } else if (!want && task) {
        if (adm) { await ps(`Unregister-ScheduledTask -TaskName '${TASK}' -Confirm:$false -ErrorAction SilentlyContinue`); task = await hasTask(); }
        if (task) note = 'Para desativar por completo, abra o programa como administrador e desligue de novo.';
      }
    }
    try { app.setLoginItemSettings({ openAtLogin: want && !task, args: ['--hidden'] }); } catch {}
    return { task, note };
  }
  ipcMain.handle('auto:get', () => autoGet());
  ipcMain.handle('auto:set', async (_e, p) => {
    const prev = autoGet(), n = { ...prev };
    if (p && ['never', 'daily', 'weekly', 'monthly'].includes(p.freq)) n.freq = p.freq;
    if (p && Array.isArray(p.items)) n.items = p.items.filter(i => ITEMS.includes(i) && i !== 'bin');
    if (p && typeof p.binAuth === 'boolean') n.binAuth = p.binAuth;
    if (p && typeof p.startup === 'boolean') n.startup = p.startup;
    if (p && typeof p.background === 'boolean') n.background = p.background;
    n.items = n.items.filter(i => i !== 'bin'); if (n.binAuth) n.items.push('bin');
    if (prev.freq === 'never' && n.freq !== 'never') n.last = Date.now();
    const c = load(); c.auto = n; save(c); setupMonitor();
    const note = p && typeof p.startup === 'boolean' ? (await applyStartup()).note : '';
    return { ...autoGet(), startupNote: note };
  });
  ipcMain.handle('auto:run', () => runAuto());

  // ---------- Central de aplicativos ----------
  const HUB = [
    { id: '7zip', cat: 'Utilitários', ess: 1, n: '7-Zip', pub: 'Igor Pavlov', d: 'Compactador gratuito e de código aberto.', w: ['7zip.7zip'], url: 'https://www.7-zip.org/download.html', m: '^7-Zip' },
    { id: 'vcredist', cat: 'Utilitários', ess: 1, n: 'Visual C++ Redistributable', pub: 'Microsoft', d: 'Bibliotecas que muitos jogos e programas exigem (x64 e x86).', w: ['Microsoft.VCRedist.2015+.x64', 'Microsoft.VCRedist.2015+.x86'], url: 'https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist', m: 'Visual C\\+\\+ .*Redistributable' },
    { id: 'directx', cat: 'Utilitários', ess: 1, n: 'DirectX (Runtime)', pub: 'Microsoft', d: 'Componentes de DirectX que alguns jogos mais antigos usam.', w: ['Microsoft.DirectX'], url: 'https://www.microsoft.com/download/details.aspx?id=35', m: null },
    { id: 'winrar', cat: 'Utilitários', n: 'WinRAR', pub: 'RARLAB', d: 'Compactador de arquivos (versão de avaliação).', w: ['RARLab.WinRAR'], url: 'https://www.rarlab.com/download.htm', m: '^WinRAR' },
    { id: 'whatsapp', cat: 'Comunicação', n: 'WhatsApp', pub: 'WhatsApp (Meta)', d: 'Mensagens e chamadas no computador.', w: ['WhatsApp.WhatsApp'], url: 'https://www.whatsapp.com/download', m: '^WhatsApp' },
    { id: 'discord', cat: 'Comunicação', ess: 1, n: 'Discord', pub: 'Discord Inc.', d: 'Voz e chat para jogar em equipe.', w: ['Discord.Discord'], url: 'https://discord.com/download', m: '^Discord' },
    { id: 'teamspeak', cat: 'Comunicação', n: 'TeamSpeak', pub: 'TeamSpeak Systems', d: 'Comunicação por voz de baixa latência.', w: ['TeamSpeakSystems.TeamSpeakClient'], url: 'https://www.teamspeak.com/en/downloads/', m: 'TeamSpeak' },
    { id: 'telegram', cat: 'Comunicação', n: 'Telegram', pub: 'Telegram FZ-LLC', d: 'Mensagens com versão para desktop.', w: ['Telegram.TelegramDesktop'], url: 'https://desktop.telegram.org/', m: 'Telegram' },
    { id: 'steam', cat: 'Jogos e launchers', ess: 1, n: 'Steam', pub: 'Valve', d: 'Loja e launcher oficial do CS2.', w: ['Valve.Steam'], url: 'https://store.steampowered.com/about/', m: '^Steam$' },
    { id: 'epic', cat: 'Jogos e launchers', n: 'Epic Games Launcher', pub: 'Epic Games', d: 'Loja e launcher da Epic Games.', w: ['EpicGames.EpicGamesLauncher'], url: 'https://store.epicgames.com/download', m: 'Epic Games Launcher' },
    { id: 'riot', cat: 'Jogos e launchers', n: 'Riot Games (VALORANT / LoL)', pub: 'Riot Games', d: 'O download é feito pelo site oficial da Riot.', w: [], url: 'https://www.riotgames.com/', m: 'Riot Client' },
    { id: 'ea', cat: 'Jogos e launchers', n: 'EA app', pub: 'Electronic Arts', d: 'Launcher dos jogos da EA.', w: ['ElectronicArts.EADesktop'], url: 'https://www.ea.com/ea-app', m: '^EA$|Electronic Arts' },
    { id: 'battlenet', cat: 'Jogos e launchers', n: 'Battle.net', pub: 'Blizzard', d: 'Launcher dos jogos da Blizzard.', w: ['Blizzard.BattleNet'], url: 'https://www.battle.net/download', m: 'Battle\\.net' },
  ];
  ipcMain.handle('hub:list', () => HUB.map(({ id, cat, ess, n, pub, d, w, m }) => ({ id, cat, ess, n, pub, d, w: w.length > 0, m })));
  ipcMain.handle('hub:open', (_e, id) => { const h = HUB.find(x => x.id === id); if (h) shell.openExternal(h.url); return !!h; });
  ipcMain.handle('hub:install', async (_e, id) => {
    const h = HUB.find(x => x.id === id); if (!h) return { ok: false, err: 'Aplicativo desconhecido.' };
    const site = note => { shell.openExternal(h.url); return { ok: true, opened: true, note }; };
    if (!h.w.length) return site('');
    if (!(await runx('winget --version')).ok) return site('O winget não está disponível; abri o site oficial.');
    for (const w of h.w) if (!(await runx(`winget show --id ${w} -e --accept-source-agreements`)).ok) return site('Pacote não encontrado no winget; abri o site oficial.');
    for (const w of h.w) {
      const r = await runx(`winget install --id ${w} -e --silent --accept-package-agreements --accept-source-agreements`);
      if (!r.ok && !/already|instalad/i.test(r.err)) { log(`hub ${id}: ${r.err}`); return { ok: false, err: r.err || 'A instalação falhou.' }; }
    }
    return { ok: true };
  });


  // ---------- Ícones (pacote local > executável instalado > site oficial) ----------
  // Tudo vai para um cache em disco e é pré-carregado quando o programa abre, então a
  // Central de aplicativos mostra os ícones na hora (a busca na internet só acontece 1 vez).
  const ICON_WEB = { game_cs2: 'https://www.counter-strike.net', game_valorant: 'https://playvalorant.com', vcredist: 'https://www.microsoft.com', directx: 'https://www.microsoft.com', riot: 'https://www.riotgames.com' };
  const iconDir = () => path.join(app.getPath('userData'), 'icons');
  const sniff = b => b.length > 8 && (b[0] === 0 && b[1] === 0 && b[2] === 1 && b[3] === 0 ? 'image/x-icon' : b.slice(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ? 'image/png' : b[0] === 0xFF && b[1] === 0xD8 ? 'image/jpeg' : b.slice(0, 4).toString() === 'RIFF' ? 'image/webp' : /^\s*(<\?xml|<svg)/.test(b.slice(0, 64).toString()) ? 'image/svg+xml' : null);
  const site = h => h.split('.').slice(-2).join('.');
  const FAV_SITES = new Set(['google.com', 'gstatic.com', 'duckduckgo.com']); // só para serviços de favicon (extra = true)
  // partial: se a página passar do limite, usa o começo dela (o <head> fica no início) em vez de desistir
  function getBuf(url, origin, d = 0, max = 300000, partial = false, extra = false) {
    return new Promise(res => {
      let u; try { u = new URL(url); } catch { return res(null); }
      const sOk = site(u.hostname) === site(new URL(origin).hostname) || (extra && FAV_SITES.has(site(u.hostname)));
      if (u.protocol !== 'https:' || !sOk) return res(null);
      let done = false; const fin = v => { if (!done) { done = true; res(v); } };
      const rq = https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 luquinhas-boost' }, timeout: 8000 }, r => {
        if ([301, 302, 303, 307, 308].includes(r.statusCode) && r.headers.location && d < 3) { r.resume(); return fin(getBuf(new URL(r.headers.location, u).href, origin, d + 1, max, partial, extra)); }
        if (r.statusCode !== 200) { r.resume(); return fin(null); }
        const ch = []; let n = 0;
        r.on('data', c => { n += c.length; ch.push(c); if (n > max) { r.destroy(); fin(partial ? Buffer.concat(ch) : null); } });
        r.on('end', () => fin(Buffer.concat(ch))); r.on('error', () => fin(partial && n ? Buffer.concat(ch) : null)); r.on('close', () => fin(partial && n ? Buffer.concat(ch) : null));
      });
      rq.on('error', () => fin(null)); rq.on('timeout', () => { rq.destroy(); fin(null); });
    });
  }
  const iconRank = u => (/apple-touch/i.test(u) ? 0 : /\.(png|svg|webp)(\?|$)/i.test(u) ? 1 : 2);
  async function webIcon(origin) {
    const host = new URL(origin).hostname, links = [], home = await getBuf(origin + '/', origin, 0, 600000, true);
    if (home) for (const t of home.toString('utf8').match(/<link\b[^>]*>/gi) || []) if (/rel=["'][^"']*icon[^"']*["']/i.test(t)) { const m = t.match(/href=["']([^"']+)["']/i); if (m) { try { links.push(new URL(m[1], origin + '/').href); } catch {} } }
    links.sort((x, y) => iconRank(x) - iconRank(y));
    const cand = [...links.map(u => [u, false]), [origin + '/favicon.ico', false], [`https://www.google.com/s2/favicons?domain=${host}&sz=128`, true], [`https://icons.duckduckgo.com/ip3/${host}.ico`, true]];
    for (const [url, extra] of cand) {
      const b = await getBuf(url, origin, 0, 200000, false, extra), mime = b && sniff(b);
      if (mime) return `data:${mime};base64,${b.toString('base64')}`;
    }
    return null;
  }
  async function fileIcon(p) { try { if (!p || !fs.existsSync(p)) return null; const img = await app.getFileIcon(p, { size: 'large' }); return img.isEmpty() ? null : img.toDataURL(); } catch { return null; } }
  let regIcons = null;
  const regIconMap = () => regIcons || (regIcons = (async () => {
    const r = await ps("[Console]::OutputEncoding=[Text.Encoding]::UTF8;$k='HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*';@(Get-ItemProperty $k -ErrorAction SilentlyContinue|Where-Object{$_.DisplayName -and $_.DisplayIcon}|Select-Object DisplayName,DisplayIcon)|ConvertTo-Json -Compress");
    try { const j = JSON.parse(r.out); return Array.isArray(j) ? j : [j]; } catch { return []; }
  })());
  async function installedIcon(m) {
    const rx = new RegExp(m, 'i'), hit = (await regIconMap()).find(x => rx.test(x.DisplayName)); if (!hit) return null;
    return fileIcon(String(hit.DisplayIcon).split(',')[0].replace(/"/g, '').trim().replace(/%([^%]+)%/g, (_, k) => process.env[k] || ''));
  }
  async function cs2Icon() { const d = await X.cs2CfgDir(); return d ? fileIcon(path.join(d, '..', '..', 'bin', 'win64', 'cs2.exe')) : null; }
  const pdata = () => process.env.ProgramData || 'C:\\ProgramData';
  async function valIcon() { // só o ícone do VALORANT instalado
    const dirs = [];
    try { const y = fs.readFileSync(path.join(pdata(), 'Riot Games', 'Metadata', 'valorant.live', 'valorant.live.product_settings.yaml'), 'utf8'), m = y.match(/product_install_full_path:\s*"?([^"\r\n]+)"?/); if (m) dirs.push(m[1].trim().replace(/\\\\/g, '\\')); } catch {}
    dirs.push('C:\\Riot Games\\VALORANT', path.join(process.env.ProgramFiles || 'C:\\Program Files', 'Riot Games', 'VALORANT'));
    for (const d of dirs) for (const e of [path.join(d, 'live', 'VALORANT.exe'), path.join(d, 'VALORANT.exe'), path.join(d, 'live', 'ShooterGame', 'Binaries', 'Win64', 'VALORANT-Win64-Shipping.exe')]) { const i = await fileIcon(e); if (i) return i; }
    return installedIcon('^VALORANT$');
  }
  async function riotClientIcon() {
    try { const j = JSON.parse(fs.readFileSync(path.join(pdata(), 'Riot Games', 'RiotClientInstalls.json'), 'utf8')); for (const k of ['rc_live', 'rc_default']) if (j[k]) { const i = await fileIcon(j[k]); if (i) return i; } } catch {}
    return null;
  }
  // Opcional: coloque icons/<id>.png (ou .svg/.ico/.webp) ao lado do main.js para forçar um ícone fixo e offline.
  function bundledIcon(id) {
    for (const [ext, mime] of [['png', 'image/png'], ['svg', 'image/svg+xml'], ['ico', 'image/x-icon'], ['webp', 'image/webp']]) {
      try { const f = path.join(__dirname, 'icons', id + '.' + ext); if (fs.existsSync(f)) return `data:${mime};base64,${fs.readFileSync(f).toString('base64')}`; } catch {}
    }
    return null;
  }
  const knownIcon = id => id === 'game_cs2' || id === 'game_valorant' || HUB.some(x => x.id === id);
  async function resolveIcon(id) {
    const b = bundledIcon(id); if (b) return { u: b, src: 'local' };
    let u = null;
    if (id === 'game_cs2') u = await cs2Icon();
    else if (id === 'game_valorant') u = await valIcon();
    else { const h = HUB.find(x => x.id === id); if (h && h.m) u = await installedIcon(h.m); }
    if (u) return { u, src: 'local' };
    const origin = ICON_WEB[id] || (HUB.find(x => x.id === id) ? new URL(HUB.find(x => x.id === id).url).origin : null);
    u = origin ? await webIcon(origin) : null;
    if (!u && id === 'game_valorant') u = await riotClientIcon();
    return u ? { u, src: 'web' } : { u: null };
  }
  // cache: memória + disco (userData/icons/<id>.json); falhas são tentadas de novo depois de 2 min
  const iconMem = new Map(), iconJobs = new Map(), WEB_TTL = 7 * 86400000;
  const iconFile = id => path.join(iconDir(), id.replace(/[^\w-]/g, '') + '.json');
  function loadIconCache() {
    try { for (const f of fs.readdirSync(iconDir())) { if (!f.endsWith('.json')) continue; try { const c = JSON.parse(fs.readFileSync(path.join(iconDir(), f), 'utf8')); if (c && c.u) iconMem.set(f.slice(0, -5), { u: c.u, t: c.t || 0, src: c.src || 'web' }); } catch {} } } catch {}
  }
  function refreshIcon(id) {
    if (iconJobs.has(id)) return iconJobs.get(id);
    const job = (async () => {
      let r = { u: null }; try { r = await resolveIcon(id); } catch {}
      const old = iconMem.get(id);
      if (r.u) { iconMem.set(id, { u: r.u, t: Date.now(), src: r.src }); try { fs.mkdirSync(iconDir(), { recursive: true }); fs.writeFileSync(iconFile(id), JSON.stringify({ u: r.u, t: Date.now(), src: r.src })); } catch {} }
      else if (!old || !old.u) iconMem.set(id, { u: null, t: Date.now() }); // mantém o ícone antigo se a atualização falhar
      return (iconMem.get(id) || {}).u || null;
    })().finally(() => iconJobs.delete(id));
    iconJobs.set(id, job); return job;
  }
  function iconFor(id) {
    if (!knownIcon(id)) return Promise.resolve(null);
    const m = iconMem.get(id);
    if (m && m.u) { if (m.src !== 'local' && Date.now() - m.t > WEB_TTL) refreshIcon(id); return Promise.resolve(m.u); } // ícone web antigo: mostra já e atualiza em segundo plano
    if (m && Date.now() - m.t < 120000) return Promise.resolve(null);
    return refreshIcon(id);
  }
  ipcMain.handle('icons:get', async (_e, ids) => {
    const o = {};
    await Promise.all((Array.isArray(ids) ? ids : []).map(async id => { o[id] = await iconFor(id); }));
    return o;
  });
  function warmIcons() { for (const id of ['game_cs2', 'game_valorant', ...HUB.map(h => h.id)]) iconFor(id); } // pré-carrega tudo em segundo plano

  // ---------- Drivers ----------
  const LINKS = { nvidia: 'https://www.nvidia.com/Download/index.aspx', amd: 'https://www.amd.com/en/support/download/drivers.html', intel: 'https://www.intel.com/content/www/us/en/download-center/home.html', intelDSA: 'https://www.intel.com/content/www/us/en/support/detect.html', wu: 'ms-settings:windowsupdate' };
  ipcMain.handle('drivers:open', (_e, k) => { if (LINKS[k]) shell.openExternal(LINKS[k]); return !!LINKS[k]; });
  ipcMain.handle('drivers:scan', async () => {
    const r = await psT("[Console]::OutputEncoding=[Text.Encoding]::UTF8;$c=Get-CimInstance Win32_Processor|Select-Object -First 1 Name,Manufacturer;$g=@(Get-CimInstance Win32_VideoController|Select-Object Name,AdapterCompatibility,DriverVersion,DriverDate);$d=@(Get-CimInstance Win32_PnPSignedDriver|Where-Object{$_.DeviceName -and $_.DriverVersion -and ($_.DeviceClass -in 'SYSTEM','NET','MEDIA')}|Select-Object DeviceName,DeviceClass,Manufacturer,DriverVersion,DriverDate);@{cpu=$c;gpu=$g;drv=$d}|ConvertTo-Json -Depth 4 -Compress", 180000);
    let j = {}; try { j = JSON.parse(r.out); } catch {}
    const arr = x => Array.isArray(x) ? x : x ? [x] : [], day = s => { const m = String(s || '').match(/\/Date\((\d+)\)\//); return m ? new Date(+m[1]).toISOString().slice(0, 10) : String(s || '').slice(0, 10); };
    const cpu = j.cpu || {}, vendor = n => /nvidia|geforce|rtx|gtx/i.test(n) ? 'nvidia' : /radeon|amd/i.test(n) ? 'amd' : /intel/i.test(n) ? 'intel' : '';
    const gpus = arr(j.gpu).map(g => {
      const v = vendor((g.Name || '') + ' ' + (g.AdapterCompatibility || '')); let friendly = '';
      if (v === 'nvidia') { const s = String(g.DriverVersion || '').split('.').slice(-2).join(''); if (s.length >= 5) friendly = s.slice(-5, -2) + '.' + s.slice(-2); }
      return { name: g.Name || '', vendor: v, version: g.DriverVersion || '', friendly, date: day(g.DriverDate) };
    });
    const drv = arr(j.drv), pick = (cls, re, n) => drv.filter(d => d.DeviceClass === cls && re.test((d.DeviceName || '') + ' ' + (d.Manufacturer || ''))).slice(0, n).map(d => ({ name: d.DeviceName, vendor: d.Manufacturer || '', version: d.DriverVersion, date: day(d.DriverDate) }));
    return { ok: r.ok && !!j.cpu, cpu: { name: cpu.Name || '', vendor: /amd/i.test(cpu.Manufacturer || cpu.Name || '') ? 'amd' : /intel/i.test(cpu.Manufacturer || cpu.Name || '') ? 'intel' : '' }, gpus,
      chipset: pick('SYSTEM', /(AMD|Advanced Micro|Intel).*(chipset|SMBus|PCI|LPC|Management Engine|GPIO|Serial IO|PSP|SATA|Platform|I2C)|(chipset|SMBus|LPC|PSP|Management Engine)/i, 8),
      net: pick('NET', /wi-?fi|wireless|ethernet|gigabit|realtek|intel|killer|qualcomm|mediatek/i, 3), audio: pick('MEDIA', /audio|realtek|nvidia|amd|intel/i, 3) };
  });
  ipcMain.handle('drivers:wu', async () => {
    const r = await psT("$ErrorActionPreference='Stop';try{$s=New-Object -ComObject Microsoft.Update.Session;$u=$s.CreateUpdateSearcher();$q=$u.Search(\"IsInstalled=0 and Type='Driver'\");ConvertTo-Json -InputObject @($q.Updates|ForEach-Object{[pscustomobject]@{t=$_.Title;p=$_.DriverProvider;d=([string]$_.DriverVerDate);c=$_.DriverClass}}) -Compress}catch{'ERR:'+$_.Exception.Message}", 600000);
    if (!r.ok || /^ERR:/.test(r.out)) return { ok: false, err: (r.out || 'A busca falhou.').replace(/^ERR:/, '').slice(0, 200) };
    let j = []; try { j = JSON.parse(r.out || '[]'); } catch {} return { ok: true, list: Array.isArray(j) ? j : [j] };
  });

  // ---------- Análise de BIOS / hardware ----------
  ipcMain.handle('health:full', async e => {
    const send = (n, l) => { try { e.sender.send('health:progress', { n, total: 5, l }); } catch {} }, it = [];
    const add = (id, title, state, src, ev, adv) => it.push({ id, title, state, src, ev, adv: adv || '' }), J = (o) => { try { const j = JSON.parse(o); return Array.isArray(j) ? j : [j]; } catch { return []; } };
    send(1, 'Processador e memória');
    const cpu = J((await ps('(Get-CimInstance Win32_Processor|Select-Object -First 1 Name,Manufacturer,MaxClockSpeed)|ConvertTo-Json -Compress')).out)[0] || {};
    const amd = /amd/i.test(cpu.Manufacturer || cpu.Name || ''), intel = /intel/i.test(cpu.Manufacturer || cpu.Name || ''), prof = amd ? 'EXPO/DOCP' : intel ? 'XMP' : 'XMP/EXPO';
    const mods = J((await ps('@(Get-CimInstance Win32_PhysicalMemory|Select-Object Capacity,Speed,ConfiguredClockSpeed,ConfiguredVoltage,SMBIOSMemoryType)|ConvertTo-Json -Compress')).out);
    const rated = Math.max(0, ...mods.map(x => x.Speed || 0)), run = Math.max(0, ...mods.map(x => x.ConfiguredClockSpeed || 0));
    const type = { 24: 'DDR3', 26: 'DDR4', 34: 'DDR5' }[(mods[0] || {}).SMBIOSMemoryType] || '', jedec = { DDR3: 1600, DDR4: 2666, DDR5: 4800 }[type] || 0, gb = Math.round(mods.reduce((s, x) => s + (x.Capacity || 0), 0) / 2 ** 30), volt = (mods[0] || {}).ConfiguredVoltage;
    const vtxt = volt ? ` Tensão configurada: ${(volt / 1000).toFixed(2)} V.` : '';
    if (!mods.length || !rated || !run) add('xmp', `Perfil de memória (${prof})`, 'unknown', 'windows', 'O Windows não retornou a velocidade da memória.');
    else if (run < rated * 0.97) add('xmp', `Perfil de memória (${prof})`, 'off', 'estimate', `Memória ${type} rodando a ${run} MHz, mas o pente informa ${rated} MHz.${vtxt}`, `Ative ${prof} na BIOS para usar a velocidade nominal e depois teste a estabilidade.`);
    else if (jedec && rated <= jedec) add('xmp', `Perfil de memória (${prof})`, 'unknown', 'estimate', `Memória ${type} a ${run} MHz, que é a velocidade padrão do tipo.${vtxt}`, `Se o seu kit é anunciado com velocidade maior, ative ${prof} na BIOS.`);
    else add('xmp', `Perfil de memória (${prof})`, 'on', 'estimate', `Memória ${type} rodando a ${run} MHz (nominal do pente: ${rated} MHz).${vtxt}`, 'Parece usar a velocidade nominal. Só a BIOS confirma com certeza.');
    if (mods.length === 1) add('channels', 'Canais da memória', 'off', 'estimate', `Só 1 pente detectado (${gb} GB).`, 'Com 2 pentes iguais o PC usa canal duplo, que costuma render mais FPS.');
    else if (mods.length > 1) add('channels', 'Canais da memória', 'on', 'estimate', `${mods.length} pentes detectados (${gb} GB no total).`, 'Para valer o canal duplo, os pentes precisam estar nos slots certos (normalmente A2 e B2). O Windows não informa isso.');
    if (amd && /ryzen/i.test(cpu.Name || '')) add('pbo', 'AMD PBO / Curve Optimizer', 'unknown', 'bios', `CPU: ${cpu.Name}. O Windows não informa se o PBO está ligado.`, 'Fica na BIOS ou no Ryzen Master. Aumenta clocks com mais calor e consumo; só use com boa refrigeração e teste a estabilidade.');
    else if (intel) add('turbo', 'Intel Turbo Boost', 'unknown', 'bios', `CPU: ${cpu.Name || 'Intel'}. O estado do Turbo na BIOS não é informado pelo Windows.`, 'Veja o clock real sob carga no Gerenciador de Tarefas. Se estiver preso no clock base, confira a BIOS e o plano de energia.');
    add('memtrain', 'Treinamento de memória / Memory Context Restore', 'unknown', 'bios', 'Isso é uma opção da BIOS; o Windows não consegue ler.', amd ? 'Em placas AM5, "Memory Context Restore" acelera o boot, mas pode esconder instabilidade ao testar overclock de memória.' : 'Varia por placa-mãe (ex.: "Memory Fast Boot"). Pode acelerar o boot e atrapalhar testes de memória.');

    send(2, 'Placa de vídeo');
    const gpus = J((await ps('@(Get-CimInstance Win32_VideoController|Select-Object Name,CurrentRefreshRate)|ConvertTo-Json -Compress')).out);
    const dg = gpus.find(g => /rtx|gtx|geforce|radeon rx|radeon pro|\barc\b|quadro|titan/i.test(g.Name || ''));
    let bar = 'unknown', barMsg = 'Nenhuma GPU dedicada identificada; não se aplica.', src = 'windows';
    if (dg && /rtx|gtx|geforce|quadro|titan/i.test(dg.Name)) {
      let t = await out('nvidia-smi', ['-q', '-d', 'MEMORY']); if (!t) t = await out('C:\\Program Files\\NVIDIA Corporation\\NVSMI\\nvidia-smi.exe', ['-q', '-d', 'MEMORY']);
      const b = t.match(/BAR1 Memory Usage[\s\S]*?Total\s*:\s*(\d+)\s*MiB/i);
      if (b) { bar = +b[1] > 256 ? 'on' : 'off'; barMsg = `${dg.Name}: BAR1 = ${b[1]} MiB (256 MiB indica Resizable BAR desligado).`; } else barMsg = `${dg.Name}: não consegui ler o nvidia-smi.`;
    } else if (dg) { src = 'bios'; barMsg = `${dg.Name}: o Windows não informa o Smart Access Memory / Resizable BAR.`; }
    add('rebar', 'Resizable BAR', bar, src, barMsg, bar === 'off' ? 'Ative "Above 4G Decoding" e "Resizable BAR" na BIOS (GPU, placa-mãe e BIOS precisam suportar). Em muitos jogos o ganho é pequeno.' : dg && bar === 'unknown' ? 'Confira no software do fabricante da GPU ou na BIOS.' : '');
    if (dg) add('above4g', 'Above 4G Decoding', bar === 'on' ? 'on' : 'unknown', bar === 'on' ? 'estimate' : 'bios', bar === 'on' ? 'Inferido: o Resizable BAR só funciona com Above 4G Decoding ligado.' : 'O Windows não informa essa opção da BIOS.', 'Fica na BIOS (PCI / Advanced). É pré-requisito do Resizable BAR.');
    const rate = Math.max(0, ...gpus.map(g => g.CurrentRefreshRate || 0));
    if (rate) add('refresh', 'Taxa de atualização do monitor', 'unknown', 'windows', `Taxa atual informada pelo Windows: ${rate} Hz.`, 'Se o seu monitor suporta mais, ajuste em Configurações → Sistema → Tela → Tela avançada.');

    send(3, 'Recursos do Windows');
    const onoff = (v, a, b) => v === null ? 'unknown' : v === a ? 'on' : v === b ? 'off' : 'unknown';
    const fs1 = await regGet('HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power', 'HiberbootEnabled');
    add('faststart', 'Inicialização rápida do Windows', onoff(fs1, 1, 0), 'windows', fs1 === null ? 'Valor não encontrado no registro.' : `HiberbootEnabled = ${fs1}`, 'Não dá FPS. Desligar evita alguns problemas de driver e de dual boot.');
    add('fastboot', 'Fast Boot da BIOS', 'unknown', 'bios', 'Isso é uma opção da BIOS; o Windows não consegue ler.', 'Pula etapas na inicialização. Pode dificultar entrar na BIOS e testar memória.');
    const hg = await regGet('HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers', 'HwSchMode');
    add('hags', 'Agendamento de GPU por Hardware (HAGS)', onoff(hg, 2, 1), 'windows', hg === null ? 'Seu driver/GPU não expõe o HAGS.' : `HwSchMode = ${hg}`, '');
    const hv = await regGet('HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity', 'Enabled');
    add('memint', 'Integridade da Memória (Isolamento de Núcleo)', onoff(hv, 1, 0), 'windows', hv === null ? 'Valor não encontrado; o estado real é desconhecido.' : `Enabled = ${hv}`, 'É uma proteção de segurança. Desativá-la dá ganho pequeno e fica nas Otimizações, com aviso.');
    const gm = await regGet('HKCU\\Software\\Microsoft\\GameBar', 'AutoGameModeEnabled');
    add('gamemode', 'Modo de Jogo do Windows', onoff(gm, 1, 0), 'windows', gm === null ? 'Não definido: o Windows usa o padrão.' : `AutoGameModeEnabled = ${gm}`, '');
    const pw = (await out('powercfg', ['/getactivescheme'])).trim();
    add('power', 'Plano de energia', /8c5e7fda/i.test(pw) ? 'on' : pw ? 'off' : 'unknown', 'windows', pw || 'Não consegui ler o plano ativo.', 'O plano Alto Desempenho evita que a CPU reduza o clock durante o jogo.');
    const sb = (await ps('try{Confirm-SecureBootUEFI}catch{"ERR"}')).out;
    add('secureboot', 'Inicialização Segura (Secure Boot)', sb === 'True' ? 'on' : sb === 'False' ? 'off' : 'unknown', 'windows', sb === 'True' || sb === 'False' ? `Confirm-SecureBootUEFI = ${sb}` : 'Não foi possível consultar (BIOS legada ou falta de administrador).', 'Alguns anti-cheats (como o Vanguard do VALORANT no Windows 11) exigem Secure Boot e TPM 2.0.');

    send(4, 'Registros de erros (pode demorar)');
    const ev = (await ps("$ErrorActionPreference='SilentlyContinue';$t=(Get-Date).AddDays(-30);$w=@(Get-WinEvent -FilterHashtable @{LogName='System';ProviderName='Microsoft-Windows-WHEA-Logger';StartTime=$t}).Count;$m=Get-WinEvent -FilterHashtable @{LogName='System';ProviderName='Microsoft-Windows-MemoryDiagnostics-Results'}|Select-Object -First 1;$d='';if($m){$d=$m.TimeCreated.ToString('yyyy-MM-dd')+': '+($m.Message -replace '\\s+',' ')};\"$w|$d\"")).out.split('|');
    const wh = parseInt(ev[0]) || 0, md = (ev[1] || '').trim().slice(0, 160);
    add('stability', 'Estabilidade da memória e do hardware', wh > 0 ? 'off' : 'unknown', 'windows', (wh > 0 ? `${wh} evento(s) de erro de hardware (WHEA) nos últimos 30 dias.` : 'Nenhum erro WHEA nos últimos 30 dias (isso não prova estabilidade).') + (md ? ` Último Diagnóstico de Memória do Windows: ${md}` : ' O Diagnóstico de Memória do Windows nunca foi executado.'), wh > 0 ? 'Erros WHEA podem indicar memória, CPU ou overclock instável. Teste a memória (ex.: MemTest86) e volte ao padrão da BIOS se necessário.' : 'Para testar de verdade, rode o Diagnóstico de Memória do Windows ou o MemTest86. O programa não executa testes que exigem reiniciar.');
    send(5, 'Concluído');
    return { items: it, when: Date.now() };
  });

  // ---------- Atualizador integrado ----------
  const okHost = h => h === 'github.com' || h.endsWith('.githubusercontent.com');
  function fetchText(url, d = 0) {
    return new Promise((res, rej) => {
      let u; try { u = new URL(url); } catch { return rej(new Error('URL inválida')); }
      if (u.protocol !== 'https:' || !okHost(u.hostname)) return rej(new Error('Origem não permitida'));
      https.get(u, { headers: { 'User-Agent': 'luquinhas-boost' }, timeout: 15000 }, r => {
        if ([301, 302, 303, 307, 308].includes(r.statusCode) && r.headers.location && d < 4) { r.resume(); return res(fetchText(new URL(r.headers.location, u).href, d + 1)); }
        if (r.statusCode !== 200) { r.resume(); return rej(new Error('HTTP ' + r.statusCode)); }
        let b = ''; r.on('data', c => { b += c; if (b.length > 200000) r.destroy(); }); r.on('end', () => res(b)); r.on('error', rej);
      }).on('error', rej);
    });
  }
  function download(url, dest, prog, d = 0) {
    return new Promise((res, rej) => {
      let u; try { u = new URL(url); } catch { return rej(new Error('URL inválida')); }
      if (u.protocol !== 'https:' || !okHost(u.hostname)) return rej(new Error('Origem não permitida: ' + u.hostname));
      const rq = https.get(u, { headers: { 'User-Agent': 'luquinhas-boost' }, timeout: 20000 }, r => {
        if ([301, 302, 303, 307, 308].includes(r.statusCode) && r.headers.location) { r.resume(); if (d > 5) return rej(new Error('Redirecionamentos demais')); return res(download(new URL(r.headers.location, u).href, dest, prog, d + 1)); }
        if (r.statusCode !== 200) { r.resume(); return rej(new Error('HTTP ' + r.statusCode)); }
        const total = +r.headers['content-length'] || 0, h = crypto.createHash('sha256'), f = fs.createWriteStream(dest); let got = 0;
        r.on('data', c => { got += c.length; h.update(c); prog(got, total); });
        r.pipe(f); f.on('finish', () => f.close(() => res({ sha: h.digest('hex'), size: got }))); f.on('error', rej); r.on('error', rej);
      });
      rq.on('error', rej); rq.on('timeout', () => rq.destroy(new Error('Tempo esgotado')));
    });
  }
  async function relInfo() {
    const j = await getJSON(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
    if (!j || !j.tag_name) return null;
    const a = (j.assets || []).find(x => /setup.*\.exe$/i.test(x.name)); let sha = null;
    if (a && /^sha256:[0-9a-f]{64}$/i.test(a.digest || '')) sha = a.digest.slice(7).toLowerCase();
    if (a && !sha) {
      const s = (j.assets || []).find(x => /sha-?256/i.test(x.name));
      if (s) { try { const t = await fetchText(s.browser_download_url), nm = x => x.replace(/[ .]/g, '').toLowerCase(), ln = t.split(/\r?\n/).find(l => nm(l).includes(nm(a.name))), m = ln && ln.match(/\b[0-9a-f]{64}\b/i); if (m) sha = m[0].toLowerCase(); } catch {} }
    }
    return { v: j.tag_name, notes: String(j.body || '').slice(0, 1200), url: j.html_url, asset: a ? { name: a.name, size: a.size, url: a.browser_download_url, sha256: sha } : null };
  }
  let pending = null;
  ipcMain.handle('update:info', async () => {
    const cur = app.getVersion();
    if (!GITHUB_REPO || GITHUB_REPO.includes('SEU_USUARIO')) return { ok: false, err: 'Repositório do GitHub não configurado.', cur };
    const i = await relInfo(); if (!i) return { ok: false, err: 'Não consegui consultar o GitHub (sem internet ou repositório privado).', cur };
    return { ok: true, cur, latest: i.v, newer: newer(i.v, cur), notes: i.notes, url: i.url, canAuto: !!(i.asset && i.asset.sha256), asset: i.asset ? { name: i.asset.name, size: i.asset.size } : null };
  });
  ipcMain.handle('update:install', async e => {
    try {
      const i = await relInfo(); if (!i || !i.asset) return { ok: false, err: 'A Release não tem um instalador (arquivo "Setup ... .exe").' };
      if (!i.asset.sha256) return { ok: false, err: 'A Release não traz o checksum SHA-256. Por segurança, a instalação automática foi bloqueada; baixe pela página da Release.' };
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lb-upd-')), dest = path.join(dir, 'LuquinhasBoost-Setup-' + i.v.replace(/[^\w.-]/g, '') + '.exe');
      const r = await download(i.asset.url, dest, (g, t) => { try { e.sender.send('upd:progress', { g, t: t || i.asset.size }); } catch {} });
      if (r.sha.toLowerCase() !== i.asset.sha256.toLowerCase() || (i.asset.size && r.size !== i.asset.size)) { fs.rmSync(dir, { recursive: true, force: true }); return { ok: false, err: 'O arquivo baixado não confere com o checksum publicado. Download descartado.' }; }
      const sig = (await ps(`(Get-AuthenticodeSignature -LiteralPath '${dest.replace(/'/g, "''")}').Status`)).out || 'Unknown';
      if (!['Valid', 'NotSigned'].includes(sig)) { fs.rmSync(dir, { recursive: true, force: true }); return { ok: false, err: 'A assinatura digital do instalador é inválida (' + sig + '). Download descartado.' }; }
      pending = { dest, dir }; return { ok: true, sig, sha: r.sha, v: i.v };
    } catch (er) { log('update: ' + er.message); return { ok: false, err: 'Falha no download: ' + er.message }; }
  });
  ipcMain.handle('update:apply', () => { if (!pending || !fs.existsSync(pending.dest)) return false; spawn(pending.dest, [], { detached: true, stdio: 'ignore' }).unref(); setTimeout(() => app.quit(), 600); return true; });
  ipcMain.handle('update:cancel', () => { if (pending) { try { fs.rmSync(pending.dir, { recursive: true, force: true }); } catch {} pending = null; } return true; });

  return { monitorOn, bgOn: () => autoGet().background !== false, onHidden, start: () => { setupMonitor(); applyStartup().catch(() => {}); setTimeout(checkDue, 60000); loadIconCache(); setTimeout(warmIcons, 1500); } };
};
