import{r as b,y as r,j as e}from"./index-DKOm2JUA.js";import{m as O,s as S,t as E,r as B,v as H}from"./index-k8T4JNHi.js";import{M as D,A as m}from"./index-Dh9c5PxJ.js";import{B as C}from"./Button-Bv2-jwyq.js";import{C as A}from"./CloseButton-CVkVNcHm.js";function M(){const[s,a]=b.useState({width:void 0,height:void 0});return b.useEffect(()=>{function t(){a({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",t),t(),()=>window.removeEventListener("resize",t)},[]),s}const j=s=>{const a=M(),{bodyOpenClassName:t,children:x,className:l,closable:n=!0,closeTimeoutMS:h=150,contentClassName:u,height:o,isOpen:c,onClose:i,overlayClassName:p,portalClassName:f,style:N,width:g=520,...v}=s,w=z=>{i==null||i(z)},y=e.jsx(A,{absolute:!0,className:"ltr:right-6 rtl:left-6 top-4.5",onClick:w}),d={content:{inset:"unset"},...N};g!==void 0&&(d.content.width=g,typeof a.width<"u"&&a.width<=g&&(d.content.width="auto")),o!==void 0&&(d.content.height=o);const k=r("dialog-content",u);return e.jsx(D,{className:{base:r("dialog",l),afterOpen:"dialog-after-open",beforeClose:"dialog-before-close"},overlayClassName:{base:r("dialog-overlay",p),afterOpen:"dialog-overlay-after-open",beforeClose:"dialog-overlay-before-close"},portalClassName:r("dialog-portal",f),bodyOpenClassName:r("dialog-open",t),ariaHideApp:!1,isOpen:c,style:{...d},closeTimeoutMS:h,...v,children:e.jsxs(O.div,{className:k,initial:{transform:"scale(0.9)"},animate:{transform:c?"scale(1)":"scale(0.9)"},children:[n&&y,x]})})};j.displayName="Dialog";const T=({status:s})=>{switch(s){case"info":return e.jsx(m,{className:"bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100",shape:"circle",children:e.jsx("span",{className:"text-2xl",children:e.jsx(H,{})})});case"success":return e.jsx(m,{className:"bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100",shape:"circle",children:e.jsx("span",{className:"text-2xl",children:e.jsx(B,{})})});case"warning":return e.jsx(m,{className:"text-amber-600 bg-amber-100 dark:text-amber-100",shape:"circle",children:e.jsx("span",{className:"text-2xl",children:e.jsx(E,{})})});case"danger":return e.jsx(m,{className:"text-red-600 bg-red-100 dark:text-red-100",shape:"circle",children:e.jsx("span",{className:"text-2xl",children:e.jsx(S,{})})});default:return null}},F=s=>{const{type:a="info",title:t,children:x,onCancel:l,onConfirm:n,cancelText:h="Cancel",confirmText:u="Confirm",confirmButtonProps:o,cancelButtonProps:c,...i}=s,p=()=>{l==null||l()},f=()=>{n==null||n()};return e.jsxs(j,{contentClassName:"pb-0 px-0",...i,children:[e.jsxs("div",{className:"px-6 pb-6 pt-2 flex",children:[e.jsx("div",{children:e.jsx(T,{status:a})}),e.jsxs("div",{className:"ml-4 rtl:mr-4",children:[e.jsx("h5",{className:"mb-2",children:t}),x]})]}),e.jsx("div",{className:"px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-2xl rounded-br-2xl",children:e.jsxs("div",{className:"flex justify-end items-center gap-2",children:[e.jsx(C,{size:"sm",onClick:p,...c,children:h}),e.jsx(C,{size:"sm",variant:"solid",onClick:f,...o,children:u})]})})]})};export{F as C};
