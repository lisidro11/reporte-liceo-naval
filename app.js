
const D=window.APP_DATA;const fmt=n=>Number(n).toLocaleString('es-PE');
const mainRows=D.siagie.filter(x=>x.ie==='LICEO NAVAL ALMIRANTE GUISE'), peadRows=D.siagie.filter(x=>x.ie.startsWith('PEAD'));
const sum=(a,k='total')=>a.reduce((s,x)=>s+x[k],0);const totals={main:sum(mainRows),pead:sum(peadRows),all:sum(D.siagie)};
function nav(id,b){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');scrollTo(0,0)}
function renderBars(rows,el){let mx=Math.max(...rows.map(x=>x.total));document.getElementById(el).innerHTML=rows.map(x=>`<div class="barrow"><b>${x.nivel}</b><div class="bar"><div class="fill" style="width:${x.total/mx*100}%"></div></div><strong>${fmt(x.total)}</strong></div>`).join('')}
function matrix(rows){return rows.map(x=>`<tr><td>${x.nivel}</td><td>${x.codmod}</td><td>${fmt(x.h)}</td><td>${fmt(x.m)}</td><td><b>${fmt(x.total)}</b></td></tr>`).join('')}
document.querySelectorAll('[data-main]').forEach(x=>x.textContent=fmt(totals.main));document.querySelectorAll('[data-pead]').forEach(x=>x.textContent=fmt(totals.pead));document.querySelectorAll('[data-all]').forEach(x=>x.textContent=fmt(totals.all));document.querySelectorAll('[data-plazas]').forEach(x=>x.textContent=fmt(D.nexus.total));
renderBars(mainRows,'barsMain');document.getElementById('matBody').innerHTML=matrix(mainRows);document.getElementById('peadBody').innerHTML=matrix(peadRows);
const h=sum(D.siagie,'h'),m=sum(D.siagie,'m'),pct=Math.round(h/(h+m)*100);let dn=document.getElementById('donut');dn.style.background=`conic-gradient(#1769aa 0 ${pct}%,#79b9dd ${pct}% 100%)`;dn.dataset.label=`${fmt(h)} Hombres\A${fmt(m)} Mujeres`;
document.getElementById('nexusBody').innerHTML=Object.entries(D.nexus.nivel).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td><td>${Math.round(v/D.nexus.total*100)}%</td></tr>`).join('');
document.getElementById('docs').innerHTML=D.docs.map(x=>`<div class="doc"><b>📄 ${x.name}</b><div class="meta">Documento sustentatorio RIE</div><a href="${x.file}" target="_blank">Ver documento →</a></div>`).join('');
function printReport(){window.print()}
