
(function(){
document.documentElement.classList.add("js");
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var pages=["home","brands","creators","contact"],curPage=null,busy=false,curtain=$("#curtain"),menu=$("#menu"),bg=$("#bg");
// split text
$$("[data-split]").forEach(function(el){var ws=el.textContent.trim().split(/\s+/);
el.innerHTML=ws.map(function(w,i){var g=/^\*.*\*$/.test(w);return '<span class="w"><span class="'+(g?"gt":"")+'" style="--i:'+i+'">'+w.replace(/\*/g,"")+'</span></span>'}).join(" ")});
try{$("#yr").textContent=new Date().getFullYear()}catch(e){}
// reveal on scroll
var io=null;
function observe(name){if(io)io.disconnect();var els=$$("#"+name+" .rv");
els.forEach(function(e,i){e.classList.remove("in");e.style.setProperty("--d",i%5)});
io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12});
els.forEach(function(e){io.observe(e)})}
function setPage(name){
$$(".page").forEach(function(p){p.classList.toggle("active",p.id===name);p.classList.remove("on")});
window.scrollTo(0,0);
requestAnimationFrame(function(){requestAnimationFrame(function(){$("#"+name).classList.add("on");observe(name)})});
$$("nav a").forEach(function(a){a.classList.toggle("act",a.dataset.p===name)});
menu.classList.remove("o");bg.classList.remove("o");bg.setAttribute("aria-expanded","false")}
function go(name){
if(busy||name===curPage)return;
if(!curPage){setPage(name);curPage=name;return}
busy=true;curtain.className="in";
setTimeout(function(){setPage(name);curPage=name;curtain.className="out";
setTimeout(function(){curtain.className="";busy=false},680)},680)}
function route(){var h=location.hash.replace("#/","");go(pages.indexOf(h)>-1?h:"home")}
addEventListener("hashchange",route);route();
bg.onclick=function(){var o=menu.classList.toggle("o");bg.classList.toggle("o",o);bg.setAttribute("aria-expanded",o)};
addEventListener("keydown",function(e){var i=pages.indexOf(curPage);
if(e.key==="ArrowRight"&&i<3)location.hash="#/"+pages[i+1];if(e.key==="ArrowLeft"&&i>0)location.hash="#/"+pages[i-1]});
// pointer effects
var fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
addEventListener("pointermove",function(e){document.documentElement.style.setProperty("--mx",(e.clientX/innerWidth-.5)*2);document.documentElement.style.setProperty("--my",(e.clientY/innerHeight-.5)*2)});
if(fine){
var cur=$("#cur"),ring=$("#ring"),mx=0,my=0,rx=0,ry=0;
addEventListener("pointermove",function(e){mx=e.clientX;my=e.clientY});
(function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;cur.style.transform="translate("+mx+"px,"+my+"px)";ring.style.transform="translate("+rx+"px,"+ry+"px)";requestAnimationFrame(loop)})();
document.addEventListener("pointerover",function(e){ring.classList.toggle("h",!!(e.target.closest&&e.target.closest("a,button,[data-h]")))});
$$(".mag").forEach(function(b){
b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+(e.clientX-r.left-r.width/2)*.25+"px,"+(e.clientY-r.top-r.height/2)*.35+"px)"});
b.addEventListener("pointerleave",function(){b.style.transform="";b.style.transition="transform .5s cubic-bezier(.2,.8,.2,1), color .4s"});
b.addEventListener("pointerenter",function(){b.style.transition="color .4s"})})}
// timeline progress
var st=$("#steps");
function prog(){if(!st||curPage!=="brands")return;var r=st.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.7-r.top)/r.height));st.style.setProperty("--p",p)}
addEventListener("scroll",prog,{passive:true});
// 3D creator ring
var ringEl=$("#ring3d"),scene=$("#scene"),ang=0,drag=false,lx=0,still=matchMedia("(prefers-reduced-motion:reduce)").matches;
scene.addEventListener("pointerdown",function(e){drag=true;lx=e.clientX});
addEventListener("pointermove",function(e){if(drag){ang+=(e.clientX-lx)*.45;lx=e.clientX}});
addEventListener("pointerup",function(){drag=false});
(function spin(){if(curPage==="creators"){if(!drag&&!still)ang+=.22;ringEl.style.setProperty("--a",ang+"deg")}requestAnimationFrame(spin)})();
})();
