/* =====================================================================
   TECH SITE CONTENT. This is the only file you need to edit.

   ADD A TOOL     : add an object to TOOLS: {id, group, title, desc, html, init}.
                    "html" is the tool's markup; "init" runs after the markup is
                    shown (attach your event listeners there; use $("elementId")).
   ADD A SUBMENU  : give a tool a new "group" name. A new menu entry and sidebar
                    section appear automatically.
   ADD A MENU ITEM: add {title, id} or {title, href} to MENU; for id-pages add
                    the page to PAGES.
   ADD REFERENCES : add links to REFERENCES under a group name.
   ===================================================================== */
const SITE={counter:"tech-mibekpandey-com-np",learn:"https://learn.mibekpandey.com.np",tech:"https://tech.mibekpandey.com.np"};
const HOME={eyebrow:"Tech / tools for real work",title:"Pick a tool.<br><em>Check your work.</em><br>Keep the notes.",
 summary:"Browser-based calculators and simulators for Linux, networking, digital logic and operating systems. Nothing you type leaves your device.",
 footer:"Practical tools for building technical confidence one useful action at a time."};
const $=id=>document.getElementById(id);
const TOOLS=[
{id:"base",group:"Number systems",title:"Number base converter",desc:"Convert between binary, octal, decimal and hex.",
html:`<p class="d">Type in any box. The others update.</p>
<div class="g"><div><label for="b2">Binary</label><input id="b2" inputmode="numeric"></div><div><label for="b8">Octal</label><input id="b8"></div><div><label for="b10">Decimal</label><input id="b10" inputmode="numeric"></div><div><label for="b16">Hex</label><input id="b16"></div></div><p class="err" id="berr"></p>`,
init(){
// Base converter
const bases={b2:2,b8:8,b10:10,b16:16},ok={2:/^[01]+$/,8:/^[0-7]+$/,10:/^\d+$/,16:/^[0-9a-f]+$/i};
Object.keys(bases).forEach(id=>$(id).addEventListener("input",()=>{const v=$(id).value.trim().replace(/^0[xb]/i,"");$("berr").textContent="";
if(!v){Object.keys(bases).forEach(k=>$(k).value="");return}
if(!ok[bases[id]].test(v)){$("berr").textContent="Not a valid base-"+bases[id]+" number.";return}
const n=BigInt((bases[id]==16?"0x":bases[id]==8?"0o":bases[id]==2?"0b":"")+v);
Object.keys(bases).forEach(k=>{if(k!==id)$(k).value=n.toString(bases[k]).toUpperCase()})}));
}},
{id:"chmod",group:"Linux",title:"chmod calculator",desc:"Build Linux permission modes by ticking boxes.",
html:`<p class="d">Tick permissions to get the numeric and symbolic mode.</p>
<table id="ct"><tr><th class="l"></th><th>Read</th><th>Write</th><th>Execute</th></tr></table>
<div class="out" id="co"></div>`,
init(){
// chmod
const who=["Owner","Group","Others"],bits=["r","w","x"];
$("ct").innerHTML+=who.map((w,i)=>`<tr><td class="l">${w}</td>${bits.map((b,j)=>`<td><input type="checkbox" style="width:auto" data-i="${i}" data-j="${j}" aria-label="${w} ${b}"></td>`).join("")}</tr>`).join("");
function chmod(){let num="",sym="";for(let i=0;i<3;i++){let n=0;bits.forEach((b,j)=>{const c=document.querySelector(`[data-i="${i}"][data-j="${j}"]`).checked;n+=c?4>>j:0;sym+=c?b:"-"});num+=n}
$("co").innerHTML=`Mode: <b>${num}</b> &nbsp; Symbolic: <b>${sym}</b><br>Command: <b>chmod ${num} filename</b>`}
$("ct").addEventListener("change",chmod);chmod();
}},
{id:"subnet",group:"Networking",title:"IPv4 subnet calculator",desc:"Network, mask, broadcast and host range from CIDR.",
html:`<p class="d">Enter an address with a prefix, like 192.168.10.37/26.</p>
<label for="sin">Address/prefix</label><input id="sin" value="192.168.10.37/26"><p class="err" id="serr"></p><div class="out" id="sout"></div>`,
init(){
// Subnet
function subnet(){const m=$("sin").value.trim().match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)\/(\d+)$/),e=$("serr"),o=$("sout");e.textContent="";o.innerHTML="";
if(!m||m.slice(1,5).some(x=>x>255)||m[5]>32){e.textContent="Use the form 192.168.1.10/24 (octets 0-255, prefix 0-32).";return}
const p=+m[5],ip=m.slice(1,5).reduce((a,x)=>a*256+ +x,0),mask=p?(0xFFFFFFFF<<(32-p))>>>0:0,net=(ip&mask)>>>0,bc=(net|~mask)>>>0;
const s=n=>[24,16,8,0].map(k=>(n>>>k)&255).join("."),hosts=p>=31?(p==32?1:2):Math.pow(2,32-p)-2;
o.innerHTML=`<table><tr><td class="l">Network</td><td class="l">${s(net)}/${p}</td></tr><tr><td class="l">Netmask</td><td class="l">${s(mask)}</td></tr><tr><td class="l">Broadcast</td><td class="l">${s(bc)}</td></tr><tr><td class="l">First host</td><td class="l">${p>=31?s(net):s(net+1)}</td></tr><tr><td class="l">Last host</td><td class="l">${p>=31?s(bc):s(bc-1)}</td></tr><tr><td class="l">Usable hosts</td><td class="l">${hosts.toLocaleString()}</td></tr></table>`}
$("sin").addEventListener("input",subnet);subnet();
}},
{id:"logic",group:"Digital logic",title:"Truth table generator",desc:"Truth table for any expression of A to D.",
html:`<p class="d">Use variables A-D with <code>&amp;</code> and, <code>|</code> or, <code>^</code> xor, <code>!</code> not, and parentheses.</p>
<label for="lin">Expression</label><input id="lin" value="(A &amp; B) | !C"><p class="err" id="lerr"></p><div id="lout" style="overflow-x:auto"></div>`,
init(){
// Truth table (safe: tokens are validated, then evaluated on 0/1 only)
function logic(){const src=$("lin").value.toUpperCase(),e=$("lerr"),o=$("lout");e.textContent="";o.innerHTML="";
if(!/^[A-D01&|^!() \s]+$/.test(src)){e.textContent="Use only A-D, 0, 1, & | ^ ! and parentheses.";return}
const vars=[...new Set(src.match(/[A-D]/g)||[])].sort();if(!vars.length){e.textContent="Add at least one variable (A-D).";return}
let rows="";try{for(let k=0;k<1<<vars.length;k++){const vals=vars.map((_,i)=>(k>>(vars.length-1-i))&1);
const expr=src.replace(/[A-D]/g,c=>vals[vars.indexOf(c)]);const r=Function('"use strict";return ('+expr+')&1')();
rows+=`<tr>${vals.map(v=>`<td>${v}</td>`).join("")}<td><b>${r}</b></td></tr>`}}catch(x){e.textContent="Could not read that expression. Check parentheses and operators.";return}
o.innerHTML=`<table><tr>${vars.map(v=>`<th>${v}</th>`).join("")}<th>Out</th></tr>${rows}</table>`}
$("lin").addEventListener("input",logic);logic();
}},
{id:"kmap",group:"Digital logic",title:"K-map simplifier",desc:"Minimise a function using Quine-McCluskey.",
html:`<p class="d">Enter minterms (and optional don't-cares) for 2-4 variables. Result uses Quine-McCluskey.</p>
<div class="g"><div><label for="kn">Variables</label><select id="kn"><option>2</option><option>3</option><option selected>4</option></select></div><div><label for="km">Minterms</label><input id="km" value="0,1,2,5,8,9,10"></div><div><label for="kd">Don't cares</label><input id="kd" placeholder="e.g. 7,15"></div></div><p class="err" id="kerr"></p><div class="out" id="kout"></div>`,
init(){
// K-map via Quine-McCluskey
function qm(n,on,dc){const all=[...new Set([...on,...dc])];let cur=all.map(m=>({v:m,mask:0,m:[m]})),pr=[];
while(cur.length){const nx=new Map(),used=new Set();
for(let i=0;i<cur.length;i++)for(let j=i+1;j<cur.length;j++){const a=cur[i],b=cur[j];if(a.mask!==b.mask)continue;const d=a.v^b.v;if(d&&!(d&(d-1))){const t={v:a.v&~d,mask:a.mask|d,m:[...new Set([...a.m,...b.m])]};nx.set(t.v+"/"+t.mask,t);used.add(i);used.add(j)}}
cur.forEach((c,i)=>{if(!used.has(i))pr.push(c)});cur=[...nx.values()]}
let left=new Set(on),chosen=[];const cov=p=>p.m.filter(x=>left.has(x));
on.forEach(m=>{const c=pr.filter(p=>p.m.includes(m));if(c.length===1&&!chosen.includes(c[0])){chosen.push(c[0]);c[0].m.forEach(x=>left.delete(x))}});
while(left.size){pr.sort((a,b)=>cov(b).length-cov(a).length);const p=pr[0];if(!cov(p).length)break;chosen.push(p);p.m.forEach(x=>left.delete(x))}
return chosen}
function kmap(){const n=+$("kn").value,e=$("kerr"),o=$("kout"),pl=s=>s.split(",").map(x=>x.trim()).filter(x=>x!=="").map(Number);e.textContent="";o.innerHTML="";
const on=[...new Set(pl($("km").value))],dc=[...new Set(pl($("kd").value))],max=(1<<n)-1;
if([...on,...dc].some(x=>!Number.isInteger(x)||x<0||x>max)){e.textContent="Minterms must be whole numbers from 0 to "+max+".";return}
if(!on.length){o.textContent="F = 0";return}
const names="ABCD".slice(0,n).split(""),ch=qm(n,on,dc);
const term=p=>names.map((v,i)=>{const b=1<<(n-1-i);return p.mask&b?"":(p.v&b?v:v+"'")}).join("")||"1";
const gray=n==2?[0,1]:[0,1,3,2],rows=n==4?gray:n==3?[0,1]:[0,1],cols=n==4?gray:n==3?[0,1,3,2]:[0,1];
const rb=n==4?2:n==3?1:1,cb=n==4?2:n==3?2:1,bin=(x,l)=>x.toString(2).padStart(l,"0");
let t=`<table><tr><th>${names.slice(0,rb).join("")}\\${names.slice(rb).join("")}</th>${cols.map(c=>`<th>${bin(c,cb)}</th>`).join("")}</tr>`;
rows.forEach(r=>{t+=`<tr><th>${bin(r,rb)}</th>`+cols.map(c=>{const m=(r<<cb)|c;return `<td>${on.includes(m)?"<b>1</b>":dc.includes(m)?"X":"0"}</td>`}).join("")+"</tr>"});
o.innerHTML=t+`</table><p>Simplified: <b>F = ${ch.map(term).join(" + ")}</b></p>`}
["kn","km","kd"].forEach(i=>$(i).addEventListener("input",kmap));kmap();
}},
{id:"ff",group:"Digital logic",title:"Flip-flop simulator",desc:"Step D, T, JK and SR flip-flops by clock edge.",
html:`<p class="d">Pick a type, set the inputs, and press Clock. The state changes only on the clock edge.</p>
<div class="g"><div><label for="ft">Type</label><select id="ft"><option>D</option><option>T</option><option>JK</option><option>SR</option></select></div><div><label for="fa" id="fal">D</label><select id="fa"><option>0</option><option>1</option></select></div><div><label for="fb" id="fbl">&nbsp;</label><select id="fb"><option>0</option><option>1</option></select></div></div>
<p><button id="fc" style="padding:.6rem 1.2rem;font:600 1rem system-ui;cursor:pointer">Clock</button> <button id="fr" style="padding:.6rem 1.2rem;font:1rem system-ui;cursor:pointer">Reset to 0</button></p><div class="out" id="fo"></div><p class="err" id="ferr"></p>`,
init(){
// Flip-flop simulator
let q=0,clk=0;
function ffui(){const t=$("ft").value,two=t==="JK"||t==="SR";$("fal").textContent=t==="D"?"D":t==="T"?"T":t==="JK"?"J":"S";$("fbl").textContent=two?(t==="JK"?"K":"R"):"(unused)";$("fb").disabled=!two;draw()}
function draw(msg){$("fo").innerHTML=`Clock edges: <b>${clk}</b> &nbsp; Q = <b>${q}</b> &nbsp; Q' = <b>${1-q}</b>`;$("ferr").textContent=msg||""}
$("ft").addEventListener("change",ffui);
$("fc").addEventListener("click",()=>{const t=$("ft").value,a=+$("fa").value,b=+$("fb").value;clk++;
if(t==="D")q=a;else if(t==="T")q=q^a;else if(t==="JK")q=a&b?1-q:a?1:b?0:q;
else{if(a&&b){draw("S=R=1 is invalid for an SR flip-flop. State left unchanged.");return}q=a?1:b?0:q}draw()});
$("fr").addEventListener("click",()=>{q=0;clk=0;draw()});ffui();
}},
{id:"sched",group:"Operating systems",title:"CPU scheduling simulator",desc:"FCFS, SJF, SRTF and round robin with Gantt output.",
html:`<p class="d">One process per line: name, arrival, burst (e.g. P1,0,6).</p>
<div class="g"><div><label for="sa">Algorithm</label><select id="sa"><option value="fcfs">FCFS</option><option value="sjf">SJF (non-preemptive)</option><option value="srtf">SRTF (preemptive)</option><option value="rr">Round robin</option></select></div><div><label for="sq">Quantum (round robin)</label><input id="sq" value="2" inputmode="numeric"></div></div>
<label for="sp">Processes</label><textarea id="sp" rows="5" style="width:100%;padding:.55rem;background:var(--in);color:var(--ink);border:1px solid var(--line);border-radius:5px;font:1rem ui-monospace,monospace">P1,0,6
P2,1,2
P3,2,4
P4,3,3</textarea><p class="err" id="serr2"></p><div id="so" style="overflow-x:auto"></div>`,
init(){
// CPU scheduling
function sched(){const e=$("serr2"),o=$("so");e.textContent="";o.innerHTML="";
const P=$("sp").value.trim().split("\n").map(l=>l.split(",").map(x=>x.trim())).filter(r=>r[0]).map(r=>({n:r[0],a:+r[1],b:+r[2]}));
if(!P.length||P.some(p=>!(p.a>=0)||!(p.b>0))){e.textContent="Each line needs: name, arrival (0 or more), burst (above 0).";return}
const alg=$("sa").value,Q=Math.max(1,+$("sq").value||1);P.forEach(p=>{p.r=p.b;p.ct=null});
let t=0,g=[],q2=[],done=0,seen=new Set();const push=(n,d)=>{const l=g[g.length-1];if(l&&l.n===n)l.e+=d;else g.push({n,s:t,e:t+d})};
const arrive=()=>P.filter(p=>p.a<=t&&!seen.has(p.n)).sort((x,y)=>x.a-y.a).forEach(p=>{seen.add(p.n);q2.push(p)});
let guard=0;while(done<P.length&&guard++<10000){
if(alg==="rr"){arrive();if(!q2.length){push("idle",1);t++;continue}const p=q2.shift(),d=Math.min(Q,p.r);for(let i=0;i<d;i++){push(p.n,1);t++;}p.r-=d;arrive();if(p.r>0)q2.push(p);else{p.ct=t;done++}}
else{const rdy=P.filter(p=>p.a<=t&&p.r>0);if(!rdy.length){push("idle",1);t++;continue}
const p=alg==="fcfs"?rdy.sort((x,y)=>x.a-y.a)[0]:rdy.sort((x,y)=>(alg==="srtf"?x.r-y.r:x.b-y.b)||x.a-y.a)[0];
const d=alg==="srtf"?1:p.r;push(p.n,d);t+=d;p.r-=d;if(!p.r){p.ct=t;done++}}}
g=g.filter(x=>x.n!=="idle"||true);let tw=0,tt=0;
const rows=P.map(p=>{const tat=p.ct-p.a,wt=tat-p.b;tw+=wt;tt+=tat;return `<tr><td>${p.n}</td><td>${p.a}</td><td>${p.b}</td><td>${p.ct}</td><td>${tat}</td><td>${wt}</td></tr>`}).join("");
o.innerHTML=`<p class="out">Gantt: ${g.map(x=>`[${x.s}] ${x.n} `).join("")}[${g[g.length-1].e}]</p><table><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Done</th><th>Turnaround</th><th>Waiting</th></tr>${rows}</table><p>Average turnaround: <b>${(tt/P.length).toFixed(2)}</b> &nbsp; Average waiting: <b>${(tw/P.length).toFixed(2)}</b></p>`}
["sa","sq","sp"].forEach(i=>$(i).addEventListener("input",sched));sched();
}}
];
TOOLS.push({id:"twos",group:"Number systems",title:"Two's complement visualizer",desc:"See a signed integer as N-bit two's complement, with the invert-and-add-1 steps.",
html:`<div class="g"><div><label for="tv">Decimal value</label><input id="tv" value="-18" inputmode="numeric"></div><div><label for="tb">Bits</label><select id="tb"><option>4</option><option selected>8</option><option>16</option><option>32</option></select></div></div><p class="err" id="terr"></p><div id="tout"></div>`,
init(){const f=()=>{const e=$("terr"),o=$("tout"),raw=$("tv").value.trim();e.textContent="";o.innerHTML="";if(!/^-?\d+$/.test(raw)){e.textContent="Enter a whole number, like -18 or 100.";return}
const v=BigInt(raw),b=BigInt($("tb").value),n=Number(b),min=-(1n<<(b-1n)),max=(1n<<(b-1n))-1n;if(v<min||v>max){e.textContent="With "+n+" bits the range is "+min+" to "+max+".";return}
const u=v<0n?v+(1n<<b):v,bin=u.toString(2).padStart(n,"0"),mag=(v<0n?-v:v).toString(2).padStart(n,"0"),inv=mag.split("").map(c=>c==="1"?"0":"1").join("");
o.innerHTML="<table><tr><td class='l'>Two's complement</td><td class='l out'>"+bin+"</td></tr><tr><td class='l'>Hex</td><td class='l out'>0x"+u.toString(16).toUpperCase().padStart(n/4,"0")+"</td></tr><tr><td class='l'>Read as unsigned</td><td class='l out'>"+u+"</td></tr><tr><td class='l'>Sign bit</td><td class='l out'>"+bin[0]+(bin[0]==="1"?" (negative)":" (positive)")+"</td></tr></table>"+(v<0n?"<p class='out'>Steps: |"+v+"| = "+mag+"<br>invert = "+inv+"<br>add 1 = "+bin+"</p>":"<p class='out'>Positive numbers are stored as plain binary.</p>");};
$("tv").addEventListener("input",f);$("tb").addEventListener("change",f);f()}});
const REFERENCES={
 "IT": [
  {
   "label": "Professor Messer",
   "href": "https://www.professormesser.com/",
   "note": "Map the machine"
  },
  {
   "label": "OS Basics",
   "href": "https://www.netacad.com/courses/operating-systems-basics",
   "note": "Operate the system"
  },
  {
   "label": "Markdown Guide",
   "href": "https://www.markdownguide.org/basic-syntax/",
   "note": "Document your work"
  }
 ],
 "Linux": [
  {
   "label": "Linux Journey",
   "href": "https://linuxjourney.com/",
   "note": "Learn the shell"
  },
  {
   "label": "OverTheWire: Bandit",
   "href": "https://overthewire.org/wargames/bandit/",
   "note": "Control access"
  },
  {
   "label": "systemctl reference",
   "href": "https://www.freedesktop.org/software/systemd/man/latest/systemctl.html",
   "note": "Run a service"
  }
 ],
 "Networking": [
  {
   "label": "Networking Basics",
   "href": "https://skillsforall.com/course/networking-basics",
   "note": "Read the layers"
  },
  {
   "label": "Packet Tracer guides",
   "href": "https://www.packettracernetwork.com/",
   "note": "Build a tiny lab"
  },
  {
   "label": "Wireshark Guide",
   "href": "https://www.wireshark.org/docs/wsug_html_chunked/",
   "note": "Inspect traffic"
  }
 ],
 "Cybersecurity": [
  {
   "label": "TryHackMe",
   "href": "https://tryhackme.com/",
   "note": "Build a safe lab"
  },
  {
   "label": "Web Security Academy",
   "href": "https://portswigger.net/web-security",
   "note": "Study web risk"
  },
  {
   "label": "SANS papers",
   "href": "https://www.sans.org/white-papers/",
   "note": "Trace an incident"
  }
 ],
 "Web": [
  {
   "label": "MDN Learn",
   "href": "https://developer.mozilla.org/en-US/docs/Learn_web_development",
   "note": "Structure a page"
  },
  {
   "label": "javascript.info",
   "href": "https://javascript.info/",
   "note": "Add behavior"
  },
  {
   "label": "GitHub Hello World",
   "href": "https://docs.github.com/en/get-started/start-your-journey/hello-world",
   "note": "Ship a project"
  }
 ],
 "Automation": [
  {
   "label": "Automate the Boring Stuff",
   "href": "https://automatetheboringstuff.com/",
   "note": "Script a routine"
  },
  {
   "label": "Pandas tutorials",
   "href": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html",
   "note": "Use structured data"
  },
  {
   "label": "Requests docs",
   "href": "https://requests.readthedocs.io/en/latest/",
   "note": "Call an API"
  }
 ],
 "Logic": [
  {
   "label": "Nand2Tetris",
   "href": "https://www.nand2tetris.org/",
   "note": "Reason in binary"
  },
  {
   "label": "Nand2Tetris course",
   "href": "https://www.nand2tetris.org/course",
   "note": "Compose a computer"
  },
  {
   "label": "Project sequence",
   "href": "https://www.nand2tetris.org/project01",
   "note": "Trace an instruction"
  }
 ],
 "Cloud": [
  {
   "label": "AWS Skill Builder",
   "href": "https://aws.amazon.com/training/digital/",
   "note": "Map the shared model"
  },
  {
   "label": "Cloud training",
   "href": "https://cloud.google.com/learn/training",
   "note": "Deploy a tiny service"
  },
  {
   "label": "SRE workbook",
   "href": "https://sre.google/workbook/table-of-contents/",
   "note": "Design for recovery"
  }
 ],
 "Quantum": [
  {
   "label": "IBM Quantum Learning",
   "href": "https://learning.quantum.ibm.com/",
   "note": "Learn the vocabulary"
  },
  {
   "label": "Quantum Country",
   "href": "https://quantum.country/",
   "note": "Read a circuit"
  },
  {
   "label": "IBM Quantum docs",
   "href": "https://quantum.cloud.ibm.com/docs/en/guides",
   "note": "Compare the models"
  }
 ],
 "Data": [
  {
   "label": "SQLBolt",
   "href": "https://sqlbolt.com/",
   "note": "Think in tables"
  },
  {
   "label": "SQL tutorial",
   "href": "https://mode.com/sql-tutorial/",
   "note": "Query with care"
  },
  {
   "label": "Kaggle Learn",
   "href": "https://www.kaggle.com/learn",
   "note": "Explain the result"
  }
 ],
 "Systems": [
  {
   "label": "System Design Primer",
   "href": "https://github.com/donnemartin/system-design-primer",
   "note": "Draw the boundaries"
  },
  {
   "label": "Designing Data-Intensive Apps",
   "href": "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
   "note": "Choose the trade-off"
  },
  {
   "label": "Google SRE book",
   "href": "https://sre.google/sre-book/table-of-contents/",
   "note": "Operate the design"
  }
 ]
};
const PAGES={};
const GROUPS=[...new Set(TOOLS.map(t=>t.group))];
const MENU=[
 {title:"Tools",children:GROUPS.map(g=>({title:g,children:TOOLS.filter(t=>t.group===g).map(t=>({title:t.title,id:t.id}))}))},
 {title:"References",id:"references"},
 {title:"About",href:"about.html"}
];
const FOOTER=[{title:"About",href:"about.html"},{title:"Contact",href:"contact.html"},{title:"Privacy",href:"privacy.html"},{title:"Terms",href:"terms.html"}];
