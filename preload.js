const { contextBridge, ipcRenderer: r } = require('electron');
contextBridge.exposeInMainWorld('api', {
  init: () => r.invoke('init'),
  tweaks: (ids, en) => r.invoke('tweaks', ids, en),
  clean: ids => r.invoke('clean', ids),
  restore: a => r.invoke('restore', a),
  appsList: () => r.invoke('apps:list'),
  appsUninstall: ids => r.invoke('apps:uninstall', ids),
  appsExport: ids => r.invoke('apps:export', ids),
  cs2Cfg: n => r.invoke('cs2:cfg', n),
  cs2Install: ids => r.invoke('cs2:install', ids),
  copy: t => r.invoke('copy', t),
  update: () => r.invoke('update'),
  open: u => r.invoke('open', u),
  elevate: () => r.invoke('elevate'),
  theme: c => r.invoke('theme', c),
  link: () => r.invoke('link'),
});
