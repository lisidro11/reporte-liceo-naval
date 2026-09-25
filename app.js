console.info("Reporte Liceo Naval v4 - 25/09/2026");

const D=window.APP_DATA;const fmt=n=>Number(n).toLocaleString('es-PE');
const mainRows=D.siagie.filter(x=>x.ie==='LICEO NAVAL ALMIRANTE GUISE'), peadRows=D.siagie.filter(x=>x.ie.startsWith('PEAD'));
const sum=(a,k='total')=>a.reduce((s,x)=>s+x[k],0);const totals={main:sum(mainRows),pead:sum(peadRows),all:sum(D.siagie)};
function nav(id,b){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');scrollTo(0,0)}
function renderBars(rows,el){let mx=Math.max(...rows.map(x=>x.total));document.getElementById(el).innerHTML=rows.map(x=>`<div class="barrow"><b>${x.nivel}</b><div class="bar"><div class="fill" style="width:${x.total/mx*100}%"></div></div><strong>${fmt(x.total)}</strong></div>`).join('')}
function matrix(rows){return rows.map(x=>`<tr><td>${x.nivel}</td><td>${x.codmod}</td><td>${fmt(x.h)}</td><td>${fmt(x.m)}</td><td><b>${fmt(x.total)}</b></td></tr>`).join('')}
document.querySelectorAll('[data-main]').forEach(x=>x.textContent=fmt(totals.main));document.querySelectorAll('[data-pead]').forEach(x=>x.textContent=fmt(totals.pead));document.querySelectorAll('[data-all]').forEach(x=>x.textContent=fmt(totals.all));document.querySelectorAll('[data-plazas]').forEach(x=>x.textContent=fmt(D.nexus.total));
renderBars(mainRows,'barsMain');document.getElementById('matBody').innerHTML=matrix(mainRows);document.getElementById('peadBody').innerHTML=matrix(peadRows);
const h=sum(D.siagie,'h'),m=sum(D.siagie,'m'),sexTotal=h+m,pct=h/sexTotal*100;let dn=document.getElementById('donut');dn.style.setProperty('--men-pct',pct+'%');document.getElementById('sexTotal').textContent=fmt(sexTotal);document.getElementById('menVal').textContent=fmt(h);document.getElementById('womenVal').textContent=fmt(m);document.getElementById('menPct').textContent=(h/sexTotal*100).toFixed(1)+'%';document.getElementById('womenPct').textContent=(m/sexTotal*100).toFixed(1)+'%';
document.getElementById('nexusBody').innerHTML=Object.entries(D.nexus.nivel).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td><td>${Math.round(v/D.nexus.total*100)}%</td></tr>`).join('');
document.getElementById('docs').innerHTML=D.docs.map(x=>`<div class="doc"><b>📄 ${x.name}</b><div class="meta">Documento sustentatorio RIE</div><a href="${x.file}" target="_blank">Ver documento →</a></div>`).join('');
function printReport(){window.print()}

function vizRows(obj,el,alt=false){
 const entries=Object.entries(obj), mx=Math.max(...entries.map(x=>x[1])), total=entries.reduce((s,x)=>s+x[1],0);
 document.getElementById(el).innerHTML=entries.map(([k,v],i)=>`<div class="viz-item"><div class="viz-label">${k}</div><div class="viz-track"><div class="viz-fill ${alt&&i%2?'alt':''}" style="width:${v/mx*100}%"></div></div><div class="viz-value">${fmt(v)}<small>${(v/total*100).toFixed(1)}%</small></div></div>`).join('');
}
vizRows(D.nexus.situacion,'contractChart',true);
vizRows(D.nexus.cargo,'cargoChart',true);
vizRows(D.nexus.nivel,'levelStaffChart',true);
vizRows(D.nexus.ley,'lawChart',true);
const rec={"Orgánica":D.nexus.tipo_registro["Orgánica"],"Eventual":D.nexus.tipo_registro["Eventual"],"Jornada 30 h":D.nexus.jornada["30 horas"],"Jornada 48 h":D.nexus.jornada["48 horas"]};
vizRows(rec,'recordChart',true);
const fem=D.nexus.sexo.Femenino, masc=D.nexus.sexo.Masculino, st=fem+masc;
document.getElementById('staffDonut').style.setProperty('--female-pct',(fem/st*100)+'%');
document.getElementById('staffSexLegend').innerHTML=`<div><span class="dot female"></span><span>Femenino</span><b>${fem}</b><small>${(fem/st*100).toFixed(1)}%</small></div><div><span class="dot male"></span><span>Masculino</span><b>${masc}</b><small>${(masc/st*100).toFixed(1)}%</small></div>`;

function gradeGroups(prefix,el){
 const levels=[["Inicial - Jardín","Inicial"],["Primaria","Primaria"],["Secundaria","Secundaria"]];
 document.getElementById(el).innerHTML=levels.map(([lev,title])=>{
  const a=D.grades[prefix+"|"+lev]||[], mx=Math.max(...a.map(x=>x.total),1);
  return `<div class="grade-box"><h4>${title}</h4>${a.map(x=>`<div class="grade-row"><span>${x.grado}</span><div><div class="grade-track"><div class="grade-fill" style="width:${x.total/mx*100}%"></div></div><div class="grade-sex">H ${x.h} · M ${x.m}</div></div><strong>${x.total}</strong></div>`).join('')}</div>`
 }).join('');
}
gradeGroups('LICEO NAVAL ALMIRANTE GUISE','gradeMain');
gradeGroups('PEAD LICEO NAVAL ALMIRANTE GUISE','gradePead');
const mainByLevel=Object.fromEntries(mainRows.map(x=>[x.nivel,x.total]));
vizRows(mainByLevel,'levelBars',true);
const secObj={};
mainRows.forEach(x=>{const key='LICEO NAVAL ALMIRANTE GUISE|'+x.nivel;const n=D.sections[key]||0;secObj[x.nivel]=n});
document.getElementById('sectionStats').innerHTML=mainRows.map(x=>{const n=D.sections['LICEO NAVAL ALMIRANTE GUISE|'+x.nivel]||0;const avg=n?x.total/n:0;return `<div class="viz-item"><div class="viz-label">${x.nivel}</div><div class="viz-track"><div class="viz-fill alt" style="width:${n/12*100}%"></div></div><div class="viz-value">${n}<small>${avg.toFixed(1)} est./secc.</small></div></div>`}).join('');
