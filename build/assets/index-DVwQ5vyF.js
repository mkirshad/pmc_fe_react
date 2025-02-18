import{k as U,$ as B,r as F,K as q,W as L,a0 as T,j as e,u as R}from"./index-D40LjRLE.js";import{L as _}from"./Logo-BZr_xt8E.js";import{u as $,A as W}from"./useTimeOutMessage-CnsYEeAR.js";import{I as f}from"./Input-BNXuiHYO.js";import{B as z}from"./Button-By-S1Vlk.js";import{u as K,F as O,a as h,C as g}from"./index.esm-5ysFaYhW.js";import{t as G,z as l}from"./index-CREW9Djk.js";import{A as H}from"./ActionLink-Cf0Ausm1.js";import"./StatusIcon-AJyt3swE.js";import"./CloseButton-DtojJIyi.js";import"./classNames-CGiWioDA.js";import"./index-ppIqjPtC.js";const J=l.object({email:l.string({required_error:"Please enter your email"}),password:l.string({required_error:"Password Required"}),confirmPassword:l.string({required_error:"Confirm Password Required"})}).refine(n=>n.password===n.confirmPassword,{message:"Password not match",path:["confirmPassword"]}),Q=n=>{var j,S,b;const{disableSubmit:c=!1,className:t,setMessage:s}=n,d=U(o=>o.setUser),p=U(o=>o.setSessionSignedIn),{setToken:v}=B(),[x,w]=F.useState(!1),{signUp:y,signIn:C}=q(),{handleSubmit:A,formState:{errors:i},control:u}=K({resolver:G(J)}),N=L(),k=T(),E=new URLSearchParams(k.search).get("redirectUrl")||"/",I=async o=>{const{username:Y,password:P,email:m}=o;if(!c){w(!0);try{const a=await y({username:m,password:P,email:""});if(console.log(a),(a==null?void 0:a.status)==="failed")throw a.message.includes("400")?new Error("Username Already Exist"):new Error("Technical Error! please try again after sometime or email at fdm@epd.punjab.gov.pk");{p(!1),v("");const r=await C({username:m,password:P});if((r==null?void 0:r.status)==="failed")throw new Error(r.message);d({email:m,userName:m.split("@")[0]}),N(E)}}catch(a){if(console.log("its in error",a.response),s==null||s("test"),a.response){const r=a.response.data;console.log(r),r!=null&&r.username?s==null||s(`Username: ${r.username[0]}`):r!=null&&r.email?s==null||s(`Email: ${r.email[0]}`):s==null||s("An unknown error occurred.")}else s==null||s(a.message||"An unknown error occurred.")}finally{w(!1)}}};return e.jsx("div",{className:t,children:e.jsxs(O,{onSubmit:A(I),children:[e.jsx(h,{label:"Username",invalid:!!i.email,errorMessage:(j=i.email)==null?void 0:j.message,children:e.jsx(g,{name:"email",control:u,render:({field:o})=>e.jsx(f,{type:"text",placeholder:"Username",autoComplete:"off",...o})})}),e.jsx(h,{label:"Password",invalid:!!i.password,errorMessage:(S=i.password)==null?void 0:S.message,children:e.jsx(g,{name:"password",control:u,render:({field:o})=>e.jsx(f,{type:"password",autoComplete:"off",placeholder:"Password",...o})})}),e.jsx(h,{label:"Confirm Password",invalid:!!i.confirmPassword,errorMessage:(b=i.confirmPassword)==null?void 0:b.message,children:e.jsx(g,{name:"confirmPassword",control:u,render:({field:o})=>e.jsx(f,{type:"password",autoComplete:"off",placeholder:"Confirm Password",...o})})}),e.jsx(z,{block:!0,loading:x,variant:"solid",type:"submit",children:x?"Creating Account...":"Sign Up"})]})})},V=({signInUrl:n="/sign-in",disableSubmit:c})=>{const[t,s]=$(),d=R(p=>p.mode);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-8",children:e.jsx(_,{type:"streamline",mode:d,imgClass:"mx-auto",logoWidth:60})}),e.jsx("div",{className:"mb-8",children:e.jsx("h3",{className:"mb-1",children:"Sign Up"})}),t&&e.jsx(W,{showIcon:!0,className:"mb-4",type:"danger",children:e.jsx("span",{className:"break-all",children:t})}),e.jsx(Q,{disableSubmit:c,setMessage:s}),e.jsx("div",{children:e.jsxs("div",{className:"mt-6 text-center",children:[e.jsx("span",{children:"Already have an account? "}),e.jsx(H,{to:n,className:"heading-text font-bold",themeColor:!1,children:"Sign in"})]})})]})},le=()=>e.jsx(V,{});export{V as SignUpBase,le as default};
