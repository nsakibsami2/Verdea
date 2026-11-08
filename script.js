const P=[
{id:"bloom",n:"VERDÉA BLOOM",c:"Soft Floral",d:"A gentle floral-inspired fragrance for soft and elegant moments.",p:299,pr:"৳299–399",col:"#D8B7AE",cl:"s-bloom"},
{id:"citrus",n:"VERDÉA CITRUS",c:"Fresh",d:"A fresh and vibrant fragrance inspired by nature’s refreshing side.",p:299,pr:"৳299–399",col:"#A5AD91",cl:"s-citrus"},
{id:"amber",n:"VERDÉA AMBER",c:"Warm Woody",d:"A warm and sophisticated fragrance with a woody-inspired character.",p:299,pr:"৳299–399",col:"#D8C8AD",cl:"s-amber"}];
const IM={
 "hero": "hero.png",
 "bloom": "bloom.png",
 "citrus": "citrus.png",
 "amber": "amber.png",
 "box": "box.png",
 "group": "group.png",
 "citruswide": "citruswide.png",
 "mist": "mist.png",
 "garden": "garden.png",
 "bag": "bag.png",
 "open": "open.png",
 "apply": "apply.png",
 "endcard": "endcard.png"
};
const im=(k,alt,st="")=>`<img src="${IM[k]}" alt="${alt}" ${st}>`;
const tin=(col,lab)=>im(lab.toLowerCase(),`VERDÉA ${lab} solid perfume tin`);
const duo=()=>im("box","VERDÉA Duo gift box");
const $=s=>document.querySelector(s);
document.querySelectorAll("img[data-i]").forEach(i=>i.src=IM[i.dataset.i]);
$("#introScene").innerHTML=im("group","VERDÉA tins and gift box on a stone slab","style='object-position:32% 50%'");$("#philScene").innerHTML=im("garden","Sunlight through jasmine flowers and leaves");
$("#stScene1").innerHTML=im("mist","Soft light through jasmine leaves","style='object-position:45% 50%'");$("#stScene2").innerHTML=im("citruswide","VERDÉA Citrus and Bloom tins with citrus halves and rose petals","style='object-position:60% 50%'");
$("#homeCards").innerHTML=P.map((p,i)=>`<article class="card rv"><div class="scene ${p.cl}">${tin(p.col,p.id,"c"+i)}</div><span class="tag">${p.c}</span><h3>${p.id.toUpperCase()}</h3><p>${p.d}</p><a class="btn" href="#collections">Explore Scent</a></article>`).join("");
const opts=P.map(p=>`<option>${p.id[0].toUpperCase()+p.id.slice(1)}</option>`).join("");
$("#shop").innerHTML=P.map((p,i)=>`<article class="card rv"><div class="scene ${p.cl}">${tin(p.col,p.id,"p"+i)}</div><span class="tag">${p.c} · 8g</span><h3>${p.n}</h3><p style="font-size:.9rem;margin-bottom:.4em">${p.d}</p><div class="price">${p.pr}</div><button class="btn" data-add="${p.id}">Add to Bag</button></article>`).join("")+
`<article class="card rv"><div class="scene s-stone">${duo()}</div><span class="tag">Gift Bundle</span><h3>VERDÉA DUO GIFT BUNDLE</h3><p style="font-size:.9rem;margin-bottom:.4em">Two scents in one VERDÉA gift box. Choose any two.</p><div class="price">৳549–699</div><select class="sel" id="d1" aria-label="First scent">${opts}</select><select class="sel" id="d2" aria-label="Second scent">${opts.replace("<option>","<option selected>").replace("selected>Bloom","selected>Bloom")}</select><button class="btn" data-duo>Add Duo to Bag</button></article>`;
$("#d2").selectedIndex=1;
let cart=[];
const fmt=n=>"৳"+n.toLocaleString("en-US");
function render(){
 const n=cart.reduce((a,i)=>a+i.q,0),b=$("#cnt");b.textContent=n;b.classList.add("pop");setTimeout(()=>b.classList.remove("pop"),250);
 if(!cart.length){$("#items").innerHTML='<p style="text-align:center;padding:40px 0">Your bag is empty.</p>';$("#foot").innerHTML="";return}
 $("#items").innerHTML=cart.map((i,k)=>`<div class="it">${i.duo?duo():tin(i.col,i.label,"b"+k)}<div><strong style="font-family:var(--serif);font-size:1.15rem">${i.n}</strong><small>${i.sub}</small><div class="q"><button data-m="${k}" aria-label="Decrease">−</button>${i.q}<button data-pl="${k}" aria-label="Increase">+</button></div><button class="rm" data-rm="${k}">Remove</button></div><div>${fmt(i.p*i.q)}</div></div>`).join("");
 const s=cart.reduce((a,i)=>a+i.p*i.q,0);
 $("#foot").innerHTML=`<div class="sub"><span>Subtotal</span><span>${fmt(s)}</span></div><p class="note">Starting prices shown. Demo checkout only, no real payment or order is processed.</p><button class="btn" id="co">Checkout (Demo)</button>`}
function add(it){const f=cart.find(c=>c.key===it.key);f?f.q++:cart.push({...it,q:1});render();open_(true)}
function open_(o){$("#dr").classList.toggle("on",o);$("#ov").classList.toggle("on",o)}
document.addEventListener("click",e=>{const t=e.target;
 if(t.dataset.add){const p=P.find(x=>x.id==t.dataset.add);add({key:p.id,n:p.n,sub:p.c+" · 8g",p:p.p,col:p.col,label:p.id})}
 if("duo" in t.dataset){const a=$("#d1").value,b=$("#d2").value;add({key:"duo-"+a+b,n:"DUO GIFT BUNDLE",sub:a+" + "+b,p:549,duo:1})}
 if(t.dataset.pl!=null){cart[t.dataset.pl].q++;render()}
 if(t.dataset.m!=null){const i=cart[t.dataset.m];if(--i.q<1)cart.splice(t.dataset.m,1);render()}
 if(t.dataset.rm!=null){cart.splice(t.dataset.rm,1);render()}
 if(t.id=="co"){$("#items").innerHTML='<div class="done"><h3>Thank you!</h3><p>This is a demo checkout. No payment was taken and no order was placed.</p></div>';$("#foot").innerHTML='<button class="btn" id="cl">Close</button>';cart=[];$("#cnt").textContent=0}
 if(t.id=="cl"){open_(false);render()}
 if(t.closest("#menu a"))$("#menu").classList.remove("open")});
$("#bagbtn").onclick=()=>open_(true);$("#cx").onclick=$("#ov").onclick=()=>open_(false);
$("#bg").onclick=()=>$("#menu").classList.toggle("open");
$("#cf").onsubmit=e=>{e.preventDefault();$("#cfm").textContent="Thank you! This demo form doesn’t send messages.";e.target.reset()};
const names=["home","collections","story","solid-perfume","contact"];
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("v");io.unobserve(x.target)}}),{threshold:.12});
function route(){let h=location.hash.slice(1);if(!names.includes(h))h="home";
 document.querySelectorAll(".page").forEach(p=>p.classList.toggle("show",p.id=="p-"+h));
 document.querySelectorAll("nav a.l").forEach(a=>a.classList.toggle("on",a.dataset.p==h));
 document.title=(h=="home"?"VERDÉA — Carry Nature, Leave a Scent.":"VERDÉA — "+h.replace("-"," "));
 window.scrollTo(0,0);scrollFx();document.querySelectorAll(`#p-${h} .rv`).forEach(el=>{el.classList.remove("v");io.observe(el)})}
function scrollFx(){const home=(location.hash.slice(1)||"home")=="home";$("#nav").classList.toggle("solid",!home||scrollY>60)}
addEventListener("hashchange",route);addEventListener("scroll",scrollFx,{passive:true});
render();route();
