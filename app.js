(()=>{
const Q=s=>document.querySelector(s);
const A=m=>`<a href="${m.href||"#"+m.id}">${m.title}</a>`;
const item=m=>m.children?`<div class="has-sub"><button type="button" aria-expanded="false">${m.title} &#9662;</button><div class="sub">${m.children.map(c=>c.children?`<div class="grp"><b>${c.title}</b>${c.children.map(A).join("")}</div>`:A(c)).join("")}</div></div>`:A(m);
Q("#mast").innerHTML=`<a class="brand" href="#"><img src="assets/logo.png" alt="" onerror="this.remove()"><span>LEARN<i>/</i><b>TECH</b></span></a><nav class="menu" id="menu" aria-label="Primary">${MENU.map(item).join("")}</nav><a class="xlink" href="${SITE.learn}">Open Learn &#8599;</a><button class="burger" aria-label="Toggle navigation" aria-expanded="false">&#9776;</button>`;
Q("#foot").innerHTML=FOOTER.map(A).join("")+`<p>${HOME.footer}</p>`;
Q(".burger").onclick=e=>{const o=Q("#menu").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};
document.querySelectorAll(".has-sub>button").forEach(b=>b.onclick=()=>{const p=b.parentNode,o=p.classList.toggle("open");b.setAttribute("aria-expanded",o)});
function home(){Q("#app").innerHTML=`<div class="wrap"><section class="hero solo"><div><p class="eyebrow"><span class="dot"></span>${HOME.eyebrow}</p><h1>${HOME.title}</h1><p class="s">${HOME.summary}</p><a class="btn" href="#${TOOLS[0].id}">Open the toolbench &rarr;</a><a class="tl" href="${SITE.learn}">Study the theory &rsaquo;</a></div></section>`+
GROUPS.map(g=>`<h2 class="sec">${g}</h2><div class="cards">${TOOLS.filter(t=>t.group===g).map(t=>`<a class="card lime" href="#${t.id}" style="text-decoration:none;color:inherit"><h3>${t.title}</h3><p class="m">${t.desc}</p></a>`).join("")}</div>`).join("")+
`<div class="banner"><div><b>Want the theory behind a tool?</b><br>Lessons explain how each one works.</div><a href="${SITE.learn}">Open Learn</a></div></div>`;document.title="Tech Workbench | Learn / Tech";scrollTo(0,0)}
function tool(t){const sib=TOOLS.filter(x=>x.group===t.group);
Q("#app").innerHTML=`<div class="wrap page"><aside><b>${t.group}</b>${sib.map(x=>`<a href="#${x.id}" class="${x.id===t.id?"on":""}">${x.title}</a>`).join("")}</aside><article style="max-width:50rem"><p class="crumb"><a href="#">Tools</a> &rsaquo; ${t.group}</p><h1>${t.title}</h1><p class="d">${t.desc}</p><div class="tool">${t.html}</div></article></div>`;t.init();document.title=t.title+" | Tech Workbench";scrollTo(0,0)}
function refs(){Q("#app").innerHTML=`<div class="wrap page solo"><article><p class="crumb"><a href="#">Tools</a></p><h1>References</h1><p>Trusted external resources, grouped by area.</p>${Object.keys(REFERENCES).map(g=>`<h3>${g}</h3><ul>${REFERENCES[g].map(r=>`<li><a href="${r.href}" rel="noopener" target="_blank">${r.label}</a> <span class="crumb">${r.note}</span></li>`).join("")}</ul>`).join("")}</article></div>`;document.title="References | Tech Workbench";scrollTo(0,0)}
function route(){const id=location.hash.slice(1),t=TOOLS.find(x=>x.id===id);Q("#menu").classList.remove("open");
if(t)tool(t);else if(id==="references")refs();else if(PAGES[id]){Q("#app").innerHTML=`<div class="wrap page solo"><article><h1>${PAGES[id].title}</h1>${PAGES[id].html}</article></div>`}else home()}
addEventListener("hashchange",route);route();
})();
