/* ## written 2026-10-12 NOT YET TESTED: Lady Justice 3D viewer (three.js r160, vendored). Loads the model after the page is ready, fades it in over the flat image, and is driven by window.ladyState (set by the scroll story in shared.js) plus the mouse. Falls back to the flat image if WebGL or the model fails. */
import * as THREE from 'three';
import {GLTFLoader} from './vendor/three/jsm/loaders/GLTFLoader.js';

const $=s=>document.querySelector(s);
const stage=$('#ladyStage'),cv=$('#ladyCanvas');
const pans=[];   /* the logo and wheel no longer sit on the pans (Megan, 2026-10-13) */
const S=window.ladyState||(window.ladyState={ry:0,spin:0,focus:0,focus2:0,lock:0,mx:0,my:0,expo:1,lift:0});
const reduce=false;
const finePointer=matchMedia('(hover:hover) and (pointer:fine)').matches;

/* anchor points of the two pans, in the model's own coordinates (measured from the mesh) */
const ANCHORS=[new THREE.Vector3(-0.10,0.251,0.232),new THREE.Vector3(0.03,0.245,0.228)];
const BASE=new THREE.Vector3(0.266,0,-0.247);
const WHEEL_WORLD=ANCHORS[1].clone().sub(BASE);   /* the right-hand pan in world space (before she turns) */   /* centre of her base: she turns around this */
const PAN_R=0.068;                               /* pan radius in model units */

const fail=()=>window.dispatchEvent(new Event('lady3d:failed'));
async function start(){
  if(!stage||!cv) return fail();
  const gl=cv.getContext('webgl2')||cv.getContext('webgl');
  if(!gl) return fail();
  const renderer=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true,powerPreference:'high-performance'});
  renderer.setClearColor(0x000000,0);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene();
  /* Studio lighting built by hand: large soft boxes reflected in the marble (a warm overhead box, a white strip on the left, an indigo strip behind on the right, a dim bounce from the floor). This is what makes the surface read as polished stone and not plastic. */
  const studio=new THREE.Scene();
  const box=(w,h,x,y,z,color,k)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(color).multiplyScalar(k),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);studio.add(m);};
  box(12,7,0,8,3,0xfff1e0,9);box(3,9,-7,1,3,0xffffff,5.5);box(2.2,9,7,1,-3,0x8b87ff,3.2);box(12,3,0,-6,4,0x2a2850,1.1);
  const pm=new THREE.PMREMGenerator(renderer);
  scene.environment=pm.fromScene(studio,0.03).texture;
  const key=new THREE.DirectionalLight(0xfff0e0,3.4);key.position.set(-2,3,4);scene.add(key);
  const rim=new THREE.DirectionalLight(0x8f8bff,1.9);rim.position.set(3,2,-3);scene.add(rim);
  const cam=new THREE.PerspectiveCamera(26,1,0.1,40);
  cv.addEventListener('webglcontextlost',e=>{e.preventDefault();stage.classList.remove('is3d');window.ladyState.is3d=false;});
  const gltf=await new GLTFLoader().loadAsync(new URL('../model/lady-justice.glb',import.meta.url).href);
  const model=gltf.scene;
  /* Marble: rebuilt as a physical material. Not metal, a polished-stone clear coat, and a soft sheen at the edges (the velvety glow where light grazes marble). */
  const aniso=renderer.capabilities.getMaxAnisotropy();
  model.traverse(o=>{
    if(!o.isMesh||!o.material) return;
    const m0=o.material;
    [m0.map,m0.normalMap,m0.roughnessMap].forEach(t=>{if(t) t.anisotropy=Math.min(8,aniso);});
    o.material=new THREE.MeshPhysicalMaterial({map:m0.map,normalMap:m0.normalMap,normalScale:new THREE.Vector2(1.25,1.25),roughnessMap:m0.roughnessMap,roughness:.72,metalness:0,
      clearcoat:.5,clearcoatRoughness:.28,sheen:.6,sheenRoughness:.5,sheenColor:new THREE.Color(0xb9b7f5),envMapIntensity:1.15,side:THREE.DoubleSide});
    m0.dispose();
  });
  const pivot=new THREE.Group();scene.add(pivot);
  model.position.copy(BASE).multiplyScalar(-1);pivot.add(model);

  /* Dust in the light: a few hundred soft motes drifting slowly, parallaxing with the camera. Atmosphere, not decoration: it makes the space feel lit. */
  const N=260,dp=new Float32Array(N*3),dv=new Float32Array(N);
  for(let i=0;i<N;i++){dp[i*3]=(Math.random()-.5)*3.2;dp[i*3+1]=(Math.random()-.5)*2.6;dp[i*3+2]=(Math.random()-.5)*2.4;dv[i]=.012+Math.random()*.03;}
  const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.BufferAttribute(dp,3));
  const dc=document.createElement('canvas');dc.width=dc.height=64;const dx=dc.getContext('2d'),gr=dx.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.4,'rgba(255,255,255,.35)');gr.addColorStop(1,'rgba(255,255,255,0)');dx.fillStyle=gr;dx.fillRect(0,0,64,64);
  const dust=new THREE.Points(dg,new THREE.PointsMaterial({map:new THREE.CanvasTexture(dc),size:.028,sizeAttenuation:true,transparent:true,opacity:.55,depthWrite:false,blending:THREE.AdditiveBlending,color:0xd8d6ff}));
  scene.add(dust);
  let W=1,H=1,D0=5,OX=0,OY=0,maxDpr=1.5;
  const fit=()=>{
    const r=cv.getBoundingClientRect(),sr=stage.getBoundingClientRect();W=Math.max(1,r.width);H=Math.max(1,r.height);OX=r.left-sr.left;OY=r.top-sr.top;
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,maxDpr));renderer.setSize(W,H,false);
    cam.aspect=W/H;cam.updateProjectionMatrix();
    const t=Math.tan(THREE.MathUtils.degToRad(cam.fov/2));
    D0=Math.max(1.04/t,0.76/(t*cam.aspect));    /* whole body in frame with air above and below (Megan, 2026-10-13: zoom out slightly) */        /* whole statue in frame, with a little air */
  };
  fit();
  const ro=new ResizeObserver(()=>{fit();frame(true);});ro.observe(stage);addEventListener('resize',()=>{fit();frame(true);});

  const mvv=e=>{S.mx=e.clientX/innerWidth-.5;S.my=e.clientY/innerHeight-.5;};
  ['pointermove','mousemove'].forEach(t=>window.addEventListener(t,mvv,{passive:true,capture:true}));
  const cur={ry:0,rx:0,focus:0,focus2:0,lock:0,mx:0,my:0,expo:S.expo??1,lift:S.lift??0};
  const tmp=new THREE.Vector3(),mid=new THREE.Vector3(-0.334,0.22,0.478),mid2=new THREE.Vector3(-0.334+0.3,0.22,0.478); /* aim a little right of the scales so she stays clear of the right-hand text */
  const ease=t=>t*t*(3-2*t);
  let last=performance.now();
  function frame(force){
    const now=performance.now(),dt=Math.min(.25,(now-last)/1000);last=now;
    const k=force?1:1-Math.exp(-dt*6);      /* time-based smoothing: same feel on slow and fast machines */
    cur.ry+=(S.ry+S.spin-cur.ry)*k;cur.focus+=(S.focus-cur.focus)*k;cur.focus2+=((S.focus2||0)-cur.focus2)*k;cur.lock+=((S.lock||0)-cur.lock)*k;
    const km=force?1:1-Math.exp(-dt*9);
    cur.mx+=(S.mx-cur.mx)*km;cur.my+=(S.my-cur.my)*km;
    cur.expo+=((S.expo??1)-cur.expo)*k;cur.lift+=((S.lift??0)-cur.lift)*k;
    renderer.toneMappingExposure=1.4*cur.expo;pivot.position.y=cur.lift;
    /* the key light glides around her with the mouse, so the highlights slide across the marble */
    const tt=now/1000;
    key.position.set(-2+cur.mx*7+Math.sin(tt*.35)*.4,3+cur.my*-4,4);
    rim.position.set(3-cur.mx*3,2,-3);
    const pos=dg.attributes.position.array;
    for(let i=0;i<N;i++){let y=pos[i*3+1]+dv[i]*dt;if(y>1.3)y=-1.3;pos[i*3+1]=y;pos[i*3]+=Math.sin(tt*.4+i)*.0006;}
    dg.attributes.position.needsUpdate=true;
    dust.rotation.y=cur.ry*.4+cur.mx*.2;
    const calm=1-cur.focus2;      /* the mouse eases off while the camera is travelling into the scale */
    pivot.rotation.y=cur.ry+cur.mx*1.25*calm+Math.sin(now/2300)*.1*calm;pivot.rotation.x=cur.my*0.28*calm+Math.sin(now/3100)*.025*calm;   /* she follows the cursor: about 36 degrees each way at the screen edge */
    const f=ease(cur.focus),f2=ease(cur.focus2),t=Math.tan(THREE.MathUtils.degToRad(cam.fov/2));
    const D1=Math.max(0.5/t,0.36/(t*cam.aspect));      /* push in until the two pans fill the frame */
    const D2=Math.max(0.17/t,0.13/(t*cam.aspect));     /* all the way into the right-hand scale */
    let D=D0+(D1-D0)*f;D=D+(D2-D)*f2;
    D*=1+Math.sin(now/2600)*.004;                       /* a barely-there breathing dolly */
    tmp.set(0,-0.04*(1-f),0).lerp(mid2,f).lerp(WHEEL_WORLD,f2);
    cam.position.set(tmp.x+cur.mx*0.06*calm,tmp.y-cur.my*0.04*calm,tmp.z+D);cam.lookAt(tmp);
    renderer.render(scene,cam);
    model.updateMatrixWorld(true);
    ANCHORS.forEach((a,i)=>{
      const p=pans[i];if(!p) return;
      const v=model.localToWorld(a.clone());
      const dist=cam.position.distanceTo(v),pxu=H/(2*t*dist);
      const pr=v.clone().project(cam);
      let x=OX+(pr.x*.5+.5)*W,y=OY+(-pr.y*.5+.5)*H,w=PAN_R*2*pxu*(i?0.95:1.7);
      if(i===1&&S.tx!=null&&cur.lock>0){     /* the wheel travels to the ring in the door photo */
        const L=cur.lock,e=L*L*(3-2*L);
        x+=(S.tx-x)*e;y+=((S.ty+S.td*.5*.85)-y)*e;w+=(S.td-w)*e;
      }
      p.style.left=x.toFixed(1)+'px';p.style.top=y.toFixed(1)+'px';p.style.width=w.toFixed(1)+'px';
    });
  }
  renderer.compile(scene,cam);
  window.ladyState.is3d=true;
  frame(true);
  stage.classList.add('is3d');
  window.dispatchEvent(new Event('lady3d:ready'));
  if(reduce) return;
  /* The animation loop rides GSAP's ticker, the same clock that already turns the wheel (a plain requestAnimationFrame loop was not
     running in Megan's Chrome). It skips frames when the tab is hidden or the stage has scrolled well out of view. */
  let acc=0,n=0,skip=0,inView=true;
  const tick=()=>{
    if(document.hidden) return;
    if((skip++%20)===0){const r=stage.getBoundingClientRect();inView=r.bottom>-200&&r.top<innerHeight+200;}
    if(!inView) return;
    const t0=performance.now();
    try{frame(false);}catch(e){console.warn('lady frame',e);}
    acc+=performance.now()-t0;n++;
    if(n===40){if(acc/n>14&&maxDpr>1){maxDpr=1;fit();}acc=0;n=0;}
  };
  if(window.gsap&&gsap.ticker) gsap.ticker.add(tick);
  else {const loop=()=>{tick();requestAnimationFrame(loop);};requestAnimationFrame(loop);}
}
const go=()=>start().catch(e=>{console.warn('Lady Justice 3D not loaded, using the flat image.',e);fail();});
go();   /* start fetching the model straight away; the entrance waits for it */
