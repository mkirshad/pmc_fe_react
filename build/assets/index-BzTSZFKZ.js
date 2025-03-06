import{r as o,y,j as c,ag as A,ah as I,G as C}from"./index-BW1Hx4NO.js";import{u as R,S as V}from"./StatusIcon-_BWY6oTz.js";import{C as S}from"./CloseButton-HRWfSyWw.js";import{m as L}from"./isNil-Cr14PySr.js";const W=o.forwardRef((e,t)=>{const{className:a,children:n,closable:i=!1,customIcon:l,duration:d=3e3,onClose:r,style:s,title:p,triggerByToast:m,type:h,width:E=350,...x}=e,[j,f]=o.useState("show"),{clear:w}=R(r,d,d>0),k=o.useCallback(N=>{f("hiding"),r==null||r(N),w(),m||setTimeout(()=>{f("hide")},400)},[r,w,m]),u=y("notification",a);return j==="hide"?null:c.jsxs("div",{ref:t,...x,className:u,style:{width:E,...s},children:[c.jsxs("div",{className:y("notification-content",!n&&"no-child"),children:[h&&!l?c.jsx("div",{className:"mr-3 mt-0.5",children:c.jsx(V,{type:h})}):null,l&&c.jsx("div",{className:"mr-3",children:l}),c.jsxs("div",{className:"mr-4",children:[p&&c.jsx("div",{className:y("notification-title",n&&"mb-2"),children:p}),c.jsx("div",{className:"notification-description",children:n})]})]}),i&&c.jsx(S,{className:"notification-close",absolute:!0,onClick:k})]})});W.displayName="Notification";function D(...e){return e.filter(t=>t!==null&&typeof t<"u").reduce((t,a)=>{if(typeof a!="function")throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return t===void 0?a:function(...i){t.apply(this,i),a.apply(this,i)}},void 0)}const _=({offsetX:e,offsetY:t,placement:a,transitionType:n})=>n==="fade"?G(e,t)[a]:F(e,t)[a],v={initial:{opacity:0,transform:"scale(0.75)"},animate:{transform:"scale(1)",opacity:1},exit:{opacity:0,transform:"scale(0.75)"}},b={initial:{opacity:0},animate:{opacity:1},exit:{opacity:0}},F=(e,t)=>({"top-end":{default:{top:t,right:e},variants:{...v}},"top-start":{default:{top:t,left:e},variants:{...v}},"top-center":{default:{top:t,left:"50%",transform:"translateX(-50%)"},variants:{...v}},"bottom-end":{default:{bottom:t,right:e},variants:{...v}},"bottom-start":{default:{bottom:t,left:e},variants:{...v}},"bottom-center":{default:{bottom:t,left:"50%",transform:"translateX(-50%)"},variants:{...v}}}),G=(e,t)=>({"top-end":{default:{top:t,right:e},variants:{...b}},"top-start":{default:{top:t,left:e},variants:{...b}},"top-center":{default:{top:t,left:"50%",transform:"translateX(-50%)"},variants:{...b}},"bottom-end":{default:{bottom:t,right:e},variants:{...b}},"bottom-start":{default:{bottom:t,left:e},variants:{...b}},"bottom-center":{default:{bottom:t,left:"50%",transform:"translateX(-50%)"},variants:{...b}}}),O=e=>{const[t,a]=o.useState([]),n=o.useCallback(r=>(typeof r>"u"&&t.length&&(r=t[t.length-1].key),r),[t]),i=o.useCallback(r=>{const s=e||"_"+Math.random().toString(36).substr(2,12);return a([...t,{key:s,visible:!0,node:r}]),s},[t,e]),l=o.useCallback(()=>{a(t.map(r=>({...r,visible:!1}))),setTimeout(()=>{a([])},50)},[t]),d=o.useCallback(r=>{a(t.map(s=>(s.key===n(r)&&(s.visible=!1),s))),setTimeout(()=>{a(t.filter(s=>s.visible))},50)},[t,n]);return{messages:t,push:i,removeAll:l,remove:d}},T=o.forwardRef((e,t)=>{const a=o.useRef(null),{transitionType:n="scale",placement:i=A.TOP_END,offsetX:l=30,offsetY:d=30,messageKey:r,block:s=!1,callback:p,...m}=e,{push:h,removeAll:E,remove:x,messages:j}=O(r);o.useImperativeHandle(t,()=>({root:a.current,push:h,removeAll:E,remove:x}));const f=_({offsetX:l,offsetY:d,placement:i,transitionType:n}),w={triggerByToast:!0,...m},k=j.map(u=>{var N,z,B,P;return c.jsx(L.div,{className:"toast-wrapper",initial:f.variants.initial,variants:f.variants,animate:u.visible?"animate":"exit",transition:{duration:.15,type:"tween"},children:o.cloneElement(u.node,{...w,ref:t,onClose:D((z=(N=u.node)==null?void 0:N.props)==null?void 0:z.onClose,()=>x(u.key)),className:y((P=(B=u.node)==null?void 0:B.props)==null?void 0:P.className)})},u.key)});return c.jsx("div",{style:f.default,...m,ref:u=>{a.current=u,p==null||p(u)},className:y("toast",s&&"w-full"),children:k})});T.getInstance=e=>{const{wrapper:t,...a}=e,n=o.createRef(),i=(typeof t=="function"?t():t)||document.body;return new Promise(l=>{const d=()=>{l([n,s])};function r(p){const m=document.createElement("div");i.appendChild(m);const h=I(m);return h.render(p),h}const{unmount:s}=r(c.jsx(T,{...a,ref:n,callback:d}))})};T.displayName="ToastWrapper";const K={placement:A.TOP_END,offsetX:30,offsetY:30,transitionType:"scale",block:!1},H="default",g=new Map;function q(e){if(/\top\b/.test(e))return"top-full";if(/\bottom\b/.test(e))return"bottom-full"}async function J(e,t){const[a]=await T.getInstance(t);return g.set(e||H,a),a}function Q(e){return g.size===0?null:g.get(e||H)}const M=e=>M.push(e);M.push=(e,t=K)=>{let a=t.placement;t.block&&(a=q(t.placement));const n=Q(a);return n!=null&&n.current?n.current.push(e):J(a??"",t).then(i=>{var l;return(l=i.current)==null?void 0:l.push(e)})};M.remove=e=>{g.forEach(t=>{t.current.remove(e)})};M.removeAll=()=>{g.forEach(e=>e.current.removeAll())};function Y(e){return C({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"},child:[]}]})(e)}function tt(e){return C({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M18 6h2v12h-2zM4 13h8.586l-4.293 4.293 1.414 1.414L16.414 12 9.707 5.293 8.293 6.707 12.586 11H4z"},child:[]}]})(e)}function et(e){return C({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M9.715 12c1.151 0 2-.849 2-2s-.849-2-2-2-2 .849-2 2 .848 2 2 2z"},child:[]},{tag:"path",attr:{d:"M20 4H4c-1.103 0-2 .841-2 1.875v12.25C2 19.159 2.897 20 4 20h16c1.103 0 2-.841 2-1.875V5.875C22 4.841 21.103 4 20 4zm0 14-16-.011V6l16 .011V18z"},child:[]},{tag:"path",attr:{d:"M14 9h4v2h-4zm1 4h3v2h-3zm-1.57 2.536c0-1.374-1.676-2.786-3.715-2.786S6 14.162 6 15.536V16h7.43v-.464z"},child:[]}]})(e)}function at(e){return C({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"},child:[]}]})(e)}export{at as B,W as N,et as a,Y as b,tt as c,M as t};
