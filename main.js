const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const path = require('path'), fs = require('fs'), os = require('os');
const { exec, execFile } = require('child_process');

const BRAND = 'Luquinhas Boost';
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
  { id: 'power', n: 'Plano de Energia Alto Desempenho', d: 'Mantém a CPU em clock máximo durante as partidas.', c: ['Desempenho', 'Gaming'], star: 1,
    on: ['powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c'], off: ['powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e'] },
  { id: 'gamemode', n: 'Ativar Modo de Jogo', d: 'Prioriza o jogo e reduz interferência do Windows.', c: ['Gaming'], star: 1,
    on: [R('HKCU\\Software\\Microsoft\\GameBar', 'AutoGameModeEnabled', 'REG_DWORD', 1)], off: [R('HKCU\\Software\\Microsoft\\GameBar', 'AutoGameModeEnabled', 'REG_DWORD', 0)] },
  { id: 'dvr', n: 'Desativar Game DVR / Captura', d: 'Desliga a gravação em segundo plano da Xbox Game Bar.', c: ['Gaming', 'Privacidade'], star: 1,
    on: [R('HKCU\\System\\GameConfigStore', 'GameDVR_Enabled', 'REG_DWORD', 0), R(CU + 'GameDVR', 'AppCaptureEnabled', 'REG_DWORD', 0)],
    off: [R('HKCU\\System\\GameConfigStore', 'GameDVR_Enabled', 'REG_DWORD', 1), R(CU + 'GameDVR', 'AppCaptureEnabled', 'REG_DWORD', 1)] },
  { id: 'mouse', n: 'Desativar Aceleração do Mouse', d: 'Mira consistente. Vale após reiniciar a sessão do Windows.', c: ['Gaming'], star: 1,
    on: [R(MS, 'MouseSpeed', 'REG_SZ', 0), R(MS, 'MouseThreshold1', 'REG_SZ', 0), R(MS, 'MouseThreshold2', 'REG_SZ', 0)],
    off: [R(MS, 'MouseSpeed', 'REG_SZ', 1), R(MS, 'MouseThreshold1', 'REG_SZ', 6), R(MS, 'MouseThreshold2', 'REG_SZ', 10)] },
  { id: 'sticky', n: 'Bloquear Pop-ups de Teclas de Aderência', d: 'Chega de janela do Shift atrapalhando no meio do round.', c: ['Gaming'], star: 1,
    on: [R(AC + 'StickyKeys', 'Flags', 'REG_SZ', 506), R(AC + 'Keyboard Response', 'Flags', 'REG_SZ', 122), R(AC + 'ToggleKeys', 'Flags', 'REG_SZ', 58)],
    off: [R(AC + 'StickyKeys', 'Flags', 'REG_SZ', 510), R(AC + 'Keyboard Response', 'Flags', 'REG_SZ', 126), R(AC + 'ToggleKeys', 'Flags', 'REG_SZ', 62)] },
  { id: 'priority', n: 'Prioridade Alta para o CS2', d: 'O Windows sempre abre o cs2.exe com prioridade alta.', c: ['Gaming', 'Desempenho'], star: 1,
    on: [R(IFEO, 'CpuPriorityClass', 'REG_DWORD', 3)], off: [D(IFEO)] },
  { id: 'hags', n: 'Agendamento de GPU por Hardware', d: 'Reduz latência em GPUs compatíveis. Reinicie o PC.', c: ['GPU', 'Gaming'],
    on: [R('HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers', 'HwSchMode', 'REG_DWORD', 2)], off: [R('HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers', 'HwSchMode', 'REG_DWORD', 1)] },
  { id: 'bgapps', n: 'Bloquear Apps em Segundo Plano', d: 'Libera CPU e RAM impedindo apps de rodarem escondidos.', c: ['Desempenho'],
    on: [R(CU + 'BackgroundAccessApplications', 'GlobalUserDisabled', 'REG_DWORD', 1)], off: [R(CU + 'BackgroundAccessApplications', 'GlobalUserDisabled', 'REG_DWORD', 0)] },
  { id: 'hibernate', n: 'Desativar Hibernação', d: 'Remove o arquivo de hibernação e libera espaço no disco.', c: ['Desempenho'],
    on: ['powercfg /h off'], off: ['powercfg /h on'] },
  { id: 'transp', n: 'Desativar Transparências', d: 'Interface do Windows mais leve.', c: ['Aparência', 'Desempenho'],
    on: [R(CU + 'Themes\\Personalize', 'EnableTransparency', 'REG_DWORD', 0)], off: [R(CU + 'Themes\\Personalize', 'EnableTransparency', 'REG_DWORD', 1)] },
  { id: 'taskbar', n: 'Barra de Tarefas à Esquerda', d: 'Alinha os ícones à esquerda (Windows 11).', c: ['Geral', 'Aparência'],
    on: [R(CU + 'Explorer\\Advanced', 'TaskbarAl', 'REG_DWORD', 0)], off: [R(CU + 'Explorer\\Advanced', 'TaskbarAl', 'REG_DWORD', 1)] },
  { id: 'telemetry', n: 'Reduzir Telemetria', d: 'Limita o envio de dados de diagnóstico à Microsoft.', c: ['Privacidade'],
    on: [R(DC, 'AllowTelemetry', 'REG_DWORD', 0)], off: [D(DC, 'AllowTelemetry')] },
  { id: 'adid', n: 'Desativar ID de Publicidade', d: 'Impede anúncios personalizados baseados no seu uso.', c: ['Privacidade'],
    on: [R(CU + 'AdvertisingInfo', 'Enabled', 'REG_DWORD', 0)], off: [R(CU + 'AdvertisingInfo', 'Enabled', 'REG_DWORD', 1)] },
  { id: 'copilot', n: 'Desativar Copilot', d: 'Remove o recurso Copilot da Microsoft.', c: ['Privacidade', 'Geral'],
    on: [R(CP, 'TurnOffWindowsCopilotFeature', 'REG_DWORD', 1)], off: [D(CP, 'TurnOffWindowsCopilotFeature')] },
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
  brand: BRAND, discord: !!DISCORD,
  tweaks: T.map(({ id, n, d, c, star }) => ({ id, n, d, c, star })),
  applied: load().applied || [], lastClean: load().lastClean || null,
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
ipcMain.handle('link', () => DISCORD && shell.openExternal(DISCORD));

app.whenReady().then(() => {
  app.setAppUserModelId('com.luquinhas.boost');
  const win = new BrowserWindow({ width: 1180, height: 740, minWidth: 960, minHeight: 600, backgroundColor: '#07060b', autoHideMenuBar: true, icon: path.join(__dirname, 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true } });
  win.loadFile('index.html');
});
app.on('window-all-closed', () => app.quit());
