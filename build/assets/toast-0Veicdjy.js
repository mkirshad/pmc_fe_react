import{G as f,r as s,y as g,j as c,a8 as P,a9 as R}from"./index-D40LjRLE.js";import{u as A,S as D}from"./StatusIcon-AJyt3swE.js";import{C as S,m as _}from"./CloseButton-DtojJIyi.js";function X(t){return f({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M5 12l5 5l10 -10"},child:[]}]})(t)}function Y(t){return f({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M6 9l6 6l6 -6"},child:[]}]})(t)}function tt(t){return f({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M15 6l-6 6l6 6"},child:[]}]})(t)}function et(t){return f({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 6l6 6l-6 6"},child:[]}]})(t)}function nt(t){return f({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M6 15l6 -6l6 6"},child:[]}]})(t)}function rt(t){return f({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"},child:[]}]})(t)}function at(t){return f({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 7l16 0"},child:[]},{tag:"path",attr:{d:"M10 11l0 6"},child:[]},{tag:"path",attr:{d:"M14 11l0 6"},child:[]},{tag:"path",attr:{d:"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"},child:[]},{tag:"path",attr:{d:"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"},child:[]}]})(t)}const F=s.forwardRef((t,e)=>{const{className:n,children:r,closable:i=!1,customIcon:l,duration:d=3e3,onClose:a,style:o,title:p,triggerByToast:m,type:h,width:N=350,...C}=t,[M,v]=s.useState("show"),{clear:T}=A(a,d,d>0),L=s.useCallback(x=>{v("hiding"),a==null||a(x),T(),m||setTimeout(()=>{v("hide")},400)},[a,T,m]),u=g("notification",n);return M==="hide"?null:c.jsxs("div",{ref:e,...C,className:u,style:{width:N,...o},children:[c.jsxs("div",{className:g("notification-content",!r&&"no-child"),children:[h&&!l?c.jsx("div",{className:"mr-3 mt-0.5",children:c.jsx(D,{type:h})}):null,l&&c.jsx("div",{className:"mr-3",children:l}),c.jsxs("div",{className:"mr-4",children:[p&&c.jsx("div",{className:g("notification-title",r&&"mb-2"),children:p}),c.jsx("div",{className:"notification-description",children:r})]})]}),i&&c.jsx(S,{className:"notification-close",absolute:!0,onClick:L})]})});F.displayName="Notification";function G(...t){return t.filter(e=>e!==null&&typeof e<"u").reduce((e,n)=>{if(typeof n!="function")throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return e===void 0?n:function(...i){e.apply(this,i),n.apply(this,i)}},void 0)}const O=({offsetX:t,offsetY:e,placement:n,transitionType:r})=>r==="fade"?H(t,e)[n]:z(t,e)[n],b={initial:{opacity:0,transform:"scale(0.75)"},animate:{transform:"scale(1)",opacity:1},exit:{opacity:0,transform:"scale(0.75)"}},k={initial:{opacity:0},animate:{opacity:1},exit:{opacity:0}},z=(t,e)=>({"top-end":{default:{top:e,right:t},variants:{...b}},"top-start":{default:{top:e,left:t},variants:{...b}},"top-center":{default:{top:e,left:"50%",transform:"translateX(-50%)"},variants:{...b}},"bottom-end":{default:{bottom:e,right:t},variants:{...b}},"bottom-start":{default:{bottom:e,left:t},variants:{...b}},"bottom-center":{default:{bottom:e,left:"50%",transform:"translateX(-50%)"},variants:{...b}}}),H=(t,e)=>({"top-end":{default:{top:e,right:t},variants:{...k}},"top-start":{default:{top:e,left:t},variants:{...k}},"top-center":{default:{top:e,left:"50%",transform:"translateX(-50%)"},variants:{...k}},"bottom-end":{default:{bottom:e,right:t},variants:{...k}},"bottom-start":{default:{bottom:e,left:t},variants:{...k}},"bottom-center":{default:{bottom:e,left:"50%",transform:"translateX(-50%)"},variants:{...k}}}),K=t=>{const[e,n]=s.useState([]),r=s.useCallback(a=>(typeof a>"u"&&e.length&&(a=e[e.length-1].key),a),[e]),i=s.useCallback(a=>{const o=t||"_"+Math.random().toString(36).substr(2,12);return n([...e,{key:o,visible:!0,node:a}]),o},[e,t]),l=s.useCallback(()=>{n(e.map(a=>({...a,visible:!1}))),setTimeout(()=>{n([])},50)},[e]),d=s.useCallback(a=>{n(e.map(o=>(o.key===r(a)&&(o.visible=!1),o))),setTimeout(()=>{n(e.filter(o=>o.visible))},50)},[e,r]);return{messages:e,push:i,removeAll:l,remove:d}},w=s.forwardRef((t,e)=>{const n=s.useRef(null),{transitionType:r="scale",placement:i=P.TOP_END,offsetX:l=30,offsetY:d=30,messageKey:a,block:o=!1,callback:p,...m}=t,{push:h,removeAll:N,remove:C,messages:M}=K(a);s.useImperativeHandle(e,()=>({root:n.current,push:h,removeAll:N,remove:C}));const v=O({offsetX:l,offsetY:d,placement:i,transitionType:r}),T={triggerByToast:!0,...m},L=M.map(u=>{var x,E,W,B;return c.jsx(_.div,{className:"toast-wrapper",initial:v.variants.initial,variants:v.variants,animate:u.visible?"animate":"exit",transition:{duration:.15,type:"tween"},children:s.cloneElement(u.node,{...T,ref:e,onClose:G((E=(x=u.node)==null?void 0:x.props)==null?void 0:E.onClose,()=>C(u.key)),className:g((B=(W=u.node)==null?void 0:W.props)==null?void 0:B.className)})},u.key)});return c.jsx("div",{style:v.default,...m,ref:u=>{n.current=u,p==null||p(u)},className:g("toast",o&&"w-full"),children:L})});w.getInstance=t=>{const{wrapper:e,...n}=t,r=s.createRef(),i=(typeof e=="function"?e():e)||document.body;return new Promise(l=>{const d=()=>{l([r,o])};function a(p){const m=document.createElement("div");i.appendChild(m);const h=R(m);return h.render(p),h}const{unmount:o}=a(c.jsx(w,{...n,ref:r,callback:d}))})};w.displayName="ToastWrapper";const U={placement:P.TOP_END,offsetX:30,offsetY:30,transitionType:"scale",block:!1},I="default",y=new Map;function q(t){if(/\top\b/.test(t))return"top-full";if(/\bottom\b/.test(t))return"bottom-full"}async function J(t,e){const[n]=await w.getInstance(e);return y.set(t||I,n),n}function Q(t){return y.size===0?null:y.get(t||I)}const j=t=>j.push(t);j.push=(t,e=U)=>{let n=e.placement;e.block&&(n=q(e.placement));const r=Q(n);return r!=null&&r.current?r.current.push(t):J(n??"",e).then(i=>{var l;return(l=i.current)==null?void 0:l.push(t)})};j.remove=t=>{y.forEach(e=>{e.current.remove(t)})};j.removeAll=()=>{y.forEach(t=>t.current.removeAll())};export{F as N,rt as T,Y as a,et as b,tt as c,nt as d,X as e,at as f,j as t};
