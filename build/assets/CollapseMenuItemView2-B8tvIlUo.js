import{r as p,U as m,j as s,A as u}from"./index-D7gsvq0q.js";import{B as g}from"./Button-Bf2oe3_B.js";import{d as w}from"./index-DoY1wmVf.js";import"./classNames-X1KmuX5b.js";const D=()=>{const[i,r]=p.useState(!1),c=m(),l=async()=>{var a,n;const d=new Date().toISOString().split("T").join("_").split(".").join("_");try{r(!0);const e=await u.get("/pmc/report/",{responseType:"blob"}),t=window.URL.createObjectURL(new Blob([e.data])),o=document.createElement("a");o.href=t,o.setAttribute("download",`report_${d}.xlsx`),document.body.appendChild(o),o.click(),window.URL.revokeObjectURL(t),r(!1)}catch(e){console.error("Error downloading report:",e);const t={status:(a=e.response)==null?void 0:a.status,data:(n=e.response)==null?void 0:n.data,message:e.message};c("/error",{state:{error:t}}),r(!1)}};return s.jsx("div",{className:"grid md:grid-cols-4 gap-4",children:s.jsx(g,{icon:s.jsx(w,{}),className:"ltr:mr-3 rtl:ml-3",variant:"solid",type:"button",loading:i,onClick:l,children:"Download Excel Report-1"})})};export{D as default};
