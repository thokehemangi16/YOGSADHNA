/* ===== स्क्रीनशॉट यादी: फाइल्स "screenshots" फोल्डरमध्ये ss1.png, ss2.png ... या नावाने ठेवा ===== */
const SHOTS = [
  {src:'screenshots/ss1.png', t:'GitHub मध्ये नवीन रिपॉझिटरी तयार केली'},
  {src:'screenshots/ss2.png', t:'index.html, style.css, script.js फाइल्स अपलोड केल्या'},
  {src:'screenshots/ss3.png', t:'GitHub Pages सुरू करून वेबसाइट प्रकाशित केली'},
  {src:'screenshots/ss4.png', t:'तयार झालेली वेबसाइट'}
];
const ASANAS = [
 ['🧍','ताडासन','उंची वाढण्यास आणि शरीराची ठेवण सुधारण्यास मदत होते.'],
 ['🌳','वृक्षासन','संतुलन आणि एकाग्रता वाढते, पाय मजबूत होतात.'],
 ['🐍','भुजंगासन','पाठीचा कणा लवचिक होतो आणि पाठदुखी कमी होते.'],
 ['🧘','सुखासन','मन शांत होते; ध्यानासाठी सर्वात सोपे आसन.'],
 ['🪷','पद्मासन','मनःशांती मिळते आणि स्मरणशक्ती सुधारते.'],
 ['📐','त्रिकोणासन','कंबर व बाजूचे स्नायू ताणले जातात, शरीर हलके वाटते.'],
 ['⚔️','वीरभद्रासन','ताकद, स्थैर्य आणि आत्मविश्वास वाढतो.'],
 ['🌙','शवासन','संपूर्ण विश्रांती; ताण आणि थकवा दूर होतो.']
];
const BEN = ['शरीर निरोगी आणि सक्रिय राहते.','मानसिक तणाव कमी होण्यास मदत होते.','एकाग्रता आणि स्मरणशक्ती सुधारते.','सकारात्मक विचार करण्याची सवय लागते.','शरीराची लवचिकता वाढते.','मनाला शांती आणि आनंद मिळतो.'];
const PLAN = [['🌬️','२ मिनिटे','प्राणायाम','दीर्घ श्वास घ्या आणि सोडा.'],['🧍','२ मिनिटे','ताडासन व वृक्षासन','उभ्या आसनांनी शरीर जागे करा.'],['🐍','३ मिनिटे','भुजंगासन व त्रिकोणासन','पाठ आणि कंबर लवचिक करा.'],['🧘','३ मिनिटे','ध्यान','डोळे मिटून मन शांत करा.']];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const D=n=>String(n).replace(/\d/g,d=>'०१२३४५६७८९'[d]);

/* ----- build content ----- */
$('#asanas').innerHTML = ASANAS.map(a=>`<div class="card rv"><div class="face"><div class="e">${a[0]}</div><h3>${a[1]}</h3></div><div class="face back"><div><b>${a[1]}</b><br>${a[2]}</div></div></div>`).join('');
$('#benefits').innerHTML = BEN.map((b,i)=>`<li><i>${D(i+1)}</i>${b}</li>`).join('');
$('#tl').innerHTML = PLAN.map(p=>`<div class="step rv" data-e="${p[0]}"><b>${p[1]} · ${p[2]}</b><br>${p[3]}</div>`).join('');
$('#petals').innerHTML = Array.from({length:12},(_,i)=>`<ellipse cx="100" cy="42" rx="12" ry="30" transform="rotate(${i*30} 100 100)"/>`).join('');
$$('.card').forEach(c=>c.onclick=()=>c.classList.toggle('flip'));

/* ----- gallery ----- */
const gal=$('#gallery');
function addShot(src,t,n){
  const d=document.createElement('div');d.className='shot rv';
  d.innerHTML=`<img alt=""><p><b>पायरी ${D(n)}:</b> ${t}</p>`;
  const img=$('img',d);img.src=src;
  img.onerror=()=>{img.replaceWith(Object.assign(document.createElement('div'),{className:'empty',textContent:'📷 '+src+' येथे जोडा'}))};
  d.onclick=()=>{const lb=$('#lb');$('img',lb).src=img.src||'';$('p',lb).textContent=t;lb.hidden=false};
  gal.appendChild(d);io.observe(d);
}
$('#lb').onclick=e=>e.currentTarget.hidden=true;
$('#file').onchange=e=>[...e.target.files].forEach(f=>addShot(URL.createObjectURL(f),f.name,gal.children.length+1));

/* ----- reveal on scroll ----- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);if(e.target.dataset.n)count(e.target)}}),{threshold:.15});
function count(el){const n=+el.dataset.n,t=1600,s=performance.now();(function f(now){const p=Math.min((now-s)/t,1);el.textContent=D(Math.round(n*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f)})(s)}
function observeAll(){$$('.rv,.benefits li,[data-n]').forEach(el=>{if(!el.classList.contains('in'))io.observe(el)})}
SHOTS.forEach((s,i)=>addShot(s.src,s.t,i+1));
observeAll();

/* ----- pages (hash routing) ----- */
function route(){
  const id=['home','yoga','shots'].includes(location.hash.slice(1))?location.hash.slice(1):'home';
  $$('.page').forEach(p=>p.classList.toggle('show',p.id===id));
  $$('.nav nav a').forEach(a=>a.classList.toggle('on',a.dataset.p===id));
  scrollTo({top:0,behavior:'instant'});observeAll();
}
addEventListener('hashchange',route);route();

/* ----- theme ----- */
const root=document.documentElement,tb=$('#theme');
function setTheme(t){root.dataset.theme=t;tb.textContent=t==='dark'?'🌙':'☀️';try{localStorage.setItem('yt',t)}catch(e){}}
let saved=null;try{saved=localStorage.getItem('yt')}catch(e){}
setTheme(saved||'dark');tb.onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');

/* ----- scroll: progress bar + spawn objects ----- */
const EM=['🪷','🌸','🍃','✨','🕉️','🌿','🦋','🌼','🪔','☁️','🌺'];
const fx=$('#fx');let lastY=scrollY,acc=0;
function spawn(n=1){for(let i=0;i<n;i++){const s=document.createElement('span');s.className='fx';s.textContent=EM[Math.random()*EM.length|0];
  s.style.left=Math.random()*100+'vw';s.style.fontSize=(16+Math.random()*30)+'px';
  s.style.setProperty('--x',(Math.random()*160-80)+'px');s.style.setProperty('--r',(Math.random()*720-360)+'deg');
  s.style.setProperty('--d',(5+Math.random()*5)+'s');fx.appendChild(s);setTimeout(()=>s.remove(),11000)}}
addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=(scrollY/h*100)+'%';
  acc+=Math.abs(scrollY-lastY);lastY=scrollY;
  if(acc>140){acc=0;if(fx.children.length<40)spawn(1+(Math.random()*2|0))}
  $$('.mandala').forEach(m=>m.style.translate=`0 ${scrollY*.2}px`);
},{passive:true});
spawn(6);

/* ----- 3D tilt ----- */
$$('.tilt').forEach(t=>{t.onmousemove=e=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(700px) rotateY(${x*20}deg) rotateX(${-y*20}deg)`};t.onmouseleave=()=>t.style.transform=''});

/* ----- breathing exercise ----- */
let bt=null;const orb=$('#orb'),ot=$('#orbtxt');orb.classList.add('idle');
function cycle(){ot.textContent='श्वास घ्या';orb.classList.add('big');
  bt=setTimeout(()=>{ot.textContent='श्वास रोखा';bt=setTimeout(()=>{ot.textContent='श्वास सोडा';orb.classList.remove('big');bt=setTimeout(cycle,4000)},4000)},4000)}
$('#bstart').onclick=()=>{if(bt){clearTimeout(bt);bt=null;orb.classList.remove('big');orb.classList.add('idle');ot.textContent='सुरू करा'}else{orb.classList.remove('idle');cycle()}};

/* ----- background: glowing fireflies / stars ----- */
const cv=$('#bg'),cx=cv.getContext('2d');let W,H,P=[];
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;P=Array.from({length:Math.min(90,W/14|0)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+.6,vx:(Math.random()-.5)*.3,vy:-Math.random()*.4-.05,p:Math.random()*6}))}
size();addEventListener('resize',size);
(function draw(t){cx.clearRect(0,0,W,H);const dark=root.dataset.theme==='dark';
  P.forEach(o=>{o.x+=o.vx+Math.sin(t/1500+o.p)*.2;o.y+=o.vy;if(o.y<-10){o.y=H+10;o.x=Math.random()*W}
    const a=.35+.35*Math.sin(t/700+o.p);cx.beginPath();cx.arc(o.x,o.y,o.r*2,0,7);
    cx.fillStyle=dark?`rgba(255,200,120,${a})`:`rgba(194,68,127,${a*.6})`;cx.shadowBlur=14;cx.shadowColor=dark?'#ffb347':'#c2447f';cx.fill()});
  requestAnimationFrame(draw)})(0);
