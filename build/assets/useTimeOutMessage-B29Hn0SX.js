import{r as m,w as C,j as e,e as A,b as E}from"./index-C2MQeYDI.js";import{i as v,S as P,C as D,j as H,k as I,l as M,m as R}from"./StatusIcon-CTJ_Z1LV.js";import{m as S}from"./proxy-lOeUX53v.js";const h="warning",Y={success:{backgroundColor:"bg-success-subtle",titleColor:"text-success",textColor:"text-success",iconColor:"text-success",icon:e.jsx(H,{})},info:{backgroundColor:"bg-info-subtle",titleColor:"text-info",textColor:"text-info",iconColor:"text-info",icon:e.jsx(I,{})},warning:{backgroundColor:"bg-warning-subtle",titleColor:"text-warning",textColor:"text-warning",iconColor:"text-warning",icon:e.jsx(M,{})},danger:{backgroundColor:"bg-error-subtle",titleColor:"text-error",textColor:"text-error",iconColor:"text-error",icon:e.jsx(R,{})}},L=["success","danger","info","warning"],_=m.forwardRef((r,s)=>{const{children:o,className:a,closable:n=!1,customClose:x,customIcon:d,duration:l=3e3,title:t=null,onClose:c,showIcon:j=!1,triggerByToast:g=!1,...y}=r,f=(()=>{const{type:i=h}=r;return L.includes(i)?i:h})(),u=Y[f],[p,b]=m.useState("show"),{clear:w}=v(c,l,l>0),N=i=>{b("hiding"),c==null||c(i),w(),g||setTimeout(()=>{b("hide")},400)},T=()=>e.jsx("div",{className:"cursor-pointer",role:"presentation",onClick:i=>N(i),children:x||e.jsx(D,{resetDefaultClass:!0,className:"text-lg outline-none"})}),k=C("alert",u.backgroundColor,u.textColor,t?"":"font-semibold",n?"justify-between":"",n&&!t?"items-center":"",!g&&"rounded-xl",a);return p==="hide"?null:e.jsxs(S.div,{ref:s,className:k,initial:{opacity:1},animate:p==="hiding"?"exit":"animate",transition:{duration:.25,type:"tween"},variants:{animate:{opacity:1},exit:{opacity:0}},...y,children:[e.jsxs("div",{className:C("flex gap-2",!t&&o&&"items-center",t&&o&&"mt-0.5"),children:[j&&e.jsx(P,{iconColor:u.iconColor,custom:d,type:f}),e.jsxs("div",{children:[t?e.jsx("div",{className:C("font-semibold text-lg mb-1",u.titleColor),children:t}):null,o]})]}),n?T():null]})});_.displayName="Alert";const X=r=>{const{children:s,className:o,themeColor:a=!0,to:n,reloadDocument:x,href:d="",...l}=r,t={className:A(a&&"text-primary","hover:underline",o)};return n?e.jsx(E,{to:n,reloadDocument:x,...t,...l,children:s}):e.jsx("a",{href:d,...t,...l,children:s})};function $(r=3e3){const[s,o]=m.useState("");return m.useEffect(()=>{if(s){const a=setTimeout(()=>o(""),r);return()=>{clearTimeout(a)}}},[s]),[s,o]}export{_ as A,X as a,$ as u};