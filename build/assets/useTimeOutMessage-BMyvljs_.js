import{r as a,y as x,j as t}from"./index-Cw8nRmZO.js";import{u as A,S as N}from"./StatusIcon-Bvu-DyUd.js";import{m as v,C as H,j as I,k as M,l as P,n as R}from"./CloseButton-C6zUhPqL.js";const p="warning",S={success:{backgroundColor:"bg-success-subtle",titleColor:"text-success",textColor:"text-success",iconColor:"text-success",icon:t.jsx(I,{})},info:{backgroundColor:"bg-info-subtle",titleColor:"text-info",textColor:"text-info",iconColor:"text-info",icon:t.jsx(M,{})},warning:{backgroundColor:"bg-warning-subtle",titleColor:"text-warning",textColor:"text-warning",iconColor:"text-warning",icon:t.jsx(P,{})},danger:{backgroundColor:"bg-error-subtle",titleColor:"text-error",textColor:"text-error",iconColor:"text-error",icon:t.jsx(R,{})}},Y=["success","danger","info","warning"],D=a.forwardRef((r,n)=>{const{children:e,className:c,closable:u=!1,customClose:b,customIcon:y,duration:m=3e3,title:o=null,onClose:i,showIcon:j=!1,triggerByToast:d=!1,...h}=r,C=(()=>{const{type:s=p}=r;return Y.includes(s)?s:p})(),l=S[C],[g,f]=a.useState("show"),{clear:w}=A(i,m,m>0),T=s=>{f("hiding"),i==null||i(s),w(),d||setTimeout(()=>{f("hide")},400)},k=()=>t.jsx("div",{className:"cursor-pointer",role:"presentation",onClick:s=>T(s),children:b||t.jsx(H,{resetDefaultClass:!0,className:"text-lg outline-none"})}),E=x("alert",l.backgroundColor,l.textColor,o?"":"font-semibold",u?"justify-between":"",u&&!o?"items-center":"",!d&&"rounded-xl",c);return g==="hide"?null:t.jsxs(v.div,{ref:n,className:E,initial:{opacity:1},animate:g==="hiding"?"exit":"animate",transition:{duration:.25,type:"tween"},variants:{animate:{opacity:1},exit:{opacity:0}},...h,children:[t.jsxs("div",{className:x("flex gap-2",!o&&e&&"items-center",o&&e&&"mt-0.5"),children:[j&&t.jsx(N,{iconColor:l.iconColor,custom:y,type:C}),t.jsxs("div",{children:[o?t.jsx("div",{className:x("font-semibold text-lg mb-1",l.titleColor),children:o}):null,e]})]}),u?k():null]})});D.displayName="Alert";function O(r=3e3){const[n,e]=a.useState("");return a.useEffect(()=>{if(n){const c=setTimeout(()=>e(""),r);return()=>{clearTimeout(c)}}},[n]),[n,e]}export{D as A,O as u};
