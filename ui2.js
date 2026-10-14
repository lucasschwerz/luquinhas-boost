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

// ---------- barra lateral ----------
const NAV_SECS = [['GERAL', ['home', 'cs2']], ['DESEMPENHO', ['opt', 'health', 'clean']], ['SEGURANÇA', ['rest']], ['FERRAMENTAS', ['apps', 'drivers']]];
renderNav = function () {
  const by = Object.fromEntries(NAV.map(n => [n[0], n])), btn = ([p, l, i]) => `<button class="nv" data-p="${p}">${i === 'cs' ? '<span class="cs2i"></span>' : ico(i)}<span class="nl">${l}</span></button>`;
  $('#nav').innerHTML = '<span id="ind"></span>' + NAV_SECS.map(([t, ids]) => `<span class="ng">${t}</span>` + ids.map(id => btn(by[id])).join('')).join('') + `<div class="nbot">${btn(by.cfg)}</div>`;
  const m = $('#admb'); if (m) { m.className = 'adm' + (S && S.admin ? ' ok' : ''); m.lastElementChild.textContent = tr(S && S.admin ? 'Administrador' : 'Modo padrão'); }
  i18n($('#nav'));
};

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
  luquinhas: { n: 'Configs do Luquinhas', d: 'Tudo do preset CS2 + limpeza e ajustes extras do Windows, Steam, Discord e OneDrive.', ids: [...CS2_IDS, 'transp', 'ntfs', 'services', 'privacy', 'ads', 'showfiles', 'ctxmenu', 'taskbar', 'hibernate', 'steam', 'discord', 'onedrive'], note: 'Este preset inclui ajustes críticos (Steam, Discord e OneDrive). Leia os avisos antes de aplicar.', lq: 1 },
  cs2: { n: 'Otimização para CS2', d: 'FPS estável e baixa latência para o CS2.', ids: CS2_IDS, note: '', ic: 'game_cs2', ab: 'CS2' },
};
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
function autoCard() {
  const a = S.auto; if (!a) return '';
  const IT = [['temp', 'Arquivos temporários', 'Temp do usuário (a do sistema só com administrador).'], ['prefetch', 'Prefetch', 'Exige administrador.'], ['wu', 'Cache do Windows Update', 'Exige administrador.'], ['thumbs', 'Miniaturas', '']];
  return `<div class="card st" style="margin-top:16px"><h3>Limpeza automática</h3><p class="mu sm">Escolha o que a limpeza automática remove. A frequência fica em “Repetir”, no topo da página. Ela roda em segundo plano enquanto o programa estiver na bandeja e só confere a agenda a cada 30 minutos.</p>
<div class="list">${IT.map(([k, n, s]) => `<div class="row"><div><b>${n}</b><small>${s}</small></div><div class="sw ${a.items.includes(k) ? 'on' : ''}" data-ai="${k}"></div></div>`).join('')}
<div class="row"><div><b>Lixeira (apaga definitivamente)</b><small>Só roda automaticamente se você autorizar aqui.</small></div><div class="sw ${a.binAuth ? 'on' : ''}" id="abin"></div></div>
</div>
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
Object.assign(IC, {
  net: 'M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01', audio: 'M4 10v4h4l5 4V6l-5 4zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11',
  gpu: 'M3 7h18v10H3zM7 11h4M15 10h2M7 17v3M17 17v3', open: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
});
(function () {
  const s = document.createElement('style');
  s.textContent = `.dtop{display:flex;align-items:center;gap:10px}
.dgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.dgrid .wide{grid-column:1/-1}
.dcard{position:relative;padding:18px 20px;border:1px solid var(--line);border-radius:16px;background:var(--card);transition:.2s}.dcard:hover{border-color:rgba(var(--acrgb),.45)}
.dcard.dfeat{background:radial-gradient(280px 150px at 100% 0,rgba(var(--acrgb),.15),transparent),var(--card)}
.dh{display:flex;align-items:center;gap:12px;margin-bottom:14px}.dh .vtag{margin-left:auto}.dk{font-size:11px;letter-spacing:.14em;color:var(--mu);font-weight:700}
.dn{font-size:15px;font-weight:700;line-height:1.35}
.dchips{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 0}.dchip{display:inline-flex;align-items:center;font-family:ui-monospace,Consolas,monospace;font-size:11.5px;padding:3px 10px;border-radius:99px;background:var(--inset);border:1px solid var(--line);color:var(--tx);white-space:nowrap}.dchip i{font-style:normal;font-family:inherit;color:var(--mu);margin-right:7px}
.dact{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}.dbtn{display:inline-flex;align-items:center;gap:8px;height:38px}.dbtn svg{width:14px;height:14px}
.vtag{padding:3px 10px;border-radius:99px;font-size:10.5px;font-weight:800;letter-spacing:.08em;border:1px solid}.v-nvidia{color:#76b900;background:rgba(118,185,0,.12);border-color:rgba(118,185,0,.35)}.v-amd{color:#ff4b55;background:rgba(237,28,36,.12);border-color:rgba(237,28,36,.35)}.v-intel{color:#4aa3ff;background:rgba(0,113,197,.14);border-color:rgba(0,113,197,.4)}
.drow{display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--line)}.dh+.drow{border-top:0;padding-top:0}.dn2{flex:1;min-width:0;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dwu{display:block}.dwt{display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap}.dwt .dh{flex:1;min-width:260px}#drwul:not(:empty){margin-top:14px;padding-top:6px;border-top:1px solid var(--line)}
.dnote{display:flex;gap:10px;align-items:flex-start;margin-top:16px;font-size:12px;color:var(--mu);line-height:1.5}.dnote svg{width:16px;height:16px;flex:none;color:var(--ac);margin-top:1px}
@media(max-width:1000px){.dgrid{grid-template-columns:minmax(0,1fr)}}`;
  document.head.append(s);
})();
(function () {
  const s = document.createElement('style');
  s.textContent = `.dgrid{gap:14px}
.dcard.dfeat{display:flex;flex-direction:column;overflow:hidden;background:radial-gradient(340px 180px at 100% 0,rgba(var(--vcrgb,var(--acrgb)),.17),transparent),var(--card)}
.dcard.dfeat::after{content:'';position:absolute;left:22px;right:22px;top:0;height:2px;border-radius:0 0 4px 4px;background:linear-gradient(90deg,rgb(var(--vcrgb,var(--acrgb))),transparent)}
.dfeat .mi.vc{width:40px;height:40px;border-radius:12px;color:rgb(var(--vcrgb,var(--acrgb)));background:rgba(var(--vcrgb,var(--acrgb)),.12);border-color:rgba(var(--vcrgb,var(--acrgb)),.38);box-shadow:0 0 22px -6px rgba(var(--vcrgb,var(--acrgb)),.75)}.dfeat .mi.vc svg{width:20px;height:20px}
.dfeat .dn{font-size:18px;line-height:1.3;letter-spacing:-.01em}.dfeat .dact{margin-top:auto;padding-top:18px}
.dsys{display:grid;grid-template-columns:1fr 1fr;gap:0 28px;padding:20px 22px}.dsys .dcol{min-width:0}.dsys .dcol+.dcol{border-left:1px solid var(--line);padding-left:28px}
.dsec{display:flex;align-items:center;gap:10px;margin:0 0 8px}.dcol .dsec:not(:first-child){margin-top:20px}.mi.sm{width:26px;height:26px;border-radius:8px}.mi.sm svg{width:14px;height:14px}
.dcnt{margin-left:auto;font-size:11px;color:var(--mu);padding:1px 9px;border-radius:99px;background:var(--inset);border:1px solid var(--line)}
.dsys .drow{padding:9px 0;gap:10px;border-top:1px solid var(--line)}.dsys .dsec+.drow{border-top:0}
.dd{width:6px;height:6px;border-radius:50%;background:var(--ac);box-shadow:0 0 8px var(--ac);flex:none}.ddt{font-size:11.5px;color:var(--mu);font-family:ui-monospace,Consolas,monospace;white-space:nowrap}
.dcard.dwu{border-left:3px solid var(--ac)}
@media(max-width:1000px){.dsys{grid-template-columns:minmax(0,1fr)}.dsys .dcol+.dcol{border:0;padding:0;margin-top:20px}}`;
  document.head.append(s);
})();
PG.drivers = () => `<div class="opH st"><div class="opT"><span class="ptile">${ico('chip')}</span><div><h1>Drivers</h1><p class="mu">Identifica seu hardware e leva você às páginas oficiais dos fabricantes. Nada é instalado automaticamente.</p></div></div><div class="dtop"><span class="stp ${S.drv && S.drv.ok ? 'ok' : 'run'}" id="drst"><i></i>${S.drv && S.drv.ok ? 'Hardware detectado' : 'Detectando...'}</span><button class="obtn" id="drf">${ico('refresh')}Detectar de novo</button></div></div><div id="drbox"><div class="dgrid">${[0, 1, 2, 3].map(() => '<div class="dcard st"><div class="sk" style="width:40%;margin-bottom:16px"></div><div class="sk" style="margin-bottom:8px"></div><div class="sk" style="width:70%"></div></div>').join('')}</div><p class="mu sm" style="margin-top:14px">Detectando hardware... pode levar até 1 minuto.</p></div>`;
async function loadDrivers() { if (!S.drv) S.drv = await api.driversScan(); if (page === 'drivers') drRender(); }
function drRender() {
  const d = S.drv, box = $('#drbox'); if (!box) return;
  const pill = (c, t) => { const e = $('#drst'); if (e) { e.className = 'stp ' + c; e.innerHTML = '<i></i>' + tr(t); } };
  if (!d || !d.ok) { pill('idle', 'Falha na detecção'); box.innerHTML = '<div class="card"><p class="mu" style="margin:0">Não consegui detectar o hardware. Tente de novo ou abra como administrador.</p></div>'; i18n(box); return; }
  pill('ok', 'Hardware detectado');
  const tag = v => DV[v] ? `<span class="vtag v-${v}">${DV[v]}</span>` : '';
  const B = (k, t, main) => `<button class="${main ? 'btn' : 'obtn'} dbtn" data-dro="${k}">${t}${ico('open')}</button>`;
  const vlink = v => v === 'nvidia' ? B('nvidia', 'Drivers NVIDIA (oficial)', 1) : v === 'amd' ? B('amd', 'Drivers AMD (oficial)', 1) : v === 'intel' ? B('intel', 'Drivers Intel (oficial)', 1) + B('intelDSA', 'Intel Driver & Support Assistant') : '';
  const chip = (k, v) => v ? `<span class="dchip"><i>${k}</i>${esc(v)}</span>` : '';
  const rows = a => a.length ? a.map(x => `<div class="drow"><span class="dn2" title="${esc(x.name)}">${esc(x.name)}</span><span class="dchip">${esc(x.version)}${x.date ? ' · ' + esc(x.date) : ''}</span></div>`).join('') : '<p class="mu sm" style="margin:0">Nada identificado.</p>';
  const head = (ic, k, extra = '') => `<div class="dh"><span class="mi">${ico(ic)}</span><span class="dk">${k}</span>${extra}</div>`;
  const VC = { nvidia: '118,185,0', amd: '237,28,36', intel: '0,113,197' };
  const feat = (ic, k, v, name, body, acts) => `<div class="dcard st dfeat" style="--vcrgb:${VC[v] || 'var(--acrgb)'}"><div class="dh"><span class="mi vc">${ico(ic)}</span><span class="dk">${k}</span>${tag(v)}</div><div class="dn">${esc(name)}</div>${body}<div class="dact">${acts}</div></div>`;
  const rows2 = a => a.length ? a.map(x => `<div class="drow"><i class="dd"></i><span class="dn2" title="${esc(x.name)}">${esc(x.name)}</span><span class="dchip">${esc(x.version)}</span>${x.date ? `<span class="ddt">${esc(x.date)}</span>` : ''}</div>`).join('') : '<p class="mu sm" style="margin:4px 0 0">Nada identificado.</p>';
  const sec = (ic, k, a) => `<div class="dsec"><span class="mi sm">${ico(ic)}</span><span class="dk">${k}</span><span class="dcnt">${a.length}</span></div>${rows2(a)}`;
  box.innerHTML = `<div class="dgrid">`
    + feat('chip', 'PROCESSADOR', d.cpu.vendor, d.cpu.name, '<p class="mu sm" style="margin:8px 0 0">Chipset e gráficos integrados vêm da página do fabricante.</p>', vlink(d.cpu.vendor))
    + d.gpus.map(g => feat('gpu', 'PLACA DE VÍDEO', g.vendor, g.name, `<div class="dchips">${chip('Driver', g.friendly || g.version)}${g.friendly ? chip('Pacote', g.version) : ''}${chip('Data', g.date)}</div>`, vlink(g.vendor))).join('')
    + `<div class="dcard st wide dsys"><div class="dcol">${sec('chip', 'CHIPSET E PLATAFORMA', d.chipset)}</div><div class="dcol">${sec('net', 'REDE', d.net)}${sec('audio', 'ÁUDIO', d.audio)}</div></div>`
    + `<div class="dcard st wide dwu"><div class="dwt"><div class="dh" style="margin:0"><span class="mi">${ico('refresh')}</span><div><div class="dn">Windows Update</div><p class="mu sm" style="margin:3px 0 0">Procura drivers que a Microsoft já disponibiliza para o seu PC. Pode levar alguns minutos.</p></div></div><div class="dact" style="margin:0"><button class="btn dbtn" id="drwu">Procurar drivers</button>${B('wu', 'Abrir Windows Update')}</div></div><div id="drwul"></div></div></div>`
    + `<div class="dnote st">${ico('shield')}<span>A versão mais nova publicada pelo fabricante não é consultada automaticamente: use os botões oficiais. A busca do Windows Update mostra apenas o que a Microsoft oferece.</span></div>`;
  i18n(box); stag();
}
const DV = { nvidia: 'NVIDIA', amd: 'AMD', intel: 'Intel' };

// ---------- análise de BIOS e hardware ----------
// ---------- bloom (luz de destaque): Painel, Saúde do PC, Limpeza e Drivers ----------
// O brilho fica SEMPRE dentro do card (overflow:hidden, sem sombra para fora).
(function () {
  const s = document.createElement('style');
  s.textContent = `
.hban,.hdual>.card,.bhero,.csum,.dcard.dfeat,.dcard.dsys,.dcard.dwu{position:relative;overflow:hidden;isolation:isolate;border-color:rgba(var(--acrgb),.26);box-shadow:none;transition:border-color .3s,background .3s}
.hban:hover,.hdual>.card:hover,.bhero:hover,.csum:hover,.dcard.dfeat:hover,.dcard.dsys:hover,.dcard.dwu:hover{border-color:rgba(var(--acrgb),.45);box-shadow:none}
/* Painel */
.hban{background:radial-gradient(520px 170px at 0% 0%,rgba(var(--acrgb),.16),transparent 70%),radial-gradient(420px 200px at 100% 100%,rgba(var(--acrgb),.09),transparent 70%),var(--card)}
.hdual>.card{background:radial-gradient(320px 170px at 0% 100%,rgba(var(--acrgb),.16),transparent 70%),radial-gradient(320px 170px at 100% 0%,rgba(var(--acrgb),.07),transparent 70%),var(--card)}
/* Saúde do PC */
.bhero{background:radial-gradient(480px 300px at 100% 0%,rgba(var(--acrgb),.26),transparent 70%),radial-gradient(380px 200px at 0% 100%,rgba(var(--acrgb),.08),transparent 70%),var(--card)}
/* Limpeza */
.csum{background:radial-gradient(460px 240px at 100% 100%,rgba(var(--acrgb),.24),transparent 70%),radial-gradient(380px 170px at 0% 0%,rgba(var(--acrgb),.10),transparent 70%),var(--card)}
/* Drivers: processador/placa de vídeo usam a cor do fabricante; as demais, a cor do tema */
.dcard.dfeat{background:radial-gradient(360px 190px at 100% 0%,rgba(var(--vcrgb,var(--acrgb)),.22),transparent 70%),radial-gradient(300px 160px at 0% 100%,rgba(var(--vcrgb,var(--acrgb)),.08),transparent 70%),var(--card);border-color:rgba(var(--vcrgb,var(--acrgb)),.3)}
.dcard.dfeat:hover{border-color:rgba(var(--vcrgb,var(--acrgb)),.5)}
.dcard.dfeat .mi.vc{box-shadow:inset 0 0 12px rgba(var(--vcrgb,var(--acrgb)),.18)}
.dcard.dsys{background:radial-gradient(420px 220px at 0% 100%,rgba(var(--acrgb),.14),transparent 70%),radial-gradient(420px 200px at 100% 0%,rgba(var(--acrgb),.08),transparent 70%),var(--card)}
.dcard.dwu{background:radial-gradient(460px 200px at 100% 100%,rgba(var(--acrgb),.17),transparent 70%),radial-gradient(320px 150px at 0% 0%,rgba(var(--acrgb),.07),transparent 70%),var(--card)}
/* ícones com luz suave */
.hban .ptile,.opH:has(+.bhero) .ptile,.opH:has(+.csum) .ptile,.opH:has(+#drbox) .ptile,.opH:has(+.opbar) .ptile,.opH:has(+.cs2g) .ptile{color:var(--ac);background:rgba(var(--acrgb),.14);border-color:rgba(var(--acrgb),.42);box-shadow:0 0 16px -4px rgba(var(--acrgb),.55),inset 0 0 12px rgba(var(--acrgb),.14)}
.hdual .mk2 svg,.csum .mi,.dcard.dsys .mi,.dcard.dwu .mi{background:rgba(var(--acrgb),.14);border-color:rgba(var(--acrgb),.38);box-shadow:inset 0 0 10px rgba(var(--acrgb),.16)}
/* botões principais */
.hban .btn,.hdual .btn,.bhero .btn,.csum .btn,.dcard .btn{background:linear-gradient(135deg,var(--ac),var(--ac2));box-shadow:0 4px 16px -6px rgba(var(--acrgb),.65)}
/* anéis do Painel */
.hdual .rgc .fg{filter:drop-shadow(0 0 4px rgba(var(--acrgb),.75))}
.hdual .rgc::before{content:'';position:absolute;inset:-8px;border-radius:50%;background:radial-gradient(closest-side,rgba(var(--acrgb),.18),transparent);filter:blur(6px);pointer-events:none}
/* orbe (Saúde do PC e Limpeza), brilho dentro do card */
.orb::before{content:'';position:absolute;inset:-26px;border-radius:50%;background:radial-gradient(closest-side,rgba(var(--acrgb),.28),rgba(var(--acrgb),.07) 65%,transparent);filter:blur(8px);pointer-events:none;z-index:-1}
.orb i{animation:orbp 3.6s ease-in-out infinite;box-shadow:inset 0 0 14px -4px rgba(var(--acrgb),.25)}
.orb i:nth-child(2){animation-delay:.6s}.orb i:nth-child(3){animation-delay:1.2s}
.orb .oc{background:rgba(var(--acrgb),.16);box-shadow:0 0 26px rgba(var(--acrgb),.5)}.orb .oc svg{filter:drop-shadow(0 0 5px rgba(var(--acrgb),.85))}
.orb .dot{box-shadow:0 0 10px var(--ac)}
/* Limpeza: cards de itens (luz só por dentro) */
.ccard:hover{border-color:rgba(var(--acrgb),.5);box-shadow:inset 0 0 30px -12px rgba(var(--acrgb),.4)}
.ccard.on{border-color:var(--ac);background:radial-gradient(240px 150px at 0% 0%,rgba(var(--acrgb),.18),transparent 70%),rgba(var(--acrgb),.07);box-shadow:inset 0 0 34px -12px rgba(var(--acrgb),.5)}
/* tema claro */
html[data-mode=light] .hban,html[data-mode=light] .hdual>.card,html[data-mode=light] .bhero,html[data-mode=light] .csum,html[data-mode=light] .dcard.dsys,html[data-mode=light] .dcard.dwu{background:radial-gradient(480px 220px at 100% 0%,rgba(var(--acrgb),.10),transparent 70%),var(--card)}
@media(prefers-reduced-motion:reduce){.orb i{animation:none}}`;
  document.head.append(s);
})();
// ---------- aba ativa do menu: pílula #1B1B1B com barra de destaque colada na esquerda ----------
(function () {
  const s = document.createElement('style');
  s.textContent = `
#nav #ind{left:0!important;top:7px;width:3px;height:22px!important;z-index:2;border-radius:0 3px 3px 0;background:var(--ac);box-shadow:0 0 10px rgba(var(--acrgb),.65)}
#nav .nv{border:1px solid transparent}
html:not([data-mode=light]) #nav .nv.on{background:#1B1B1B!important;border-color:rgba(255,255,255,.08)!important;color:#fff!important;font-weight:600}
html:not([data-mode=light]) #nav .nv.on svg,html:not([data-mode=light]) #nav .nv.on .cs2i{color:#fff!important}
html[data-mode=light] #nav .nv.on{border-color:rgba(0,0,0,.06)}`;
  document.head.append(s);
})();
PG.health = () => {
  const st = S.hscan ? ['run', 'Analisando...'] : S.hres ? ['ok', 'Análise concluída'] : ['idle', 'Pronto para analisar'];
  return `<div class="opH st"><div class="opT"><span class="ptile">${ico('pulse')}</span><div><h1>Saúde do PC</h1><p class="mu">Análise de BIOS e hardware, compatível com o seu equipamento</p></div></div><span class="stp ${st[0]}" id="hst"><i></i>${st[1]}</span></div>
<div class="bhero st"><div class="bhx"><span class="bkick"><i></i>ANÁLISE DE BIOS E HARDWARE</span><h2>Descubra o que pode melhorar no seu PC</h2><p>Uma análise automática lê memória, processador, placa de vídeo e recursos do Windows e mostra apenas o que se aplica ao seu equipamento. Nenhuma configuração é alterada.</p><div class="bact"><button class="btn bgo" id="hscan">${ico('play')}${S.hres ? 'Analisar novamente' : 'Iniciar análise'}</button><span class="bsafe">${ico('shield')}Processo automatizado e somente leitura</span></div></div><div class="orb"><i></i><i></i><i></i><span class="dot"></span><span class="dot d2"></span><span class="oc">${ico('pulse')}</span></div></div>
<div id="hbody">${S.hscan ? '<div class="card"><p id="hp" class="mu">Iniciando...</p><div class="prog"><i id="hpb"></i></div></div>' : ''}</div>
<div class="binfo st"><span class="bwi">${ico('warn')}</span><div class="bit"><b>Informação importante</b><p>A análise apenas lê informações do seu PC. Ajustes de BIOS e de hardware têm riscos inerentes: o uso é de responsabilidade do usuário e o ${esc(S.brand)} não se responsabiliza por eventuais danos ao hardware.</p>${S.discord ? '<small>Se precisar de ajuda, acesse nosso Discord e abra um ticket com a equipe de suporte.</small>' : ''}</div>${S.discord ? `<button class="obtn" id="dc">${ico('discord')}Abrir Discord</button>` : ''}</div>`;
};
function loadHealth() { if (S.hres) hRender(); }
async function hScan() {
  if (!(await modal({ title: 'Analisar meu PC', html: '<p>A análise lê informações de memória, processador, placa de vídeo, recursos do Windows e registros de erros. Pode levar alguns minutos.</p><p><b>Não feche o aplicativo nem reinicie o PC</b> durante a análise.</p><p>Nenhuma configuração do Windows ou da BIOS será alterada.</p>', ok: 'Iniciar análise' }))) return;
  S.hscan = true; { const t = $('#hst'); if (t) { t.className = 'stp run'; t.innerHTML = '<i></i>' + tr('Analisando...'); } const g = $('#hscan'); if (g) g.disabled = true; } $('#hbody').innerHTML = '<div class="card"><p id="hp" class="mu">Iniciando...</p><div class="prog"><i id="hpb"></i></div></div>';
  try { S.hres = await api.healthFull(); } catch { S.hres = null; toast('A análise falhou.', 'err'); }
  S.hscan = false; if (page === 'health') go('health');
}
function hRender() {
  const r = S.hres, b = $('#hbody'); if (!b) return; if (!r) { b.innerHTML = ''; return; }
  const SRC = { windows: 'Detectado pelo Windows', estimate: 'Estimado a partir de dados do Windows', bios: 'Exige consultar a BIOS' }, ST = { on: 'Ativado', off: 'Desativado', unknown: 'Desconhecido' }, SI = { on: 'okc', off: 'warn', unknown: 'unk' };
  const cnt = s => r.items.filter(x => x.state === s).length, un = r.items.length - cnt('on') - cnt('off');
  const tile = x => { const s = ST[x.state] ? x.state : 'unknown'; return `<div class="ht ${s}" data-hx title="${esc(x.ev || '')}"><span class="hti">${ico(SI[s])}</span><b>${esc(x.title)}</b><span class="hts"><i></i>${ST[s]}</span>${x.ev || x.adv ? `<div class="htd">${x.ev ? `<p>${esc(x.ev)}</p>` : ''}${x.adv ? `<small>${esc(x.adv)}</small>` : ''}</div>` : ''}</div>`; };
  b.innerHTML = `<div class="hres st"><div class="hsum"><span class="hsi">${ico('okc')}</span><div class="hsx"><b>Resultado da análise</b><small>${r.items.length} ${r.items.length === 1 ? 'item verificado' : 'itens verificados'} neste equipamento. Clique em um item para ver os detalhes.</small></div><div class="hch"><span class="hcp on"><i></i>${cnt('on')} ${tr('Ativado')}</span><span class="hcp off"><i></i>${cnt('off')} ${tr('Desativado')}</span>${un ? `<span class="hcp unk"><i></i>${un} ${tr('Desconhecido')}</span>` : ''}</div></div>`
    + ['windows', 'estimate', 'bios'].map(k => { const l = r.items.filter(x => x.src === k); return l.length ? `<div class="hsec"><span>${SRC[k]}</span><em>${l.length}</em></div><div class="hg">${l.map(tile).join('')}</div>` : ''; }).join('')
    + `<p class="hft">Análise de ${new Date(r.when).toLocaleString(LOC())}. Nenhuma configuração foi alterada.</p></div>`;
  i18n(b);
}

// ---------- atualizador integrado ----------
const _cfg0 = PG.cfg;
const startCard = () => `<div class="card st" style="margin-top:12px"><h3>Inicialização</h3><div class="list"><div class="row"><div><b>Iniciar com o Windows</b><small>Abre o programa escondido na bandeja quando você entra no Windows. Como administrador, usa uma tarefa agendada e não pede confirmação.</small></div><div class="sw ${S.auto && S.auto.startup ? 'on' : ''}" id="sstart"></div></div><div class="row"><div><b>Executar em segundo plano</b><small>Ao fechar a janela, o programa continua na bandeja (perto do relógio) para a limpeza automática funcionar. Desligado, fechar a janela encerra o programa.</small></div><div class="sw ${!S.auto || S.auto.background !== false ? 'on' : ''}" id="sbg"></div></div><div class="row"><div><b>Sempre abrir como administrador</b><small>Pede a permissão do Windows (UAC) ao abrir, para os ajustes e limpezas que exigem administrador funcionarem sempre.</small></div><div class="sw ${S.alwaysAdmin ? 'on' : ''}" id="sadm"></div></div></div></div>`;
PG.cfg = () => { const h = _cfg0(), k = '<div class="card st" style="margin-top:12px"><h3>Cor do programa</h3>', i = h.indexOf(k); return (i < 0 ? h : h.slice(0, i) + startCard() + h.slice(i)) + `<div class="card st" style="margin-top:12px"><h3>Atualizações</h3><p class="mu sm">Versão atual: v${S.ver}. O programa baixa o instalador da Release do GitHub, confere o checksum SHA-256 e só então instala. Suas configurações são mantidas.</p><button class="btn" id="updchk">Verificar atualizações</button></div>`; };
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

// ---------- visual novo: Otimizações, Limpeza e BIOS ----------
Object.assign(IC, {
  warn: 'M12 3 2 21h20zM12 10v5M12 18v.5', search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3', filter: 'M3 5h18l-7 8v6l-4 2v-8z',
  sliders: 'M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4', star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  play: 'M7 4l13 8-13 8z', refresh: 'M20 11a8 8 0 0 0-14-4M4 4v4h4M4 13a8 8 0 0 0 14 4M20 20v-4h-4', img: 'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6',
  file: 'M6 3h9l4 4v14H6zM14 3v5h5', clock: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', gauge: 'M4 18a8 8 0 1 1 16 0M12 18l4-6',
  discord: 'M7 8c3-1.5 7-1.5 10 0M6 17c4 2 8 2 12 0M7 8l-3 9 3 2M17 8l3 9-3 2M9.5 13h.01M14.5 13h.01',
});
(function () {
  const s = document.createElement('style');
  s.textContent = `.opH{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px}.opT{display:flex;align-items:center;gap:14px}.opT h1{margin:0;font-size:22px}.opT p{margin:3px 0 0;font-size:13px}
.ptile{width:46px;height:46px;border-radius:13px;display:grid;place-items:center;flex:none;color:var(--ac);background:rgba(var(--acrgb),.12);border:1px solid rgba(var(--acrgb),.35);box-shadow:0 0 22px -6px rgba(var(--acrgb),.6)}.ptile svg{width:22px;height:22px}
.spill{padding:7px 14px;border-radius:99px;font-size:12.5px;color:var(--mu);background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.25);white-space:nowrap}.spill b{color:#34d399}
.opbar{display:flex;align-items:center;gap:10px;padding:10px;border:1px solid var(--line);border-radius:14px;background:var(--card);margin-bottom:8px;position:relative;z-index:20}
.osr{display:flex;align-items:center;gap:8px;flex:1;max-width:320px;height:40px;padding:0 12px;border-radius:11px;background:var(--inset);border:1px solid var(--line);color:var(--mu);transition:.2s}.osr:focus-within{border-color:var(--ac)}.osr svg{width:16px;height:16px;flex:none}.osr input{flex:1;min-width:0;background:none;border:0;outline:0;color:var(--tx);font:inherit;font-size:13.5px}
.obtn{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 14px;border-radius:11px;border:1px solid var(--line);background:var(--hov);color:var(--tx);font:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:.2s;white-space:nowrap}.obtn:hover,.obtn.on,.omw.on .obtn{border-color:rgba(var(--acrgb),.6);background:rgba(var(--acrgb),.1)}.obtn svg{width:16px;height:16px;color:var(--ac)}.obtn .chev{width:10px;height:10px;color:var(--mu);transition:.2s}.omw.on .chev{transform:rotate(180deg)}
.osp{flex:1}.ostar{display:inline-flex;align-items:center;gap:8px;height:40px}.ostar svg{width:16px;height:16px}
.omw{position:relative}.omenu{position:absolute;top:calc(100% + 8px);left:0;z-index:60;width:380px;padding:10px;border-radius:14px;background:var(--elev);border:1px solid var(--line);box-shadow:0 18px 50px var(--shadow);opacity:0;transform:translateY(-6px) scale(.98);pointer-events:none;transition:.18s}.omw.on .omenu{opacity:1;transform:none;pointer-events:auto}
.omh{padding:8px 10px 8px;font-size:10.5px;letter-spacing:.12em;color:var(--mu);font-weight:700}
.oit{position:relative;display:flex;align-items:center;gap:12px;width:100%;padding:10px;border:1px solid transparent;border-radius:11px;background:none;color:var(--tx);font:inherit;text-align:left;cursor:pointer;transition:.2s}.oit:hover{background:var(--hov)}.oit b{display:block;font-size:13.5px}.oit small{display:block;color:var(--mu);font-size:11.5px;margin-top:2px;line-height:1.35}.oit .ico{width:40px;height:40px}
.oit.lqi{margin-bottom:4px;overflow:hidden;isolation:isolate;border-color:rgba(var(--acrgb),.25);animation:lqglow 3.2s ease-in-out infinite}.oit.lqi::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.5px;z-index:3;pointer-events:none;background:conic-gradient(from var(--ang),transparent 0 55%,rgba(var(--acrgb),1) 75%,#fff 85%,rgba(var(--acrgb),1) 92%,transparent 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:lqspin 3.6s linear infinite}
.oit.lqi .lqbg{inset:0 0 0 50%;opacity:.4}.oit.lqi:hover .lqbg{opacity:.75;transform:scale(1.06)}.oit.lqi>span{position:relative;z-index:2}.lqav.sm{width:40px;height:40px;border-radius:11px}
.ofilt{padding:6px 2px 0}.ofilt[hidden]{display:none}
.osec{margin:22px 0 12px}.oh{display:inline-flex;align-items:center;gap:9px;font-size:12px;font-weight:700;letter-spacing:.1em}.oh svg{width:15px;height:15px;color:var(--ac);padding:4px;box-sizing:content-box;border-radius:7px;background:rgba(var(--acrgb),.14)}
.og{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:12px}
.orb{position:relative;width:150px;height:150px;flex:none}.orb i{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(var(--acrgb),.28);animation:orbp 3.6s ease-in-out infinite}.orb i:nth-child(2){inset:18px;animation-delay:.6s}.orb i:nth-child(3){inset:36px;animation-delay:1.2s;border-color:rgba(var(--acrgb),.45)}
.orb .oc{position:absolute;inset:50px;border-radius:14px;display:grid;place-items:center;color:var(--ac);background:rgba(var(--acrgb),.14);border:1px solid rgba(var(--acrgb),.5);box-shadow:0 0 28px rgba(var(--acrgb),.45)}.orb .oc svg{width:24px;height:24px}
.orb .dot{position:absolute;left:50%;top:0;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:var(--ac);box-shadow:0 0 10px var(--ac);transform-origin:3px 78px;animation:orbit 7s linear infinite}.orb .dot.d2{width:4px;height:4px;margin:-2px 0 0 -2px;transform-origin:2px 77px;opacity:.7;animation-duration:11s;animation-direction:reverse}
@keyframes orbit{to{transform:rotate(360deg)}}@keyframes orbp{50%{transform:scale(1.05);opacity:.55}}
.bhero{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:30px 36px;border:1px solid var(--line);border-radius:18px;margin-bottom:14px;background:radial-gradient(520px 260px at 100% 0,rgba(var(--acrgb),.2),transparent),linear-gradient(120deg,rgba(var(--acrgb),.06),transparent 60%),var(--card)}
.bhx{max-width:560px}.bkick{display:inline-flex;align-items:center;gap:10px;font-size:11px;letter-spacing:.16em;color:var(--ac);font-weight:700}.bkick i{width:18px;height:2px;background:var(--ac)}.bhx h2{margin:12px 0 10px;font-size:30px;line-height:1.15;letter-spacing:-.02em}.bhx p{color:var(--mu);line-height:1.6;margin:0 0 20px;font-size:13.5px}
.bact{display:flex;align-items:center;gap:16px;flex-wrap:wrap}.bgo{display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 22px}.bgo svg{width:14px;height:14px}.bsafe{display:inline-flex;align-items:center;gap:7px;font-size:12px;color:var(--mu)}.bsafe svg{width:15px;height:15px;color:#34d399}
.binfo{display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid rgba(251,191,36,.25);border-radius:14px;background:rgba(251,191,36,.05);margin-top:16px}.bwi{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;flex:none;color:#e8a30b;background:rgba(251,191,36,.14);border:1px solid rgba(251,191,36,.3)}.bwi svg{width:18px;height:18px}
.bit{flex:1;min-width:0}.bit b{font-size:13px}.bit p{margin:3px 0 0;font-size:12px;color:var(--mu);line-height:1.5}.bit small{display:block;margin-top:3px;color:var(--mu);opacity:.75;font-size:11.5px}
.stp{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:99px;font-size:12.5px;color:var(--mu);border:1px solid var(--line);background:var(--card);white-space:nowrap}.stp i{width:7px;height:7px;border-radius:50%;background:var(--mu)}.stp.run{color:var(--ac)}.stp.run i{background:var(--ac);animation:orbp 1s infinite}.stp.ok{color:#34d399;border-color:rgba(52,211,153,.3)}.stp.ok i{background:#34d399}
.csum{position:relative;overflow:hidden;padding:20px 22px;border:1px solid rgba(var(--acrgb),.28);border-radius:16px;margin-bottom:14px;background:radial-gradient(420px 220px at 100% 0,rgba(var(--acrgb),.18),transparent),var(--card)}.csum .cin{padding-right:170px}.csum .orb{position:absolute;right:18px;top:50%;margin-top:-75px}
.cst{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding-bottom:16px;border-bottom:1px solid var(--line);margin-bottom:16px}.cs1{display:flex;align-items:center;gap:12px;padding-right:12px;min-width:0}.cs1+.cs1{padding-left:18px;border-left:1px solid var(--line)}
.mi{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;color:var(--ac);background:rgba(var(--acrgb),.12);border:1px solid rgba(var(--acrgb),.3);flex:none}.mi svg{width:18px;height:18px}.cs1 b{display:block;font-family:ui-monospace,Consolas,monospace;font-size:15px;white-space:nowrap}.cs1 small{color:var(--mu);font-size:12px}
.crow{display:flex;align-items:center;gap:14px;flex-wrap:wrap}.crow .cx{flex:1;min-width:180px}.crow .cx b{display:block;font-size:14px}.crow .cx small{color:var(--mu)}.osel{height:40px;padding:0 12px;border-radius:11px;border:1px solid var(--line);background:var(--elev);color:var(--tx);font:inherit;font-size:13px;cursor:pointer;outline:0}.osel:focus{border-color:var(--ac)}
.cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:6px}
.ccard{position:relative;display:flex;flex-direction:column;gap:8px;padding:16px;border:1px solid var(--line);border-radius:14px;background:var(--card);cursor:pointer;transition:.2s}.ccard:hover{border-color:rgba(var(--acrgb),.5);transform:translateY(-2px)}.ccard.on{border-color:var(--ac);background:rgba(var(--acrgb),.08)}
.cbx{position:absolute;top:14px;right:14px;width:18px;height:18px;border-radius:5px;border:1.5px solid var(--mu);transition:.2s;display:grid;place-items:center}.ccard.on .cbx{background:var(--ac);border-color:var(--ac)}.ccard.on .cbx::after{content:'';width:9px;height:5px;border-left:2px solid var(--onac);border-bottom:2px solid var(--onac);transform:rotate(-45deg) translate(1px,-1px)}
.cic{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;color:var(--ac);background:rgba(var(--acrgb),.12)}.cic svg{width:18px;height:18px}.ccard b{font-size:14px;margin-top:6px}.ccard p{margin:0;color:var(--mu);font-size:12.5px;line-height:1.45;flex:1}
.cft{display:flex;align-items:center;justify-content:space-between;margin-top:6px}.csz{font-family:ui-monospace,Consolas,monospace;font-size:12px;padding:3px 8px;border-radius:7px;background:var(--inset);color:var(--tx)}
@media(max-width:1100px){.csum .orb,.bhero .orb{display:none}.csum .cin{padding-right:0}}`;
  document.head.append(s);
})();

// ---- Otimizações ----
const OPT_ORDER = ['Desempenho', 'Gaming', 'Geral', 'Privacidade', 'Crítico'], OPT_ICO = { Desempenho: 'bolt', Gaming: 'chip', Geral: 'sl', Privacidade: 'shield', 'Crítico': 'warn' };
const optSec = t => ['Crítico', 'Privacidade', 'Desempenho', 'Gaming', 'Geral'].find(k => t.c.includes(k)) || t.c[0] || 'Geral';
const profMenu = () => `<div class="omh">PERFIS DE OTIMIZAÇÃO</div><button class="oit lqi" data-preset="luquinhas"><div class="lqbg"></div><div class="lqfx"></div><span class="lqav sm"><img src="preset-luquinhas.jpg" alt=""></span><span><b class="gr">Configs do Luquinhas</b><small>Preset do criador: tudo do CS2 + ajustes extras do Windows</small></span></button><button class="oit" data-preset="cs2"><span class="ico" data-ic="game_cs2"><b>CS2</b></span><span><b>Otimização para CS2</b><small>Ajustes recomendados de FPS e latência para o CS2</small></span></button>`;
PG.opt = () => {
  const cats = ['Todos', 'Afeta FPS', ...new Set(S.tweaks.flatMap(t => t.c))];
  return `<div class="opH st"><div class="opT"><span class="ptile">${ico('bolt')}</span><div><h1>Otimizações</h1><p class="mu">${tf('Otimize seu sistema com {0} ajustes disponíveis', S.tweaks.length)}</p></div></div><span class="spill"><b>${S.tweaks.length}</b> disponíveis · <b id="ac">${S.applied.size}</b> ativos</span></div>
<div class="opbar st"><label class="osr">${ico('search')}<input id="q" placeholder="Buscar ajuste..." value="${esc(S.q || '')}"></label><button class="obtn ${S.cat !== 'Todos' ? 'on' : ''}" id="opfilt">${ico('filter')}Filtrar</button><div class="omw"><button class="obtn" id="opmore">${ico('sliders')}Mais opções<svg class="chev" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div class="omenu">${profMenu()}</div></div><span class="osp"></span><button class="btn ostar" id="rec">${ico('star')}Ativar Recomendadas</button></div>
<div class="ofilt st" id="ofilt" ${S.cat !== 'Todos' ? '' : 'hidden'}><div class="chips">${cats.map(c => `<button class="chip ${c === S.cat ? 'on' : ''}" data-c="${c}">${c}</button>`).join('')}</div><div class="lgd"><span><i class="lg f"></i>Afeta o desempenho / FPS</span><span><i class="lg"></i>Não afeta o FPS</span></div></div>
<div id="grid"></div>`;
};
grid = function () {
  const g = $('#grid'); if (!g) return;
  const q = (S.q || '').toLowerCase(), by = {};
  S.tweaks.filter(t => (S.cat === 'Todos' || (S.cat === 'Afeta FPS' ? t.fps : t.c.includes(S.cat))) && (t.n + t.d).toLowerCase().includes(q)).forEach(t => (by[optSec(t)] = by[optSec(t)] || []).push(t));
  const keys = [...OPT_ORDER.filter(k => by[k]), ...Object.keys(by).filter(k => !OPT_ORDER.includes(k))];
  g.innerHTML = keys.map(k => `<div class="osec st"><span class="oh">${ico(OPT_ICO[k] || 'sl')}${esc(k).toUpperCase()}</span></div><div class="og">${by[k].map(card).join('')}</div>`).join('') || '<div class="big">Nenhum ajuste encontrado.</div>';
  i18n(g); stag();
};

// ---- Limpeza ----
const CL_UI = { temp: ['Arquivos temporários', 'file'], prefetch: ['Arquivos do Prefetch', 'gauge'], bin: ['Lixeira', 'trash'], wu: ['Cache do Windows Update', 'refresh'], thumbs: ['Cache de miniaturas', 'img'] };
const fmtB = b => b >= 1073741824 ? (b / 1073741824).toFixed(1) + ' GB' : b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : b >= 1024 ? Math.round(b / 1024) + ' KB' : b + ' B';
PG.clean = () => {
  const lc = S.lastClean ? new Date(S.lastClean).toLocaleString(LOC(), { dateStyle: 'short', timeStyle: 'short' }) : tr('nunca'), n = cl.size, fq = (S.auto && S.auto.freq) || 'never';
  return `<div class="opH st"><div class="opT"><span class="ptile">${ico('trash')}</span><div><h1>Limpeza do Sistema</h1><p class="mu">Libere espaço apagando arquivos temporários e lixo acumulado do sistema</p></div></div></div>
<div class="csum st"><div class="cin"><div class="cst"><div class="cs1"><span class="mi">${ico('disk')}</span><div><b id="cs-size">—</b><small>Espaço recuperável</small></div></div><div class="cs1"><span class="mi">${ico('file')}</span><div><b id="cs-cnt">—</b><small>Arquivos encontrados</small></div></div><div class="cs1"><span class="mi">${ico('clock')}</span><div><b>${esc(lc)}</b><small>Última limpeza</small></div></div></div>
<div class="crow"><span class="mi">${ico('trash')}</span><div class="cx"><b id="csel">${n ? (n === 1 ? '1 item selecionado' : tf('{0} itens selecionados', n)) : 'Nenhum item selecionado'}</b><small>Marque o que quer limpar, ou limpe tudo de uma vez</small></div>${S.auto ? `<button type="button" class="osel arbtn" id="arbtn">${tr('Repetir')}: ${tr((AU_FREQ.find(f => f[0] === fq) || AU_FREQ[0])[1])}${ico('chev')}</button>` : ''}<button class="btn cmain" id="${n ? 'doclean' : 'cleanall'}">${n ? tr('Limpar Selecionados') : tr('Limpar Tudo')}</button></div></div>
<div class="orb"><i></i><i></i><i></i><span class="dot"></span><span class="dot d2"></span><span class="oc">${ico('trash')}</span></div></div>
<div class="cgrid">${CLEAN.map(([id, , d, i]) => `<div class="ccard st ${cl.has(id) ? 'on' : ''}" data-clc="${id}"><span class="cbx"></span><span class="cic">${ico(CL_UI[id][1])}</span><b>${CL_UI[id][0]}</b><p>${d}</p><div class="cft"><code class="csz" data-sz="${id}">—</code>${id === 'bin' ? `<button class="dgi" data-tip="${esc(i)}">${ico('warn')}</button>` : ''}</div></div>`).join('')}</div>`;
};
function cleanSel() {
  const n = cl.size, t = $('#csel'), b = $('.cmain'); if (t) t.textContent = n ? (n === 1 ? tr('1 item selecionado') : tf('{0} itens selecionados', n)) : tr('Nenhum item selecionado');
  if (b) { b.id = n ? 'doclean' : 'cleanall'; b.textContent = n ? tr('Limpar Selecionados') : tr('Limpar Tudo'); }
}
function paintScan() {
  if (page !== 'clean') return; const r = S.cscan; let size = 0, cnt = 0;
  for (const [id] of CLEAN) { const e = $(`[data-sz="${id}"]`), v = r && r[id]; if (e) e.textContent = v ? fmtB(v.size) : '—'; if (v) { size += v.size; cnt += v.count; } }
  const a = $('#cs-size'), b = $('#cs-cnt'); if (a) a.textContent = r ? fmtB(size) : '—'; if (b) b.textContent = r ? String(cnt) : '—';
}
async function loadCleanScan() {
  if (S.cscan) return paintScan();
  if (S.cscanBusy) return; S.cscanBusy = true;
  try { S.cscan = await api.cleanScan(); } catch { S.cscan = null; }
  S.cscanBusy = false; paintScan();
}

// ---------- CS2: visual interno ----------
(function () {
  const s = document.createElement('style');
  s.textContent = `
.card.cs2c{position:relative;overflow:hidden;isolation:isolate;border-color:rgba(var(--acrgb),.26)}
.card.cs2c:hover{border-color:rgba(var(--acrgb),.45)}
.card.cs2c.cl1,.card.cs2c.cl1:hover{background:radial-gradient(420px 200px at 100% 0%,rgba(var(--acrgb),.2),transparent 70%),radial-gradient(320px 160px at 0% 100%,rgba(var(--acrgb),.07),transparent 70%),var(--card)}
.card.cs2c.cl2,.card.cs2c.cl2:hover{background:radial-gradient(380px 200px at 0% 100%,rgba(var(--acrgb),.17),transparent 70%),radial-gradient(320px 160px at 100% 0%,rgba(var(--acrgb),.07),transparent 70%),var(--card)}
.card.cs2c.cl3,.card.cs2c.cl3:hover{background:radial-gradient(520px 200px at 100% 0%,rgba(var(--acrgb),.12),transparent 70%),var(--card)}
.cs2h{display:flex;align-items:center;gap:10px;margin:0 0 6px}.cs2h h3{margin:0}
.cs2h .mi2{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;flex:none;color:var(--ac);background:rgba(var(--acrgb),.14);border:1px solid rgba(var(--acrgb),.38);box-shadow:inset 0 0 10px rgba(var(--acrgb),.16)}.cs2h .mi2 svg{width:16px;height:16px}
.cs2c .cd .hl{color:#fff;background:rgba(var(--acrgb),.28);border-radius:5px;padding:1px 5px}
.cs2sec{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:22px 0 12px}.cs2sec h3{margin:0}
.xopt{margin:6px 0 14px;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--inset)}
.xopt .row{padding:12px 14px}.xopt .row:first-child{border-top:0}.xopt .row small{display:block;color:var(--mu);font-size:12px;margin-top:2px}
.xopt .row.sub{padding:8px 14px 8px 28px;background:rgba(var(--acrgb),.05)}.xopt .row.sub span{font-size:13px;color:var(--mu)}
.xhint{margin:0 0 12px}
.mpl{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 14px}
.mp{display:inline-flex;align-items:center;gap:6px;padding:3px 12px 3px 4px;border-radius:99px;border:1px solid var(--line);background:var(--inset);color:var(--tx);font:inherit;font-size:12.5px;font-weight:600;cursor:pointer;transition:.2s}.mp:hover{border-color:rgba(var(--acrgb),.6)}.mp.on{border-color:var(--ac);background:rgba(var(--acrgb),.16);color:var(--ac3)}
.mp .mt{position:relative;display:block;border-radius:50%;background:#0c0c10;flex:none}.mp .mt img{position:absolute;display:block;margin:0;max-width:none;image-rendering:pixelated}
.mprev{display:flex;gap:16px;align-items:center}
.mstage{position:relative;width:140px;height:140px;flex:none;border-radius:16px;display:grid;place-items:center;overflow:hidden;border:1px solid rgba(var(--acrgb),.32);background:radial-gradient(circle at 50% 50%,rgba(var(--acrgb),.16),transparent 68%),linear-gradient(rgba(255,255,255,.035) 2px,transparent 2px) calc(50% - 1px) calc(50% - 1px)/10px 10px,linear-gradient(90deg,rgba(255,255,255,.035) 2px,transparent 2px) calc(50% - 1px) calc(50% - 1px)/10px 10px,#0c0c10;box-shadow:inset 0 0 24px rgba(0,0,0,.55)}
.mstage::before,.mstage::after{content:'';position:absolute;background:rgba(255,255,255,.08)}
.mstage::before{left:calc(50% - 1px);top:0;bottom:0;width:2px}.mstage::after{top:calc(50% - 1px);left:0;right:0;height:2px}
.mimg{position:relative;z-index:1;display:block;image-rendering:pixelated;filter:drop-shadow(0 0 6px var(--mc,#fff))}
.mtx{flex:1;min-width:0}.mtx>b{font-size:16px}.mtx .cd{margin:8px 0}
`;
  document.head.append(s);
})();
Object.assign(I18N, {
  'Executar em segundo plano': ['Run in background', 'Ejecutar en segundo plano'],
  'Ao fechar a janela, o programa continua na bandeja (perto do relógio) para a limpeza automática funcionar. Desligado, fechar a janela encerra o programa.': ['When you close the window, the program stays in the tray (near the clock) so automatic cleanup keeps working. When off, closing the window quits the program.', 'Al cerrar la ventana, el programa sigue en la bandeja (cerca del reloj) para que la limpieza automática funcione. Desactivado, cerrar la ventana cierra el programa.'],
  'O programa continuará em segundo plano ao fechar a janela.': ['The program will keep running in the background when you close the window.', 'El programa seguirá en segundo plano al cerrar la ventana.'],
  'Fechar a janela agora encerra o programa.': ['Closing the window now quits the program.', 'Cerrar la ventana ahora cierra el programa.'],
  'Miras': ['Crosshairs', 'Miras'], 'Copiar código da mira': ['Copy crosshair code', 'Copiar código de la mira'],
  'Pular no scroll': ['Jump on scroll', 'Saltar con la rueda'],
  'Zoom do radar': ['Radar zoom', 'Zoom del radar'],
  'Rolar para cima': ['Scroll up', 'Rueda arriba'], 'Rolar para baixo': ['Scroll down', 'Rueda abajo'],
  'Tecla do zoom do radar': ['Radar zoom key', 'Tecla del zoom del radar'],
  'Desativado: a cfg não inclui essa bind.': ['Off: the cfg does not include this bind.', 'Desactivado: la cfg no incluye este bind.']
});

// ---------- cliques dos módulos novos ----------
document.addEventListener('click', e => { if (!e.target.closest('.omw')) document.querySelectorAll('.omw.on').forEach(x => x.classList.remove('on')); });
document.addEventListener('change', e => { if (e.target.id === 'arep') setAuto({ freq: e.target.value }); });
document.addEventListener('click', async e => {
  const c = s => e.target.closest(s); let el;
  if (el = c('[data-dg]')) { const t = S.tweaks.find(x => x.id === el.dataset.dg); return modal({ title: t.n, html: dgHtml(t), ok: 'Entendi', single: true, danger: true }); }
  if (el = c('[data-go]')) return go(el.dataset.go);
  if (el = c('#gopt')) return go('opt');
  if (el = c('#gohealth')) { go('health'); return setTimeout(() => { const b = $('#hscan'); if (b && !S.hscan) b.click(); }, 80); }
  if (el = c('#opmore')) { el.closest('.omw').classList.toggle('on'); return; }
  if (el = c('#opfilt')) { const f = $('#ofilt'); f.hidden = !f.hidden; el.classList.toggle('on', !f.hidden); return; }
  if (el = c('[data-preset]')) { const m = document.querySelector('.omw'); if (m) m.classList.remove('on'); return runPreset(el.dataset.preset, $('#opmore') || el); }
  if (el = c('[data-clc]')) { const i = el.dataset.clc; cl.has(i) ? cl.delete(i) : cl.add(i); el.classList.toggle('on', cl.has(i)); return cleanSel(); }
  if (el = c('#sstart')) { const on = !(S.auto && S.auto.startup); try { S.auto = await api.autoSet({ startup: on }); } catch { return toast('Não foi possível alterar.', 'err'); } if (S.auto.startupNote) toast(S.auto.startupNote, 'err'); else toast(on ? 'O programa vai abrir junto com o Windows.' : 'Inicialização com o Windows desativada.'); return go('cfg'); }
  if (el = c('#sbg')) { const on = !!(S.auto && S.auto.background === false); try { S.auto = await api.autoSet({ background: on }); } catch { return toast('Não foi possível alterar.', 'err'); } toast(on ? 'O programa continuará em segundo plano ao fechar a janela.' : 'Fechar a janela agora encerra o programa.'); return go('cfg'); }
  if (el = c('#sadm')) {
    if (S.alwaysAdmin) { S.alwaysAdmin = await api.admSet(false); toast('O programa não vai mais pedir administrador ao abrir.'); return go('cfg'); }
    if (S.admin) { S.alwaysAdmin = await api.admSet(true); toast('Pronto! Ele sempre abrirá como administrador.'); return go('cfg'); }
    return busy(el, async () => { if (!(await api.elevate())) toast('Permissão de administrador não concedida.', 'err'); });
  }
  if (el = c('[data-af]')) return setAuto({ freq: el.dataset.af });
  if (el = c('[data-ai]')) { const a = S.auto, k = el.dataset.ai, items = a.items.filter(x => x !== 'bin'); const i = items.indexOf(k); i >= 0 ? items.splice(i, 1) : items.push(k); return setAuto({ items }); }
  if (el = c('#abin')) { const on = !S.auto.binAuth; if (on && !(await modal({ title: 'Esvaziar a Lixeira automaticamente', html: '<p>A cada limpeza automática, a Lixeira será esvaziada e os arquivos <b>apagados definitivamente</b>, sem aviso.</p>', ok: 'Autorizar', danger: true }))) return; return setAuto({ binAuth: on }); }
    if (el = c('#arun')) { if (!(await modal({ title: 'Executar limpeza agora', html: `<p>Será limpo: ${esc(S.auto.items.join(', ') || 'nada selecionado')}.${S.auto.items.includes('bin') ? ' <b>A Lixeira será esvaziada.</b>' : ''}</p>` }))) return; return busy(el, async () => { const r = await api.autoRun(); toast(tf('{0} de {1} limpezas concluídas', r.ok, r.total), r.ok < r.total ? 'err' : ''); S.auto = await api.autoGet(); S.cscan = null; go('clean'); }); }
  if (el = c('[data-hc]')) { S.hcat = el.dataset.hc; return hubRender(); }
  if (el = c('[data-ho]')) return api.hubOpen(el.dataset.ho);
  if (el = c('[data-hi]')) return busy(el, async () => { toast('Instalando... pode levar alguns minutos'); const r = await api.hubInstall(el.dataset.hi); if (r.opened) toast(r.note || 'Abrindo o site oficial...'); else if (r.ok) { toast('Instalado!'); S.appList = null; await loadHub(); } else toast(r.err || 'A instalação falhou.', 'err'); });
  if (el = c('#drf')) { S.drv = null; return go('drivers'); }
  if (el = c('[data-dro]')) return api.driversOpen(el.dataset.dro);
  if (el = c('#drwu')) return busy(el, async () => { const r = await api.driversWU(), box = $('#drwul'); if (!box) return; box.innerHTML = !r.ok ? `<p class="inc" style="margin:0">${esc(r.err)}</p>` : r.list.length ? r.list.map(x => `<div class="drow"><span class="dn2" title="${esc(x.t)}">${esc(x.t)}</span><span class="dchip">${esc(x.p || '')}</span></div>`).join('') : '<p class="mu sm" style="margin:8px 0 0">Nenhum driver novo disponível pelo Windows Update.</p>'; i18n(box); });
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
const _go0 = go; go = function (p) { const r = _go0(p); try { applyIcons(); if (p === 'clean') loadCleanScan(); p === 'home' ? liveOn() : liveOff(); } catch {} return r; };
async function ui2Init() {
  loadIcons(['game_cs2', 'game_valorant']);
  api.hubList().then(l => { S.hub = S.hub || l; loadIcons(l.map(h => h.id)); }).catch(() => {}); // ícones da Central prontos antes de abrir a página
  try { S.auto = await api.autoGet(); } catch {}
  api.onHealth(d => { const p = $('#hp'); if (p) { p.textContent = `${d.n}/${d.total} · ${d.l}`; const b = $('#hpb'); if (b) b.style.width = (d.n / d.total * 100) + '%'; } });
  api.onUpd(d => { const b = $('#upb'); if (b && d.t) { b.style.width = Math.min(100, d.g / d.t * 100) + '%'; const t = $('#upt'); if (t) t.textContent = (d.g / 1048576).toFixed(1) + ' / ' + (d.t / 1048576).toFixed(1) + ' MB'; } });
  try { await refreshState(); } catch {}
}

// ---------- Painel (métricas ao vivo) ----------
const liveS = () => (S.live = S.live || { cpu: [], gpu: [], ram: [], disk: [], last: null });
const LIVE_N = 60, LV_COL = { cpu: '96,165,250', gpu: '74,222,128', ram: '168,85,247', disk: '251,191,36' };
const fmtUp = sec => { sec = Math.max(0, Math.floor(sec)); const d = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60); return d ? `${d}d ${h}h` : h ? `${h}h ${String(m).padStart(2, '0')}min` : `${m}min`; };
const upNow = () => (S.up || 0) + (Date.now() - (S.upAt || Date.now())) / 1000;
function sparkD(a) {
  const n = LIVE_N, v = a.length ? a : [0], pts = Array.from({ length: n }, (_, i) => { const j = i - (n - v.length); return j < 0 ? v[0] : v[j]; });
  return pts.map((y, i) => `${i ? 'L' : 'M'}${(i / (n - 1) * 240).toFixed(1)},${(40 - Math.min(100, y) / 100 * 36).toFixed(1)}`).join('');
}
PG.home = () => {
  const s = S.sys || {}, L = liveS(), la = L.last || {}, ramGB = Math.round(parseFloat(s.ram) || 0), lvlv = lvl();
  const cards = [
    ['cpu', 'chip', 'CPU', s.cpu || '—', s.pcores ? tf('{0} NÚCLEOS', s.pcores) : ''],
    ['gpu', 'gpu', 'GPU', s.gpu || '—', s.vram ? s.vram + ' GB' : ''],
    ['ram', 'ram', 'RAM', (s.memType ? s.memType + ' · ' : '') + ramGB + ' GB', s.memType || ''],
    ['disk', 'disk', 'DISCO', s.size ? s.size + ' GB' : (s.disk || '—'), (s.dtype || '').toUpperCase()],
  ];
  const r = S.hres, on = r ? r.items.filter(x => x.state === 'on').length : 0, tot = r ? r.items.length : 0, hp = tot ? Math.round(on / tot * 100) : 0;
  return `<div class="hban st"><span class="ptile">${ico('bolt')}</span><div class="hbx"><b>Otimize seu PC</b><span>Aplique os ajustes recomendados e ganhe FPS em segundos.</span></div><button class="btn" id="gopt">Abrir Ajustes</button></div>
<div class="mgrid">${cards.map(([k, ic, t, name, tag]) => `<div class="card st mc" style="--mc:${LV_COL[k]}"><div class="mh"><span class="mk">${ico(ic)}${t}</span><b class="mv" data-lv="${k}">${la[k] != null ? la[k] : 0}%</b></div><div class="mrow"><div class="mnm" title="${esc(name)}">${esc(name)}</div>${tag ? `<span class="mt">${esc(tag)}</span>` : ''}</div><svg class="spk" viewBox="0 0 240 40" preserveAspectRatio="none"><path data-sp="${k}" d="${sparkD(L[k])}"/></svg></div>`).join('')}</div>
<div class="hdual"><div class="card st"><div class="mk2">${ico('gauge')}STATUS DE OTIMIZAÇÃO</div><div class="rgw"><div class="rgc"><svg viewBox="0 0 100 100"><circle class="bgc" cx="50" cy="50" r="42"/><circle class="fg" id="ring" cx="50" cy="50" r="42"/></svg><b><span id="nl">0</span>%</b></div><div class="rgr"><div class="rrow">Ajustes disponíveis<span class="nb">${S.tweaks.length}</span></div><div class="rrow">Ajustes ativos<span class="nb ok" id="na">0</span></div></div></div></div>
<div class="card st"><div class="mk2">${ico('pulse')}SAÚDE DO SISTEMA</div><div class="rgw"><div class="rgc"><svg viewBox="0 0 100 100"><circle class="bgc" cx="50" cy="50" r="42"/><circle class="fg" cx="50" cy="50" r="42" style="stroke-dashoffset:${264 * (1 - hp / 100)}"/></svg><b>${hp}%</b></div><div class="rgr"><b class="hs-t">${r ? 'Análise concluída' : 'Análise ainda não realizada'}</b><p class="mu sm">${r ? tf('{0} de {1} recursos ativados.', on, tot) : 'Execute a análise para ver o resultado.'}</p><button class="btn" id="gohealth">${r ? 'Analisar novamente' : 'Executar análise'}</button></div></div></div></div>
<div class="card st hinf"><div><small>SISTEMA OPERACIONAL</small><b>${esc(s.os || 'Windows')}</b></div><div><small>VERSÃO</small><b>${esc(s.dver || s.ver || '—')}</b></div><div><small>TEMPO LIGADO</small><b id="upt">${fmtUp(upNow())}</b></div><div><small>MODELO DO DISCO</small><b>${esc(s.disk || '—')}</b></div></div>`;
};
function paintLive() {
  if (page !== 'home') return; const L = liveS(), d = L.last; if (!d) return;
  for (const k of ['cpu', 'gpu', 'ram', 'disk']) { const e = $(`[data-lv="${k}"]`), p = $(`[data-sp="${k}"]`); if (e) e.textContent = d[k] + '%'; if (p) p.setAttribute('d', sparkD(L[k])); }
  const u = $('#upt'); if (u) u.textContent = fmtUp(upNow());
}
function liveInit() {
  if (S.liveInit) return; S.liveInit = true;
  api.onLive(d => { const L = liveS(); for (const k of ['cpu', 'gpu', 'ram', 'disk']) { L[k].push(d[k]); if (L[k].length > LIVE_N) L[k].shift(); } L.last = d; S.up = d.up; S.upAt = Date.now(); paintLive(); });
}
function liveOn() { liveInit(); api.liveStart(); }
function liveOff() { api.liveStop(); }


(function () {
  const s = document.createElement('style');
  s.textContent = `.hban{display:flex;align-items:center;gap:16px;padding:20px 22px;border:1px solid var(--line);border-radius:16px;background:var(--card);margin-bottom:14px}.hbx{flex:1}.hbx b{display:block;font-size:16px}.hbx span{color:var(--mu);font-size:13px}
.mgrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:12px}.mc{position:relative;padding:14px 16px;display:flex;flex-direction:column;gap:4px;min-height:132px}
.mh{display:flex;align-items:center;justify-content:space-between}.mk{display:inline-flex;align-items:center;gap:7px;font-size:10.5px;font-weight:700;letter-spacing:.1em;color:var(--mu)}.mk svg{width:14px;height:14px;padding:3px;box-sizing:content-box;border-radius:6px;color:rgb(var(--mc));background:rgba(var(--mc),.14)}
.mv{font-family:ui-monospace,Consolas,monospace;font-size:13px}.mrow{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;min-height:34px}.mnm{font-size:12.5px;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-width:0}
.mt{flex:none;font-size:9.5px;font-weight:700;letter-spacing:.06em;padding:2px 8px;border-radius:99px;color:rgb(var(--mc));background:rgba(var(--mc),.13);border:1px solid rgba(var(--mc),.3)}
.spk{width:100%;height:44px;margin-top:auto}.spk path{fill:none;stroke:rgb(var(--mc));stroke-width:1.6;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.hdual{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}.mk2{display:flex;align-items:center;gap:9px;font-size:11px;font-weight:700;letter-spacing:.1em;color:var(--mu);margin-bottom:16px}.mk2 svg{width:14px;height:14px;padding:5px;box-sizing:content-box;border-radius:8px;color:var(--ac);background:rgba(var(--acrgb),.12)}
.rgw{display:flex;align-items:center;gap:22px}.rgc{position:relative;width:104px;height:104px;flex:none}.rgc svg{width:100%;height:100%;transform:rotate(-90deg)}.rgc circle{fill:none;stroke-width:7;stroke-linecap:round}.rgc .bgc{stroke:var(--alt)}.rgc .fg{stroke:var(--ac);stroke-dasharray:264;stroke-dashoffset:264;transition:stroke-dashoffset 1s cubic-bezier(.3,.8,.3,1)}
.rgc b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:ui-monospace,Consolas,monospace;font-size:20px}.rgr{flex:1;min-width:0}
.rrow{display:flex;align-items:center;justify-content:space-between;padding:11px 0;font-size:13px;color:var(--mu)}.rrow+.rrow{border-top:1px solid var(--line)}.nb{min-width:30px;text-align:center;padding:2px 9px;border-radius:7px;font-family:ui-monospace,Consolas,monospace;font-size:12px;color:var(--ac);background:rgba(var(--acrgb),.12);border:1px solid rgba(var(--acrgb),.3)}.nb.ok{color:#34d399;background:rgba(52,211,153,.1);border-color:rgba(52,211,153,.3)}
.hs-t{display:block;font-size:15px}.rgr .sm{margin:5px 0 12px}.rgr .btn{width:100%}
.hinf{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;padding:18px 22px}.hinf small{display:block;font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--mu);margin-bottom:6px}.hinf b{font-size:13.5px;font-weight:600}
@media(max-width:1100px){.mgrid{grid-template-columns:repeat(2,minmax(0,1fr))}.hdual{grid-template-columns:1fr}}`;
  document.head.append(s);
})();

// ---------- visual minimalista (sem brilhos/bloom) ----------
(function () {
  const s = document.createElement('style');
  s.textContent = `.bg{background:none}
aside{overflow-y:auto;scrollbar-width:none;background:none;box-shadow:none}.logo{padding-bottom:16px;margin-bottom:4px}.logo::after{content:none}
html:not([data-mode=light]) .logo img{filter:hue-rotate(var(--hr))}
#nav{flex:1;gap:1px}.ng{display:block;margin:18px 0 6px 10px;font-size:10px;font-weight:600;letter-spacing:.12em;color:var(--mu);opacity:.75}.ng:first-of-type{margin-top:6px}
.nv{padding:8px 10px;gap:11px;border:0;border-radius:8px;font-size:13.5px;transform:none!important;box-shadow:none}.nv svg,.nv .cs2i{width:17px;height:17px}
.nv:hover{background:var(--hov);color:var(--tx)}.nv.on{background:var(--hov);color:var(--tx);font-weight:600}.nv.on svg,.nv.on .cs2i{color:var(--ac)}
#ind{border-radius:0 3px 3px 0;box-shadow:none}
html:not([data-mode=light]) .nv{color:#fff}html:not([data-mode=light]) .nv svg,html:not([data-mode=light]) .nv .cs2i{color:#fff}
html:not([data-mode=light]) .ng{color:#8c8c8c}html:not([data-mode=light]) .nv:hover{background:rgba(255,255,255,.05)}
html:not([data-mode=light]) .nv.on{background:#000;font-weight:600}html:not([data-mode=light]) .nv.on svg,html:not([data-mode=light]) .nv.on .cs2i{color:var(--ac)}
.nbot{margin-top:auto;padding-top:8px;border-top:1px solid var(--line)}
.sfoot{margin-top:10px;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 10px;border:0;background:none;font-size:11.5px}
.adm{display:inline-flex;align-items:center;gap:7px;color:var(--mu)}.adm i{width:6px;height:6px;border-radius:50%;background:var(--mu);opacity:.7;box-shadow:none}.adm.ok{color:var(--mu)}.adm.ok i{background:#34d399;box-shadow:none;opacity:1}
.vv{font-family:ui-monospace,Consolas,monospace;color:var(--mu);padding:0;border:0;background:none}
.card:hover{transform:none;box-shadow:none;background:var(--card);border-color:rgba(var(--acrgb),.32)}.tw.fps:hover{background:rgba(var(--acrgb),.09)}.tw.fps.on:hover{background:rgba(var(--acrgb),.13)}
.btn{background:var(--ac)}.btn::before{display:none}.btn:hover{filter:brightness(1.08);transform:none}
.hi{animation:none}
.ptile,.mi{background:var(--card);border-color:var(--line);box-shadow:none;color:var(--ac)}
.ptile{border-radius:12px}
.orb .oc,.dfeat .mi.vc,.lqav{box-shadow:none}.orb .dot{box-shadow:none}.orb i{animation:none}.orb .oc{background:var(--card)}
.bhero,.csum{background:var(--card);border-color:var(--line)}
.dcard.dfeat{background:var(--card)}.dcard.dfeat::after{display:none}.dfeat .mi.vc{background:rgba(var(--vcrgb,var(--acrgb)),.1);border-color:rgba(var(--vcrgb,var(--acrgb)),.3)}
.dd{box-shadow:none}.oit.lqi{animation:none}.omenu{box-shadow:0 10px 30px rgba(0,0,0,.35)}
.spill{background:var(--card);border-color:var(--line)}`;
  document.head.append(s);
})();

// ---------- Saúde do PC (resultados compactos) + Limpeza (menu de automação) ----------
IC.okc = 'M5 12.5l4.5 4.5L19 7.5'; IC.unk = 'M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01'; IC.chev = 'M6 9l6 6 6-6';
(function () {
  const s = document.createElement('style');
  s.textContent = `
/* ---- Saúde do PC: resultados ---- */
.hres{margin-top:14px;padding:16px;border:1px solid var(--line);border-radius:16px;background:var(--card)}
.hsum{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.hsi{width:40px;height:40px;flex:none;border-radius:50%;display:grid;place-items:center;color:var(--ok);background:rgba(52,211,153,.14);border:1px solid rgba(52,211,153,.4)}.hsi svg{width:20px;height:20px}
.hsx{flex:1;min-width:200px}.hsx b{display:block;font-size:15px}.hsx small{color:var(--mu);font-size:12px}
.hch{display:flex;gap:8px;flex-wrap:wrap}
.hcp{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:99px;font-size:12px;font-weight:600;background:var(--alt);color:var(--mu)}.hcp i{width:6px;height:6px;border-radius:50%;background:currentColor}
.hcp.on{color:var(--ok);background:rgba(52,211,153,.13)}.hcp.off{color:#d99a06;background:rgba(251,191,36,.14)}
.hsec{display:flex;align-items:center;gap:8px;margin:16px 2px 8px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mu);font-weight:600}
.hsec em{font-style:normal;font-size:11px;padding:1px 7px;border-radius:99px;background:var(--alt)}
.hg{display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:8px}
.ht{display:grid;grid-template-columns:30px 1fr;column-gap:10px;row-gap:2px;align-items:center;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--hov2);cursor:pointer;transition:border-color .2s,background .2s}
.ht:hover{border-color:rgba(var(--acrgb),.4);background:var(--hov)}
.ht .hti{grid-row:span 2;width:30px;height:30px;border-radius:8px;display:grid;place-items:center;background:rgba(var(--acrgb),.14);color:var(--ac)}.ht .hti svg{width:16px;height:16px}
.ht b{font-size:12.5px;font-weight:600;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ht .hts{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:var(--mu)}.ht .hts i{width:5px;height:5px;border-radius:50%;background:currentColor}
.ht.on .hts{color:var(--ok)}.ht.on .hti{background:rgba(52,211,153,.14);color:var(--ok)}
.ht.off .hts{color:#d99a06}.ht.off .hti{background:rgba(251,191,36,.14);color:#d99a06}
.ht.unknown .hti{background:var(--alt);color:var(--mu)}
.ht .htd{display:none;grid-column:1/-1;margin-top:8px;padding-top:8px;border-top:1px solid var(--line)}
.ht .htd p{margin:0;font-size:12px;line-height:1.5}.ht .htd small{display:block;margin-top:4px;color:var(--mu);font-size:11.5px;line-height:1.45}
.ht.open{grid-column:span 2}.ht.open .htd{display:block}.ht.open b{white-space:normal}
.hft{margin:14px 2px 0;color:var(--mu);font-size:12px}
/* ---- Limpeza: botão e menu de automação ---- */
.arbtn{display:inline-flex;align-items:center;gap:10px;cursor:pointer;border-color:rgba(var(--acrgb),.35)}
.arbtn svg{width:14px;height:14px;transition:transform .2s}.arbtn.open svg{transform:rotate(180deg)}
.arp{position:fixed;z-index:60;width:290px;overflow:auto;padding:12px;border-radius:14px;border:1px solid var(--line);background:linear-gradient(var(--hov),var(--hov)),var(--elev);box-shadow:0 22px 50px -10px var(--shadow),0 0 0 1px rgba(var(--acrgb),.12)}
.arp h4{display:flex;align-items:center;gap:8px;margin:2px 0 8px;font-size:10.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--tx)}
.arp h4::before{content:'';width:3px;height:11px;border-radius:2px;background:var(--ac)}
.arp h4 button{margin-left:auto;background:none;border:0;padding:0;cursor:pointer;font:inherit;letter-spacing:0;text-transform:none;font-size:11px;font-weight:600;color:var(--ac)}
.arp .ao{display:flex;align-items:center;justify-content:space-between;height:30px;padding:0 10px;margin-bottom:2px;border-radius:8px;border:1px solid transparent;font-size:12.5px;color:var(--mu);cursor:pointer}
.arp .ao:hover{background:var(--hov);color:var(--tx)}
.arp .ao.on{background:rgba(var(--acrgb),.16);border-color:rgba(var(--acrgb),.4);color:var(--tx);font-weight:600}
.arp .ao .ck{width:16px;height:16px;border-radius:50%;background:var(--ac);color:var(--onac);display:none;place-items:center}.arp .ao.on .ck{display:grid}.arp .ao .ck svg{width:10px;height:10px;stroke-width:3}
.arp .ai{display:flex;align-items:center;gap:10px;height:34px;padding:0 10px;margin-bottom:3px;border-radius:8px;background:var(--hov2);border:1px solid transparent;font-size:12.5px;cursor:pointer}
.arp .ai:hover{background:var(--hov)}
.arp .ai.on{border-color:rgba(var(--acrgb),.28)}
.arp .ai .bx{width:16px;height:16px;flex:none;border-radius:4px;border:1.5px solid var(--mu);display:grid;place-items:center;color:var(--onac)}.arp .ai .bx svg{width:11px;height:11px;stroke-width:3;opacity:0}
.arp .ai.on .bx{background:var(--ac);border-color:var(--ac)}.arp .ai.on .bx svg{opacity:1}
.arp .ai.irr{color:var(--mu)}.arp .ai.irr.on{color:var(--tx)}
.arp .ai em{margin-left:auto;font-style:normal;font-size:10.5px;font-weight:600;color:#d99a06}
.arp .an{margin:10px 2px 6px;font-size:11px;line-height:1.45;color:var(--mu)}
.arp .as{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 2px 10px;font-size:11px;color:var(--mu)}
.arp .as span{display:inline-flex;align-items:center;gap:6px}.arp .as i{width:6px;height:6px;border-radius:50%;background:var(--mu)}.arp .as.on i{background:var(--ok)}.arp .as.on span{color:var(--ok)}
.arp .as button{background:none;border:0;padding:0;cursor:pointer;font:inherit;font-weight:600;color:var(--ac)}
.arp .btn{width:100%;justify-content:center}`;
  document.head.append(s);
})();

const AU_FREQ = [['never', 'Nunca'], ['daily', 'A cada dia'], ['weekly', 'A cada 7 dias'], ['monthly', 'A cada 30 dias']];
const AU_IT = [['temp', 'Arquivos temporários'], ['prefetch', 'Arquivos do Prefetch'], ['bin', 'Lixeira'], ['wu', 'Cache do Windows Update'], ['thumbs', 'Cache de miniaturas']];
let AUP = null, AUBUSY = false;
function auClose() { const p = document.getElementById('arpop'); if (p) p.remove(); const b = document.getElementById('arbtn'); if (b) b.classList.remove('open'); AUP = null; }
function auPaint() {
  const p = document.getElementById('arpop'); if (!p || !AUP) return;
  const safe = ['temp', 'prefetch', 'wu', 'thumbs'], all = safe.every(k => AUP.items.has(k));
  p.innerHTML = `<h4>${tr('Frequência automática')}</h4><div class="afg">${AU_FREQ.map(([k, n]) => `<div class="ao ${AUP.freq === k ? 'on' : ''}" data-arf="${k}"><span>${tr(n)}</span><span class="ck">${ico('okc')}</span></div>`).join('')}</div>
<h4 style="margin-top:14px">${tr('O que limpar automaticamente')}<button type="button" id="arall">${tr(all ? 'Limpar seleção' : 'Selecionar tudo')}</button></h4>
${AU_IT.map(([k, n]) => { const on = k === 'bin' ? AUP.bin : AUP.items.has(k); return `<div class="ai ${on ? 'on' : ''} ${k === 'bin' ? 'irr' : ''}" data-ari="${k}"><span class="bx">${ico('okc')}</span><span>${tr(n)}</span>${k === 'bin' ? `<em>${tr('Irreversível')}</em>` : ''}</div>`; }).join('')}
<p class="an">${tr('Funciona em segundo plano enquanto o programa estiver aberto ou na bandeja.')}</p>
<div class="as ${AUP.freq !== 'never' ? 'on' : ''}"><span><i></i>${tr(AUP.freq !== 'never' ? 'Automação ativada' : 'Automação desativada')}</span><button type="button" id="arun">${tr('Executar agora')}</button></div>
<button type="button" class="btn" id="arsave">${tr('Salvar automação')}</button>`;
}
function auOpen(btn) {
  const a = S.auto; if (!a) return;
  AUP = { freq: a.freq || 'never', items: new Set((a.items || []).filter(x => x !== 'bin')), bin: !!a.binAuth };
  const p = document.createElement('div'); p.id = 'arpop'; p.className = 'arp'; document.body.append(p); btn.classList.add('open'); auPaint();
  const r = btn.getBoundingClientRect(), w = 316;
  p.style.top = (r.bottom + 8) + 'px'; p.style.left = Math.max(8, Math.min(r.right - w, innerWidth - w - 8)) + 'px'; p.style.maxHeight = Math.max(240, innerHeight - r.bottom - 20) + 'px';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') auClose(); });
document.addEventListener('click', async e => {
  const c = s => e.target.closest(s); let el;
  if (el = c('#arbtn')) { return document.getElementById('arpop') ? auClose() : auOpen(el); }
  if (!c('#arpop')) { if (!AUBUSY) auClose(); return; }
  if (!AUP) return;
  if (el = c('[data-arf]')) { AUP.freq = el.dataset.arf; return auPaint(); }
  if (c('#arall')) { const safe = ['temp', 'prefetch', 'wu', 'thumbs']; if (safe.every(k => AUP.items.has(k))) AUP.items.clear(); else safe.forEach(k => AUP.items.add(k)); return auPaint(); }
  if (el = c('[data-ari]')) {
    const k = el.dataset.ari;
    if (k !== 'bin') { AUP.items.has(k) ? AUP.items.delete(k) : AUP.items.add(k); return auPaint(); }
    if (AUP.bin) { AUP.bin = false; return auPaint(); }
    AUBUSY = true; const ok = await modal({ title: 'Esvaziar a Lixeira automaticamente', html: '<p>A cada limpeza automática, a Lixeira será esvaziada e os arquivos <b>apagados definitivamente</b>, sem aviso.</p>', ok: 'Autorizar', danger: true }); AUBUSY = false;
    if (ok && AUP) AUP.bin = true; return auPaint();
  }
  if (c('#arsave')) { const pay = { freq: AUP.freq, items: [...AUP.items], binAuth: AUP.bin }; auClose(); try { await setAuto(pay); toast('Automação salva.'); } catch { toast('Não foi possível salvar.', 'err'); } return; }
});
document.addEventListener('click', e => { const t = e.target.closest('[data-hx]'); if (t) t.classList.toggle('open'); });
{ const _go1 = go; go = function (p) { auClose(); return _go1(p); }; }


// ---------- bloom que segue o cursor (Saúde do PC, Limpeza, Drivers) + rodapé da barra lateral ----------
(function () {
  const s = document.createElement('style');
  s.textContent = `
/* brilho de borda que segue o cursor, nos mesmos moldes dos cards */
.ht,.bhero,.csum,.dcard,.ccard,.binfo{position:relative}
.ht::before,.bhero::before,.csum::before,.dcard::before,.ccard::before,.binfo::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.5px;pointer-events:none;opacity:0;transition:opacity .25s;z-index:2;background:radial-gradient(200px circle at var(--mx,50%) var(--my,50%),rgba(var(--acrgb),1),rgba(var(--acrgb),.35) 45%,transparent 75%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
.ht:hover::before,.bhero:hover::before,.csum:hover::before,.dcard:hover::before,.ccard:hover::before,.binfo:hover::before{opacity:1}
/* bloom (preenchimento) que segue o cursor */
.card:not(.busy)::after,.ht::after,.bhero::after,.csum::after,.dcard:not(.dfeat)::after,.ccard::after,.binfo::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .25s;background:radial-gradient(300px circle at var(--mx,50%) var(--my,50%),rgba(var(--acrgb),.2),transparent 70%)}
.card:not(.busy):hover::after,.ht:hover::after,.bhero:hover::after,.csum:hover::after,.dcard:not(.dfeat):hover::after,.ccard:hover::after,.binfo:hover::after{opacity:1}
html[data-mode=light] .card:not(.busy)::after,html[data-mode=light] .ht::after,html[data-mode=light] .bhero::after,html[data-mode=light] .csum::after,html[data-mode=light] .dcard:not(.dfeat)::after,html[data-mode=light] .ccard::after,html[data-mode=light] .binfo::after{background:radial-gradient(300px circle at var(--mx,50%) var(--my,50%),rgba(var(--acrgb),.12),transparent 70%)}
.ht::before{z-index:1}
@media(prefers-reduced-motion:reduce){.ht::after,.card::after{transition:none}}

/* rodapé da barra lateral: discreto, versão no canto inferior esquerdo */
.sfoot{margin:10px 0 0;padding:0 12px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:6px;border:0;border-radius:0;background:none;font-size:10.5px;line-height:1}
.adm{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;font-weight:500;color:var(--mu);letter-spacing:.2px}
.adm i{width:5px;height:5px;border-radius:50%;background:var(--mu);opacity:.7;box-shadow:none}
.adm.ok i{background:#34d399;opacity:1;box-shadow:none}
.vv{display:inline-flex;align-items:center;gap:6px;padding:0;border:0;background:none;box-shadow:none;font-family:ui-monospace,Consolas,monospace;font-size:10.5px;font-weight:400;letter-spacing:0;color:var(--mu);opacity:.8}
.vv::before{content:'·';opacity:.7}
html[data-mode=light] .vv{color:var(--mu)}

/* textos secundários em cinza neutro (sem tom roxo) e subtítulos de página menores */
html:not([data-mode=light]){--mu:#8c8c8c}
h1+.mu,.opT p{font-size:12px;margin-top:2px}
`;
  document.head.append(s);
})();


// ---------- correções visuais: brilho do anel, ícone da Limpeza e painel de frequência automática ----------
(function () {
  const s = document.createElement('style');
  s.textContent = `
/* anel de otimização: o brilho não pode ser cortado pela borda do SVG */
.rgc svg{overflow:visible}
.hdual .rgc::before{inset:-4px}

/* resumo da Limpeza: ícone limpo, sem anéis e sem ponto orbitando */
.csum .orb i,.csum .orb .dot{display:none}
.csum .orb::before{inset:22px;filter:blur(14px);background:radial-gradient(closest-side,rgba(var(--acrgb),.35),transparent)}
.csum .orb .oc{inset:33px;border-radius:22px;background:linear-gradient(145deg,rgba(var(--acrgb),.32),rgba(var(--acrgb),.10));border:1px solid rgba(var(--acrgb),.55);box-shadow:0 10px 30px -8px rgba(var(--acrgb),.6),inset 0 1px 0 rgba(255,255,255,.18)}
.csum .orb .oc svg{width:36px;height:36px;color:#fff;filter:drop-shadow(0 2px 6px rgba(var(--acrgb),.6))}

/* painel de frequência automática */
.arp{width:316px;padding:16px;border-radius:18px;border:1px solid rgba(var(--acrgb),.24);background:radial-gradient(280px 150px at 100% 0%,rgba(var(--acrgb),.16),transparent 70%),var(--elev);box-shadow:0 26px 60px -14px var(--shadow),inset 0 1px 0 rgba(255,255,255,.04);scrollbar-width:thin;scrollbar-color:rgba(var(--acrgb),.4) transparent;animation:arpIn .18s ease-out}
@keyframes arpIn{from{opacity:0;transform:translateY(-6px) scale(.98)}to{opacity:1;transform:none}}
.arp h4{margin:2px 2px 10px;font-size:10.5px;font-weight:700;letter-spacing:.12em;color:var(--mu)}
.arp h4::before{width:3px;height:10px;opacity:.9}
.arp h4 button{padding:3px 10px;border-radius:99px;background:rgba(var(--acrgb),.12);border:1px solid rgba(var(--acrgb),.32);font-size:10.5px;font-weight:600;color:var(--ac3);transition:.15s}
.arp h4 button:hover{background:rgba(var(--acrgb),.22)}
.arp .afg{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:4px}
.arp .afg .ao{position:relative;justify-content:center;height:38px;margin:0;border:1px solid var(--line);border-radius:11px;background:var(--hov2);font-size:12.5px;transition:.15s}
.arp .afg .ao:hover{border-color:rgba(var(--acrgb),.45);background:var(--hov);color:var(--tx)}
.arp .afg .ao.on{background:linear-gradient(135deg,rgba(var(--acrgb),.30),rgba(var(--acrgb),.12));border-color:rgba(var(--acrgb),.65);box-shadow:0 0 16px -5px rgba(var(--acrgb),.6);color:var(--tx)}
.arp .afg .ao .ck{position:absolute;top:-6px;right:-6px;width:16px;height:16px;box-shadow:0 0 0 2px var(--elev)}
.arp .ai{height:38px;margin-bottom:6px;gap:11px;padding:0 12px;border:1px solid var(--line);border-radius:11px;background:var(--hov2);color:var(--mu);transition:.15s}
.arp .ai:hover{background:var(--hov);border-color:rgba(var(--acrgb),.3);color:var(--tx)}
.arp .ai.on{color:var(--tx);background:rgba(var(--acrgb),.10);border-color:rgba(var(--acrgb),.42)}
.arp .ai .bx{border-radius:5px;transition:.15s}
.arp .ai em{padding:2px 8px;border-radius:99px;background:rgba(217,154,6,.12);border:1px solid rgba(217,154,6,.32);font-size:10px;letter-spacing:.02em}
.arp .an{margin:12px 2px 0;font-size:11px;line-height:1.5}
.arp .as{margin:12px 2px 12px;padding-top:12px;border-top:1px solid var(--line)}
.arp .as button{padding:4px 11px;border-radius:99px;background:rgba(var(--acrgb),.12);border:1px solid rgba(var(--acrgb),.32);font-size:11px;color:var(--ac3);transition:.15s}
.arp .as button:hover{background:rgba(var(--acrgb),.22)}
.arp .btn{height:42px;border-radius:12px}
html[data-mode=light] .arp h4 button,html[data-mode=light] .arp .as button{color:var(--ac)}
@media(prefers-reduced-motion:reduce){.arp{animation:none}}
`;
  document.head.append(s);
})();
