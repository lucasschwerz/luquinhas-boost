// ui2.js - módulos novos da interface (carregado depois do script principal do index.html)
(function () {
  const st = document.createElement('style');
  st.textContent = `.mdl{position:fixed;inset:0;z-index:150;display:grid;place-items:center;background:rgba(0,0,0,.55);opacity:0;transition:.2s;-webkit-app-region:no-drag}.mdl.on{opacity:1}
.mbox{width:min(580px,92vw);max-height:84vh;overflow:auto;background:var(--elev);border:1px solid var(--line);border-radius:16px;padding:22px;box-shadow:0 20px 60px var(--shadow);transform:translateY(8px);transition:.2s}.mdl.on .mbox{transform:none}
.mb h3{margin:0 0 10px}.mb p{color:var(--mu);line-height:1.5;margin:0 0 10px}.mb ul{margin:0 0 10px;padding-left:18px}.mb li{margin:6px 0}.mb li small{color:var(--mu);display:block}
.mn{max-height:160px;overflow:auto;padding:10px 12px;border-radius:10px;background:var(--inset);color:var(--mu);font-size:12.5px;line-height:1.5;margin-bottom:10px}
.prog{height:8px;border-radius:99px;background:var(--alt);overflow:hidden}.prog i{display:block;height:100%;width:0;background:var(--ac);transition:width .2s}
.dgi{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:8px;border:0;background:rgba(251,191,36,.16);color:#e8a30b;cursor:pointer;padding:0;transition:.2s}.dgi:hover{background:rgba(251,191,36,.3)}.dgi svg{width:15px;height:15px}
.tbot{display:flex;align-items:center;gap:8px;margin-top:auto;flex-wrap:wrap}.tw.dis{opacity:.55}.inc{color:#d99a06!important;font-size:12.5px!important}.state.mutd{color:var(--mu)}`;
  document.head.append(st);
})();
(function () {
  const s = document.createElement('style');
  s.textContent = `.hh{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:6px}.chips2{display:flex;gap:8px;flex-wrap:wrap}
.hero2{display:flex;align-items:center;gap:18px;padding:22px 24px;border-radius:16px;margin:14px 0;border:1px solid rgba(var(--acrgb),.3);background:radial-gradient(500px 200px at 100% 0,rgba(var(--acrgb),.25),transparent),linear-gradient(110deg,rgba(var(--ac2rgb),.25),rgba(var(--acrgb),.04))}
.hero2 .hx{flex:1}.hero2 b{display:block;font-size:17px}.hero2 span{color:var(--mu);font-size:13px}
.hwgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin-bottom:14px}
.hw{position:relative;display:flex;flex-direction:column;gap:4px;padding:18px}.hw .hwi{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:rgba(var(--acrgb),.16);color:var(--ac3);margin-bottom:10px}.hw .hwi svg{width:20px;height:20px}
.hw .tag{position:absolute;right:14px;top:14px}.hw small{color:var(--mu)}.hw b{font-size:15px;line-height:1.3;overflow-wrap:anywhere}.hw em{font-style:normal;color:var(--ac3);font-size:12.5px;min-height:16px}
.tri{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:12px}
.qa{display:flex;align-items:center;gap:10px;width:100%;padding:11px 12px;margin-bottom:8px;border:1px solid var(--line);border-radius:10px;background:var(--hov);color:var(--tx);font:inherit;cursor:pointer;transition:.2s;text-align:left}.qa:hover{border-color:var(--ac);background:rgba(var(--acrgb),.1)}.qa svg{width:18px;height:18px;color:var(--ac)}
.ico{display:inline-grid;place-items:center;width:36px;height:36px;border-radius:10px;background:rgba(var(--acrgb),.16);color:var(--ac3);font-weight:700;font-size:12px;flex:none;overflow:hidden}.ico img{width:28px;height:28px;object-fit:contain}
.prow{display:flex;align-items:center;gap:12px;margin-bottom:8px}.prow h3{margin:0}`;
  document.head.append(s);
})();
(function () {
  const s = document.createElement('style');
  s.textContent = `@property --ang{syntax:'<angle>';initial-value:0deg;inherits:false}
.pz.lq{position:relative;overflow:hidden;border-color:transparent;isolation:isolate;box-shadow:0 0 30px -8px rgba(var(--acrgb),.55);animation:lqglow 3.2s ease-in-out infinite}
.pz.lq::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.5px;z-index:3;pointer-events:none;background:conic-gradient(from var(--ang),transparent 0 55%,rgba(var(--acrgb),1) 75%,#fff 85%,rgba(var(--acrgb),1) 92%,transparent 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:lqspin 3.6s linear infinite}
.lqbg{position:absolute;inset:0 0 0 48%;z-index:0;background:url(preset-luquinhas.jpg) 40% 30%/cover;opacity:.5;-webkit-mask-image:linear-gradient(90deg,transparent,#000 70%);mask-image:linear-gradient(90deg,transparent,#000 70%);transition:transform .7s cubic-bezier(.2,.7,.2,1),opacity .4s}
.pz.lq:hover .lqbg{transform:scale(1.08);opacity:.85}
.lqfx{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(105deg,transparent 40%,rgba(var(--acrgb),.5) 50%,transparent 60%);transform:translateX(-120%);animation:lqsweep 4.5s ease-in-out infinite}
.lqx{position:relative;z-index:2}.lqx .sm{max-width:55%}
.lqav{width:46px;height:46px;border-radius:13px;overflow:hidden;flex:none;box-shadow:0 0 0 2px rgba(var(--acrgb),.8),0 0 18px rgba(var(--acrgb),.65);animation:lqpulse 2.4s ease-in-out infinite}.lqav img{width:100%;height:100%;object-fit:cover;display:block}
.pz.lq h3{margin:0 0 4px;font-size:16px}
@keyframes lqspin{to{--ang:360deg}}
@keyframes lqglow{50%{box-shadow:0 0 44px -4px rgba(var(--acrgb),.8)}}
@keyframes lqpulse{50%{box-shadow:0 0 0 2px #fff,0 0 26px rgba(var(--acrgb),.95)}}
@keyframes lqsweep{0%,55%{transform:translateX(-120%)}85%,100%{transform:translateX(120%)}}`;
  document.head.append(s);
})();
IC.gpu = 'M3 5h18v11H3zM8 20h8M12 16v4'; IC.ram = 'M3 8h18v8H3zM7 8v8M11 8v8M15 8v8M19 8v8'; IC.disk = 'M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7';
IC.chip = 'M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3M7 6h10v12H7z';
NAV.splice(NAV.findIndex(x => x[0] === 'health') + 1, 0, ['drivers', 'Drivers', 'chip']);

// ---------- modais ----------
function ovl(html, btns) {
  const o = document.createElement('div'); o.className = 'mdl'; o.innerHTML = '<div class="mbox"><div class="mb"></div><div class="bar mbt"></div></div>'; document.body.append(o);
  requestAnimationFrame(() => o.classList.add('on'));
  const m = { el: o, set(h, b) { o.querySelector('.mb').innerHTML = h; o.querySelector('.mbt').innerHTML = (b || []).map((x, i) => `<button class="btn ${x.cls || ''}" data-mb="${i}">${x.t}</button>`).join(''); o._b = b || []; i18n(o); }, close() { o.classList.remove('on'); setTimeout(() => o.remove(), 200); } };
  o.addEventListener('click', e => { const b = e.target.closest('[data-mb]'); if (b) { const f = o._b[+b.dataset.mb]; if (f && f.f) f.f(m); } });
  m.set(html, btns); return m;
}
function modal({ title, html, ok = 'Confirmar', cancel = 'Cancelar', danger = false, single = false }) {
  return new Promise(res => { const m = ovl('', []), b = []; if (!single) b.push({ t: cancel, cls: 'alt', f: () => { m.close(); res(false); } }); b.push({ t: ok, cls: danger ? 'red' : '', f: () => { m.close(); res(true); } }); m.set(`<h3>${esc(title)}</h3>${html}`, b); });
}
const dgHtml = t => `<p>${esc(t.danger)}</p><p class="mu sm">Você pode reverter desligando o ajuste${t.reboot ? ' (exige reinício)' : ''}. Um ponto de restauração é criado antes de aplicar.</p>`;

// ---------- estado real dos ajustes ----------
async function refreshState() {
  const r = await api.tweaksState(); S.tst = r.st; S.tcp = r.cp;
  S.applied = new Set(Object.entries(r.st).filter(([, v]) => v === true).map(([k]) => k));
  if (page === 'opt' && $('#grid')) { grid(); const ac = $('#ac'); if (ac) ac.textContent = S.applied.size; } else if (page === 'home') go('home');
}
async function toggleTweak(el) {
  if (S.twBusy) return toast('Aguarde o ajuste atual terminar.', 'err');
  const id = el.dataset.id, t = S.tweaks.find(x => x.id === id), cur = S.tst ? S.tst[id] : S.applied.has(id), en = cur !== true;
  if (S.tcp && S.tcp[id]) return toast(S.tcp[id], 'err');
  if (t.admin && !S.admin) return toast('Este ajuste precisa de permissão de administrador. Use o botão "Reiniciar como administrador" no topo.', 'err');
  if (en && t.danger && !(await modal({ title: t.n, html: dgHtml(t), ok: 'Aplicar mesmo assim', danger: true }))) return;
  const k = el.closest('.tw'), stl = k.querySelector('.state');
  S.twBusy = true; el.classList.add('ld'); k.classList.add('busy'); stl.className = 'state wait'; stl.textContent = tr(en ? 'Ativando...' : 'Desativando...');
  if (en && !S.rp) toast('Criando ponto de restauração antes de aplicar. Pode levar alguns segundos...');
  let r = { r: {}, e: {}, s: {} }; try { r = await api.tweaks([id], en); } catch {}
  S.twBusy = false; el.classList.remove('ld'); k.classList.remove('busy');
  if (r.r[id]) {
    S.rp = true; const real = r.s[id], on = real === null || real === undefined ? en : real; S.tst = S.tst || {}; S.tst[id] = on; on ? S.applied.add(id) : S.applied.delete(id);
    el.classList.toggle('on', on); k.classList.toggle('on', on); stl.className = 'state' + (on ? '' : ' mutd'); stl.textContent = tr(on ? '● Ativo' : '○ Inativo');
    const ac = $('#ac'); if (ac) ac.textContent = S.applied.size;
    if (on === en) { toast(en ? 'Ajuste ativado' : 'Ajuste desativado'); if (t.reboot) toast('Reinicie o PC para o ajuste valer.'); } else toast('O comando rodou, mas o estado não mudou. Pode precisar de reinício.', 'err');
  } else { const on = S.tst && S.tst[id] === true; stl.className = 'state' + (on ? '' : ' mutd'); stl.textContent = tr(on ? '● Ativo' : '○ Inativo'); toast((r.e && r.e[id]) || 'Não foi possível aplicar.', 'err'); }
}
async function applyRecommended(el) {
  if (!S.tst) await refreshState();
  const skipA = S.tweaks.filter(t => t.star && t.admin && !S.admin).length;
  const list = S.tweaks.filter(t => t.star && !t.danger && S.tst[t.id] !== true && !(S.tcp && S.tcp[t.id]) && !(t.admin && !S.admin));
  if (!list.length) return toast(skipA ? 'Os recomendados restantes precisam de administrador.' : 'Recomendados já estão ativos!', skipA ? 'err' : '');
  const html = `<p>Estes ajustes serão aplicados:</p><ul>${list.map(t => `<li><b>${esc(t.n)}</b><small>${esc(t.d)}${t.warn ? ' ⚠ ' + esc(t.warn) : ''}</small></li>`).join('')}</ul><p class="inc">Um ponto de restauração é criado antes, e cada ajuste pode ser desfeito em Otimizações. O ganho de FPS varia por PC.</p>`;
  if (!(await modal({ title: 'Aplicar recomendados', html, ok: 'Aplicar' }))) return;
  return busy(el, async () => {
    const ids = list.map(t => t.id);
    toast('Criando ponto de restauração e aplicando...');
    const r = await api.tweaks(ids, true); S.rp = true; const ok = ids.filter(i => r.r[i]).length;
    toast(ok === ids.length ? 'Pronto! Reinicie o PC para finalizar.' : 'Alguns ajustes falharam. Veja os detalhes em Otimizações.', ok === ids.length ? '' : 'err');
    await refreshState(); go('home');
  });
}

// ---------- presets ----------
const CS2_IDS = ['power', 'gamemode', 'dvr', 'bgapps', 'gamesgen', 'network', 'mouse', 'sticky', 'visualfx', 'winmode'];
const PRESETS = {
  luquinhas: { n: 'Preset Luquinhas', d: 'Tudo do preset CS2 + limpeza e ajustes extras do Windows, Steam, Discord e OneDrive.', ids: [...CS2_IDS, 'transp', 'ntfs', 'services', 'privacy', 'ads', 'showfiles', 'ctxmenu', 'taskbar', 'hibernate', 'steam', 'discord', 'onedrive'], note: 'Este preset inclui ajustes críticos (Steam, Discord e OneDrive). Leia os avisos antes de aplicar.', lq: 1 },
  cs2: { n: 'Preset CS2', d: 'FPS estável e baixa latência para o CS2.', ids: CS2_IDS, note: '', ic: 'game_cs2', ab: 'CS2' },
};
const presetBar = () => `<div class="two st" style="margin-bottom:14px">${Object.entries(PRESETS).map(([k, p]) => p.lq
  ? `<div class="card pz lq"><div class="lqbg"></div><div class="lqfx"></div><div class="lqx"><div class="prow"><span class="lqav"><img src="preset-luquinhas.jpg" alt=""></span><div><h3 class="gr">${p.n}</h3><span class="tag">Preset do criador</span></div></div><p class="mu sm">${p.d}</p><button class="btn" data-preset="${k}">Ver ajustes</button></div></div>`
  : `<div class="card"><div class="prow"><span class="ico" data-ic="${p.ic}"><b>${p.ab}</b></span><h3>${p.n}</h3></div><p class="mu sm">${p.d}</p><button class="btn" data-preset="${k}">Ver ajustes</button></div>`).join('')}</div>`;
async function runPreset(k, el) {
  if (!S.tst) await refreshState();
  const P = PRESETS[k], todo = [], skip = [];
  for (const id of P.ids) {
    const t = S.tweaks.find(x => x.id === id); if (!t) continue;
    if (S.tcp && S.tcp[id]) skip.push([t, S.tcp[id]]); else if (S.tst[id] === true) skip.push([t, 'já está ativo']); else if (t.admin && !S.admin) skip.push([t, 'precisa de administrador']); else todo.push(t);
  }
  if (!todo.length) return toast('Nada para aplicar: tudo já está ativo ou não é compatível.', 'err');
  const crit = todo.filter(t => t.danger);
  const html = `<p>Estes ajustes serão aplicados:</p><ul>${todo.map(t => `<li><b>${esc(t.n)}</b><small>${esc(t.d)}${t.warn ? ' ⚠ ' + esc(t.warn) : ''}${t.reboot ? ' (exige reinício)' : ''}</small></li>`).join('')}</ul>`
    + (crit.length ? `<p class="inc"><b>⚠ Ajustes críticos neste preset:</b></p><ul>${crit.map(t => `<li><b>${esc(t.n)}</b><small>${esc(t.danger)}</small></li>`).join('')}</ul>` : '')
    + (skip.length ? `<p>Ignorados:</p><ul>${skip.map(([t, w]) => `<li>${esc(t.n)}<small>${esc(w)}</small></li>`).join('')}</ul>` : '')
    + `<p class="inc">Alertas: os ajustes alteram o registro e as configurações do Windows. Um ponto de restauração é criado antes, e cada ajuste pode ser desfeito em Otimizações. O ganho de FPS varia por PC e pode ser pequeno. ${esc(P.note)}</p>`;
  if (!(await modal({ title: P.n, html, ok: 'Aplicar preset', danger: crit.length > 0 }))) return;
  return busy(el, async () => {
    toast('Criando ponto de restauração e aplicando...');
    const r = await api.tweaks(todo.map(t => t.id), true); S.rp = true; const ok = todo.filter(t => r.r[t.id]).length;
    toast(tf('{0} de {1} ajustes aplicados', ok, todo.length), ok < todo.length ? 'err' : ''); await refreshState();
  });
}

// ---------- limpeza automática ----------
const _clean0 = PG.clean;
PG.clean = () => _clean0() + autoCard();
function autoCard() {
  const a = S.auto; if (!a) return '';
  const F = [['never', 'Nunca'], ['daily', 'Diariamente'], ['weekly', 'Semanalmente'], ['monthly', 'Mensalmente']], IT = [['temp', 'Arquivos temporários', 'Temp do usuário (a do sistema só com administrador).'], ['prefetch', 'Prefetch', 'Exige administrador.'], ['wu', 'Cache do Windows Update', 'Exige administrador.'], ['thumbs', 'Miniaturas', '']];
  return `<div class="card st" style="margin-top:16px"><h3>Limpeza automática</h3><p class="mu sm">Roda em segundo plano enquanto o programa estiver na área de notificação (perto do relógio). Ele só confere a agenda a cada 30 minutos, então usa pouca CPU e RAM.</p>
<div class="seg">${F.map(([k, n]) => `<button class="sg ${a.freq === k ? 'on' : ''}" data-af="${k}">${n}</button>`).join('')}</div>
<div class="list">${IT.map(([k, n, s]) => `<div class="row"><div><b>${n}</b><small>${s}</small></div><div class="sw ${a.items.includes(k) ? 'on' : ''}" data-ai="${k}"></div></div>`).join('')}
<div class="row"><div><b>Lixeira (apaga definitivamente)</b><small>Só roda automaticamente se você autorizar aqui.</small></div><div class="sw ${a.binAuth ? 'on' : ''}" id="abin"></div></div>
<div class="row"><div><b>Iniciar com o Windows</b><small>Necessário para a limpeza rodar depois de reiniciar o PC.</small></div><div class="sw ${a.startup ? 'on' : ''}" id="astart"></div></div></div>
<p class="mu sm" style="margin-top:12px">Última limpeza automática: ${a.last ? new Date(a.last).toLocaleString(LOC()) : tr('nunca')}</p><div class="bar" style="justify-content:flex-start;margin:0"><button class="btn alt" id="arun">Executar agora</button></div></div>`;
}
async function setAuto(p) { S.auto = await api.autoSet(p); go('clean'); }

// ---------- central de aplicativos ----------
async function loadHub() {
  if (!S.hub) S.hub = await api.hubList();
  hubRender(); loadIcons(S.hub.map(h => h.id)); // desenha já, sem esperar a lista de programas instalados
  if (!S.appList) { try { S.appList = await api.appsList(); S.sel = new Set(); } catch {} hubMarks(); }
}
const hubInst = h => !!(h.m && (S.appList || []).some(a => new RegExp(h.m, 'i').test(a.n)));
function hubMarks() { // coloca o selo "Instalado" sem redesenhar a tela (evita piscar)
  if (page !== 'apps' || S.appTab !== 'hub' || !S.hub) return;
  document.querySelectorAll('#hubbox .hc[data-hid] .top').forEach(t => { const h = S.hub.find(x => x.id === t.parentNode.dataset.hid); if (h && hubInst(h) && !t.querySelector('.bd')) { t.insertAdjacentHTML('beforeend', '<span class="bd ok">Instalado</span>'); i18n(t); } });
}
function hubRender() {
  if (page !== 'apps' || S.appTab !== 'hub' || !$('#hubbox')) return;
  const cats = ['Essenciais', 'Utilitários', 'Comunicação', 'Jogos e launchers']; S.hcat = S.hcat || 'Essenciais';
  const l = S.hub.filter(h => S.hcat === 'Essenciais' ? h.ess : h.cat === S.hcat);
  $('#ap-sub').textContent = tr('Instalação pelo winget (fonte da Microsoft) ou link para o site oficial do fabricante');
  $('#hubbox').innerHTML = `<div class="seg st">${cats.map(c => `<button class="sg ${c === S.hcat ? 'on' : ''}" data-hc="${c}">${c}</button>`).join('')}</div><div class="hgrid">${l.map((h, i) => {
    const inst = hubInst(h);
    return `<div class="card st hc" data-hid="${h.id}" style="--i:${i}"><div class="top"><div class="prow" style="margin:0"><span class="ico" data-ic="${h.id}"><b>${esc(h.n[0])}</b></span><h3>${esc(h.n)}</h3></div>${inst ? '<span class="bd ok">Instalado</span>' : ''}</div><p>${esc(h.d)}</p><small>Windows 10/11 · ${esc(h.pub)}</small><div class="bar" style="justify-content:flex-start;margin:6px 0 0"><button class="btn" data-hi="${h.id}">${h.w ? 'Instalar' : 'Baixar'}</button><button class="btn alt" data-ho="${h.id}">Site oficial</button></div></div>`;
  }).join('')}</div>`;
  i18n($('#hubbox')); applyIcons();
}

// ---------- drivers ----------
PG.drivers = () => `<div class="head2 st"><div><h1>Drivers</h1><p class="mu">Identifica seu hardware e leva você às páginas oficiais dos fabricantes. Nada é instalado automaticamente.</p></div><button class="btn alt" id="drf">Detectar de novo</button></div><div id="drbox"><div class="hgrid">${[0, 1, 2].map(() => '<div class="card st"><div class="sk" style="width:55%;margin-bottom:14px"></div><div class="sk" style="margin-bottom:8px"></div><div class="sk" style="width:80%"></div></div>').join('')}</div><p class="mu" style="margin-top:14px">Detectando hardware... pode levar até 1 minuto.</p></div>`;
async function loadDrivers() { if (!S.drv) S.drv = await api.driversScan(); if (page === 'drivers') drRender(); }
function drRender() {
  const d = S.drv, box = $('#drbox'); if (!box) return;
  if (!d || !d.ok) { box.innerHTML = '<div class="card"><p class="mu" style="margin:0">Não consegui detectar o hardware. Tente de novo ou abra como administrador.</p></div>'; return; }
  const V = { nvidia: 'NVIDIA', amd: 'AMD', intel: 'Intel' }, B = (k, t) => `<button class="btn alt" data-dro="${k}">${t}</button>`;
  const vlink = v => v === 'nvidia' ? B('nvidia', 'Drivers NVIDIA (oficial)') : v === 'amd' ? B('amd', 'Drivers AMD (oficial)') : v === 'intel' ? B('intel', 'Drivers Intel (oficial)') + B('intelDSA', 'Intel Driver & Support Assistant') : '';
  const list = a => a.length ? '<ul style="margin:0;padding-left:18px">' + a.map(x => `<li>${esc(x.name)}<small style="color:var(--mu);display:block">${esc(x.version)}${x.date ? ' · ' + esc(x.date) : ''}</small></li>`).join('') + '</ul>' : '<p class="mu sm" style="margin:0">Nada identificado.</p>';
  box.innerHTML = `<div class="hgrid"><div class="card st hc"><h3>Processador</h3><p>${esc(d.cpu.name)}</p><small>Fabricante: ${V[d.cpu.vendor] || '—'}. Chipset e gráficos integrados vêm da página do fabricante.</small><div class="bar" style="justify-content:flex-start;margin:0">${vlink(d.cpu.vendor)}</div></div>`
    + d.gpus.map((g, i) => `<div class="card st hc" style="--i:${i + 1}"><h3>Placa de vídeo</h3><p>${esc(g.name)}</p><small>Driver instalado: ${g.friendly ? esc(g.friendly) + ' (pacote ' + esc(g.version) + ')' : esc(g.version)}${g.date ? ' · ' + esc(g.date) : ''}</small><div class="bar" style="justify-content:flex-start;margin:0">${vlink(g.vendor)}</div></div>`).join('')
    + `<div class="card st hc"><h3>Chipset e plataforma</h3>${list(d.chipset)}</div><div class="card st hc"><h3>Rede</h3>${list(d.net)}</div><div class="card st hc"><h3>Áudio</h3>${list(d.audio)}</div>`
    + `<div class="card st hc"><h3>Windows Update</h3><p>Procura drivers que a Microsoft já disponibiliza para o seu PC. Pode levar alguns minutos.</p><div class="bar" style="justify-content:flex-start;margin:0"><button class="btn" id="drwu">Procurar drivers</button>${B('wu', 'Abrir Windows Update')}</div><div id="drwul"></div></div></div>`
    + '<p class="mu sm" style="margin-top:14px">A versão mais nova publicada pelo fabricante não é consultada automaticamente: use os botões oficiais. A busca do Windows Update mostra apenas o que a Microsoft oferece.</p>';
  i18n(box);
}

// ---------- análise de BIOS e hardware ----------
PG.health = () => `<div class="head2 st"><div><h1>Saúde do PC</h1><p class="mu">Análise de hardware, BIOS e recursos do Windows que afetam o desempenho.</p></div><button class="btn" id="hscan">Analisar meu PC</button></div><div id="hbody">${S.hres ? '' : '<div class="card st"><p class="mu" style="margin:0">Clique em "Analisar meu PC". Mostramos só o que o Windows consegue detectar; o que depende da BIOS aparece marcado como "Exige consultar a BIOS".</p></div>'}</div>`;
function loadHealth() { if (S.hres) hRender(); }
async function hScan() {
  if (!(await modal({ title: 'Analisar meu PC', html: '<p>A análise lê informações de memória, processador, placa de vídeo, recursos do Windows e registros de erros. Pode levar alguns minutos.</p><p><b>Não feche o aplicativo nem reinicie o PC</b> durante a análise.</p><p>Nenhuma configuração do Windows ou da BIOS será alterada.</p>', ok: 'Iniciar análise' }))) return;
  S.hscan = true; $('#hbody').innerHTML = '<div class="card"><p id="hp" class="mu">Iniciando...</p><div class="prog"><i id="hpb"></i></div></div>';
  try { S.hres = await api.healthFull(); } catch { S.hres = null; toast('A análise falhou.', 'err'); }
  S.hscan = false; if (page === 'health') hRender();
}
function hRender() {
  const r = S.hres, b = $('#hbody'); if (!b) return; if (!r) { b.innerHTML = ''; return; }
  const SRC = { windows: 'Detectado pelo Windows', estimate: 'Estimado a partir de dados do Windows', bios: 'Exige consultar a BIOS' }, ST = { on: 'Ativado', off: 'Desativado', unknown: 'Desconhecido' };
  b.innerHTML = ['windows', 'estimate', 'bios'].map(k => { const l = r.items.filter(x => x.src === k); return l.length ? `<h3 style="margin:18px 0 10px">${SRC[k]}</h3><div class="hgrid">${l.map((x, i) => `<div class="card st hc" style="--i:${i}"><div class="top"><h3>${esc(x.title)}</h3><span class="bd ${x.state === 'on' ? 'ok' : x.state === 'off' ? 'warn' : 'unk'}">${ST[x.state]}</span></div><p>${esc(x.ev)}</p>${x.adv ? `<small>${esc(x.adv)}</small>` : ''}</div>`).join('')}</div>` : ''; }).join('')
    + `<p class="mu sm" style="margin-top:14px">Análise de ${new Date(r.when).toLocaleString(LOC())}. Nenhuma configuração foi alterada.</p>`;
  i18n(b);
}

// ---------- atualizador integrado ----------
const _cfg0 = PG.cfg;
PG.cfg = () => _cfg0() + `<div class="card st" style="margin-top:12px"><h3>Atualizações</h3><p class="mu sm">Versão atual: v${S.ver}. O programa baixa o instalador da Release do GitHub, confere o checksum SHA-256 e só então instala. Suas configurações são mantidas.</p><button class="btn" id="updchk">Verificar atualizações</button></div>`;
async function openUpdater() {
  const m = ovl('<h3>Atualização</h3><p>Verificando...</p>', []), close = { t: 'Fechar', cls: 'alt', f: () => m.close() };
  const i = await api.updInfo();
  if (!i.ok) return m.set(`<h3>Atualização</h3><p>${esc(i.err)}</p>`, [close]);
  if (!i.newer) return m.set(`<h3>Atualização</h3><p>Você já está na versão mais recente (v${esc(i.cur)}).</p>`, [close]);
  const dl = async () => {
    m.set('<h3>Baixando atualização</h3><div class="prog"><i id="upb"></i></div><p id="upt" class="mu sm" style="margin-top:8px">Conectando...</p><p class="mu sm">Não feche o programa.</p>', []);
    const r = await api.updInstall();
    if (!r.ok) return m.set(`<h3>Não foi possível atualizar</h3><p>${esc(r.err)}</p><p class="mu sm">Nada foi alterado na sua instalação.</p>`, [close, { t: 'Tentar de novo', f: dl }]);
    m.set(`<h3>Pronto para instalar</h3><p>Checksum SHA-256 conferido com o publicado na Release.</p><p class="mu sm">${r.sig === 'Valid' ? 'Assinatura digital válida.' : 'O instalador não tem assinatura digital; a autenticidade vem do checksum publicado no GitHub (HTTPS).'}</p><p>O programa será fechado e o instalador abrirá. Suas configurações são mantidas.</p>`, [{ t: 'Cancelar', cls: 'alt', f: () => { api.updCancel(); m.close(); } }, { t: 'Instalar agora', f: () => api.updApply() }]);
  };
  m.set(`<h3>Nova versão ${esc(i.latest)}</h3><p>Versão atual: v${esc(i.cur)} → disponível: ${esc(i.latest)}</p><div class="mn">${esc(i.notes).replace(/\n/g, '<br>') || '—'}</div>${i.canAuto ? '' : '<p class="inc">A Release não tem checksum SHA-256; a instalação automática está bloqueada por segurança.</p>'}`,
    [close, { t: 'Ver na página', cls: 'alt', f: () => api.open(i.url) }].concat(i.canAuto ? [{ t: 'Baixar e verificar', f: dl }] : []));
}

// ---------- cliques dos módulos novos ----------
document.addEventListener('click', async e => {
  const c = s => e.target.closest(s); let el;
  if (el = c('[data-dg]')) { const t = S.tweaks.find(x => x.id === el.dataset.dg); return modal({ title: t.n, html: dgHtml(t), ok: 'Entendi', single: true, danger: true }); }
  if (el = c('[data-go]')) return go(el.dataset.go);
  if (el = c('[data-preset]')) return runPreset(el.dataset.preset, el);
  if (el = c('[data-af]')) return setAuto({ freq: el.dataset.af });
  if (el = c('[data-ai]')) { const a = S.auto, k = el.dataset.ai, items = a.items.filter(x => x !== 'bin'); const i = items.indexOf(k); i >= 0 ? items.splice(i, 1) : items.push(k); return setAuto({ items }); }
  if (el = c('#abin')) { const on = !S.auto.binAuth; if (on && !(await modal({ title: 'Esvaziar a Lixeira automaticamente', html: '<p>A cada limpeza automática, a Lixeira será esvaziada e os arquivos <b>apagados definitivamente</b>, sem aviso.</p>', ok: 'Autorizar', danger: true }))) return; return setAuto({ binAuth: on }); }
  if (el = c('#astart')) return setAuto({ startup: !S.auto.startup });
  if (el = c('#arun')) { if (!(await modal({ title: 'Executar limpeza agora', html: `<p>Será limpo: ${esc(S.auto.items.join(', ') || 'nada selecionado')}.${S.auto.items.includes('bin') ? ' <b>A Lixeira será esvaziada.</b>' : ''}</p>` }))) return; return busy(el, async () => { const r = await api.autoRun(); toast(tf('{0} de {1} limpezas concluídas', r.ok, r.total), r.ok < r.total ? 'err' : ''); S.auto = await api.autoGet(); go('clean'); }); }
  if (el = c('[data-hc]')) { S.hcat = el.dataset.hc; return hubRender(); }
  if (el = c('[data-ho]')) return api.hubOpen(el.dataset.ho);
  if (el = c('[data-hi]')) return busy(el, async () => { toast('Instalando... pode levar alguns minutos'); const r = await api.hubInstall(el.dataset.hi); if (r.opened) toast(r.note || 'Abrindo o site oficial...'); else if (r.ok) { toast('Instalado!'); S.appList = null; await loadHub(); } else toast(r.err || 'A instalação falhou.', 'err'); });
  if (el = c('#drf')) { S.drv = null; return go('drivers'); }
  if (el = c('[data-dro]')) return api.driversOpen(el.dataset.dro);
  if (el = c('#drwu')) return busy(el, async () => { const r = await api.driversWU(), box = $('#drwul'); if (!box) return; box.innerHTML = !r.ok ? `<p class="inc">${esc(r.err)}</p>` : r.list.length ? '<ul style="margin:10px 0 0;padding-left:18px">' + r.list.map(x => `<li>${esc(x.t)}<small style="color:var(--mu);display:block">${esc(x.p || '')}</small></li>`).join('') + '</ul>' : '<p class="mu sm" style="margin-top:10px">Nenhum driver novo disponível pelo Windows Update.</p>'; i18n(box); });
  if (el = c('#hscan')) return hScan();
  if (el = c('#updchk')) return openUpdater();
});

function applyIcons() { document.querySelectorAll('[data-ic]').forEach(e => { const x = S.icons && S.icons[e.dataset.ic]; if (x && !e.querySelector('img')) e.innerHTML = `<img src="${x}" alt="">`; }); }
function loadIcons(ids) { // cada ícone aparece assim que chega (sem esperar o mais lento)
  S.icons = S.icons || {}; S.iconBusy = S.iconBusy || {};
  applyIcons();
  for (const id of ids) {
    if (S.icons[id] || S.iconBusy[id]) continue;
    S.iconBusy[id] = 1;
    api.iconsGet([id]).then(r => { if (r && r[id]) S.icons[id] = r[id]; }).catch(() => {}).finally(() => { delete S.iconBusy[id]; applyIcons(); });
  }
}
const _go0 = go; go = function (p) { const r = _go0(p); try { applyIcons(); } catch {} return r; };
async function ui2Init() {
  loadIcons(['game_cs2', 'game_valorant']);
  api.hubList().then(l => { S.hub = S.hub || l; loadIcons(l.map(h => h.id)); }).catch(() => {}); // ícones da Central prontos antes de abrir a página
  try { S.auto = await api.autoGet(); } catch {}
  api.onHealth(d => { const p = $('#hp'); if (p) { p.textContent = `${d.n}/${d.total} · ${d.l}`; const b = $('#hpb'); if (b) b.style.width = (d.n / d.total * 100) + '%'; } });
  api.onUpd(d => { const b = $('#upb'); if (b && d.t) { b.style.width = Math.min(100, d.g / d.t * 100) + '%'; const t = $('#upt'); if (t) t.textContent = (d.g / 1048576).toFixed(1) + ' / ' + (d.t / 1048576).toFixed(1) + ' MB'; } });
  try { await refreshState(); } catch {}
}
