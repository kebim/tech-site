/* Drag-and-drop circuit builder ("Build yourself"). Needs sim.js (LogicSim) loaded first. */
window.CircuitBuilder=(()=>{
const Q=s=>document.querySelector(s),L=LogicSim,F=L.F,ONE=L.ONE,W=640,H=440,GT=["AND","OR","NOT","NAND","NOR","XOR","XNOR"];
const B={n:[],w:[],id:1,sel:null,pend:null,drag:null,tmp:null,val:{}};let KD=null;
const NW=n=>n.t==="IN"?88:n.t==="OUT"?40:L.gw(n.t,1),byId=id=>B.n.find(n=>n.id===id),cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const pinY=(n,k)=>n.t==="OUT"||ONE(n.t)?25:k?38:12,pinIn=(n,k)=>({x:n.x,y:n.y+pinY(n,k)}),pinOut=n=>({x:n.x+NW(n),y:n.y+25});
function add(t,x,y){const c=B.n.filter(n=>n.t===t).length,n={id:B.id++,t,x:cl(x,4,W-NW({t})-4),y:cl(y,8,H-70),v:0,l:t==="IN"?String.fromCharCode(65+c%26):t==="OUT"?"Y"+(c+1):""};B.n.push(n);B.sel={k:"n",id:n.id};return n}
const src=(n,k)=>{const w=B.w.find(w=>w.to===n.id&&w.pin===k);return w?w.from:null};
function settle(val,inv){for(let p=0;p<12;p++){let ch=0;B.n.forEach(n=>{let r;if(n.t==="IN")r=inv?inv[n.id]:n.v;else{const a=src(n,0),b=src(n,1),x=a==null?0:val[a]|0,y=b==null?0:val[b]|0;r=n.t==="OUT"?x:F[n.t](x,y)}if(val[n.id]!==r){val[n.id]=r;ch=1}});if(!ch)break}return val}
function cyc(){const st={},go=id=>{if(st[id]===1)return 1;if(st[id]===2)return 0;st[id]=1;for(const w of B.w)if(w.to===id&&go(w.from))return 1;st[id]=2;return 0};return B.n.some(n=>go(n.id))}
const path=(a,b)=>`M${a.x} ${a.y}C${a.x+50} ${a.y} ${b.x-50} ${b.y} ${b.x} ${b.y}`;
function draw(){const val=settle(B.val,null),sel=(k,id)=>B.sel&&B.sel.k===k&&B.sel.id===id;let s="";
B.w.forEach(w=>{const f=byId(w.from),t=byId(w.to);if(!f||!t)return;const d=path(pinOut(f),pinIn(t,w.pin));s+=`<path class="w${val[w.from]|0}${sel("w",w.id)?" ws":""}" d="${d}"/><path class="wh" data-w="${w.id}" d="${d}"/>`});
if(B.tmp)s+=`<path class="w0 tmp" d="${path(pinOut(byId(B.tmp.from)),B.tmp.p)}"/>`;
B.n.forEach(n=>{const v=val[n.id]|0,w=NW(n),ins=n.t==="IN"?[]:ONE(n.t)||n.t==="OUT"?[0]:[0,1];
s+=`<g class="nd" data-node="${n.id}" transform="translate(${n.x},${n.y})">`;if(sel("n",n.id))s+=`<rect class="selbox" x="-10" y="-8" width="${w+20}" height="68" rx="8"/>`;
if(n.t==="IN")s+=`<g data-sw="${n.id}" class="sw${n.v?" on":""}"><rect class="track" x="0" y="12" width="54" height="26" rx="13"/><circle class="knob" cx="${n.v?41:13}" cy="25" r="10"/><text class="sm" x="${n.v?18:38}" y="29" text-anchor="middle">${n.v}</text></g><text class="t" x="62" y="31">${n.l}</text>`;
else if(n.t==="OUT")s+=`<circle class="led${v?" on":""}" cx="24" cy="25" r="16"/><text class="t" x="24" y="30" text-anchor="middle">${v}</text><text class="sm" x="24" y="58" text-anchor="middle">${n.l}</text>`;
else s+=L.sym(n.t,0,0,v,1)+`<text class="sm" x="${w/2}" y="62" text-anchor="middle">${n.t}</text>`;
ins.forEach((k,i)=>s+=`<circle class="pin${src(n,i)!=null?" on":""}" cx="0" cy="${pinY(n,i)}" r="5"/>`);
if(n.t!=="OUT")s+=`<circle class="pin out${B.pend===n.id?" pend":""}" cx="${w}" cy="25" r="${B.pend===n.id?8:5}"/><circle class="hit" data-out="${n.id}" cx="${w}" cy="25" r="16"/>`;
ins.forEach((k,i)=>s+=`<circle class="hit" data-in="${n.id}:${i}" cx="0" cy="${pinY(n,i)}" r="14"/>`);s+="</g>"});
Q("#bl").innerHTML=s}
function table(){const ins=B.n.filter(n=>n.t==="IN"),outs=B.n.filter(n=>n.t==="OUT"),el=Q("#btab");
if(!ins.length||!outs.length){el.innerHTML="";return}
if(ins.length>4){el.innerHTML='<p class="d">A truth table is shown for up to 4 switches.</p>';return}
if(cyc()){el.innerHTML='<p class="note2">This circuit has feedback, so its output depends on its history (memory). Use the switches to test it.</p>';return}
let h=`<h3>Truth table of your circuit</h3><table class="tt"><tr>${ins.map(n=>`<th>${n.l}</th>`).join("")}${outs.map(n=>`<th>${n.l}</th>`).join("")}</tr>`;
for(let k=0;k<1<<ins.length;k++){const iv={};ins.forEach((n,i)=>iv[n.id]=(k>>(ins.length-1-i))&1);const r=settle({},iv);h+=`<tr class="${ins.every(n=>iv[n.id]===n.v)?"cur":""}">${ins.map(n=>`<td>${iv[n.id]}</td>`).join("")}${outs.map(n=>`<td><b>${r[n.id]}</b></td>`).join("")}</tr>`}
el.innerHTML=h+"</table>"}
const msg=t=>{const m=Q("#bmsg");m.textContent=t;m.hidden=!t},save=()=>{try{localStorage.setItem("bd",JSON.stringify({n:B.n,w:B.w,id:B.id}))}catch(e){}},all=()=>{draw();table()};
function connect(from,pin){const[to,k]=pin.split(":").map(Number);B.pend=null;if(to===from)return msg("A part cannot connect to itself.");B.w=B.w.filter(w=>!(w.to===to&&w.pin===k));B.w.push({id:B.id++,from,to,pin:k});msg("")}
function del(){const s=B.sel;if(!s)return msg("Tap a part or wire first, then press Delete.");if(s.k==="n"){B.n=B.n.filter(n=>n.id!==s.id);B.w=B.w.filter(w=>w.from!==s.id&&w.to!==s.id)}else B.w=B.w.filter(w=>w.id!==s.id);B.sel=null;B.pend=null;save();all()}
const EX={ha:["Half adder",[["IN",30,70],["IN",30,210],["XOR",230,50],["AND",230,190],["OUT",450,60],["OUT",450,200]],[[0,2,0],[1,2,1],[0,3,0],[1,3,1],[2,4,0],[3,5,0]]],
xorn:["XOR from NAND",[["IN",20,70],["IN",20,260],["NAND",170,160],["NAND",320,80],["NAND",320,250],["NAND",460,160],["OUT",580,170]],[[0,2,0],[1,2,1],[0,3,0],[2,3,1],[1,4,0],[2,4,1],[3,5,0],[4,5,1],[5,6,0]]],
sr:["SR latch",[["IN",30,70],["IN",30,260],["NOR",280,260],["NOR",280,70],["OUT",500,260],["OUT",500,70]],[[1,2,0],[3,2,1],[0,3,0],[2,3,1],[2,4,0],[3,5,0]]],
fa:["Full adder",[["IN",20,40],["IN",20,150],["IN",20,260],["XOR",170,60],["XOR",330,270],["AND",170,170],["AND",330,160],["OR",460,140],["OUT",550,280],["OUT",570,150]],[[0,3,0],[1,3,1],[3,4,0],[2,4,1],[0,5,0],[1,5,1],[3,6,0],[2,6,1],[5,7,0],[6,7,1],[4,8,0],[7,9,0]]]};
function load(k){const e=EX[k];B.n=[];B.w=[];B.val={};const ids=e[1].map(([t,x,y])=>add(t,x,y).id);e[2].forEach(([a,b,p])=>B.w.push({id:B.id++,from:ids[a],to:ids[b],pin:p}));B.sel=null;B.pend=null;msg("")}
const spot=t=>{const k=t==="IN"?"IN":t==="OUT"?"OUT":"G",c=B.n.filter(n=>(n.t==="IN"?"IN":n.t==="OUT"?"OUT":"G")===k).length;return k==="IN"?add(t,30,30+(c%4)*85):k==="OUT"?add(t,530,30+(c%4)*85):add(t,200+(c%3)*115,30+Math.floor(c/3)*95+(c%2)*30)};
function init(){const svg=Q("#bsvg");try{const d=JSON.parse(localStorage.getItem("bd"));if(d&&d.n&&d.n.length){B.n=d.n;B.w=d.w;B.id=d.id}else load("ha")}catch(e){load("ha")}B.val={};B.sel=null;B.pend=null;
const pt=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())};
svg.addEventListener("pointerdown",e=>{const p=pt(e),t=e.target;svg.setPointerCapture(e.pointerId);const o=t.closest("[data-out]");
if(o){B.drag={k:"wire",from:+o.dataset.out,x0:e.clientX,y0:e.clientY};B.tmp={from:+o.dataset.out,p};return}
const i=t.closest("[data-in]");if(i){B.drag={k:"tapin",pin:i.dataset.in};return}
const nd=t.closest("[data-node]");if(nd){const n=byId(+nd.dataset.node);B.drag={k:"node",n,sw:!!t.closest("[data-sw]"),x0:e.clientX,y0:e.clientY,ox:p.x-n.x,oy:p.y-n.y,moved:0};B.sel={k:"n",id:n.id};draw();return}
const w=t.closest("[data-w]");B.sel=w?{k:"w",id:+w.dataset.w}:null;B.pend=null;draw()});
svg.addEventListener("pointermove",e=>{const d=B.drag;if(!d)return;const p=pt(e);if(d.k==="node"){if(Math.hypot(e.clientX-d.x0,e.clientY-d.y0)>4)d.moved=1;if(d.moved){d.n.x=cl(p.x-d.ox,4,W-NW(d.n)-4);d.n.y=cl(p.y-d.oy,8,H-70)}}else if(d.k==="wire")B.tmp.p=p;draw()});
svg.addEventListener("pointerup",e=>{const d=B.drag;B.drag=null;if(!d)return;
if(d.k==="wire"){const el=document.elementFromPoint(e.clientX,e.clientY),i=el&&el.closest&&el.closest("[data-in]");B.tmp=null;
if(i)connect(d.from,i.dataset.in);else if(Math.hypot(e.clientX-d.x0,e.clientY-d.y0)<6){B.pend=B.pend===d.from?null:d.from;msg(B.pend?"Output selected. Now tap an input pin to connect it.":"")}}
else if(d.k==="tapin"){if(B.pend!=null)connect(B.pend,d.pin)}else if(d.k==="node"&&!d.moved&&d.sw)d.n.v^=1;save();all()});
svg.addEventListener("pointercancel",()=>{B.drag=null;B.tmp=null;draw()});
document.querySelectorAll("[data-p]").forEach(b=>{let s=null;b.addEventListener("pointerdown",e=>{s={x:e.clientX,y:e.clientY};b.setPointerCapture(e.pointerId)});
b.addEventListener("pointerup",e=>{if(!s)return;const mv=Math.hypot(e.clientX-s.x,e.clientY-s.y)>8,r=svg.getBoundingClientRect(),ins=e.clientX>r.left&&e.clientX<r.right&&e.clientY>r.top&&e.clientY<r.bottom;s=null;
if(mv&&ins){const p=pt(e);add(b.dataset.p,p.x-30,p.y-25)}else if(!mv)spot(b.dataset.p);else return;save();all()});
b.addEventListener("click",e=>{if(e.detail===0){spot(b.dataset.p);save();all()}})});
Q("#bd-root").addEventListener("click",e=>{const b=e.target.closest("[data-b]");if(!b)return;const a=b.dataset.b;
if(a==="del")del();else if(a==="clear"){B.n=[];B.w=[];B.val={};B.sel=null;B.pend=null;msg("");save();all()}else{load(a);save();all()}});
if(KD)removeEventListener("keydown",KD);KD=e=>{if(!Q("#bd-root"))return removeEventListener("keydown",KD);if((e.key==="Delete"||e.key==="Backspace")&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();del()}};addEventListener("keydown",KD);all()}
const pal=[["IN","Switch"],["OUT","Lamp"],...GT.map(g=>[g,g])];
return{init,html:`<div id="bd-root"><p class="d">Build your own circuit. Add parts, wire them together and test with the switches.</p>
<div class="pills"><span class="gl">Add part</span>${pal.map(([k,l])=>`<button class="pal" data-p="${k}" title="Tap to add, or drag onto the board">${l}</button>`).join("")}</div>
<div class="pills"><button data-b="del">Delete selected</button><button data-b="clear">Clear board</button><span class="gl">Examples</span>${Object.keys(EX).map(k=>`<button data-b="${k}">${EX[k][0]}</button>`).join("")}</div>
<svg id="bsvg" class="simsvg bsvg" viewBox="0 0 ${W} ${H}" role="application" aria-label="Circuit board"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" style="fill:var(--line)"/></pattern></defs><rect width="${W}" height="${H}" fill="url(#dots)"/><g id="bl"></g></svg>
<p class="note2" id="bmsg" hidden></p><div id="btab"></div>
<details open><summary>How to use the builder</summary><ol><li><b>Add parts:</b> tap a part button, or drag it onto the board.</li><li><b>Move parts</b> by dragging them.</li><li><b>Connect:</b> drag from a dark output dot to a hollow input dot. On a phone you can also tap the output dot, then tap the input dot. An input accepts one wire; connecting again replaces it.</li><li><b>Test:</b> tap a switch to change it. Wires turn green for 1 and lamps light up.</li><li><b>Delete:</b> tap a part or wire, then press Delete selected (or the Delete key).</li></ol><p class="d">Hollow red input pins are not connected and count as 0. Your board is saved in this browser.</p></details></div>`};
})();
