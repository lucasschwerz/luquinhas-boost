const { app, BrowserWindow, ipcMain, shell, dialog, clipboard } = require('electron');
const path = require('path'), fs = require('fs'), os = require('os');
const { exec, execFile } = require('child_process');

const BRAND = 'Luquinhas Boost';
const GITHUB_REPO = 'lucasschwerz/luquinhas-boost'; // usuario/repositorio do GitHub (aviso de atualizacao)
const DISCORD = ''; // cole aqui o link do seu servidor (ex: https://discord.gg/xxxx)

const run = c => new Promise(r => exec(c, { shell: 'cmd.exe', windowsHide: true }, e => r(!e)));
const ps = c => new Promise(r => execFile('powershell', ['-NoProfile', '-Command', c], { windowsHide: true, maxBuffer: 1 << 26 },
  (e, o) => r({ ok: !e, out: (o || '').trim() })));

const cfgPath = () => path.join(app.getPath('userData'), 'cfg.json');
const load = () => { try { return JSON.parse(fs.readFileSync(cfgPath(), 'utf8')); } catch { return {}; } };
const save = c => { try { fs.writeFileSync(cfgPath(), JSON.stringify(c)); } catch {} };

function wipe(dir, filter = () => true) {
  try { for (const f of fs.readdirSync(dir)) if (filter(f)) try { fs.rmSync(path.join(dir, f), { recursive: true, force: true }); } catch {} } catch {}
  return true;
}
const clean = {
  temp: async () => (wipe(os.tmpdir()), wipe('C:\\Windows\\Temp')),
  prefetch: async () => wipe('C:\\Windows\\Prefetch'),
  bin: async () => (await ps('Clear-RecycleBin -Force -ErrorAction SilentlyContinue')).ok,
  wu: async () => { await run('net stop wuauserv'); wipe('C:\\Windows\\SoftwareDistribution\\Download'); return run('net start wuauserv'); },
  thumbs: async () => wipe(path.join(process.env.LOCALAPPDATA || '', 'Microsoft\\Windows\\Explorer'), f => /^thumbcache_.*\.db$/i.test(f)),
};

const R = (k, v, t, d) => `reg add "${k}" /v ${v} /t ${t} /d ${d} /f`;
const D = (k, v) => `reg delete "${k}" ${v ? '/v ' + v + ' ' : ''}/f & exit 0`;
const CU = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\';
const IFEO = 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\cs2.exe\\PerfOptions';
const MS = 'HKCU\\Control Panel\\Mouse', AC = 'HKCU\\Control Panel\\Accessibility\\';
const DC = 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection';
const CP = 'HKCU\\Software\\Policies\\Microsoft\\Windows\\WindowsCopilot';

const T = [
  { id: 'power', fps: 1, n: 'Plano de Energia Alto Desempenho', d: 'Mantém a CPU em clock máximo durante as partidas.', c: ['Desempenho', 'Gaming'], star: 1,
    on: ['powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c'], off: ['powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e'] },
  { id: 'gamemode', fps: 1, n: 'Ativar Modo de Jogo', d: 'Prioriza o jogo e reduz interferência do Windows.', c: ['Gaming'], star: 1,
    on: [R('HKCU\\Software\\Microsoft\\GameBar', 'AutoGameModeEnabled', 'REG_DWORD', 1)], off: [R('HKCU\\Software\\Microsoft\\GameBar', 'AutoGameModeEnabled', 'REG_DWORD', 0)] },
  { id: 'dvr', fps: 1, n: 'Desativar Game DVR / Captura', d: 'Desliga a gravação em segundo plano da Xbox Game Bar.', c: ['Gaming', 'Privacidade'], star: 1,
    on: [R('HKCU\\System\\GameConfigStore', 'GameDVR_Enabled', 'REG_DWORD', 0), R(CU + 'GameDVR', 'AppCaptureEnabled', 'REG_DWORD', 0)],
    off: [R('HKCU\\System\\GameConfigStore', 'GameDVR_Enabled', 'REG_DWORD', 1), R(CU + 'GameDVR', 'AppCaptureEnabled', 'REG_DWORD', 1)] },
  { id: 'mouse', n: 'Desativar Aceleração do Mouse', d: 'Mira consistente. Vale após reiniciar a sessão do Windows.', c: ['Gaming'], star: 1,
    on: [R(MS, 'MouseSpeed', 'REG_SZ', 0), R(MS, 'MouseThreshold1', 'REG_SZ', 0), R(MS, 'MouseThreshold2', 'REG_SZ', 0)],
    off: [R(MS, 'MouseSpeed', 'REG_SZ', 1), R(MS, 'MouseThreshold1', 'REG_SZ', 6), R(MS, 'MouseThreshold2', 'REG_SZ', 10)] },
  { id: 'sticky', n: 'Bloquear Pop-ups de Teclas de Aderência', d: 'Chega de janela do Shift atrapalhando no meio do round.', c: ['Gaming'], star: 1,
    on: [R(AC + 'StickyKeys', 'Flags', 'REG_SZ', 506), R(AC + 'Keyboard Response', 'Flags', 'REG_SZ', 122), R(AC + 'ToggleKeys', 'Flags', 'REG_SZ', 58)],
    off: [R(AC + 'StickyKeys', 'Flags', 'REG_SZ', 510), R(AC + 'Keyboard Response', 'Flags', 'REG_SZ', 126), R(AC + 'ToggleKeys', 'Flags', 'REG_SZ', 62)] },
  { id: 'priority', fps: 1, n: 'Prioridade Alta para o CS2', d: 'O Windows sempre abre o cs2.exe com prioridade alta.', c: ['Gaming', 'Desempenho'], star: 1,
    on: [R(IFEO, 'CpuPriorityClass', 'REG_DWORD', 3)], off: [D(IFEO)] },
  { id: 'bgapps', fps: 1, n: 'Bloquear Apps em Segundo Plano', d: 'Libera CPU e RAM impedindo apps de rodarem escondidos.', c: ['Desempenho'],
    on: [R(CU + 'BackgroundAccessApplications', 'GlobalUserDisabled', 'REG_DWORD', 1)], off: [R(CU + 'BackgroundAccessApplications', 'GlobalUserDisabled', 'REG_DWORD', 0)] },
  { id: 'hibernate', n: 'Desativar Hibernação', d: 'Remove o arquivo de hibernação e libera espaço no disco.', c: ['Desempenho'],
    on: ['powercfg /h off'], off: ['powercfg /h on'] },
  { id: 'transp', fps: 1, n: 'Desativar Transparências', d: 'Interface do Windows mais leve.', c: ['Aparência', 'Desempenho'],
    on: [R(CU + 'Themes\\Personalize', 'EnableTransparency', 'REG_DWORD', 0)], off: [R(CU + 'Themes\\Personalize', 'EnableTransparency', 'REG_DWORD', 1)] },
  { id: 'taskbar', n: 'Barra de Tarefas à Esquerda', d: 'Alinha os ícones à esquerda (Windows 11).', c: ['Geral', 'Aparência'],
    on: [R(CU + 'Explorer\\Advanced', 'TaskbarAl', 'REG_DWORD', 0)], off: [R(CU + 'Explorer\\Advanced', 'TaskbarAl', 'REG_DWORD', 1)] },
  { id: 'telemetry', n: 'Reduzir Telemetria', d: 'Limita o envio de dados de diagnóstico à Microsoft.', c: ['Privacidade'],
    on: [R(DC, 'AllowTelemetry', 'REG_DWORD', 0)], off: [D(DC, 'AllowTelemetry')] },
  { id: 'adid', n: 'Desativar ID de Publicidade', d: 'Impede anúncios personalizados baseados no seu uso.', c: ['Privacidade'],
    on: [R(CU + 'AdvertisingInfo', 'Enabled', 'REG_DWORD', 0)], off: [R(CU + 'AdvertisingInfo', 'Enabled', 'REG_DWORD', 1)] },
  { id: 'copilot', n: 'Desativar Copilot', d: 'Remove o recurso Copilot da Microsoft.', c: ['Privacidade', 'Geral'],
    on: [R(CP, 'TurnOffWindowsCopilotFeature', 'REG_DWORD', 1)], off: [D(CP, 'TurnOffWindowsCopilotFeature')] },
  { id: 'visualfx', fps: 1, n: 'Desativar Animações e Efeitos Visuais', d: 'Desliga animações, sombras e efeitos do Windows. Reinicie a sessão para valer tudo.', c: ['Desempenho', 'Aparência'],
    on: [R(CU + 'Explorer\\VisualEffects', 'VisualFXSetting', 'REG_DWORD', 2), R('HKCU\\Control Panel\\Desktop\\WindowMetrics', 'MinAnimate', 'REG_SZ', 0), R(CU + 'Explorer\\Advanced', 'TaskbarAnimations', 'REG_DWORD', 0), R(CU + 'Explorer\\Advanced', 'ListviewAlphaSelect', 'REG_DWORD', 0), R(CU + 'Explorer\\Advanced', 'ListviewShadow', 'REG_DWORD', 0), R('HKCU\\Software\\Microsoft\\Windows\\DWM', 'EnableAeroPeek', 'REG_DWORD', 0)],
    off: [R(CU + 'Explorer\\VisualEffects', 'VisualFXSetting', 'REG_DWORD', 0), R('HKCU\\Control Panel\\Desktop\\WindowMetrics', 'MinAnimate', 'REG_SZ', 1), R(CU + 'Explorer\\Advanced', 'TaskbarAnimations', 'REG_DWORD', 1), R(CU + 'Explorer\\Advanced', 'ListviewAlphaSelect', 'REG_DWORD', 1), R(CU + 'Explorer\\Advanced', 'ListviewShadow', 'REG_DWORD', 1), R('HKCU\\Software\\Microsoft\\Windows\\DWM', 'EnableAeroPeek', 'REG_DWORD', 1)] },
  { id: 'services', fps: 1, n: 'Desligar Serviços Pouco Usados', d: 'Desativa Fax, Registro Remoto, Mapas, Modo Demonstração, Relatório de Erros e telemetria (DiagTrack).', c: ['Desempenho', 'Privacidade'],
    on: ['sc config DiagTrack start= disabled', 'sc stop DiagTrack & exit 0', 'sc config Fax start= disabled & exit 0', 'sc config RemoteRegistry start= disabled & exit 0', 'sc config MapsBroker start= disabled & exit 0', 'sc config RetailDemo start= disabled & exit 0', 'sc config dmwappushservice start= disabled & exit 0', 'sc config WerSvc start= disabled & exit 0'],
    off: ['sc config DiagTrack start= auto', 'sc config Fax start= demand & exit 0', 'sc config RemoteRegistry start= disabled & exit 0', 'sc config MapsBroker start= delayed-auto & exit 0', 'sc config RetailDemo start= demand & exit 0', 'sc config dmwappushservice start= demand & exit 0', 'sc config WerSvc start= demand & exit 0'] },
];

let restoreMade = false, sysCache;
async function sys() {
  if (sysCache) return sysCache;
  const r = await ps("$d=Get-CimInstance Win32_DiskDrive|select -First 1;$o=Get-CimInstance Win32_OperatingSystem;@{gpu=(Get-CimInstance Win32_VideoController|select -First 1).Name;disk=$d.Model;size=[math]::Round($d.Size/1GB);os=$o.Caption;ver=$o.Version}|ConvertTo-Json -Compress");
  let j = {}; try { j = JSON.parse(r.out); } catch {}
  return (sysCache = { cpu: os.cpus()[0].model.trim(), cores: os.cpus().length, ram: (os.totalmem() / 2 ** 30).toFixed(1), ...j });
}
async function apply(ids, enable) {
  const cfg = load(), ap = new Set(cfg.applied || []), res = {};
  if (enable && !restoreMade) { await ps(`Checkpoint-Computer -Description '${BRAND} backup' -RestorePointType MODIFY_SETTINGS`); restoreMade = true; }
  for (const id of ids) {
    const t = T.find(x => x.id === id); if (!t) continue;
    let ok = true; for (const c of enable ? t.on : t.off) ok = (await run(c)) && ok;
    res[id] = ok; if (ok) enable ? ap.add(id) : ap.delete(id);
  }
  cfg.applied = [...ap]; save(cfg); return res;
}

ipcMain.handle('init', async () => ({
  brand: BRAND, discord: !!DISCORD, user: os.userInfo().username, ver: app.getVersion(),
  tweaks: T.map(({ id, n, d, c, star, fps }) => ({ id, n, d, c, star, fps })),
  applied: (load().applied || []).filter(id => T.some(t => t.id === id)), lastClean: load().lastClean || null,
  admin: await run('net session >nul 2>&1'), sys: await sys(),
}));
ipcMain.handle('tweaks', (_e, ids, en) => apply(ids, en));
ipcMain.handle('clean', async (_e, ids) => {
  const res = {}; for (const id of ids) res[id] = clean[id] ? await clean[id]() : false;
  const cfg = load(); cfg.lastClean = Date.now(); save(cfg); return res;
});
ipcMain.handle('restore', async (_e, a) => {
  if (a === 'create') { restoreMade = true; return (await ps(`Checkpoint-Computer -Description '${BRAND} manual' -RestorePointType MODIFY_SETTINGS`)).ok; }
  if (a === 'open') return run('start rstrui.exe');
  if (a === 'revert') { await apply(load().applied || [], false); return true; }
});
let appCache = [];
ipcMain.handle('apps:list', async () => {
  const r = await ps("[Console]::OutputEncoding=[Text.Encoding]::UTF8;$k='HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*';Get-ItemProperty $k -ErrorAction SilentlyContinue|Where-Object{$_.DisplayName -and !$_.SystemComponent -and !$_.ParentKeyName}|Select-Object DisplayName,DisplayVersion,Publisher,EstimatedSize,UninstallString,QuietUninstallString|ConvertTo-Json -Compress");
  let j = []; try { j = JSON.parse(r.out); if (!Array.isArray(j)) j = [j]; } catch {}
  const seen = new Set();
  appCache = j.filter(a => { const k = a.DisplayName + a.DisplayVersion; if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => a.DisplayName.localeCompare(b.DisplayName))
    .map((a, id) => ({ id, n: a.DisplayName, v: a.DisplayVersion || '', p: a.Publisher || '', s: a.EstimatedSize ? Math.round(a.EstimatedSize / 1024) : 0, cmd: a.QuietUninstallString || a.UninstallString || '' }));
  return appCache.map(({ cmd, ...a }) => a);
});
ipcMain.handle('apps:uninstall', async (_e, ids) => {
  const res = {};
  for (const id of ids) {
    const a = appCache[id]; if (!a || !a.cmd) { res[id] = false; continue; }
    res[id] = await run(a.cmd.replace(/MsiExec\.exe\s+\/I/i, 'MsiExec.exe /X'));
  }
  return res;
});
ipcMain.handle('apps:export', async (_e, ids) => {
  const list = (ids.length ? ids.map(i => appCache[i]) : appCache).filter(Boolean);
  const { filePath } = await dialog.showSaveDialog({ defaultPath: 'meus-apps.txt', filters: [{ name: 'Texto', extensions: ['txt'] }] });
  if (!filePath) return false;
  fs.writeFileSync(filePath, list.map(a => a.n + (a.v ? ' ' + a.v : '')).join('\r\n')); return true;
});
ipcMain.handle('copy', (_e, t) => (clipboard.writeText(String(t)), true));
const CFG_OK = ['principal', 'treino'];
ipcMain.handle('cs2:cfg', (_e, n) => { if (!CFG_OK.includes(n)) return ''; try { return fs.readFileSync(path.join(__dirname, 'cfg', n + '.cfg'), 'utf8'); } catch { return ''; } });
async function cs2CfgDir() {
  const q = await new Promise(r => exec('reg query "HKCU\\Software\\Valve\\Steam" /v SteamPath', { windowsHide: true }, (e, o) => r(e ? '' : o)));
  const mt = q.match(/SteamPath\s+REG_SZ\s+(.+)/), libs = [];
  if (mt) {
    const root = mt[1].trim().replace(/\//g, '\\'); libs.push(root);
    try {
      const v = fs.readFileSync(path.join(root, 'steamapps', 'libraryfolders.vdf'), 'utf8');
      for (const x of v.matchAll(/"path"\s+"([^"]+)"/g)) libs.push(x[1].replace(/\\\\/g, '\\'));
    } catch {}
  }
  for (const l of libs) {
    const d = path.join(l, 'steamapps', 'common', 'Counter-Strike Global Offensive', 'game', 'csgo', 'cfg');
    if (fs.existsSync(d)) return d;
  }
  return null;
}
ipcMain.handle('cs2:install', async (_e, files) => {
  files = (files || []).filter(f => f && /^[A-Za-z0-9_-]{1,40}$/.test(f.name) && typeof f.text === 'string' && f.text.length < 200000);
  if (!files.length) return { ok: false };
  let dir = await cs2CfgDir();
  if (!dir) {
    const r = await dialog.showOpenDialog({ title: 'Selecione a pasta cfg do CS2 (game\\csgo\\cfg)', properties: ['openDirectory'] });
    if (r.canceled) return { ok: false, cancel: true };
    dir = r.filePaths[0];
  }
  try { for (const f of files) fs.writeFileSync(path.join(dir, f.name + '.cfg'), f.text, 'utf8'); return { ok: true, dir }; }
  catch { return { ok: false }; }
});
const getJSON = url => new Promise(res => {
  const rq = require('https').get(url, { headers: { 'User-Agent': 'luquinhas-boost' }, timeout: 6000 }, r => {
    let b = ''; r.on('data', d => b += d); r.on('end', () => { try { res(JSON.parse(b)); } catch { res(null); } });
  });
  rq.on('error', () => res(null)); rq.on('timeout', () => { rq.destroy(); res(null); });
});
const newer = (a, b) => {
  const x = a.replace(/^v/, '').split('.').map(Number), y = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) { if ((x[i] || 0) > (y[i] || 0)) return true; if ((x[i] || 0) < (y[i] || 0)) return false; }
  return false;
};
ipcMain.handle('update', async () => {
  if (!GITHUB_REPO || GITHUB_REPO.includes('SEU_USUARIO')) return null;
  const j = await getJSON(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
  return j && j.tag_name && newer(j.tag_name, app.getVersion()) ? { v: j.tag_name, url: j.html_url } : null;
});
ipcMain.handle('open', (_e, u) => /^https:\/\/github\.com\//.test(u) && shell.openExternal(u));
ipcMain.handle('elevate', () => new Promise(res => {
  const exe = process.env.PORTABLE_EXECUTABLE_FILE || process.execPath;
  const args = app.isPackaged ? [] : [app.getAppPath()];
  const q = s => "'" + s.replace(/'/g, "''") + "'";
  const cmd = `Start-Process -FilePath ${q(exe)} ${args.length ? '-ArgumentList ' + args.map(q).join(',') + ' ' : ''}-Verb RunAs`;
  execFile('powershell', ['-NoProfile', '-Command', cmd], { windowsHide: true }, err => { if (!err) app.quit(); res(!err); });
}));
ipcMain.handle('theme', (e, o) => { try { const ok = /^#[0-9a-f]{6}$/i, w = BrowserWindow.fromWebContents(e.sender); if (o && ok.test(o.bg) && ok.test(o.sym)) { w.setTitleBarOverlay({ color: o.bg, symbolColor: o.sym, height: 36 }); w.setBackgroundColor(o.bg); } } catch {} });
const out = (c, a) => new Promise(r => execFile(c, a, { windowsHide: true, maxBuffer: 1 << 24 }, (e, o) => r(e ? '' : String(o))));
ipcMain.handle('health', async () => {
  const mr = await ps("@(Get-CimInstance Win32_PhysicalMemory|Select-Object Capacity,Speed,ConfiguredClockSpeed,SMBIOSMemoryType)|ConvertTo-Json -Compress");
  const gr = await ps("@(Get-CimInstance Win32_VideoController|Select-Object Name,DriverVersion)|ConvertTo-Json -Compress");
  let mods = [], gpus = [];
  try { mods = JSON.parse(mr.out); if (!Array.isArray(mods)) mods = [mods]; } catch {}
  try { gpus = JSON.parse(gr.out); if (!Array.isArray(gpus)) gpus = [gpus]; } catch {}
  const rated = Math.max(0, ...mods.map(x => x.Speed || 0)), running = Math.max(0, ...mods.map(x => x.ConfiguredClockSpeed || 0));
  const type = { 24: 'DDR3', 26: 'DDR4', 34: 'DDR5' }[(mods[0] || {}).SMBIOSMemoryType] || '';
  const jedec = { DDR3: 1600, DDR4: 2666, DDR5: 4800 }[type] || 0;
  let xmp = 'unknown';
  if (rated && running) xmp = running < rated * 0.97 ? 'off' : (jedec && rated <= jedec ? 'jedec' : 'on');
  const mem = { count: mods.length, gb: Math.round(mods.reduce((s, x) => s + (x.Capacity || 0), 0) / 2 ** 30), type, rated, running, xmp };
  const dg = gpus.find(g => /rtx|gtx|geforce|radeon rx|radeon pro|\barc\b|quadro|titan/i.test(g.Name || ''));
  const g0 = dg || gpus[0] || {};
  const gpu = { name: g0.Name || '', driver: g0.DriverVersion || '', state: 'none', vendor: '' };
  if (dg) {
    if (/rtx|gtx|geforce|quadro|titan/i.test(dg.Name)) {
      gpu.vendor = 'nvidia';
      let t = await out('nvidia-smi', ['-q', '-d', 'MEMORY']);
      if (!t) t = await out('C:\\Program Files\\NVIDIA Corporation\\NVSMI\\nvidia-smi.exe', ['-q', '-d', 'MEMORY']);
      const b = t.match(/BAR1 Memory Usage[\s\S]*?Total\s*:\s*(\d+)\s*MiB/i);
      gpu.state = b ? (+b[1] > 256 ? 'on' : 'off') : 'unknown';
    } else { gpu.vendor = 'other'; gpu.state = 'unknown'; }
  }
  return { mem, gpu };
});
const BLOAT = [
  { id: 'news', p: ['Microsoft.BingNews'], n: 'Notícias', d: 'App de notícias da Microsoft.' },
  { id: 'weather', p: ['Microsoft.BingWeather'], n: 'Clima', d: 'App de previsão do tempo.' },
  { id: 'officehub', p: ['Microsoft.MicrosoftOfficeHub'], n: 'Microsoft 365 (Office Hub)', d: 'Atalho para o Office com anúncios de assinatura.' },
  { id: 'solitaire', p: ['Microsoft.MicrosoftSolitaireCollection'], n: 'Solitaire Collection', d: 'Jogos de cartas com anúncios.' },
  { id: 'candy', p: ['king.com.*'], n: 'Candy Crush e similares', d: 'Jogos que vêm pré-instalados em alguns PCs.' },
  { id: 'teams', p: ['MicrosoftTeams', 'MSTeams'], n: 'Microsoft Teams (pessoal)', d: 'Versão pessoal do Teams que vem no Windows 11.' },
  { id: 'cortana', p: ['Microsoft.549981C3F5F10'], n: 'Cortana', d: 'Assistente antigo da Microsoft.' },
  { id: 'phone', p: ['Microsoft.YourPhone'], n: 'Vincular ao Celular', d: 'Conecta o PC ao celular (Phone Link).' },
  { id: 'clipchamp', p: ['Clipchamp.Clipchamp'], n: 'Clipchamp', d: 'Editor de vídeo da Microsoft.' },
  { id: 'mr', p: ['Microsoft.MixedReality.Portal'], n: 'Portal de Realidade Mista', d: 'Só serve para headsets de realidade mista.' },
  { id: '3d', p: ['Microsoft.Microsoft3DViewer', 'Microsoft.Print3D'], n: 'Visualizador 3D e Print 3D', d: 'Apps 3D que quase ninguém usa.' },
  { id: 'feedback', p: ['Microsoft.WindowsFeedbackHub'], n: 'Hub de Comentários', d: 'Envia feedback à Microsoft.' },
  { id: 'help', p: ['Microsoft.GetHelp', 'Microsoft.Getstarted'], n: 'Obter Ajuda e Dicas', d: 'Apps de suporte e dicas do Windows.' },
  { id: 'maps', p: ['Microsoft.WindowsMaps'], n: 'Mapas', d: 'App de mapas do Windows.' },
  { id: 'people', p: ['Microsoft.People'], n: 'Pessoas', d: 'Contatos do Windows.' },
  { id: 'skype', p: ['Microsoft.SkypeApp'], n: 'Skype', d: 'Mensageiro antigo da Microsoft.' },
  { id: 'mail', p: ['microsoft.windowscommunicationsapps'], n: 'Email e Calendário', d: 'Remova só se você usa outro programa de email.' },
  { id: 'media', p: ['Microsoft.ZuneMusic', 'Microsoft.ZuneVideo'], n: 'Media Player e Filmes e TV', d: 'Players de mídia da Microsoft.' },
  { id: 'todo', p: ['Microsoft.Todos'], n: 'Microsoft To Do', d: 'App de lista de tarefas.' },
  { id: 'pad', p: ['Microsoft.PowerAutomateDesktop'], n: 'Power Automate', d: 'Automação de tarefas.' },
  { id: 'social', p: ['*Disney*', '*TikTok*', '*Facebook*', '*Instagram*', '*Netflix*', '*AmazonPrimeVideo*', '*LinkedIn*'], n: 'Apps de terceiros (Disney+, TikTok, Netflix...)', d: 'Apps que alguns PCs trazem instalados de fábrica.' },
];
const wild = p => new RegExp('^' + p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$', 'i');
ipcMain.handle('bloat:list', async () => {
  const r = await ps("$ErrorActionPreference='Stop';try{(Get-AppxPackage -AllUsers).Name}catch{(Get-AppxPackage).Name}");
  const names = r.out.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  return BLOAT.filter(b => b.p.some(p => names.some(n => wild(p).test(n)))).map(({ id, n, d }) => ({ id, n, d }));
});
ipcMain.handle('bloat:remove', async (_e, ids) => {
  const res = {};
  for (const id of ids || []) {
    const b = BLOAT.find(x => x.id === id); if (!b) continue;
    let ok = true;
    for (const p of b.p) {
      const q = p.replace(/'/g, "''");
      const r = await ps(`$n='${q}';try{Get-AppxPackage -AllUsers -Name $n -ErrorAction Stop|Remove-AppxPackage -AllUsers -ErrorAction Stop}catch{Get-AppxPackage -Name $n|Remove-AppxPackage -ErrorAction SilentlyContinue};try{Get-AppxProvisionedPackage -Online|Where-Object{$_.DisplayName -like $n}|Remove-AppxProvisionedPackage -Online -ErrorAction SilentlyContinue|Out-Null}catch{};$c=@(try{Get-AppxPackage -AllUsers -Name $n -ErrorAction Stop}catch{Get-AppxPackage -Name $n}).Count;if($c -gt 0){exit 1}`);
      ok = ok && r.ok;
    }
    res[id] = ok;
  }
  return res;
});
ipcMain.handle('link', () => DISCORD && shell.openExternal(DISCORD));

app.whenReady().then(() => {
  app.setAppUserModelId('com.luquinhas.boost');
  const win = new BrowserWindow({ width: 1180, height: 740, minWidth: 960, minHeight: 600, backgroundColor: '#07060b', autoHideMenuBar: true, titleBarStyle: 'hidden', titleBarOverlay: { color: '#07060b', symbolColor: '#c4b5fd', height: 36 }, icon: path.join(__dirname, 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true } });
  win.loadFile('index.html');
});
app.on('window-all-closed', () => app.quit());
