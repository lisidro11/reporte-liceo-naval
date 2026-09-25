console.info("Reporte Liceo Naval v8 - 25/09/2026");

const D=window.APP_DATA;const fmt=n=>Number(n).toLocaleString('es-PE');
const mainRows=D.siagie.filter(x=>x.ie==='LICEO NAVAL ALMIRANTE GUISE'), peadRows=D.siagie.filter(x=>x.ie.startsWith('PEAD'));
const sum=(a,k='total')=>a.reduce((s,x)=>s+x[k],0);const totals={main:sum(mainRows),pead:sum(peadRows),all:sum(D.siagie)};
function nav(id,b){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');scrollTo(0,0)}
function renderBars(rows,el){const node=document.getElementById(el);if(!node)return;let mx=Math.max(...rows.map(x=>x.total));node.innerHTML=rows.map(x=>`<div class="barrow"><b>${x.nivel}</b><div class="bar"><div class="fill" style="width:${x.total/mx*100}%"></div></div><strong>${fmt(x.total)}</strong></div>`).join('')}
function matrix(rows){return rows.map(x=>`<tr><td>${x.nivel}</td><td>${x.codmod}</td><td>${fmt(x.h)}</td><td>${fmt(x.m)}</td><td><b>${fmt(x.total)}</b></td></tr>`).join('')}
document.querySelectorAll('[data-main]').forEach(x=>x.textContent=fmt(totals.main));document.querySelectorAll('[data-pead]').forEach(x=>x.textContent=fmt(totals.pead));document.querySelectorAll('[data-all]').forEach(x=>x.textContent=fmt(totals.all));document.querySelectorAll('[data-plazas]').forEach(x=>x.textContent=fmt(D.nexus.total));
renderBars(mainRows,'barsMain'); const matBody=document.getElementById('matBody'); if(matBody)matBody.innerHTML=matrix(mainRows); const peadBody=document.getElementById('peadBody'); if(peadBody)peadBody.innerHTML=matrix(peadRows);
function totalFoot(rows){return `<tr class="total-row"><td colspan="2"><b>TOTAL</b></td><td><b>${fmt(sum(rows,'h'))}</b></td><td><b>${fmt(sum(rows,'m'))}</b></td><td><b>${fmt(sum(rows,'total'))}</b></td></tr>`}
const matFoot=document.getElementById('matFoot');if(matFoot)matFoot.innerHTML=totalFoot(mainRows);const peadFoot=document.getElementById('peadFoot');if(peadFoot)peadFoot.innerHTML=totalFoot(peadRows);
const servicePct=totals.main/totals.all*100;let dn=document.getElementById('donut');if(dn)dn.style.setProperty('--men-pct',servicePct+'%');
const nexusBody=document.getElementById('nexusBody'); if(nexusBody){nexusBody.innerHTML=Object.entries(D.nexus.nivel).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td><td>${Math.round(v/D.nexus.total*100)}%</td></tr>`).join('');}
const docsEl=document.getElementById('docs');if(docsEl)docsEl.innerHTML=D.docs.map(x=>`<div class="doc"><b>📄 ${x.name}</b><div class="meta">Documento sustentatorio RIE</div><a href="${x.file}" target="_blank">Ver documento →</a></div>`).join('');
function printReport(){window.print()}

function vizRows(obj,el,alt=false){
 const node=document.getElementById(el);if(!node)return; const entries=Object.entries(obj), mx=Math.max(...entries.map(x=>x[1])), total=entries.reduce((s,x)=>s+x[1],0);
 node.innerHTML=entries.map(([k,v],i)=>`<div class="viz-item"><div class="viz-label">${k}</div><div class="viz-track"><div class="viz-fill ${alt&&i%2?'alt':''}" style="width:${v/mx*100}%"></div></div><div class="viz-value">${fmt(v)}<small>${(v/total*100).toFixed(1)}%</small></div></div>`).join('');
}
vizRows(D.nexus.situacion,'contractChart',true);
vizRows(D.nexus.cargo,'cargoChart',true);
vizRows(D.nexus.nivel,'levelStaffChart',true);
vizRows(D.nexus.ley,'lawChart',true);
const rec={"Orgánica":D.nexus.tipo_registro["Orgánica"],"Eventual":D.nexus.tipo_registro["Eventual"],"Jornada 30 h":D.nexus.jornada["30 horas"],"Jornada 48 h":D.nexus.jornada["48 horas"]};
vizRows(rec,'recordChart',true);
const fem=D.nexus.sexo.Femenino, masc=D.nexus.sexo.Masculino, st=fem+masc;
const oldStaffDonut=document.getElementById('staffDonut');if(oldStaffDonut)oldStaffDonut.style.setProperty('--female-pct',(fem/st*100)+'%');
const oldStaffLegend=document.getElementById('staffSexLegend');if(oldStaffLegend)oldStaffLegend.innerHTML=`<div><span class="dot female"></span><span>Femenino</span><b>${fem}</b><small>${(fem/st*100).toFixed(1)}%</small></div><div><span class="dot male"></span><span>Masculino</span><b>${masc}</b><small>${(masc/st*100).toFixed(1)}%</small></div>`;

function gradeGroups(prefix,el){
 const levels=[["Inicial - Jardín","Inicial"],["Primaria","Primaria"],["Secundaria","Secundaria"]];
 const node=document.getElementById(el);if(!node)return; node.innerHTML=levels.map(([lev,title])=>{
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
const sectionStats=document.getElementById('sectionStats');if(sectionStats)sectionStats.innerHTML=mainRows.map(x=>{const n=D.sections['LICEO NAVAL ALMIRANTE GUISE|'+x.nivel]||0;const avg=n?x.total/n:0;return `<div class="viz-item"><div class="viz-label">${x.nivel}</div><div class="viz-track"><div class="viz-fill alt" style="width:${n/12*100}%"></div></div><div class="viz-value">${n}<small>${avg.toFixed(1)} est./secc.</small></div></div>`}).join('');


// v7: tabla comparativa y visualizaciones ejecutivas
(function(){
 const levels=['Inicial','Primaria','Secundaria'];
 const by=(rows,l)=>rows.find(x=>x.nivel===l)||{h:0,m:0,total:0};
 const cb=document.getElementById('combinedMatBody');
 if(cb){cb.innerHTML=levels.map(l=>{const a=by(mainRows,l),p=by(peadRows,l);return `<tr><td><b>${l}</b></td><td>${fmt(a.h)}</td><td>${fmt(a.m)}</td><td class="cell-main"><b>${fmt(a.total)}</b></td><td>${fmt(p.h)}</td><td>${fmt(p.m)}</td><td class="cell-pead"><b>${fmt(p.total)}</b></td><td class="cell-total"><b>${fmt(a.total+p.total)}</b></td></tr>`}).join('');}
 const cf=document.getElementById('combinedMatFoot'); if(cf){cf.innerHTML=`<tr><td><b>TOTAL</b></td><td><b>${fmt(sum(mainRows,'h'))}</b></td><td><b>${fmt(sum(mainRows,'m'))}</b></td><td class="cell-main"><b>${fmt(totals.main)}</b></td><td><b>${fmt(sum(peadRows,'h'))}</b></td><td><b>${fmt(sum(peadRows,'m'))}</b></td><td class="cell-pead"><b>${fmt(totals.pead)}</b></td><td class="cell-total"><b>${fmt(totals.all)}</b></td></tr>`;}
 function legend(el,items){document.getElementById(el).innerHTML=items.map((x,i)=>`<div><span class="legend-dot" style="background:${x.c}"></span><span>${x.n}</span><b>${x.v}</b><small>${x.p}</small></div>`).join('')}
 const contract=[{n:'Contratado',v:19,p:'76.0%',c:'#2f80ed'},{n:'Nombrado',v:6,p:'24.0%',c:'#f5b33f'}];
 const cd=document.getElementById('contractDonut'); if(cd) cd.style.background='conic-gradient(#2f80ed 0 76%, #f5b33f 76% 100%)'; if(document.getElementById('contractLegend'))legend('contractLegend',contract);
 const sex=[{n:'Femenino',v:22,p:'88.0%',c:'#f35f86'},{n:'Masculino',v:3,p:'12.0%',c:'#3b82f6'}];
 const sd=document.getElementById('staffDonutV7'); if(sd) sd.style.background='conic-gradient(#f35f86 0 88%, #3b82f6 88% 100%)'; if(document.getElementById('staffSexLegendV7'))legend('staffSexLegendV7',sex);
 const lev=[{n:'Primaria',v:16,p:'64.0%',c:'#61c878'},{n:'Secundaria',v:9,p:'36.0%',c:'#2db3d1'}];
 const ld=document.getElementById('levelDonut'); if(ld) ld.style.background='conic-gradient(#61c878 0 64%, #2db3d1 64% 100%)'; if(document.getElementById('levelLegend'))legend('levelLegend',lev);
})();
