const { contextBridge, ipcRenderer: r } = require('electron');
contextBridge.exposeInMainWorld('api', {
  init: () => r.invoke('init'),
  tweaks: (ids, en) => r.invoke('tweaks', ids, en),
  clean: ids => r.invoke('clean', ids),
  restore: a => r.invoke('restore', a),
  appsList: () => r.invoke('apps:list'),
  appsUninstall: ids => r.invoke('apps:uninstall', ids),
  appsExport: ids => r.invoke('apps:export', ids),
  link: () => r.invoke('link'),
});
