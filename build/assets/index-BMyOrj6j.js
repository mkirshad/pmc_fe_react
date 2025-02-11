import{W as I,r as l,j as e,b as n,A}from"./index-D7gsvq0q.js";import{C as D}from"./ConfirmDialog-CNKjZ6md.js";import{I as w}from"./Input-BTawwoPM.js";import{m as j}from"./CloseButton-CG_7audC.js";import{D as L}from"./Divider-DUO2S8PJ.js";import"./index-BsV2fCke.js";import"./index-GeG-ga1p.js";import"./index-DoY1wmVf.js";import"./index-SItUOnqi.js";import"./Button-Bf2oe3_B.js";import"./classNames-X1KmuX5b.js";import"./DefaultPropsProvider-BP7L4F6z.js";const H=()=>{const[v]=I(),y=v.get("super"),[b,u]=l.useState(!1),[k,c]=l.useState("info"),[m,f]=l.useState(""),[s,t]=l.useState(null),p=()=>{u(!1)},P=async()=>{try{const a=await A.get("/pmc/track-application/",{headers:{"Content-Type":"application/json"},params:{tracking_number:m}});t(a.data.message),c("success")}catch(a){console.error("Error fetching user groups:",a),t(a.response.data.message),c("danger")}},N=a=>{a.key==="Backspace"&&f(x(m,!0))},x=(a,d)=>{let g=a.replace(/[^a-zA-Z0-9]/g,""),i=g.slice(0,3).toUpperCase().replace(/[^A-Z]/g,""),r=g.slice(3,6).toUpperCase().replace(/[^A-Z]/g,""),h=g.slice(6).replace(/[^0-9]/g,"");if(d)return[i,r,h].filter(Boolean).join("-");let o="";return i&&(o+=i+(i.length===3?"-":"")),r&&(o+=r+(r.length===3?"-":"")),h&&(o+=h),o},C={hidden:{opacity:0},visible:{opacity:1,transition:{duration:1}}},S={hidden:{x:-100,opacity:0},visible:{x:0,opacity:1,transition:{duration:1}}},T=["Plastic shopping/carry bags (having thickness less than 75 micron)","Disposal Food Boxes made from polystyrene (Styrofoam)","Cutlery such as Forks, Spoons, Knives, Straw, Trays, Stirrers, etc.","Candy sticks","Ice-cream sticks","Cigarette Packets","Plates","Plastic or PVC banners less than 80 microns","Wrapping or Packing Films around sweet boxes","Plastic sticks for balloons","Disposable Cups & Glasses made from polystyrene (Styrofoam)","Plastic flags","Invitation Cards","Ear buds with plastic sticks"];return e.jsxs(j.div,{className:"banner-container",variants:C,initial:"hidden",animate:"visible",children:[e.jsxs("header",{className:"banner-header",children:[e.jsxs("div",{className:"logo-section",children:[e.jsx("img",{src:"/img/logo/epa_logo-removebg-preview.png",alt:"GOP Logo",className:"header-logo"}),e.jsx("img",{src:"/img/logo/epccd.png",alt:"EPCCD Logo",className:"header-logo"}),e.jsx("img",{src:"/img/logo/gop.png",alt:"GOP Logo",className:"header-logo"}),e.jsx("span",{className:"header-text",children:"PLMIS"})]}),e.jsx("nav",{className:"banner-nav",children:e.jsx(n,{to:"/sign-in",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",children:"Login"})})]}),e.jsxs("div",{className:"banner-content",children:[e.jsx(j.div,{className:"banner-text",variants:S,children:e.jsx("h1",{children:"Plastic License Management Information System"})}),e.jsxs("div",{className:"banner-links",children:[e.jsx(n,{to:"/sign-up?redirectUrl=/spuid-signup",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",children:"Apply New License"}),e.jsx(n,{to:"/sign-in",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",children:"My Applications"}),e.jsx(n,{onClick:()=>{u(!0),t(null),c("info")},to:"",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",children:"Track Application"}),y&&e.jsxs(e.Fragment,{children:[e.jsx(n,{to:"/mis/directory",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",children:"Management Information System - Public Directory"}),e.jsx(n,{to:"/mis/recycling-efficiency",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",children:"Management Information System - Recycling Efficiency"})]})]}),e.jsxs(D,{isOpen:b,title:"Track Application",type:k,onClose:p,onRequestClose:p,onConfirm:()=>{s?t(null):P()},onCancel:p,confirmText:s?"Back":"Track",children:[s,!s&&e.jsxs("p",{children:[e.jsx("p",{className:"mb-1",children:e.jsx("strong",{children:"Tracking Number*"})}),e.jsx(w,{value:m,onChange:a=>f(x(a.target.value,!1)),placeholder:"e.g., LHR-PRO-001",onKeyDown:N,className:"mb-2 mr-0",title:"Tracking Number (e.g., LHR-PRO-001)"})]})]}),e.jsxs("div",{className:"banned-items mb-4",children:[e.jsx("h5",{className:"mb-4",children:"Banned Single-Use Plastic Products under the Punjab Environmental Protection (Production and Consumption of Single-Use Plastic Product) Regulations 2023"}),e.jsx("ul",{className:"banned-items-list",children:T.map((a,d)=>e.jsx("li",{className:"banned-item",children:a},d))})]}),e.jsxs("span",{children:["In case of any violation found any where, please report at ",e.jsxs("a",{style:{fontSize:20},href:"tel:1374",children:[" ",e.jsx("b",{children:"1373"})," "]})]})]}),e.jsx("div",{className:"mb-0",children:e.jsx(L,{textAlign:"left"})}),e.jsx("footer",{className:"footer-container",children:e.jsxs("span",{className:"footer-text",children:["Copyright © ",new Date().getFullYear()," ",e.jsx("span",{className:"font-semibold",children:"PLMIS"})," All rights reserved. ",e.jsx("br",{}),"Plastic Management Cell, Strategic Planning & Implementation Unit, Environmental Protection Agency, and Environment Protection & Climate Change Department, Government of the Punjab."]})})]})};export{H as default};
