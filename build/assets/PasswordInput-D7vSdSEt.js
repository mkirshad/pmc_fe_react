import{r as o,j as s}from"./index-QAdcP4cp.js";import{I as l}from"./index-DC9tAuDg.js";import{k as c,l as d}from"./StatusIcon-CHeBsTFi.js";const f=o.forwardRef((p,a)=>{const{onVisibleChange:t,...n}=p,[e,u]=o.useState("password"),i=x=>{x.preventDefault();const r=e==="password"?"text":"password";u(r),t==null||t(r==="text")};return s.jsx(l,{...n,ref:a,type:e,suffix:s.jsx("span",{className:"cursor-pointer select-none text-xl",role:"button",onClick:i,children:e==="password"?s.jsx(c,{}):s.jsx(d,{})})})});f.displayName="PasswordInput";export{f as P};
