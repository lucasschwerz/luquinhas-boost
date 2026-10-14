const { app, BrowserWindow, ipcMain, shell, dialog, clipboard } = require('electron');
const path = require('path'), fs = require('fs'), os = require('os');
const { exec, execFile, spawn } = require('child_process');

const BRAND = 'Luquinhas Boost';
const GITHUB_REPO = 'lucasschwerz/luquinhas-boost'; // usuario/repositorio do GitHub (aviso de atualizacao)
const DISCORD = ''; // cole aqui o link do seu servidor (ex: https://discord.gg/xxxx)

const run = c => new Promise(r => exec(c, { shell: 'cmd.exe', windowsHide: true }, e => r(!e)));
const ps = c => new Promise(r => execFile('powershell', ['-NoProfile', '-Command', c], { windowsHide: true, maxBuffer: 1 << 26 },
  (e, o, se) => r({ ok: !e, out: (o || '').trim(), err: ((se || '') + '').trim().split(/\r?\n/)[0].slice(0, 200) })));

const runx = c => new Promise(r => exec(c, { shell: 'cmd.exe', windowsHide: true, maxBuffer: 1 << 22 }, (e, so, se) => r({ ok: !e, err: e ? ((se || so || e.message || '') + '').trim().split(/\r?\n/)[0].slice(0, 200) : '' })));
const logPath = () => path.join(app.getPath('userData'), 'log.txt');
const log = msg => { try { fs.appendFileSync(logPath(), new Date().toISOString() + ' ' + msg + '\n'); } catch {} };
const out = (c, a) => new Promise(r => execFile(c, a, { windowsHide: true, maxBuffer: 1 << 24 }, (e, o) => r(e ? '' : String(o))));
const regGet = (k, v) => new Promise(r => execFile('reg', ['query', k, '/v', v], { windowsHide: true }, (e, o) => {
  if (e) return r(null);
  const x = String(o).match(/REG_(\w+)\s+(.*?)\s*$/m); if (!x) return r(null);
  r(x[1] === 'DWORD' ? parseInt(x[2], 16) : x[2].trim());
}));
const regHas = k => new Promise(r => execFile('reg', ['query', k], { windowsHide: true }, e => r(!e)));
const cfgPath = () => path.join(app.getPath('userData'), 'cfg.json');
const load = () => { try { return JSON.parse(fs.readFileSync(cfgPath(), 'utf8')); } catch { return {}; } };
const save = c => { try { fs.writeFileSync(cfgPath(), JSON.stringify(c)); } catch {} };

const tick = () => new Promise(r => setImmediate(r));
async function wipe(dir, filter = () => true) {
  let l; try { l = await fs.promises.readdir(dir); } catch { return true; }
  let n = 0;
  for (const f of l) {
    if (!filter(f)) continue;
    try { await fs.promises.rm(path.join(dir, f), { recursive: true, force: true }); } catch {}
    if (++n % 25 === 0) await tick();
  }
  return true;
}
const clean = {
  temp: async () => (await wipe(os.tmpdir()), await wipe('C:\\Windows\\Temp')),
  prefetch: async () => wipe('C:\\Windows\\Prefetch'),
  bin: async () => (await ps('Clear-RecycleBin -Force -ErrorAction SilentlyContinue')).ok,
  wu: async () => { await run('net stop wuauserv'); await wipe('C:\\Windows\\SoftwareDistribution\\Download'); return run('net start wuauserv'); },
  thumbs: async () => wipe(path.join(process.env.LOCALAPPDATA || '', 'Microsoft\\Windows\\Explorer'), f => /^thumbcache_.*\.db$/i.test(f)),
};

const R = (k, v, t, d) => `reg add "${k}" /v "${v}" /t ${t} /d ${d} /f`;
const D = (k, v) => `reg delete "${k}" ${v ? '/v "' + v + '" ' : ''}/f & exit 0`;
const CU = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\';
const IFEO = 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\cs2.exe\\PerfOptions';
const MS = 'HKCU\\Control Panel\\Mouse', AC = 'HKCU\\Control Panel\\Accessibility\\';
const DC = 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection';
const CP = 'HKCU\\Software\\Policies\\Microsoft\\Windows\\WindowsCopilot';

const GB = 'HKCU\\Software\\Microsoft\\GameBar', GCS = 'HKCU\\System\\GameConfigStore', GDVR = CU + 'GameDVR';
const EXA = CU + 'Explorer\\Advanced', VFX = CU + 'Explorer\\VisualEffects', CDM = CU + 'ContentDeliveryManager';
const SYSP = 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile', GAMES = SYSP + '\\Tasks\\Games';
const GD = 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers';
const DGKEY = 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity';
const DOK = 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DeliveryOptimization', CC = 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent', OD = 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\OneDrive';
const UGP = 'HKCU\\Software\\Microsoft\\DirectX\\UserGpuPreferences', CTX = 'HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}';
const APPD = process.env.APPDATA || '', LAD = process.env.LOCALAPPDATA || '';
const win11 = c => c.build >= 22000 ? null : 'Disponível só no Windows 11.';
const psr = async (c, bad) => { const r = await ps(c); return { ok: r.ok, err: r.ok ? '' : (bad || r.err || 'Falhou') }; };
const steamPath = async () => { const p = await regGet('HKCU\\Software\\Valve\\Steam', 'SteamPath'); return p ? String(p).replace(/\//g, '\\') : null; };
const discordCfg = () => path.join(APPD, 'discord', 'settings.json');
const setDiscordHW = v => { try { const f = discordCfg(); let j = {}; try { j = JSON.parse(fs.readFileSync(f, 'utf8')); } catch {} j.enableHardwareAcceleration = v; fs.writeFileSync(f, JSON.stringify(j, null, 2)); return { ok: true }; } catch { return { ok: false, err: 'Não consegui editar o settings.json do Discord.' }; } };

const T = [
  { id: 'power', fps: 1, star: 1, n: 'Plano de Energia Alto Desempenho', d: 'Mantém a CPU em clock máximo durante as partidas.', c: ['Desempenho', 'Gaming'],
    chkFn: async () => /8c5e7fda/i.test(await out('powercfg', ['/getactivescheme'])),
    on: ['powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c'], off: ['powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e'] },
  { id: 'gamemode', fps: 1, star: 1, n: 'Ativar Modo de Jogo', d: 'Prioriza o jogo e reduz interferência do Windows.', c: ['Gaming'], chk: [[GB, 'AutoGameModeEnabled', 1]],
    on: [R(GB, 'AutoGameModeEnabled', 'REG_DWORD', 1)], off: [R(GB, 'AutoGameModeEnabled', 'REG_DWORD', 0)] },
  { id: 'dvr', fps: 1, star: 1, n: 'Desativar Game DVR / Captura', d: 'Desliga a gravação em segundo plano da Xbox Game Bar.', c: ['Gaming', 'Privacidade'], chk: [[GCS, 'GameDVR_Enabled', 0], [GDVR, 'AppCaptureEnabled', 0]],
    on: [R(GCS, 'GameDVR_Enabled', 'REG_DWORD', 0), R(GDVR, 'AppCaptureEnabled', 'REG_DWORD', 0)], off: [R(GCS, 'GameDVR_Enabled', 'REG_DWORD', 1), R(GDVR, 'AppCaptureEnabled', 'REG_DWORD', 1)] },
  { id: 'mouse', star: 1, n: 'Desativar Aceleração do Mouse', d: 'Mira consistente. Vale após reiniciar a sessão do Windows.', c: ['Gaming'], chk: [[MS, 'MouseSpeed', '0'], [MS, 'MouseThreshold1', '0'], [MS, 'MouseThreshold2', '0']],
    on: [R(MS, 'MouseSpeed', 'REG_SZ', 0), R(MS, 'MouseThreshold1', 'REG_SZ', 0), R(MS, 'MouseThreshold2', 'REG_SZ', 0)],
    off: [R(MS, 'MouseSpeed', 'REG_SZ', 1), R(MS, 'MouseThreshold1', 'REG_SZ', 6), R(MS, 'MouseThreshold2', 'REG_SZ', 10)] },
  { id: 'sticky', star: 1, n: 'Bloquear Pop-ups de Teclas de Aderência', d: 'Chega de janela do Shift atrapalhando no meio do round.', c: ['Gaming'], chk: [[AC + 'StickyKeys', 'Flags', '506']],
    on: [R(AC + 'StickyKeys', 'Flags', 'REG_SZ', 506), R(AC + 'Keyboard Response', 'Flags', 'REG_SZ', 122), R(AC + 'ToggleKeys', 'Flags', 'REG_SZ', 58)],
    off: [R(AC + 'StickyKeys', 'Flags', 'REG_SZ', 510), R(AC + 'Keyboard Response', 'Flags', 'REG_SZ', 126), R(AC + 'ToggleKeys', 'Flags', 'REG_SZ', 62)] },
  { id: 'hags', fps: 1, admin: 1, reboot: 1, n: 'Ativar Agendamento de GPU por Hardware (HAGS)', d: 'Deixa a GPU gerenciar a própria memória de vídeo. Exige reinício.', c: ['Gaming', 'Desempenho'],
    warn: 'Em alguns drivers pode causar instabilidade; se acontecer, desligue.', chk: [[GD, 'HwSchMode', 2]],
    compat: async () => (await regGet(GD, 'HwSchMode')) === null ? 'Sua GPU/driver não expõe o HAGS neste PC.' : null,
    on: [R(GD, 'HwSchMode', 'REG_DWORD', 2)], off: [R(GD, 'HwSchMode', 'REG_DWORD', 1)] },
  { id: 'winmode', fps: 1, n: 'Otimizar Jogos em Janela e Sem Bordas', d: 'Ativa as otimizações do Windows 11 para jogos em janela (22H2 ou mais novo).', c: ['Gaming'],
    compat: c => c.build >= 22621 ? null : 'Exige Windows 11 22H2 ou mais novo.',
    chkFn: async () => /SwapEffectUpgradeEnable=1/.test(String(await regGet(UGP, 'DirectXUserGlobalSettings') || '')),
    on: [R(UGP, 'DirectXUserGlobalSettings', 'REG_SZ', '"SwapEffectUpgradeEnable=1;"')], off: [R(UGP, 'DirectXUserGlobalSettings', 'REG_SZ', '"SwapEffectUpgradeEnable=0;"')] },
  { id: 'gamesgen', fps: 1, star: 1, admin: 1, n: 'Otimizações Gerais para Jogos (prioridade multimídia)', d: 'Dá prioridade de CPU/GPU às tarefas de jogo no agendador multimídia do Windows.', c: ['Gaming', 'Desempenho'],
    warn: 'Ganho pequeno; aumenta um pouco a prioridade dos jogos sobre programas em segundo plano.', chk: [[SYSP, 'SystemResponsiveness', 0], [GAMES, 'Priority', 6]],
    on: [R(SYSP, 'SystemResponsiveness', 'REG_DWORD', 0), R(GAMES, 'GPU Priority', 'REG_DWORD', 8), R(GAMES, 'Priority', 'REG_DWORD', 6), R(GAMES, 'Scheduling Category', 'REG_SZ', 'High'), R(GAMES, 'SFIO Priority', 'REG_SZ', 'High')],
    off: [R(SYSP, 'SystemResponsiveness', 'REG_DWORD', 20), R(GAMES, 'GPU Priority', 'REG_DWORD', 8), R(GAMES, 'Priority', 'REG_DWORD', 2), R(GAMES, 'Scheduling Category', 'REG_SZ', 'Medium'), R(GAMES, 'SFIO Priority', 'REG_SZ', 'Normal')] },
  { id: 'bgapps', fps: 1, n: 'Bloquear Apps em Segundo Plano', d: 'Libera CPU e RAM impedindo apps de rodarem escondidos.', c: ['Desempenho'], chk: [[CU + 'BackgroundAccessApplications', 'GlobalUserDisabled', 1]],
    on: [R(CU + 'BackgroundAccessApplications', 'GlobalUserDisabled', 'REG_DWORD', 1)], off: [R(CU + 'BackgroundAccessApplications', 'GlobalUserDisabled', 'REG_DWORD', 0)] },
  { id: 'visualfx', fps: 1, n: 'Desativar Animações e Efeitos Visuais', d: 'Desliga animações, sombras e efeitos do Windows. Reinicie a sessão para valer tudo.', c: ['Desempenho', 'Aparência'], chk: [[VFX, 'VisualFXSetting', 2], [EXA, 'TaskbarAnimations', 0]],
    on: [R(VFX, 'VisualFXSetting', 'REG_DWORD', 2), R('HKCU\\Control Panel\\Desktop\\WindowMetrics', 'MinAnimate', 'REG_SZ', 0), R(EXA, 'TaskbarAnimations', 'REG_DWORD', 0), R(EXA, 'ListviewAlphaSelect', 'REG_DWORD', 0), R(EXA, 'ListviewShadow', 'REG_DWORD', 0), R('HKCU\\Software\\Microsoft\\Windows\\DWM', 'EnableAeroPeek', 'REG_DWORD', 0)],
    off: [R(VFX, 'VisualFXSetting', 'REG_DWORD', 0), R('HKCU\\Control Panel\\Desktop\\WindowMetrics', 'MinAnimate', 'REG_SZ', 1), R(EXA, 'TaskbarAnimations', 'REG_DWORD', 1), R(EXA, 'ListviewAlphaSelect', 'REG_DWORD', 1), R(EXA, 'ListviewShadow', 'REG_DWORD', 1), R('HKCU\\Software\\Microsoft\\Windows\\DWM', 'EnableAeroPeek', 'REG_DWORD', 1)] },
  { id: 'transp', fps: 1, n: 'Desativar Transparências', d: 'Interface do Windows mais leve.', c: ['Aparência', 'Desempenho'], chk: [[CU + 'Themes\\Personalize', 'EnableTransparency', 0]],
    on: [R(CU + 'Themes\\Personalize', 'EnableTransparency', 'REG_DWORD', 0)], off: [R(CU + 'Themes\\Personalize', 'EnableTransparency', 'REG_DWORD', 1)] },
  { id: 'network', admin: 1, n: 'Otimizações de Rede', d: 'Remove o limite de rede do agendador multimídia, desliga o envio de atualizações para outros PCs (Delivery Optimization) e limpa o cache de DNS.', c: ['Geral', 'Desempenho'],
    chk: [[SYSP, 'NetworkThrottlingIndex', 4294967295], [DOK, 'DODownloadMode', 0]],
    on: [R(SYSP, 'NetworkThrottlingIndex', 'REG_DWORD', 4294967295), R(DOK, 'DODownloadMode', 'REG_DWORD', 0), 'ipconfig /flushdns'], off: [R(SYSP, 'NetworkThrottlingIndex', 'REG_DWORD', 10), D(DOK, 'DODownloadMode')] },
  { id: 'ntfs', admin: 1, n: 'Otimizar NTFS', d: 'Desativa o registro de "último acesso" dos arquivos, o que reduz escritas no disco.', c: ['Geral', 'Desempenho'],
    chkFn: async () => { const m = (await out('fsutil', ['behavior', 'query', 'disablelastaccess'])).match(/=\s*(\d)/); return m ? (m[1] === '1' || m[1] === '3') : null; },
    on: ['fsutil behavior set disablelastaccess 1'], off: ['fsutil behavior set disablelastaccess 2'] },
  { id: 'services', fps: 1, admin: 1, n: 'Desligar Serviços Pouco Usados', d: 'Desativa Fax, Registro Remoto, Mapas, Modo Demonstração, Relatório de Erros e telemetria (DiagTrack).', c: ['Desempenho', 'Privacidade'],
    warn: 'Relatório de Erros desligado deixa de enviar/guardar relatórios de falha.',
    chkFn: async () => /DISABLED/i.test(await out('sc', ['qc', 'DiagTrack'])),
    on: ['sc config DiagTrack start= disabled', 'sc stop DiagTrack & exit 0', 'sc config Fax start= disabled & exit 0', 'sc config RemoteRegistry start= disabled & exit 0', 'sc config MapsBroker start= disabled & exit 0', 'sc config RetailDemo start= disabled & exit 0', 'sc config dmwappushservice start= disabled & exit 0', 'sc config WerSvc start= disabled & exit 0'],
    off: ['sc config DiagTrack start= auto', 'sc config Fax start= demand & exit 0', 'sc config RemoteRegistry start= disabled & exit 0', 'sc config MapsBroker start= delayed-auto & exit 0', 'sc config RetailDemo start= demand & exit 0', 'sc config dmwappushservice start= demand & exit 0', 'sc config WerSvc start= demand & exit 0'] },
  { id: 'privacy', admin: 1, n: 'Privacidade (telemetria, anúncios e Copilot)', d: 'Reduz a telemetria, desliga o ID de publicidade e desativa o Copilot.', c: ['Privacidade'],
    chk: [[DC, 'AllowTelemetry', 0], [CU + 'AdvertisingInfo', 'Enabled', 0], [CP, 'TurnOffWindowsCopilotFeature', 1]],
    on: [R(DC, 'AllowTelemetry', 'REG_DWORD', 0), R(CU + 'AdvertisingInfo', 'Enabled', 'REG_DWORD', 0), R(CP, 'TurnOffWindowsCopilotFeature', 'REG_DWORD', 1)],
    off: [D(DC, 'AllowTelemetry'), R(CU + 'AdvertisingInfo', 'Enabled', 'REG_DWORD', 1), D(CP, 'TurnOffWindowsCopilotFeature')] },
  { id: 'ads', admin: 1, n: 'Anúncios e Bloatware (bloqueia reinstalação)', d: 'Desliga anúncios e sugestões do Windows e impede que apps promovidos voltem a se instalar. Para remover os apps já instalados, use Apps → Bloatware.', c: ['Geral', 'Privacidade'],
    chk: [[CDM, 'SystemPaneSuggestionsEnabled', 0], [CC, 'DisableWindowsConsumerFeatures', 1]],
    on: ['SystemPaneSuggestionsEnabled', 'SubscribedContent-338388Enabled', 'SubscribedContent-338389Enabled', 'SubscribedContent-353694Enabled', 'SubscribedContent-353696Enabled', 'SoftLandingEnabled', 'RotatingLockScreenOverlayEnabled'].map(v => R(CDM, v, 'REG_DWORD', 0)).concat([R(CC, 'DisableWindowsConsumerFeatures', 'REG_DWORD', 1)]),
    off: ['SystemPaneSuggestionsEnabled', 'SubscribedContent-338388Enabled', 'SubscribedContent-338389Enabled', 'SubscribedContent-353694Enabled', 'SubscribedContent-353696Enabled', 'SoftLandingEnabled', 'RotatingLockScreenOverlayEnabled'].map(v => R(CDM, v, 'REG_DWORD', 1)).concat([D(CC, 'DisableWindowsConsumerFeatures')]) },
  { id: 'showfiles', n: 'Mostrar Arquivos Ocultos e Extensões', d: 'Exibe arquivos ocultos e as extensões (.exe, .cfg...). Abra as janelas de novo para valer.', c: ['Aparência'], chk: [[EXA, 'Hidden', 1], [EXA, 'HideFileExt', 0]],
    on: [R(EXA, 'Hidden', 'REG_DWORD', 1), R(EXA, 'HideFileExt', 'REG_DWORD', 0)], off: [R(EXA, 'Hidden', 'REG_DWORD', 2), R(EXA, 'HideFileExt', 'REG_DWORD', 1)] },
  { id: 'ctxmenu', n: 'Menu de Contexto Clássico (Windows 11)', d: 'Volta o menu do botão direito completo. Reinicia o Explorador de Arquivos (a barra pisca).', c: ['Aparência'], compat: win11,
    chkFn: () => regHas(CTX + '\\InprocServer32'),
    on: ['reg add "' + CTX + '\\InprocServer32" /ve /d "" /f', 'taskkill /f /im explorer.exe & start explorer.exe & exit 0'], off: ['reg delete "' + CTX + '" /f', 'taskkill /f /im explorer.exe & start explorer.exe & exit 0'] },
  { id: 'taskbar', n: 'Barra de Tarefas à Esquerda', d: 'Alinha os ícones à esquerda (Windows 11).', c: ['Geral', 'Aparência'], compat: win11, chk: [[EXA, 'TaskbarAl', 0]],
    on: [R(EXA, 'TaskbarAl', 'REG_DWORD', 0)], off: [R(EXA, 'TaskbarAl', 'REG_DWORD', 1)] },
  { id: 'hibernate', admin: 1, n: 'Desativar Hibernação', d: 'Remove o arquivo de hibernação e libera espaço no disco.', c: ['Desempenho'], chk: [['HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power', 'HibernateEnabled', 0]],
    on: ['powercfg /h off'], off: ['powercfg /h on'] },
  { id: 'steam', danger: 'Fecha a Steam se estiver aberta (downloads em andamento são interrompidos), apaga o cache da interface e da biblioteca e tira a Steam da inicialização do Windows. Você pode precisar entrar de novo na conta. O cache é recriado sozinho.', n: 'Otimizar Steam (biblioteca e interface)', d: 'Limpa o cache da interface/biblioteca e remove a Steam da inicialização.', c: ['Geral', 'Crítico'],
    compat: async () => (await steamPath()) ? null : 'Steam não encontrada neste PC.',
    chkFn: async () => (await regGet(CU + 'Run', 'Steam')) === null,
    on: ['taskkill /f /im steam.exe & exit 0', 'taskkill /f /im steamwebhelper.exe & exit 0',
      async () => { for (const d of ['Steam\\htmlcache', 'Steam\\appcache\\httpcache']) await wipe(path.join(LAD, d)); const s = await steamPath(); if (s) await wipe(path.join(s, 'appcache', 'httpcache')); return { ok: true }; }, D(CU + 'Run', 'Steam')],
    off: [async () => { const s = await steamPath(); if (!s) return { ok: false, err: 'Steam não encontrada.' }; return runx(`reg add "${CU}Run" /v Steam /t REG_SZ /d "\\"${s}\\steam.exe\\" -silent" /f`); }] },
  { id: 'discord', danger: 'Fecha o Discord se estiver aberto, desliga a aceleração de hardware dele, apaga o cache e tira o Discord da inicialização. Chamadas de vídeo e transmissão de tela podem ficar mais pesadas sem a aceleração. Você pode desfazer a aceleração desligando o ajuste.', n: 'Otimizar Discord', d: 'Desliga a aceleração de hardware, limpa o cache e tira da inicialização.', c: ['Geral', 'Crítico'],
    compat: () => fs.existsSync(path.join(APPD, 'discord')) ? null : 'Discord não encontrado neste PC.',
    chkFn: async () => { try { return JSON.parse(fs.readFileSync(discordCfg(), 'utf8')).enableHardwareAcceleration === false; } catch { return false; } },
    on: ['taskkill /f /im Discord.exe & exit 0', async () => { const r = setDiscordHW(false); for (const d of ['Cache', 'Code Cache', 'GPUCache']) await wipe(path.join(APPD, 'discord', d)); return r; }, D(CU + 'Run', 'Discord')],
    off: [async () => setDiscordHW(true)] },
  { id: 'onedrive', admin: 1, danger: 'Remove o OneDrive deste Windows. Arquivos que só existem na nuvem, ou pastas (Área de Trabalho, Documentos, Imagens) com backup do OneDrive ligado, podem ficar inacessíveis até você reinstalar. Desligue o backup e confirme que seus arquivos estão no PC antes de continuar.', n: 'Remover OneDrive por Completo', d: 'Desinstala o OneDrive e bloqueia a sincronização. Para desfazer, reinstala pelo winget.', c: ['Geral', 'Crítico'],
    chkFn: async () => !fs.existsSync(path.join(LAD, 'Microsoft', 'OneDrive', 'OneDrive.exe')) && !fs.existsSync('C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe'),
    on: ['taskkill /f /im OneDrive.exe & exit 0', 'if exist "%SystemRoot%\\SysWOW64\\OneDriveSetup.exe" ("%SystemRoot%\\SysWOW64\\OneDriveSetup.exe" /uninstall) else ("%SystemRoot%\\System32\\OneDriveSetup.exe" /uninstall)', R(OD, 'DisableFileSyncNGSC', 'REG_DWORD', 1)],
    off: [D(OD, 'DisableFileSyncNGSC'), 'winget install -e --id Microsoft.OneDrive --silent --accept-package-agreements --accept-source-agreements'] },
  { id: 'defender', admin: 1, danger: 'Deixa o PC sem proteção em tempo real contra vírus e malware. O Windows pode religar sozinho depois de um tempo ou ao reiniciar, e o comando não funciona se a Proteção contra Adulteração estiver ativa. Só faça em um PC usado apenas para jogar e tenha cuidado com o que baixa.', n: 'Desativar Proteção em Tempo Real do Defender', d: 'Desliga o monitoramento em tempo real do Microsoft Defender.', c: ['Gaming', 'Crítico'],
    chkFn: async () => { const o = (await ps('(Get-MpComputerStatus).RealTimeProtectionEnabled')).out; return o === 'False' ? true : o === 'True' ? false : null; },
    on: [async () => { await ps('Set-MpPreference -DisableRealtimeMonitoring $true'); const o = (await ps('(Get-MpPreference).DisableRealtimeMonitoring')).out; return o === 'True' ? { ok: true } : { ok: false, err: 'O Windows bloqueou (Proteção contra Adulteração ativa?).' }; }],
    off: [async () => psr('Set-MpPreference -DisableRealtimeMonitoring $false')] },
  { id: 'pagefile', admin: 1, reboot: 1, danger: 'Sem arquivo de paginação, jogos e programas podem fechar sozinhos (erro de memória) se a RAM acabar, alguns programas se recusam a abrir e os relatórios de falha ficam indisponíveis. Exige reinício. Só é razoável com 16 GB de RAM ou mais.', n: 'Desativar Memória Virtual (paginação)', d: 'Remove o arquivo de paginação (pagefile.sys). Exige reinício.', c: ['Desempenho', 'Crítico'],
    compat: c => c.ram >= 15.5 ? null : 'Bloqueado: menos de 16 GB de RAM.',
    chkFn: async () => (await ps('$cs=Get-CimInstance Win32_ComputerSystem;$n=@(Get-CimInstance Win32_PageFileSetting).Count;if(-not $cs.AutomaticManagedPagefile -and $n -eq 0){"1"}else{"0"}')).out === '1',
    on: [() => psr('$cs=Get-CimInstance Win32_ComputerSystem;if($cs.AutomaticManagedPagefile){Set-CimInstance -InputObject $cs -Property @{AutomaticManagedPagefile=$false}};Get-CimInstance Win32_PageFileSetting|Remove-CimInstance')],
    off: [() => psr('$cs=Get-CimInstance Win32_ComputerSystem;Set-CimInstance -InputObject $cs -Property @{AutomaticManagedPagefile=$true}')] },
  { id: 'memint', admin: 1, reboot: 1, danger: 'Desliga a Integridade da Memória (Isolamento de Núcleo), uma proteção do Windows contra drivers e malware que atacam o kernel. Alguns anti-cheats e recursos de segurança podem exigir que ela esteja ligada. O ganho de FPS costuma ser pequeno e varia por PC. Exige reinício.', n: 'Desativar Integridade da Memória (Isolamento de Núcleo)', d: 'Desliga a proteção HVCI do Windows. Exige reinício.', c: ['Desempenho', 'Crítico'],
    chkFn: async () => { const v = await regGet(DGKEY, 'Enabled'); return v === null ? null : v === 0; },
    on: [R(DGKEY, 'Enabled', 'REG_DWORD', 0)], off: [R(DGKEY, 'Enabled', 'REG_DWORD', 1)] },
];

let restoreMade = false, sysCache;
async function sys() {
  if (sysCache) return sysCache;
  const r = await ps("$d=Get-CimInstance Win32_DiskDrive|select -First 1;$o=Get-CimInstance Win32_OperatingSystem;$cp=Get-CimInstance Win32_Processor|select -First 1;$v=0;Get-ChildItem 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11cd-bfc1-08002be10318}' -ErrorAction SilentlyContinue|ForEach-Object{$m=(Get-ItemProperty $_.PSPath -ErrorAction SilentlyContinue).'HardwareInformation.qwMemorySize';if($m -is [byte[]]){$m=[BitConverter]::ToInt64($m,0)};if($m -gt $v){$v=$m}};$pd=Get-PhysicalDisk -ErrorAction SilentlyContinue|select -First 1;$dt=if($pd.BusType -eq 'NVMe'){'NVMe'}else{[string]$pd.MediaType};$dv=(Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion').DisplayVersion;@{pcores=$cp.NumberOfCores;vram=[math]::Round($v/1GB);dtype=$dt;dver=$dv;gpu=(Get-CimInstance Win32_VideoController|select -First 1).Name;disk=$d.Model;size=[math]::Round($d.Size/1GB);os=$o.Caption;ver=$o.Version;rams=@(Get-CimInstance Win32_PhysicalMemory|Select-Object SMBIOSMemoryType,Speed,ConfiguredClockSpeed)}|ConvertTo-Json -Depth 3 -Compress");
  let j = {}; try { j = JSON.parse(r.out); } catch {}
  const rs = [].concat(j.rams || []), TY = { 24: 'DDR3', 26: 'DDR4', 29: 'LPDDR3', 30: 'LPDDR4', 34: 'DDR5', 35: 'LPDDR5' };
  const rated = Math.max(0, ...rs.map(x => x.Speed || 0)), run = Math.max(0, ...rs.map(x => x.ConfiguredClockSpeed || 0)) || rated;
  delete j.rams;
  return (sysCache = { cpu: os.cpus()[0].model.trim(), cores: os.cpus().length, ram: (os.totalmem() / 2 ** 30).toFixed(1), memType: TY[(rs[0] || {}).SMBIOSMemoryType] || '', memMHz: run, memRated: rated, memMods: rs.length, ...j });
}
async function stateOf(t) {
  try {
    if (t.chkFn) return await t.chkFn();
    if (t.chk) { for (const [k, v, e] of t.chk) if (String(await regGet(k, v)) !== String(e)) return false; return true; }
  } catch {}
  return null;
}
async function apply(ids, enable) {
  const cfg = load(), ap = new Set(cfg.applied || []), r = {}, e = {}, s = {};
  if (enable && !restoreMade) { await ps(`Checkpoint-Computer -Description '${BRAND} backup' -RestorePointType MODIFY_SETTINGS`); restoreMade = true; }
  for (const id of ids) {
    const t = T.find(x => x.id === id); if (!t) continue;
    let ok = true, msg = '';
    for (const c of enable ? t.on : t.off) { let x; try { x = typeof c === 'function' ? await c() : await runx(c); } catch (er) { x = { ok: false, err: String(er.message || er) }; } if (!x.ok) { ok = false; msg = msg || x.err; } }
    r[id] = ok; s[id] = await stateOf(t);
    if (ok) enable ? ap.add(id) : ap.delete(id); else { e[id] = msg || 'Falhou (veja o log).'; log(`${id} ${enable ? 'aplicar' : 'reverter'} FALHOU: ${msg}`); }
  }
  cfg.applied = [...ap]; save(cfg); return { r, e, s };
}
ipcMain.handle('tweaks:state', async () => {
  const ctx = { build: parseInt(os.release().split('.')[2]) || 0, ram: os.totalmem() / 2 ** 30 }, st = {}, cp = {};
  await Promise.all(T.map(async t => { st[t.id] = await stateOf(t); try { cp[t.id] = t.compat ? await t.compat(ctx) : null; } catch { cp[t.id] = null; } }));
  return { st, cp };
});

ipcMain.handle('init', async () => ({
  brand: BRAND, discord: !!DISCORD, user: os.userInfo().username, ver: app.getVersion(),
  tweaks: T.map(({ id, n, d, c, star, fps, danger, admin, reboot, warn }) => ({ id, n, d, c, star, fps, danger, admin, reboot, warn })),
  applied: (load().applied || []).filter(id => T.some(t => t.id === id)), lastClean: load().lastClean || null,
  admin: await run('net session >nul 2>&1'), alwaysAdmin: !!load().alwaysAdmin, up: os.uptime(), sys: await sys(),
}));
ipcMain.handle('tweaks', (_e, ids, en) => apply(ids, en));
async function walk(p, st) {
  let s; try { s = await fs.promises.lstat(p); } catch { return; }
  if (s.isDirectory()) {
    let l; try { l = await fs.promises.readdir(p); } catch { return; }
    for (const f of l) { if (st.n++ > 200000) return; if (st.n % 200 === 0) await tick(); await walk(path.join(p, f), st); }
  } else { st.size += s.size; st.count++; }
}
async function dirStat(dirs, filter = () => true) {
  const st = { size: 0, count: 0, n: 0 };
  for (const d of dirs) { let l; try { l = await fs.promises.readdir(d); } catch { continue; } for (const f of l) if (filter(f)) await walk(path.join(d, f), st); }
  return { size: st.size, count: st.count };
}
// tamanho e quantidade de arquivos de cada item da limpeza (so leitura, nada e apagado)
ipcMain.handle('clean:scan', async () => {
  const o = {};
  o.temp = await dirStat([os.tmpdir(), 'C:\\Windows\\Temp']); await tick();
  o.prefetch = await dirStat(['C:\\Windows\\Prefetch']); await tick();
  o.wu = await dirStat(['C:\\Windows\\SoftwareDistribution\\Download']); await tick();
  o.thumbs = await dirStat([path.join(process.env.LOCALAPPDATA || '', 'Microsoft\\Windows\\Explorer')], f => /^thumbcache_.*\.db$/i.test(f)); await tick();
  o.bin = { size: 0, count: 0 };
  try { const r = await ps("$b=(New-Object -ComObject Shell.Application).NameSpace(10);$n=0;$s=0;foreach($i in $b.Items()){$n++;$s+=[int64]$i.Size};@{n=$n;s=$s}|ConvertTo-Json -Compress"); const j = JSON.parse(r.out); o.bin = { size: j.s || 0, count: j.n || 0 }; } catch {}
  return o;
});
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
// ---------- monitor ao vivo do Painel (só roda enquanto o Painel está aberto) ----------
let liveT = null, livePS = null, liveCpu = null, liveGD = { gpu: 0, disk: 0 };
const cpuTimes = () => { let idle = 0, total = 0; for (const c of os.cpus()) { for (const k in c.times) total += c.times[k]; idle += c.times.idle; } return { idle, total }; };
function liveStop() { if (liveT) clearInterval(liveT); liveT = null; if (livePS) { try { livePS.kill(); } catch {} livePS = null; } }
function liveStart(wc) {
  liveStop(); liveCpu = cpuTimes();
  // GPU e disco vêm de contadores do Windows via CIM (nomes em inglês, funcionam em qualquer idioma do Windows)
  const script = `$ErrorActionPreference='SilentlyContinue';while($true){$g=0;try{$g=[int](Get-CimInstance Win32_PerfFormattedData_GPUPerformanceCounters_GPUEngine|Group-Object{($_.Name -split 'engtype_')[1]}|ForEach-Object{($_.Group|Measure-Object UtilizationPercentage -Sum).Sum}|Measure-Object -Maximum).Maximum}catch{};$d=0;try{$d=[int](Get-CimInstance Win32_PerfFormattedData_PerfDisk_PhysicalDisk -Filter "Name='_Total'").PercentDiskTime}catch{};[Console]::Out.WriteLine('{"gpu":'+[math]::Min(100,$g)+',"disk":'+[math]::Min(100,$d)+'}');[Console]::Out.Flush();Start-Sleep -Milliseconds 700}`;
  try {
    livePS = spawn('powershell', ['-NoProfile', '-NonInteractive', '-Command', script], { windowsHide: true });
    livePS.stdout.on('data', d => { const l = String(d).trim().split(/\r?\n/).pop(); try { liveGD = JSON.parse(l); } catch {} });
    livePS.on('error', () => { livePS = null; }); livePS.on('exit', () => { livePS = null; });
  } catch {}
  liveT = setInterval(() => {
    const c = cpuTimes(), dt = c.total - liveCpu.total, di = c.idle - liveCpu.idle; liveCpu = c;
    const tot = os.totalmem(), used = tot - os.freemem();
    if (wc.isDestroyed()) return liveStop();
    wc.send('live:tick', { cpu: dt > 0 ? Math.max(0, Math.min(100, Math.round(100 * (1 - di / dt)))) : 0, ram: Math.round(100 * used / tot), ramUsed: +(used / 2 ** 30).toFixed(1), gpu: liveGD.gpu || 0, disk: liveGD.disk || 0, up: os.uptime() });
  }, 1000);
}
ipcMain.handle('live:start', e => { liveStart(e.sender); return true; });
ipcMain.handle('live:stop', () => { liveStop(); return true; });
ipcMain.handle('elevate', () => doElevate());
ipcMain.handle('adm:set', (_e, on) => { const c = load(); c.alwaysAdmin = !!on; save(c); return c.alwaysAdmin; });
ipcMain.handle('theme', (e, o) => { try { const ok = /^#[0-9a-f]{6}$/i, w = BrowserWindow.fromWebContents(e.sender); if (o && ok.test(o.bg) && ok.test(o.sym)) { w.setTitleBarOverlay({ color: o.bg, symbolColor: o.sym, height: 36 }); w.setBackgroundColor(o.bg); } } catch {} });
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

let win = null, mod = null;
function createWindow() {
  if (win && !win.isDestroyed()) { if (win.isMinimized()) win.restore(); win.show(); win.focus(); return win; }
  win = new BrowserWindow({ width: 1180, height: 740, minWidth: 960, minHeight: 600, backgroundColor: '#0a0a0a', autoHideMenuBar: true, titleBarStyle: 'hidden', titleBarOverlay: { color: '#0a0a0a', symbolColor: '#c4b5fd', height: 36 }, icon: path.join(__dirname, 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true } });
  win.loadFile('index.html'); win.on('closed', () => { win = null; });
  return win;
}
// Reabre o programa como administrador (UAC). Se der certo, grava "sempre administrador" e fecha esta instancia.
let adminNow = false;
function doElevate() {
  return new Promise(res => {
    const exe = process.env.PORTABLE_EXECUTABLE_FILE || process.execPath;
    const args = [...(app.isPackaged ? [] : [app.getAppPath()]), ...(process.argv.includes('--hidden') ? ['--hidden'] : [])];
    const q = x => "'" + x.replace(/'/g, "''") + "'";
    const cmd = `Start-Process -FilePath ${q(exe)} ${args.length ? '-ArgumentList ' + args.map(q).join(',') + ' ' : ''}-Verb RunAs`;
    app.releaseSingleInstanceLock(); // a nova instancia (administrador) precisa conseguir o lock
    execFile('powershell', ['-NoProfile', '-Command', cmd], { windowsHide: true }, err => {
      if (err) { app.requestSingleInstanceLock(); return res(false); } // UAC recusado: segue como esta
      const c = load(); c.alwaysAdmin = true; save(c);
      app.quit(); res(true);
    });
  });
}
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => createWindow());
  app.whenReady().then(async () => {
    app.setAppUserModelId('com.luquinhas.boost');
    adminNow = await run('net session >nul 2>&1');
    // depois da 1a vez que o usuario pediu administrador, abre sempre como administrador
    if (!adminNow && load().alwaysAdmin && await doElevate()) return;
    mod = require('./modules')({ runx, ps, out, load, save, log, clean, regGet, getJSON, newer, GITHUB_REPO, cs2CfgDir, showWindow: createWindow, isQuitting: () => quitting, isAdmin: () => adminNow });
    mod.start();
    if (!process.argv.includes('--hidden') || !mod.bgOn()) createWindow(); // sem segundo plano não há bandeja para reabrir: mostra a janela
  });
}
let quitting = false;
app.on('before-quit', () => { quitting = true; liveStop(); });
// Fechar a janela NAO encerra o programa (se "Executar em segundo plano" estiver ligado): ele continua na bandeja (setinha perto do relogio).
// Para fechar de verdade: botao direito no icone da bandeja -> Encerrar.
app.on('window-all-closed', () => { liveStop(); if (!mod) return app.quit(); if (quitting) return; if (mod.bgOn()) mod.onHidden(); else app.quit(); });
