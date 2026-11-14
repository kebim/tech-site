/* Digital logic simulator (Gates, Universal gates, Circuits, Flip-flops). Loaded before content.js. */
window.LogicSim=(()=>{
const Q=s=>document.querySelector(s);
const F={AND:(a,b)=>a&b,OR:(a,b)=>a|b,NOT:a=>1-a,BUF:a=>a,NAND:(a,b)=>1-(a&b),NOR:(a,b)=>1-(a|b),XOR:(a,b)=>a^b,XNOR:(a,b)=>1-(a^b)};
const ONE=t=>t==="NOT"||t==="BUF",BASE=t=>({NAND:"AND",NOR:"OR",XNOR:"XOR"})[t]||t,BUB=t=>/^(NAND|NOR|XNOR|NOT)$/.test(t),GW={AND:57,OR:62,XOR:62,NOT:52,BUF:52};
const gw=(t,sc)=>(GW[BASE(t)]+(BUB(t)?10:0))*sc;
const EX={AND:"Y = A \u00b7 B",OR:"Y = A + B",NOT:"Y = A\u2032",BUF:"Y = A",NAND:"Y = (A \u00b7 B)\u2032",NOR:"Y = (A + B)\u2032",XOR:"Y = A \u2295 B",XNOR:"Y = (A \u2295 B)\u2032"};
const INFO={AND:"Output is 1 only when all inputs are 1.",OR:"Output is 1 when at least one input is 1.",NOT:"Inverts the input: 0 becomes 1 and 1 becomes 0.",BUF:"Passes the input through unchanged. Used to strengthen or delay a signal.",NAND:"AND followed by NOT. It is universal: every other gate can be built from NAND alone.",NOR:"OR followed by NOT. Also universal: every other gate can be built from NOR alone.",XOR:"Output is 1 when the inputs are different (an odd number of 1s).",XNOR:"Output is 1 when the inputs are the same, so it works as an equality detector."};
// universal constructions
const U=(base,tg)=>{const gs=[];let c=0;const g=(a,b)=>{const id="g"+(++c);gs.push({id,type:base,in:[a,b]});return id},nt=a=>g(a,a),N=base==="NAND";
const AND=N?(a,b)=>nt(g(a,b)):(a,b)=>g(nt(a),nt(b)),OR=N?(a,b)=>g(nt(a),nt(b)):(a,b)=>nt(g(a,b)),X=()=>{const x=g("A","B");return g(g("A",x),g("B",x))};
const o=tg==="NOT"?nt("A"):tg==="AND"?AND("A","B"):tg==="OR"?OR("A","B"):tg==="NAND"?nt(AND("A","B")):tg==="NOR"?nt(OR("A","B")):tg==="XOR"?(N?X():nt(X())):(N?nt(X()):X());
return{in:tg==="NOT"?["A"]:["A","B"],g:gs,out:[o],lab:{[o]:"Y"}}};
const PRE={ha:{n:"Half adder",h:"Adds two bits. S is the sum bit and C is the carry.",net:{in:["A","B"],g:[{id:"S",type:"XOR",in:["A","B"]},{id:"C",type:"AND",in:["A","B"]}],out:["S","C"]}},
fa:{n:"Full adder",h:"Adds A + B + Cin. Try 1 + 1 + 1: the answer is 11 in binary (Cout = 1, S = 1).",net:{in:["A","B","Cin"],g:[{id:"x",type:"XOR",in:["A","B"]},{id:"S",type:"XOR",in:["x","Cin"]},{id:"a1",type:"AND",in:["A","B"]},{id:"a2",type:"AND",in:["x","Cin"]},{id:"Cout",type:"OR",in:["a1","a2"]}],out:["S","Cout"]}},
mux:{n:"2-to-1 multiplexer",h:"Select input S chooses which data input reaches Y: S = 0 passes A, S = 1 passes B.",net:{in:["A","B","S"],g:[{id:"ns",type:"NOT",in:["S","S"]},{id:"a1",type:"AND",in:["A","ns"]},{id:"a2",type:"AND",in:["B","S"]},{id:"Y",type:"OR",in:["a1","a2"]}],out:["Y"]}},
sr:{n:"SR latch (NOR)",seq:1,h:"Feedback gives memory. Set S = 1, then S = 0: Q stays 1. Set R = 1 to clear it. S = R = 1 is the forbidden input.",net:{in:["S","R"],g:[{id:"Q",type:"NOR",in:["R","Qb"]},{id:"Qb",type:"NOR",in:["S","Q"]}],out:["Q","Qb"]}}};
const S={tab:"gates",g:{t:"AND",v:{A:0,B:0}},u:{base:"NAND",tg:"AND",v:{A:0,B:0}},c:{id:"ha",v:{}},f:{t:"D",q:0,c:0,i:{S:0,R:0,D:0,J:0,K:0,T:0},h:[],auto:0,ms:900,warn:"",n:0}};
let timer=0;
function settle(net,v){for(let p=0;p<10;p++){let ch=0;net.g.forEach(g=>{const a=v[g.in[0]]|0,b=v[g.in[1]]|0,n=F[g.type](a,b);if(v[g.id]!==n){v[g.id]=n;ch=1}});if(!ch)break}return v}
function sym(t,x,y,on,sc){const b=BASE(t);let d,w=GW[b];d=b==="AND"?"M0 0H32A25 25 0 0 1 32 50H0Z":b==="NOT"||b==="BUF"?"M0 0L52 25L0 50Z":"M0 0Q32 0 62 25Q32 50 0 50Q15 25 0 0Z";
let s=`<path class="body${on?" on":""}" d="${d}"/>`;if(b==="XOR")s+=`<path class="arc${on?" on":""}" d="M-9 0Q6 25 -9 50"/>`;if(BUB(t))s+=`<circle class="body${on?" on":""}" cx="${w+5}" cy="25" r="5"/>`;
return`<g transform="translate(${x},${y}) scale(${sc})">${s}</g>`}
const sw=(n,y,on,x)=>`<g class="sw${on?" on":""}" data-t="${n}" tabindex="0" role="switch" aria-checked="${!!on}" aria-label="Input ${n}"><text class="t" x="${x}" y="${y+5}">${n}</text><rect class="track" x="${x+34}" y="${y-13}" width="54" height="26" rx="13"/><circle class="knob" cx="${x+(on?75:47)}" cy="${y}" r="10"/><text class="sm" x="${x+(on?50:70)}" y="${y+4}" text-anchor="middle">${on?1:0}</text></g>`;
const led=(x,y,on,l)=>`<circle class="led${on?" on":""}" cx="${x}" cy="${y}" r="16"/><text class="t" x="${x}" y="${y+5}" text-anchor="middle">${on?1:0}</text><text class="sm" x="${x}" y="${y+34}" text-anchor="middle">${l}</text>`;
function draw(net,v,sc){const lv={},seen={},isIn=r=>net.in.includes(r);
const L=id=>{if(id in lv)return lv[id];if(seen[id])return 0;seen[id]=1;let m=0;net.g.find(g=>g.id===id).in.forEach(r=>{if(!isIn(r))m=Math.max(m,L(r))});return lv[id]=m+1};net.g.forEach(g=>L(g.id));
const by={};net.g.forEach(g=>(by[lv[g.id]]=by[lv[g.id]]||[]).push(g.id));const cols=Math.max(...Object.keys(by).map(Number)),rows=Math.max(net.in.length,net.out.length,...Object.values(by).map(a=>a.length)),SP=86,COL=100+70*sc,H=rows*SP+10;
const cy=(n,i)=>5+(rows-n)*SP/2+i*SP+SP/2,P={};let mw=0;
net.g.forEach(g=>{const c=by[lv[g.id]],w=gw(g.type,sc);mw=Math.max(mw,w);P[g.id]={x:130+(lv[g.id]-1)*COL,y:cy(c.length,c.indexOf(g.id)),w}});
const W=130+(cols-1)*COL+mw+120,lx=W-45,w0=[],w1=[];
const wire=(a,b,val)=>(val?w1:w0).push(`<path class="w${val}" d="M${a.x} ${a.y}C${a.x+45} ${a.y} ${b.x-45} ${b.y} ${b.x} ${b.y}"/>`);
const src=r=>isIn(r)?{x:88,y:cy(net.in.length,net.in.indexOf(r))}:{x:P[r].x+P[r].w,y:P[r].y};
net.g.forEach(g=>{const p=P[g.id],pins=ONE(g.type)?[25]:[12,38];pins.forEach((q,k)=>wire(src(g.in[k]),{x:p.x,y:p.y-25*sc+q*sc},v[g.in[k]]|0))});
net.out.forEach((o,i)=>wire(src(o),{x:lx-16,y:cy(net.out.length,i)},v[o]|0));
let s=`<svg class="simsvg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Logic circuit">`+w0.join("")+w1.join("");
net.g.forEach(g=>{const p=P[g.id];s+=sym(g.type,p.x,p.y-25*sc,v[g.id],sc);if(sc<1.2)s+=`<text class="sm" x="${p.x+p.w/2}" y="${p.y+25*sc+14}" text-anchor="middle">${g.type}</text>`});
net.in.forEach((n,i)=>s+=sw(n,cy(net.in.length,i),v[n],8));
net.out.forEach((o,i)=>s+=led(lx,cy(net.out.length,i),v[o],net.lab&&net.lab[o]||o));return s+"</svg>"}
function table(net,v,tg){const n=net.in.length,rows=[];let ok=1;
for(let k=0;k<1<<n;k++){const iv={};net.in.forEach((m,i)=>iv[m]=(k>>(n-1-i))&1);const r=settle(net,{...iv});const o=net.out.map(x=>r[x]);if(tg&&o[0]!==F[tg](iv.A,iv.B))ok=0;rows.push([iv,o])}
let h=`<table class="tt"><tr>${net.in.map(m=>`<th>${m}</th>`).join("")}${net.out.map(o=>`<th>${net.lab&&net.lab[o]||o}</th>`).join("")}</tr>`;
rows.forEach(([iv,o])=>{h+=`<tr class="${net.in.every(m=>iv[m]===(v[m]|0))?"cur":""}">${net.in.map(m=>`<td>${iv[m]}</td>`).join("")}${o.map(x=>`<td><b>${x}</b></td>`).join("")}</tr>`});return{h:h+"</table>",ok}}
const pills=(a,cur,act,fn)=>a.map(k=>`<button data-act="${act}:${k}" class="${k===cur?"on":""}">${fn?fn(k):k}</button>`).join("");
const gview=()=>{const t=S.g.t,v=S.g.v,net={in:ONE(t)?["A"]:["A","B"],g:[{id:"Y",type:t,in:ONE(t)?["A","A"]:["A","B"]}],out:["Y"]};settle(net,v);
const G=[["Basic",["AND","OR","NOT","BUF"]],["Universal",["NAND","NOR"]],["Other",["XOR","XNOR"]]];
return`<p class="d">Pick a gate, then click the switches to change the inputs. Green wires carry 1, grey wires carry 0.</p><div class="pills">${G.map(([l,a])=>`<span class="gl">${l}</span>`+pills(a,t,"gate",k=>k==="BUF"?"BUFFER":k)).join("")}</div>${draw(net,v,1.5)}<p class="out"><b>${EX[t]}</b></p><p>${INFO[t]}</p>${table(net,v).h}`};
const uview=()=>{const u=S.u,T=u.base==="NAND"?["NOT","AND","OR","NOR","XOR","XNOR"]:["NOT","OR","AND","NAND","XOR","XNOR"],net=U(u.base,u.tg);settle(net,u.v);const t=table(net,u.v,u.tg);
return`<p class="d">Every gate can be built from NAND alone, or from NOR alone. Choose a base gate and the gate you want to build.</p><div class="pills"><span class="gl">Build with</span>${pills(["NAND","NOR"],u.base,"base")}<span class="gl">Build a</span>${pills(T,u.tg,"tg")}</div>${draw(net,u.v,1)}<p class="out"><b>${net.g.length} ${u.base} gate${net.g.length>1?"s":""}</b> make a ${u.tg} gate. ${t.ok?"The output matches "+u.tg+" for every input \u2713":"Mismatch!"}</p>${t.h}`};
const cview=()=>{const c=S.c,p=PRE[c.id];settle(p.net,c.v);
return`<p class="d">Combine gates into useful circuits. Click the switches and watch the signals travel.</p><div class="pills">${pills(Object.keys(PRE),c.id,"pre",k=>PRE[k].n)}</div>${draw(p.net,c.v,1)}<p class="note2">${p.h}</p>${p.seq?"":table(p.net,c.v).h}`};
// flip-flops
const FN={SR:(i,q)=>i.S&&i.R?null:i.S?1:i.R?0:q,D:i=>i.D,JK:(i,q)=>i.J&&i.K?1-q:i.J?1:i.K?0:q,T:(i,q)=>i.T?1-q:q},IN={SR:["S","R"],D:["D"],JK:["J","K"],T:["T"],LATCH:["D"]};
const CT={SR:[["S","R","Q+"],[0,0,"Q"],[0,1,0],[1,0,1],[1,1,"invalid"]],D:[["D","Q+"],[0,0],[1,1]],JK:[["J","K","Q+"],[0,0,"Q"],[0,1,0],[1,0,1],[1,1,"Q\u2032"]],T:[["T","Q+"],[0,"Q"],[1,"Q\u2032"]],LATCH:[["EN","D","Q+"],[0,"x","Q"],[1,0,0],[1,1,1]]};
const TIP={SR:"Set S = 1, R = 0 and pulse the clock: Q becomes 1. Then S = 0, R = 0 and pulse: Q holds. Finally try S = R = 1.",D:"Q copies D only at the rising clock edge. Change D between pulses and notice that Q waits.",JK:"Set J = 1, K = 1 and pulse the clock several times: Q toggles every time.",T:"Set T = 1 and pulse: Q toggles each pulse, so Q runs at half the clock frequency (a divide-by-2 counter).",LATCH:"While EN = 1, Q follows D immediately. Set EN = 0 to freeze it. Compare this with the D flip-flop, which only samples on the edge."};
const rec=()=>{const f=S.f;f.h.push({c:f.c,q:f.q,...f.i});if(f.h.length>60)f.h.shift()};
function clk(v){const f=S.f;if(v===f.c)return;f.c=v;f.warn="";if(f.t==="LATCH"){if(v)f.q=f.i.D}else if(v){f.n++;const n=FN[f.t](f.i,f.q);if(n===null)f.warn="S = R = 1 is forbidden for an SR flip-flop. The state was left unchanged.";else f.q=n}rec()}
function stop(){clearInterval(timer);S.f.auto=0}
function ffsvg(){const f=S.f,L=f.t==="LATCH"?"EN":"CLK",ins=[...IN[f.t],L],n=ins.length,py=i=>140-(n-1)*25+i*50,vv=k=>k===L?f.c:f.i[k];let s=`<svg class="simsvg" viewBox="0 0 560 290" role="img" aria-label="${f.t} flip-flop">`;
ins.forEach((k,i)=>s+=`<path class="w${vv(k)}" d="M96 ${py(i)}H230"/>`);s+=`<path class="w${f.q}" d="M340 100H474"/><path class="w${1-f.q}" d="M340 190H474"/><path class="w0" d="M285 34V46M285 244V256"/>`;
s+=`<rect class="body" x="230" y="46" width="110" height="198" rx="10"/><text class="big" x="285" y="152" text-anchor="middle">${f.t==="LATCH"?"LATCH":f.t+" FF"}</text>`;
ins.forEach((k,i)=>{s+=`<text class="sm" x="238" y="${py(i)+4}">${k}</text>`;if(k==="CLK")s+=`<path class="arc" d="M230 ${py(i)-8}L243 ${py(i)}L230 ${py(i)+8}"/>`;s+=sw(k,py(i),vv(k),8)});
s+=`<text class="t" x="332" y="105" text-anchor="end">Q</text><text class="t" x="332" y="195" text-anchor="end">Q\u2032</text>`+led(490,100,f.q,"Q")+led(490,190,1-f.q,"Q\u2032");
s+=`<g class="btn2" data-act="fpre" tabindex="0" role="button" aria-label="Preset: force Q to 1"><rect x="262" y="8" width="46" height="26" rx="6"/><text x="285" y="26" text-anchor="middle">PRE</text></g><g class="btn2" data-act="fclr" tabindex="0" role="button" aria-label="Clear: force Q to 0"><rect x="262" y="256" width="46" height="26" rx="6"/><text x="285" y="274" text-anchor="middle">CLR</text></g>`;return s+"</svg>"}
function timing(){const f=S.f,L=f.t==="LATCH"?"EN":"CLK",sig=[[L,"c"],...IN[f.t].map(n=>[n,n]),["Q","q"]],h=f.h.slice(-22),CW=28,LW=46,H=sig.length*38+10,W=LW+22*CW;let s=`<svg class="simsvg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Timing diagram">`;
h.forEach((x,i)=>{if(f.t!=="LATCH"&&i&&x.c&&!h[i-1].c)s+=`<line class="edge" x1="${LW+i*CW}" y1="4" x2="${LW+i*CW}" y2="${H-4}"/>`});
sig.forEach(([n,k],r)=>{const y0=r*38+12;let p="";h.forEach((x,i)=>{const y=x[k]?y0:y0+20,xx=LW+i*CW;p+=`${xx},${y} ${xx+CW},${y} `});s+=`<text class="t" x="6" y="${y0+15}">${n}</text><polyline class="tw${k==="q"?" q":""}" points="${p}"/>`});return s+"</svg>"}
const fview=()=>{const f=S.f,ct=CT[f.t],hit=r=>f.t==="LATCH"?r[0]===f.c&&(r[1]==="x"||r[1]===f.i.D):IN[f.t].every((k,j)=>r[j]===f.i[k]);
return`<p class="d">Click the switches to set inputs. A flip-flop only changes on the <b>rising edge</b> of the clock (0 to 1). Toggle CLK, or use the buttons below.</p><div class="pills"><span class="gl">Type</span>${pills(["SR","D","JK","T","LATCH"],f.t,"fft",k=>k==="LATCH"?"D Latch":k+" flip-flop")}</div>${ffsvg()}
<div class="pills"><button data-act="pulse">Pulse clock &#9654;</button><button data-act="auto" class="${f.auto?"on":""}">${f.auto?"Stop auto clock":"Auto clock"}</button><span class="gl">Speed</span>${pills(["1200","900","450"],String(f.ms),"speed",k=>({1200:"Slow",900:"Normal",450:"Fast"})[k])}<button data-act="hist">Reset diagram</button></div>
${f.warn?`<p class="note2">${f.warn}</p>`:""}<p class="out"><b>Q = ${f.q}&nbsp;&nbsp;Q\u2032 = ${1-f.q}</b>&nbsp;&nbsp; clock edges so far: ${f.n}</p><p class="note2"><b>Try this:</b> ${TIP[f.t]}</p><h3>Timing diagram</h3>${timing()}
<h3>Characteristic table</h3><table class="tt">${ct.map((r,i)=>`<tr class="${i&&hit(r)?"cur":""}">${r.map(c=>i?`<td>${c}</td>`:`<th>${c}</th>`).join("")}</tr>`).join("")}</table><p class="d">Q+ means the next value of Q. The highlighted row matches the current inputs.</p>`};
const VIEW={gates:gview,uni:uview,circ:cview,ff:fview},TABS=[["gates","Gates"],["uni","Universal gates"],["circ","Circuits"],["ff","Flip-flops"]];
function render(){const m=Q("#sim-main");if(!m)return;const fo=document.activeElement&&document.activeElement.dataset&&document.activeElement.dataset.t;
m.innerHTML=`<div class="pills simtabs" role="tablist">${TABS.map(([k,l])=>`<button role="tab" aria-selected="${k===S.tab}" data-act="tab:${k}" class="${k===S.tab?"on":""}">${l}</button>`).join("")}</div>`+VIEW[S.tab]();if(fo){const e=m.querySelector(`[data-t="${fo}"]`);if(e)e.focus()}}
function flip(n){const f=S.f;if(S.tab==="gates")S.g.v[n]^=1;else if(S.tab==="uni")S.u.v[n]^=1;else if(S.tab==="circ")S.c.v[n]^=1;else if(n==="CLK"||n==="EN")clk(1-f.c);else{f.i[n]^=1;f.warn="";if(f.t==="LATCH"&&f.c)f.q=f.i.D;rec()}}
function act(a){const[k,x]=a.split(":"),f=S.f;
if(k==="tab"){if(x!=="ff")stop();S.tab=x}else if(k==="gate")S.g.t=x;
else if(k==="base"){S.u.base=x;if(S.u.tg===x)S.u.tg="AND"}else if(k==="tg")S.u.tg=x;else if(k==="pre"){S.c.id=x;S.c.v={}}
else if(k==="fft"){stop();f.t=x;f.q=0;f.c=0;f.n=0;f.warn="";f.h=[];rec()}
else if(k==="pulse"){clk(1);render();setTimeout(()=>{clk(0);render()},350);return}
else if(k==="auto"){if(f.auto)stop();else{f.auto=1;timer=setInterval(()=>{if(!Q("#sim-root"))return stop();clk(1-S.f.c);render()},f.ms)}}
else if(k==="speed"){f.ms=+x;if(f.auto){clearInterval(timer);timer=setInterval(()=>{if(!Q("#sim-root"))return stop();clk(1-S.f.c);render()},f.ms)}}
else if(k==="hist"){f.h=[];f.n=0;rec()}else if(k==="fpre"){f.q=1;f.warn="";rec()}else if(k==="fclr"){f.q=0;f.warn="";rec()}
render()}
function init(){stop();const r=Q("#sim-root");S.f.h.length||rec();
r.addEventListener("click",e=>{const t=e.target.closest("[data-t]");if(t){flip(t.dataset.t);render();return}const a=e.target.closest("[data-act]");if(a)act(a.dataset.act)});
r.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const t=e.target.closest("[data-t],[data-act]");if(t){e.preventDefault();t.click()}});render()}
return{html:`<div id="sim-root"><div id="sim-main"></div></div>`,init,F,sym,gw,ONE};
})();
