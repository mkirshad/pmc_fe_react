import{r as o,j as e,b as l,A as S}from"./index-BCEPj786.js";import{C as T}from"./ConfirmDialog-DRdn-jfV.js";import{I as A}from"./Input-HEka4LwQ.js";import{m as j}from"./CloseButton-D1eNlz-p.js";import{D as w}from"./Divider-DDCFAsC-.js";import"./index-D1x01Ynw.js";import"./index-ByjGOnJj.js";import"./index-QdZfqnxs.js";import"./index-CJd1dOfz.js";import"./Button-CB0_ZLYN.js";import"./classNames-0JEMEDmU.js";const G=()=>{const[b,u]=o.useState(!1),[v,c]=o.useState("info"),[m,x]=o.useState(""),[a,n]=o.useState(null),p=()=>{u(!1)},k=async()=>{try{const s=await S.get("/pmc/track-application/",{headers:{"Content-Type":"application/json"},params:{tracking_number:m}});n(s.data.message),c("success")}catch(s){console.error("Error fetching user groups:",s),n(s.response.data.message),c("danger")}},P=s=>{s.key==="Backspace"&&x(f(m,!0))},f=(s,d)=>{let g=s.replace(/[^a-zA-Z0-9]/g,""),t=g.slice(0,3).toUpperCase().replace(/[^A-Z]/g,""),i=g.slice(3,6).toUpperCase().replace(/[^A-Z]/g,""),h=g.slice(6).replace(/[^0-9]/g,"");if(d)return[t,i,h].filter(Boolean).join("-");let r="";return t&&(r+=t+(t.length===3?"-":"")),i&&(r+=i+(i.length===3?"-":"")),h&&(r+=h),r},y={hidden:{opacity:0},visible:{opacity:1,transition:{duration:1}}},N={hidden:{x:-100,opacity:0},visible:{x:0,opacity:1,transition:{duration:1}}},C=["Plastic shopping/carry bags (having thickness less than 75 micron)","Disposal Food Boxes made from polystyrene (Styrofoam)","Cutlery such as Forks, Spoons, Knives, Straw, Trays, Stirrers, etc.","Candy sticks","Ice-cream sticks","Cigarette Packets","Plates","Plastic or PVC banners less than 80 microns","Wrapping or Packing Films around sweet boxes","Plastic sticks for balloons","Disposable Cups & Glasses made from polystyrene (Styrofoam)","Plastic flags","Invitation Cards","Ear buds with plastic sticks"];return e.jsxs(j.div,{className:"banner-container",variants:y,initial:"hidden",animate:"visible",children:[e.jsxs("header",{className:"banner-header",children:[e.jsxs("div",{className:"logo-section",children:[e.jsx("img",{src:"/img/logo/epa_logo-removebg-preview.png",alt:"GOP Logo",className:"header-logo"}),e.jsx("img",{src:"/img/logo/epccd.png",alt:"EPCCD Logo",className:"header-logo"}),e.jsx("img",{src:"/img/logo/gop.png",alt:"GOP Logo",className:"header-logo"}),e.jsx("span",{className:"header-text",children:"PLMIS"})]}),e.jsx("nav",{className:"banner-nav",children:e.jsx(l,{to:"/sign-in",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",children:"Login"})})]}),e.jsxs("div",{className:"banner-content",children:[e.jsx(j.div,{className:"banner-text",variants:N,children:e.jsx("h1",{children:"Plastic License Management Information System"})}),e.jsxs("div",{className:"banner-links",children:[e.jsx(l,{to:"/sign-up?redirectUrl=/spuid-signup",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",children:"Apply New License"}),e.jsx(l,{to:"/sign-in",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",children:"My Applications"}),e.jsx(l,{onClick:()=>{u(!0),n(null),c("info")},to:"",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",children:"Track Application"})]}),e.jsxs(T,{isOpen:b,title:"Track Application",type:v,onClose:p,onRequestClose:p,onConfirm:()=>{a?n(null):k()},onCancel:p,confirmText:a?"Back":"Track",children:[a,!a&&e.jsxs("p",{children:[e.jsx("p",{className:"mb-1",children:e.jsx("strong",{children:"Tracking Number*"})}),e.jsx(A,{value:m,onChange:s=>x(f(s.target.value,!1)),placeholder:"e.g., LHR-PRO-001",onKeyDown:P,className:"mb-2 mr-0",title:"Tracking Number (e.g., LHR-PRO-001)"})]})]}),e.jsxs("div",{className:"banned-items mb-4",children:[e.jsx("h5",{className:"mb-4",children:"Banned Single-Use Plastic Products under the Punjab Environmental Protection (Production and Consumption of Single-Use Plastic Product) Regulations 2023"}),e.jsx("ul",{className:"banned-items-list",children:C.map((s,d)=>e.jsx("li",{className:"banned-item",children:s},d))})]}),e.jsxs("span",{children:["In case of any violation found any where, please report at ",e.jsxs("a",{style:{fontSize:20},href:"tel:1374",children:[" ",e.jsx("b",{children:"1373"})," "]})]})]}),e.jsx("div",{className:"mb-0",children:e.jsx(w,{textAlign:"left"})}),e.jsx("footer",{className:"footer-container",children:e.jsxs("span",{className:"footer-text",children:["Copyright © ",new Date().getFullYear()," ",e.jsx("span",{className:"font-semibold",children:"PLMIS"})," All rights reserved. ",e.jsx("br",{}),"Plastic Management Cell, Strategic Planning & Implementation Unit, Environmental Protection Agency, and Environment Protection & Climate Change Department, Government of the Punjab."]})})]})};export{G as default};
