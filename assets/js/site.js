const SERVICES=[
 {
  "t": "Commercial Law",
  "i": "assets/img/8c910e6e30.webp",
  "p": "assets/img/svc-1.jpg",
  "d": "Our Commercial Law services provide comprehensive legal support to businesses of all sizes across South Africa. We assist with business legal protection, drafting and reviewing commercial contracts, corporate governance, regulatory compliance, and risk management. Whether you are starting a new business or managing an established company, our commercial attorneys ensure your operations comply with South African commercial and company law while protecting your commercial interests."
 },
 {
  "t": "Civil Law",
  "i": "assets/img/02497247d4.webp",
  "p": "assets/img/svc-2.jpg",
  "d": "We offer expert Civil Law and litigation services, representing clients in both the High Court and Magistrate’s Courts throughout South Africa. Our civil litigation attorneys handle disputes efficiently and strategically, including contractual disputes, damages claims, and general civil matters. We are committed to protecting your rights and achieving effective legal outcomes through skilled legal representation."
 },
 {
  "t": "Family Law",
  "i": "assets/img/c008b1c7a2.webp",
  "p": "assets/img/svc-3.jpg",
  "d": "Our Family Law services provide sensitive and professional legal assistance in divorce, child custody, maintenance, and matrimonial matters. We assist with uncontested and contested divorces, parenting plans, antenuptial contracts, postnuptial agreements, and other family law agreements. Our family law attorneys focus on protecting your rights while prioritising the best interests of children in accordance with South African family law."
 },
 {
  "t": "Estate Planning",
  "i": "assets/img/108d366609.webp",
  "p": "assets/img/svc-4.jpg",
  "d": "We provide comprehensive Estate Planning services to ensure your assets are protected and your wishes are carried out effectively. Our services include drafting wills, creating and administering trusts, estate administration, and succession planning. Our attorneys ensure full compliance with South African estate and tax legislation, giving you peace of mind and long term security for your beneficiaries."
 },
 {
  "t": "Property Law",
  "i": "assets/img/6ca008a78f.webp",
  "p": "assets/img/svc-5.jpg",
  "d": "Our Property Law services cover all aspects of property transactions in South Africa. We assist with buying, selling, and transferring property, property consolidations, and related conveyancing matters. Our property law attorneys ensure that all transactions are legally sound, compliant with South African property law, and efficiently concluded."
 },
 {
  "t": "Community Schemes",
  "i": "assets/img/d9510efa39.webp",
  "p": "assets/img/svc-6.jpg",
  "d": "We offer specialised legal assistance for Community Schemes, including Sectional Title Schemes, Homeowners Associations, Share Block companies, and other community housing schemes. Our services include legal compliance, governance advice, dispute resolution, and interpretation of scheme rules in terms of South African sectional title and community schemes legislation."
 },
 {
  "t": "Trust Law",
  "i": "assets/img/c25e945c98.webp",
  "p": "assets/img/svc-7.jpg",
  "d": "Our Trust Law services include the creation, registration, and administration of trusts in accordance with South African law. We assist trustees and beneficiaries with trust compliance, asset management, and fiduciary duties. Our attorneys ensure that trust assets are properly managed and protected while meeting all legal and regulatory requirements."
 },
 {
  "t": "Debt Collection",
  "i": "assets/img/0344d51157.webp",
  "p": "assets/img/svc-8.jpg",
  "d": "We provide specialised legal debt collection services for both corporate and individual clients throughout South Africa. Our attorneys handle professional debt recovery, including letters of demand, legal enforcement, and litigation where necessary. We focus on efficient, lawful, and ethical debt collection in compliance with South African debt collection and credit legislation."
 }
];
const TEAM=[
 {
  "n": "Carl Ballan",
  "e": "info@cjbs.co.za",
  "i": "assets/img/32ab402f4a.webp",
  "b": "Seasoned attorney and property practitioner with over 40 years of expertise in commercial, estate and trust law."
 },
 {
  "n": "Emile Schmidt",
  "e": "emile@cjbs.co.za",
  "i": "assets/img/80b740bf4c.webp",
  "b": "Dedicated attorney with expertise in family and civil law, recognized for successfully resolving sensitive family legal issues."
 },
 {
  "n": "Holly Godfrey",
  "e": "hollyg@cjbs.co.za",
  "i": "assets/img/23f3abcb26.webp",
  "b": "Detail-oriented attorney with a wealth of experience in navigating complex property transactions."
 },
 {
  "n": "Bevan Harker",
  "e": "bevanh@cjbs.co.za",
  "i": "assets/img/85418f5483.webp",
  "b": "Meticulous conveyancing paralegal specializing in thorough estate planning and administration."
 },
 {
  "n": "Millie Mxakwe",
  "e": "milliem@cjbs.co.za",
  "i": "assets/img/fc7e5fb9ff.webp",
  "b": "Results-driven paralegal specializing in debt collection with effective strategies."
 }
];
const IMG={
 "logo": "assets/img/7c12fd3045.webp",
 "scales": "assets/img/dc752b9c18.webp",
 "gavel": "assets/img/7cfcbd1c75.webp",
 "signP": "assets/img/fba1aa5e65.webp",
 "signW": "assets/img/63305e6623.webp"
};

/* ## written 2026-10-10 NOT YET TESTED: v5 Gallery behaviour (cascading files, scroll dial, status, chips, modal morph, forms) */
(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=false;
const finePointer=matchMedia('(hover:hover) and (pointer:fine)').matches;
const slug=document.body.dataset.page, isHome=slug==='home';
const ARROW='<i><svg viewBox="0 0 16 16"><path d="M1 8h13M9 3l5 5-5 5"/></svg></i>';
const ARR2='<svg viewBox="0 0 16 16"><path d="M1 8h13M9 3l5 5-5 5"/></svg>';
if(reduce) document.documentElement.classList.add('rm');
const store={get(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
$$('.nav-links a').forEach(a=>a.classList.toggle('on',a.dataset.nav===slug));

/* office status (South Africa time): Mon to Thu 08:00 to 16:30, Fri 08:00 to 15:00 */
function status(){
  let d=new Date();
  const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Johannesburg',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(d).reduce((a,x)=>(a[x.type]=x.value,a),{});
  const day=p.weekday,mins=(+p.hour%24)*60+(+p.minute);
  const wk=['Mon','Tue','Wed','Thu','Fri'],i=wk.indexOf(day);
  const close=i>=0?(day==='Fri'?15*60:16*60+30):0,open=8*60;
  let t,isOpen=false;
  if(i>=0&&mins>=open&&mins<close){isOpen=true;t='Open now, until '+(day==='Fri'?'15:00':'16:30');}
  else{
    const names={Mon:'Monday',Tue:'Tuesday',Wed:'Wednesday',Thu:'Thursday',Fri:'Friday',Sat:'Monday',Sun:'Monday'};
    let next=(i>=0&&mins<open)?'today':(day==='Fri'||day==='Sat'||day==='Sun')?'Monday':names[wk[Math.min(4,i+1)]];
    t='Closed now, opens '+(next==='today'?'today':next)+' at 08:00';
  }
  $$('[data-status]').forEach(e=>{e.textContent=t;e.classList.toggle('open',isOpen);});
}
status();setInterval(status,60000);

/* render */
const stack=$('#stack'),tgrid=$('#tgrid'),chips=$('#chips');
const pad=n=>String(n).padStart(2,'0');
if(stack) stack.innerHTML=SERVICES.map((s,k)=>`<article class="folder" style="--i:${k};--tab:${k%4}" data-tab="${pad(k+1)} ${s.t}"><div class="f-in"><div class="f-pic" data-open="${k}" data-cursor="Open file"><img loading="lazy" src="${s.p}" alt="${s.t}"></div><div class="f-body"><h3>${s.t}</h3><p>${s.d}</p><button class="btn btn-ghost" data-open="${k}" aria-haspopup="dialog" aria-label="Open the ${s.t} file and enquire">Open this file</button></div></div></article>`).join('');
if(chips) chips.innerHTML=SERVICES.map((s,k)=>`<button class="chip" data-open="${k}" aria-haspopup="dialog">${s.t}</button>`).join('');
if(tgrid) tgrid.innerHTML=TEAM.map(p=>`<article class="person"><div class="ph"><img loading="lazy" src="${p.i}" alt="${p.n}"></div><h3>${p.n}</h3><p>${p.b}</p><a href="mailto:${p.e}?cc=info@cjbs.co.za&subject=Consultation%20Enquiry">Get In touch ${ARR2}</a></article>`).join('');

gsap.registerPlugin(ScrollTrigger);
{const q=+new URLSearchParams(location.search).get('slow');if(q>1)gsap.globalTimeline.timeScale(1/q);} /* test switch: ?slow=4 plays animations at quarter speed */
const lenis=new Lenis({lerp:.09,smoothWheel:!reduce});
lenis.on('scroll',ScrollTrigger.update);
gsap.ticker.add(t=>lenis.raf(t*1000));
gsap.ticker.lagSmoothing(0);
window.lenis=lenis;

/* links */
const veil=$('#veil');
$$('a[href]').forEach(a=>a.addEventListener('click',e=>{
  const h=a.getAttribute('href');
  if(e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank') return;
  if(h.startsWith('#/')){
    e.preventDefault();closeMenu();
    if(reduce){location.hash=h;return;}
    veil.style.pointerEvents='auto';
    gsap.to(veil,{opacity:1,duration:.35,ease:'power2.out',onComplete:()=>{location.hash=h}});return;
  }
  if(h.startsWith('#')){
    if(h==='#'||h.length<2) return;
    const t=$(h); if(!t) return; e.preventDefault(); closeMenu(); lenis.scrollTo(t,{offset:-70,duration:1.2}); return;
  }
  if(/^(https?:|mailto:|tel:)/.test(h)||reduce) return;
  e.preventDefault();closeMenu();veil.style.pointerEvents='auto';
  gsap.to(veil,{opacity:1,duration:.35,ease:'power2.out',onComplete:()=>{location.href=h}});
}));
addEventListener('pageshow',e=>{if(e.persisted){gsap.set(veil,{opacity:0});veil.style.pointerEvents='none'}});

/* split headings (accessible) */
function splitWords(el){
  const label=el.textContent.trim().replace(/\s+/g,' ');
  const nodes=[...el.childNodes];el.innerHTML='';el.setAttribute('aria-label',label);
  const add=(txt,cls)=>txt.split(/(\s+)/).forEach(w=>{
    if(!w.trim()){el.appendChild(document.createTextNode(w));return;}
    const m=document.createElement('span');m.className='mask';m.setAttribute('aria-hidden','true');
    const s=document.createElement('span');
    if(cls==='em'){const e=document.createElement('em');e.textContent=w;s.appendChild(e);}else s.textContent=w;
    m.appendChild(s);el.appendChild(m);});
  nodes.forEach(n=>{
    add(n.textContent,n.nodeType===1&&n.tagName==='EM'?'em':'');
  });
}
$$('[data-rise]').forEach(splitWords);

/* intro: no loader, the door banner closing is the intro */
const loader=$('#loader');loader&&loader.remove();
const firstVisit=false;
if(!reduce&&veil){gsap.set(veil,{opacity:1});gsap.to(veil,{opacity:0,duration:.6,ease:'power2.out',delay:.05});}
const startAt=()=>0;

/* load intro (Megan, 2026-11-02): the two halves of the door banner slide in from both edges, meet on the centre post, then the welcome text rises in */
(function(){
  const hero=$('.door-hero');if(!hero)return;
  const base=$('img',hero),end=$('.lady-end',hero),card=end&&$('.end-card',end);
  const root=document.documentElement;
  if(reduce||!base||!card){root.classList.remove('door-intro');return;}
  const src=base.currentSrc||base.src;
  const door=document.createElement('div');door.className='lady-door';door.setAttribute('aria-hidden','true');
  door.innerHTML='<div class="dleaf l"><img alt="" src="'+src+'"></div><div class="dleaf r"><img alt="" src="'+src+'"></div>';
  hero.appendChild(door);
  const L=$('.dleaf.l',door),R=$('.dleaf.r',door),imgs=$$('img',door);
  gsap.set(base,{opacity:0});gsap.set(card.children,{opacity:0,y:18});
  root.classList.remove('door-intro');gsap.set(L,{xPercent:-100});gsap.set(R,{xPercent:100});gsap.set(imgs,{scale:1.08});
  const tl=gsap.timeline({delay:.15,onComplete(){gsap.set(base,{opacity:1});door.remove();}});
  tl.to(L,{xPercent:0,duration:1.5,ease:'power3.inOut'},0)
    .to(R,{xPercent:0,duration:1.5,ease:'power3.inOut'},0)
    .to(imgs,{scale:1,duration:2.2,ease:'power2.out'},0)
    .set(base,{opacity:1},1.5)
    .to(card.children,{opacity:1,y:0,duration:.9,ease:'power3.out',stagger:.12},1.6);
})();

/* ## written 2026-10-13 NOT YET TESTED: Lady Justice opening, fourth design (the firm's real doors: two halves of the real photo join on the centre post, slow push-in, then an ivory card with the copy). One job per beat: arrive, story, values, then the doors (two full-height leaves slide in from both edges and meet in the middle), then the ring draws itself on at the seam, the four-figure sculpture appears and turns with the scroll, and the closing copy arrives on the left. Cover-then-reveal: nothing is scaled to fit a photo. The 3D model (lady3d.js) reads window.ladyState; without it the flat picture is used. */
(function(){
  const lady=$('#lady'); if(!lady) return;
  const pin=$('#ladyPin'),tilt=$('#ladyTilt'),stage=$('#ladyStage'),fig=$('#ladyFig'),glow=$('#ladyGlow'),cv=$('#ladyCanvas');
  const S=window.ladyState=window.ladyState||{ry:0,spin:0,focus:0,focus2:0,lock:0,mx:0,my:0,expo:1,lift:0};
  if(reduce) return;
  pin.style.setProperty('--vig','1');
  const fade=$('#ladyFade');gsap.set(fade,{opacity:0});
  /* entrance: turntable. The page waits for the 3D model, then she spins a full turn and slows to face you. */
  gsap.set(tilt,{opacity:0});
  let played=false;
  const play=()=>{
    if(played) return;played=true;
    gsap.fromTo(S,{spin:-Math.PI*2},{spin:0,duration:2.8,ease:'power4.out',delay:.2});
    gsap.fromTo(tilt,{opacity:0,scale:.86},{opacity:1,scale:1,duration:1.4,ease:'power3.out',delay:.2});
  };
  /* the statue sits below the door banner, so her turntable entrance waits until the scene is near and the model is ready */
  let rdy=false,near=false;const go=()=>{if(rdy&&near)play()};
  addEventListener('lady3d:ready',()=>{rdy=true;go()},{once:true});addEventListener('lady3d:failed',()=>{rdy=true;go()},{once:true});setTimeout(()=>{rdy=true;go()},9000);
  ScrollTrigger.create({trigger:lady,start:'top 75%',once:true,onEnter:()=>{near=true;go()}});
  const tx=n=>$$('.t.t'+n,lady),live=(els,on)=>gsap.set(els,{pointerEvents:on?'auto':'none'});
  gsap.set([...tx(1),...tx(2)],{opacity:0});
  const amp=matchMedia('(min-width:900px)').matches?1:.4;   /* she turns far less on a phone */
  const tl=gsap.timeline({defaults:{ease:'none'}});
  const show=(n,at)=>tl.fromTo(tx(n),{opacity:0,y:40,filter:'blur(6px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.7,ease:'power2.out',immediateRender:false},at).add(()=>live(tx(n),true),at);
  const hide=(n,at)=>tl.to(tx(n),{opacity:0,y:-40,filter:'blur(6px)',duration:.6,ease:'power2.in'},at).add(()=>live(tx(n),false),at+.3);
  /* beats 1 and 2: the story and the values, with her turning slowly and settling to face you */
  hide(0,1);show(1,1.7);hide(1,3.9);show(2,4.6);hide(2,7.2);
  tl.fromTo(S,{ry:0},{ry:-.6*amp,duration:2.8,ease:'sine.inOut',immediateRender:false},.2)
    .to(S,{ry:.6*amp,duration:3.2,ease:'sine.inOut'},3)
    .to(S,{ry:0,duration:.9,ease:'back.out(1.6)'},6.2);
  /* beat 3: the room dissolves into the ivory that opens the services scene, so the hand-off has no cut */
  const fadeHead=$('.sv-intro',fade);gsap.set(fadeHead,{opacity:0});
  tl.to(fade,{opacity:1,duration:1.7,ease:'power1.inOut'},7.7);
  tl.to(fadeHead,{opacity:1,duration:.8,ease:'power1.out'},9.4);
  tl.to({},{duration:.05},10.2); /* the services scene sits underneath: the dissolve already carries its heading, and the statue scene is switched off at the exact scroll point (onLeave below, not on the lagging scrub) so only the real heading is left */
  const cNow=$('#cNow'),cBar=$('#cBar'),cCount=$('#ladyCount');
  const st=ScrollTrigger.create({trigger:lady,start:'top top',end:'+=420%',pin:true,scrub:.8,animation:tl,
    onLeave:()=>{lady.style.visibility='hidden'},onEnterBack:()=>{lady.style.visibility=''},
    onUpdate:()=>{
      const t=tl.time();
      cNow.textContent=t<1.4?'01':t<4.2?'02':'03';
      cBar.style.transform='scaleX('+Math.min(1,Math.max(0,t/7))+')';
      cCount.style.opacity=t>7.4?Math.max(0,1-(t-7.4)/1):1;
    }});
  window.ladyEnd=st.end;ScrollTrigger.addEventListener('refresh',()=>{window.ladyEnd=st.end;});
  /* mouse follow */
  /* (the mouse is read inside lady3d.js, with no device check, so it cannot be switched off by one) */
  const mv=e=>{S.mx=e.clientX/innerWidth-.5;S.my=e.clientY/innerHeight-.5;};
  ['pointermove','mousemove'].forEach(t=>addEventListener(t,mv,{passive:true,capture:true}));
})();

/* ## written 2026-10-14 NOT YET TESTED: services scene after the Relats reference Megan sent. A full-screen colour photo shrinks into a rounded card on the right, a pale card slides in on the left with a wheel of service names, the photo changes as the wheel turns, a frosted caption sits on the photo. Team: portraits orbit the firm's sculpture. */
(function(){
  const pin=$('#svcPin'); if(!pin) return;
  const photo=$('#svPhoto'),imgsEl=$('#svImgs'),intro=$('#svIntro'),cap=$('#svCap'),capT=$('#svCapT'),cta=$('#svCta'),card=$('#svCard'),wheel=$('#svWheel'),tabs=$('#svTabs'),N=SERVICES.length;
  /* the firm's service photos are black and white originals, so each is toned in its own natural colour (a colour blend over the photo) and the card tint follows */
  const TONE=['#D08A2E','#C65A3A','#C9706A','#4E8A55','#C2A04A','#2F8F86','#8A4A7A','#B23A3F'],TINT=['#F4E5CB','#F3D8CC','#F4DBD7','#DCE9D8','#F1E8CC','#D5E9E4','#E8D8E3','#F0D3D3'];
  imgsEl.innerHTML=SERVICES.map((s,k)=>`<div class="sv-layer"><img src="${s.p}" alt="" loading="lazy" style="object-position:50% ${[50,50,50,50,50,50,50,50][k]}%"></div>`).join('');
  wheel.innerHTML=SERVICES.map((s,k)=>`<div class="sv-item" role="listitem" data-k="${k}">${s.t}</div>`).join('');
  tabs.innerHTML=SERVICES.map((s,k)=>`<button type="button" data-k="${k}" aria-label="${s.t}">${pad(k+1)}</button>`).join('');
  const imgs=$$('.sv-layer',imgsEl),items=$$('.sv-item',wheel),tbs=$$('button',tabs);
  const first=d=>{const m=d.match(/^.*?[.!?](\s|$)/);return m?m[0].trim():d};
  const P={pos:0};let cur=-1;
  const render=()=>{
    const H=wheel.clientHeight||300,pitch=Math.max(54,Math.min(92,H/4.2));
    items.forEach((el,i)=>{const d=i-P.pos,ad=Math.abs(d);
      const e=Math.min(1,ad),sm=1-e*e*(3-2*e);
      el.style.opacity=(.14+.86*sm*sm).toFixed(3);
      el.style.transform=`translateY(${(d*pitch).toFixed(1)}px) scale(${(.9+.1*sm).toFixed(3)})`;
      el.style.color=`color-mix(in srgb,#1c1b2e ${Math.round(sm*100)}%,#8a8576)`;});
    imgs.forEach((el,k)=>{const d=k-P.pos,ad=Math.abs(d);
      const u=Math.max(0,1-ad),o=u*u*(3-2*u);
      el.style.opacity=o.toFixed(3);
      el.style.transform=`translateY(${(d*3).toFixed(2)}%) scale(${(1.04+ad*.03).toFixed(3)})`;});
        const k=Math.max(0,Math.min(N-1,Math.round(P.pos)));
    if(k!==cur){cur=k;capT.textContent=first(SERVICES[k].d);cta.dataset.open=k;tbs.forEach((b,i)=>b.classList.toggle('on',i===k));}
  };
  render();
  const narrow=()=>innerWidth<900;
  const rect=()=>{const m=14;return narrow()
    ?{left:m,right:m,top:Math.round(innerHeight*.09)+8,bottom:Math.round(innerHeight*.36)+m+84+m}
    :{left:Math.round(innerWidth*.38)+m*.5,right:m,top:m,bottom:m};};
  if(reduce){
    const r=rect();pin.style.background='#0b0b11';gsap.set(photo,{left:r.left,right:r.right,top:r.top,bottom:r.bottom,borderRadius:24});gsap.set(card,{xPercent:0,yPercent:0});gsap.set(intro,{opacity:0});gsap.set(cap,{opacity:1});render();
    const go=k=>{P.pos=k;render();};
    wheel.addEventListener('click',e=>{const b=e.target.closest('.sv-item');if(b)go(+b.dataset.k)});tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(+b.dataset.k)});return;}
  const setCard=()=>gsap.set(card,narrow()?{xPercent:0,yPercent:130}:{xPercent:-125,yPercent:0});setCard();
  const A=1.6,HOLD=.5;                       /* the photo docks into its card, then the wheel turns one service per unit */
  const tl=gsap.timeline({defaults:{ease:'none'}});
  const start=()=>narrow()
    ?{left:Math.round(innerWidth*.07),right:Math.round(innerWidth*.07),top:Math.round(innerHeight*.5),bottom:Math.round(innerHeight*.14),borderRadius:24}
    :{left:Math.round(innerWidth*.27),right:Math.round(innerWidth*.27),top:Math.round(innerHeight*.5),bottom:Math.round(innerHeight*.07),borderRadius:24};
  tl.fromTo(photo,{left:()=>start().left,right:()=>start().right,top:()=>start().top,bottom:()=>start().bottom,borderRadius:24},{left:()=>rect().left,right:()=>rect().right,top:()=>rect().top,bottom:()=>rect().bottom,borderRadius:24,duration:A,ease:'power2.inOut',immediateRender:true},0)
    .to(pin,{backgroundColor:'#0b0b11',duration:A,ease:'power2.inOut'},0)
    .to(intro,{opacity:0,y:-30,duration:A*.45,ease:'power2.in'},0)
    .to(card,{xPercent:0,yPercent:0,duration:A,ease:'power2.inOut'},.12)
    .to(cap,{opacity:1,duration:.5,ease:'power2.out'},A);
  for(let k=1;k<N;k++) tl.to(P,{pos:k,duration:1,ease:'sine.inOut',onUpdate:render},A+HOLD+(k-1));
  tl.to({},{duration:.6},A+HOLD+(N-1));
  tl.eventCallback('onUpdate',render);
  const total=A+HOLD+(N-1)+.6;
  /* ## reviewed 2026-10-14: retained the service wheel, shortened the scroll distance to reduce fatigue */
  const st=ScrollTrigger.create({trigger:pin.parentElement,start:'top top',end:()=>'+='+Math.round(total*46)+'%',pin:pin,scrub:.85,animation:tl,invalidateOnRefresh:true});
  const jump=k=>{const t=A+HOLD+(k-.0)+(k===0?-0.3:0);const pr=Math.max(0,Math.min(1,(k===0?A+.05:A+HOLD+k)/total));lenis.scrollTo(st.start+pr*(st.end-st.start),{duration:1.2});};
  wheel.addEventListener('click',e=>{const b=e.target.closest('.sv-item');if(b)jump(+b.dataset.k)});
  tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)jump(+b.dataset.k)});
  addEventListener('resize',render);
})();
/* ## written 2026-11-10: scroll-driven team carousel (the section stays pinned with CSS sticky and the wheel moves through the team) */
(function(){
  const wrapEl=document.getElementById('tcWrap');if(!wrapEl)return;
const stage=document.getElementById('tcStage'),info=document.getElementById('tcInfo'),box=info.firstElementChild,N=TEAM.length;
const ARR='<svg viewBox="0 0 18 18"><path d="M11 3 5 9l6 6"/></svg>';
stage.innerHTML=TEAM.map((m,i)=>'<figure class="tc-card" role="listitem" tabindex="0" aria-label="'+m.n+'"><img src="'+m.i+'" alt="'+m.n+'" draggable="false"></figure>').join('')
 +'<button class="tc-arrow tc-prev" aria-label="Previous team member">'+ARR+'</button><button class="tc-arrow tc-next" aria-label="Next team member">'+ARR.replace('M11 3 5 9l6 6','M7 3l6 6-6 6')+'</button>';
const cards=[...stage.querySelectorAll('.tc-card')],wrap=document.getElementById('tcWrap');
const PER=55; /* svh of scrolling per team member */
let target=0,pos=0,shown=-1,t0=0,idle=0,raf=0;
function size(){wrap.style.height='calc(100svh + '+((N-1)*PER)+'svh)'}
function span(){return wrap.offsetHeight-innerHeight}
function progress(){const r=wrap.getBoundingClientRect();return Math.min(1,Math.max(0,-r.top/Math.max(1,span())))}
function yFor(i){return wrap.getBoundingClientRect().top+scrollY+span()*(i/(N-1))}
function seg(a,k){return a<=1?k[0]*a:a<=2?k[0]+k[1]*(a-1):k[0]+k[1]+k[2]*(a-2)}
function layout(){
  const w=cards[0].offsetWidth;
  cards.forEach((c,i)=>{const d=i-pos,a=Math.abs(d),s=Math.sign(d)||1;
    const x=s*w*seg(a,[.7,.48,.42]);
    const sc=a<=1?1-.16*a:a<=2?.84-.14*(a-1):.7;
    const op=a<=1?1:a<=2?1-.25*(a-1):Math.max(0,.75*(1-(a-2)));
    c.style.transform='translate(-50%,-50%) translateX('+x+'px) scale('+sc+')';
    c.style.filter='grayscale('+Math.min(1,a*1.6)+')';
    c.style.opacity=op;c.style.zIndex=100-Math.round(a*10);
    c.classList.toggle('on',a<.5);c.setAttribute('aria-current',a<.5?'true':'false');
  });
  const k=Math.round(pos);if(k!==shown){shown=k;show(k)}
}
function show(k){
  const m=TEAM[k];
  const put=()=>{box.innerHTML='<h3 class="tc-name">'+m.n+'</h3><p class="tc-bio">'+m.b+'</p><a class="tc-link" href="mailto:'+m.e+'?cc=info@cjbs.co.za&subject=Consultation%20Enquiry">Get in touch <span aria-hidden="true">&#8594;</span></a>'};
  if(reduce||t0===0&&box.innerHTML===''){t0=1;put();return}
  info.classList.add('sw');clearTimeout(t0);t0=setTimeout(()=>{put();info.classList.remove('sw')},200);
}
/* the cards ease toward where the scroll bar says they should be */
function tick(){
  target=progress()*(N-1);
  pos+=(target-pos)*(reduce?1:.14);
  if(Math.abs(target-pos)<.001)pos=target;
  layout();raf=requestAnimationFrame(tick);
}
function goTo(i){i=Math.max(0,Math.min(N-1,i));lenis.scrollTo(yFor(i),{duration:reduce?0:1})}
function snap(){clearTimeout(idle);idle=setTimeout(()=>{const p=progress()*(N-1);if(p>0&&p<N-1&&Math.abs(p-Math.round(p))>.03)goTo(Math.round(p))},180)}
stage.querySelector('.tc-prev').onclick=()=>goTo(Math.round(target)-1);
stage.querySelector('.tc-next').onclick=()=>goTo(Math.round(target)+1);
cards.forEach((c,i)=>{c.addEventListener('click',()=>goTo(i));c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();goTo(i)}})});
document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')goTo(Math.round(target)-1);if(e.key==='ArrowRight')goTo(Math.round(target)+1)});
addEventListener('scroll',snap,{passive:true});
addEventListener('resize',()=>{size();layout();ScrollTrigger.refresh()});
size();layout();raf=requestAnimationFrame(tick);
})();

/* the pinned scenes measure the page; re-measure once fonts and images have settled so a late-loading asset can never shift them */
addEventListener('load',()=>setTimeout(()=>ScrollTrigger.refresh(),400));
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>setTimeout(()=>ScrollTrigger.refresh(),200));

/* reveals */
if(!reduce){
  gsap.set('[data-rise="now"] .mask>span',{yPercent:115});
  gsap.to('[data-rise="now"] .mask>span',{yPercent:0,duration:1.1,ease:'expo.out',stagger:.06,delay:startAt()+.15});
  $$('[data-fade]').forEach(el=>{
    const d=parseFloat(el.dataset.fade)||0;
    const inHero=!!el.closest('.hero,.phero,.lady');
    gsap.set(el,{opacity:0,y:24,filter:'blur(6px)'});
    const play=()=>gsap.to(el,{opacity:1,y:0,filter:'blur(0px)',duration:.9,ease:'power3.out',delay:d+(inHero?startAt():0),clearProps:'filter'});
    inHero?play():ScrollTrigger.create({trigger:el,start:'top 92%',once:true,onEnter:play});
  });
  $$('[data-rise]:not([data-rise="now"])').forEach(h=>{
    gsap.set($$('.mask>span',h),{yPercent:115});
    ScrollTrigger.create({trigger:h,start:'top 92%',once:true,onEnter:()=>gsap.to($$('.mask>span',h),{yPercent:0,duration:1,ease:'expo.out',stagger:.05})});
  });
  $$('[data-count]').forEach(el=>{
    const end=+el.dataset.count,o={v:0};el.textContent='0';
    ScrollTrigger.create({trigger:el,start:'top 96%',once:true,onEnter:()=>gsap.to(o,{v:end,duration:1.6,ease:'power2.out',onUpdate:()=>el.textContent=Math.round(o.v)})});
  });
  if($('.person')){
    gsap.set('.person',{opacity:0,y:60});
    ScrollTrigger.batch('.person',{start:'top 94%',once:true,onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:1,ease:'power3.out',stagger:.09})});
  }
  $$('[data-scrub-words]').forEach(st=>{
    const txt=st.textContent.trim();st.setAttribute('aria-label',txt);
    st.innerHTML=txt.split(/\s+/).map(w=>`<span class="w" aria-hidden="true">${w}</span>`).join(' ');
    gsap.to($$('.w',st),{opacity:1,ease:'none',stagger:.5,scrollTrigger:{trigger:st,start:'top 85%',end:'bottom 60%',scrub:.6}});
  });
  /* case files: each folder settles back as the next one lands on it */
  const fs=$$('.folder');
  fs.forEach((f,i)=>{
    if(i===fs.length-1) return;
    gsap.to(f,{scale:.965,ease:'none',scrollTrigger:{trigger:fs[i+1],start:()=>'top '+Math.round(innerHeight*.92)+'px',end:()=>'top '+Math.round(innerHeight*.32)+'px',scrub:true}});
  });
}else{ $$('.w').forEach(w=>w.style.opacity=1); $$('[data-count]').forEach(e=>e.textContent=e.dataset.count);  }

/* sculpture dial: a small copy of the sculpture that keeps turning as you scroll */
(function(){
  const dial=$('#dial'),img=$('#dialImg'); if(!dial) return;
  const fg=$('#dfig'); if(fg&&!img.getAttribute('src')) img.src=fg.currentSrc||fg.src;
  dial.addEventListener('click',()=>lenis.scrollTo(0,{duration:1.4}));
  const total=()=>Math.max(1,document.documentElement.scrollHeight-innerHeight);
  const turn=gsap.quickSetter(img,'rotation','deg');
  const after=()=>window.ladyEnd||innerHeight*8;const upd=()=>{const y=scrollY;dial.classList.toggle('show',y>(isHome?after():240));if(!reduce)turn(y/total()*720);};
  addEventListener('scroll',upd,{passive:true});upd();
})();

/* ## reviewed 2026-10-14: navigation gains a solid editorial state after the cinematic entrance */
const nav=$('#nav'),barm=$('#barm');let lastY=0;
function navState(){const y=scrollY;nav.classList.toggle('hide',y>lastY&&y>420&&!document.body.classList.contains('menu-open'));nav.classList.toggle('solid',!isHome||y>(window.ladyEnd||innerHeight*5)-innerHeight*.6);lastY=y;barm&&barm.classList.toggle('show',y>innerHeight*.55);}
addEventListener('scroll',navState,{passive:true});navState();

/* mobile menu (circle reveal) */
const menu=$('#menu'),burger=$('#burger');
function openMenu(){
  document.body.classList.add('menu-open');burger.setAttribute('aria-expanded','true');burger.setAttribute('aria-label','Close menu');menu.setAttribute('aria-hidden','false');lenis.stop();
  gsap.set(menu,{visibility:'visible'});
  gsap.to(menu,{clipPath:'circle(150% at calc(100% - 38px) 38px)',duration:.9,ease:'expo.out'});
  gsap.fromTo('#menu nav a span',{yPercent:110},{yPercent:0,duration:.9,ease:'expo.out',stagger:.06,delay:.15});
}
function closeMenu(){
  if(!document.body.classList.contains('menu-open')) return;
  document.body.classList.remove('menu-open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Open menu');menu.setAttribute('aria-hidden','true');lenis.start();
  gsap.to(menu,{clipPath:'circle(0% at calc(100% - 38px) 38px)',duration:.6,ease:'expo.inOut',onComplete:()=>gsap.set(menu,{visibility:'hidden'})});
}
burger.addEventListener('click',()=>document.body.classList.contains('menu-open')?closeMenu():openMenu());

/* ## reviewed 2026-10-14: decorative cursor and magnetic motion disabled for a calmer interface */
if(false&&finePointer&&!reduce){
  const cur=$('#cursor');
  if(cur){
    const qx=gsap.quickTo(cur,'x',{duration:.3,ease:'power3'}),qy=gsap.quickTo(cur,'y',{duration:.3,ease:'power3'});
    addEventListener('pointermove',e=>{qx(e.clientX);qy(e.clientY);});
    document.addEventListener('pointerover',e=>{const t=e.target.closest('[data-cursor]');if(t){cur.textContent=t.dataset.cursor;cur.classList.add('big');}});
    document.addEventListener('pointerout',e=>{const t=e.target.closest('[data-cursor]');if(t&&!t.contains(e.relatedTarget)){cur.classList.remove('big');cur.textContent='';}});
    document.addEventListener('mouseleave',()=>cur.classList.add('off'));document.addEventListener('mouseenter',()=>cur.classList.remove('off'));
  }
  $$('.btn').forEach(b=>{
    const mx=gsap.quickTo(b,'x',{duration:.5,ease:'power3'}),my=gsap.quickTo(b,'y',{duration:.5,ease:'power3'});
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();mx((e.clientX-r.left-r.width/2)*.18);my((e.clientY-r.top-r.height/2)*.25);});
    b.addEventListener('pointerleave',()=>{mx(0);my(0);});
  });
}

/* forms */
function wire(form){
  if(!form)return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    let bad=false;
    $$('input[required]',form).forEach(inp=>{
      const v=inp.value.trim();
      const ok=v&&(inp.type!=='email'||/^\S+@\S+\.\S+$/.test(v));
      inp.classList.toggle('err',!ok);inp.setAttribute('aria-invalid',ok?'false':'true');if(!ok)bad=true;
    });
    if(bad){const f=$('.err',form);f&&f.focus();return;}
    const data=Object.fromEntries(new FormData(form).entries());
    const ok=$('.ok',form),btn=$('button[type=submit]',form);
    const done=(msg,sent)=>{ok.textContent=msg;if(sent&&data.subject){const c=document.createElement('code');c.textContent='Sent with the enquiry: '+data.subject;ok.appendChild(c);}form.classList.add('sent');};
    const ep=window.CJB_FORM_ENDPOINT,first=data['user-name'].split(' ')[0];
    if(!ep){console.log('ENQUIRY PAYLOAD (demo mode, not sent)',data);done('Thank you '+first+', your enquiry has been received (demo mode only, nothing was sent).',true);return;}
    const body=Object.assign({},data,window.CJB_FORM_ACCESS_KEY?{access_key:window.CJB_FORM_ACCESS_KEY}:{},{page:location.href});
    btn.disabled=true;btn.style.opacity='.6';
    fetch(ep,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)})
      .then(r=>{if(!r.ok)throw new Error(r.status);form.reset();done('Thank you '+first+', your enquiry has been sent. We will be in touch soon.',false);})
      .catch(()=>{ok.textContent='Sorry, your enquiry could not be sent. Please call (044) 382 1173 or email info@cjbs.co.za.';form.classList.add('sent');})
      .finally(()=>{btn.disabled=false;btn.style.opacity='';});
  });
  form.addEventListener('input',e=>{if(e.target.classList){e.target.classList.remove('err');e.target.removeAttribute('aria-invalid')}});
}
wire($('#cform'));wire($('#mform'));

/* pop-up: the button or photo you tapped expands into the pop-up */
const modal=$('#modal');
if(modal){
  const panel=$('#mpanel'),back=$('#mback');
  let openEl=null,lastFocus=null;
  const subj=s=>JSON.stringify({sectionTitle:'services',blogName:s.t});
  function fill(k){
    const s=SERVICES[k],f=$('#mform');
    f.reset();f.classList.remove('sent');$$('input',f).forEach(x=>{x.classList.remove('err');x.removeAttribute('aria-invalid')});
    $('#mimg').src=s.p;$('#mimg').alt=s.t+' (legal services)';
    $('#m-title').textContent=s.t;$('#mdesc').textContent=s.d;$('#mchip').textContent='Enquiry: '+s.t;
    $('#msubject').value=subj(s);
  }
  const insetFor=(el,p)=>{const c=el.getBoundingClientRect();return `inset(${c.top-p.top}px ${p.right-c.right}px ${p.bottom-c.bottom}px ${c.left-p.left}px round 20px)`;};
  function openModal(k,el){
    if(openEl) return;
    openEl=el;lastFocus=document.activeElement;
    fill(k);
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');lenis.stop();
    panel.scrollTop=0;
    const cur=$('#cursor');cur&&cur.classList.remove('big');
    const p=panel.getBoundingClientRect();
    if(reduce){gsap.fromTo(panel,{opacity:0},{opacity:1,duration:.2});gsap.to(back,{opacity:1,duration:.2});}
    else{
      const tl=gsap.timeline({defaults:{ease:'expo.out'}});
      tl.to(back,{opacity:1,duration:.4,ease:'power2.out'},0)
        .fromTo(panel,{clipPath:insetFor(el,p)},{clipPath:'inset(0px 0px 0px 0px round 20px)',duration:.8},0)
        .fromTo('#mimg',{scale:1.3},{scale:1,duration:1,ease:'expo.out'},0)
        .fromTo('#mpanel .kicker,#mpanel .m-info>*,#mpanel .form>*,#mclose',{opacity:0,y:16},{opacity:1,y:0,duration:.6,ease:'power3.out',stagger:.04},.3);
    }
    setTimeout(()=>{ if(matchMedia('(min-width:768px)').matches) $('#m-name').focus({preventScroll:true}); },650);
  }
  function closeModal(){
    if(!openEl) return;
    const el=openEl;
    const done=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');gsap.set(panel,{clearProps:'clipPath,opacity'});gsap.set(back,{opacity:0});lenis.start();openEl=null;lastFocus&&lastFocus.focus({preventScroll:true});};
    if(reduce){gsap.to(panel,{opacity:0,duration:.15,onComplete:done});return;}
    const c=el.getBoundingClientRect(),p=panel.getBoundingClientRect();
    const visible=c.bottom>0&&c.top<innerHeight&&c.right>0&&c.left<innerWidth;
    const tl=gsap.timeline({onComplete:done});
    if(visible){
      tl.to('#mpanel .kicker,#mpanel .m-info>*,#mpanel .form>*,#mclose',{opacity:0,duration:.18},0)
        .to(panel,{clipPath:insetFor(el,p),duration:.5,ease:'expo.inOut'},.04)
        .to(back,{opacity:0,duration:.4},.05);
    } else tl.to(panel,{opacity:0,duration:.25}).to(back,{opacity:0,duration:.25},0);
  }
  document.addEventListener('click',e=>{const t=e.target.closest('[data-open]');if(t&&!t.closest('.modal'))openModal(+t.dataset.open,t);});
  $('#mclose').addEventListener('click',closeModal);back.addEventListener('click',closeModal);
  addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeModal();closeMenu();}
    if(e.key==='Tab'&&openEl){
      const f=$$('button,a[href],input:not([type=hidden])',panel).filter(x=>x.offsetParent);
      const a=f[0],z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}
      else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}
    }
  });
  let ty=null;
  panel.addEventListener('touchstart',e=>{ty=panel.scrollTop===0?e.touches[0].clientY:null},{passive:true});
  panel.addEventListener('touchend',e=>{if(ty!==null&&e.changedTouches[0].clientY-ty>110)closeModal();ty=null},{passive:true});
}

/* fit the footer wordmark to the width */
function fit(){const w=$('#wordmark');if(!w)return;w.style.fontSize='100px';const t=w.parentElement.clientWidth,s=w.scrollWidth;w.style.fontSize=(100*t/s*.995)+'px';}
fit();addEventListener('resize',fit);document.fonts&&document.fonts.ready.then(()=>{fit();ScrollTrigger.refresh();});
addEventListener('load',()=>ScrollTrigger.refresh());
})();
