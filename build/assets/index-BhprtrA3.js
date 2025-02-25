import{l as U,a0 as B,r as F,M as L,X as q,a1 as T,j as e,u as R,d as _}from"./index-BpibLfSS.js";import{L as $}from"./Logo-CEr8gnbG.js";import{u as z,A as O}from"./useTimeOutMessage-GtfwFJHF.js";import{I as f}from"./Input-BzqZNHrr.js";import{B as W}from"./Button-CMIx6MKU.js";import{u as X,F as G,a as h,C as g}from"./index.esm-BWSz0REy.js";import{t as H,z as l}from"./index-CbV-XaaB.js";import{A as J}from"./ActionLink-DW1qX3R4.js";import"./StatusIcon-BywxNhbz.js";import"./isNil-CfXfv7ym.js";import"./CloseButton-CyIxyaxs.js";import"./classNames-MTSZ6j9J.js";import"./index-OMSZjHhd.js";const K=l.object({email:l.string({required_error:"Please enter your email"}),password:l.string({required_error:"Password Required"}),confirmPassword:l.string({required_error:"Confirm Password Required"})}).refine(n=>n.password===n.confirmPassword,{message:"Password not match",path:["confirmPassword"]}),Q=n=>{var j,S,b;const{disableSubmit:c=!1,className:t,setMessage:s}=n,d=U(o=>o.setUser),p=U(o=>o.setSessionSignedIn),{setToken:v}=B(),[x,w]=F.useState(!1),{signUp:y,signIn:C}=L(),{handleSubmit:A,formState:{errors:i},control:u}=X({resolver:H(K)}),N=q(),k=T(),E=new URLSearchParams(k.search).get("redirectUrl")||"/",I=async o=>{const{username:Z,password:P,email:m}=o;if(!c){w(!0);try{const a=await y({username:m,password:P,email:""});if(console.log(a),(a==null?void 0:a.status)==="failed")throw a.message.includes("400")?new Error("Username Already Exist"):new Error("Technical Error! please try again after sometime or email at fdm@epd.punjab.gov.pk");{p(!1),v("");const r=await C({username:m,password:P});if((r==null?void 0:r.status)==="failed")throw new Error(r.message);d({email:m,userName:m.split("@")[0]}),N(E)}}catch(a){if(console.log("its in error",a.response),s==null||s("test"),a.response){const r=a.response.data;console.log(r),r!=null&&r.username?s==null||s(`Username: ${r.username[0]}`):r!=null&&r.email?s==null||s(`Email: ${r.email[0]}`):s==null||s("An unknown error occurred.")}else s==null||s(a.message||"An unknown error occurred.")}finally{w(!1)}}};return e.jsx("div",{className:t,children:e.jsxs(G,{onSubmit:A(I),children:[e.jsx(h,{label:"Username",invalid:!!i.email,errorMessage:(j=i.email)==null?void 0:j.message,children:e.jsx(g,{name:"email",control:u,render:({field:o})=>e.jsx(f,{type:"text",placeholder:"Username",autoComplete:"off",...o})})}),e.jsx(h,{label:"Password",invalid:!!i.password,errorMessage:(S=i.password)==null?void 0:S.message,children:e.jsx(g,{name:"password",control:u,render:({field:o})=>e.jsx(f,{type:"password",autoComplete:"off",placeholder:"Password",...o})})}),e.jsx(h,{label:"Confirm Password",invalid:!!i.confirmPassword,errorMessage:(b=i.confirmPassword)==null?void 0:b.message,children:e.jsx(g,{name:"confirmPassword",control:u,render:({field:o})=>e.jsx(f,{type:"password",autoComplete:"off",placeholder:"Confirm Password",...o})})}),e.jsx(W,{block:!0,loading:x,variant:"solid",type:"submit",children:x?"Creating Account...":"Sign Up"})]})})},V=({signInUrl:n="/sign-in",disableSubmit:c})=>{const[t,s]=z(),d=R(p=>p.mode);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-8",children:e.jsx(_,{to:"/",children:e.jsx($,{type:"streamline",mode:d,imgClass:"mx-auto",logoWidth:60})})}),e.jsx("div",{className:"mb-8",children:e.jsx("h3",{className:"mb-1",children:"Sign Up"})}),t&&e.jsx(O,{showIcon:!0,className:"mb-4",type:"danger",children:e.jsx("span",{className:"break-all",children:t})}),e.jsx(Q,{disableSubmit:c,setMessage:s}),e.jsx("div",{children:e.jsxs("div",{className:"mt-6 text-center",children:[e.jsx("span",{children:"Already have an account? "}),e.jsx(J,{to:n,className:"heading-text font-bold",themeColor:!1,children:"Sign in"})]})})]})},de=()=>e.jsx(V,{});export{V as SignUpBase,de as default};
