import{k as P,Y as B,r as F,I as q,U as L,Z as T,j as e,u as R}from"./index-Cw8nRmZO.js";import{L as _}from"./Logo-pOYar6gn.js";import{u as $,A as z}from"./useTimeOutMessage-BMyvljs_.js";import{I as f}from"./Input-DuprZGfq.js";import{B as O}from"./Button-CfeoYdX-.js";import{u as W,F as Y,a as h,C as g}from"./index.esm-CkeEdEOe.js";import{z as l,t as Z}from"./index-CtqECTZc.js";import{A as G}from"./ActionLink-X48b7K6h.js";import"./StatusIcon-Bvu-DyUd.js";import"./CloseButton-C6zUhPqL.js";import"./classNames-CDcQePYC.js";import"./index-CaOsPfco.js";const H=l.object({email:l.string({required_error:"Please enter your email"}),password:l.string({required_error:"Password Required"}),confirmPassword:l.string({required_error:"Confirm Password Required"})}).refine(n=>n.password===n.confirmPassword,{message:"Password not match",path:["confirmPassword"]}),J=n=>{var j,S,b;const{disableSubmit:c=!1,className:t,setMessage:s}=n,d=P(o=>o.setUser),p=P(o=>o.setSessionSignedIn),{token:Q,setToken:v}=B(),[x,w]=F.useState(!1),{signUp:y,signIn:C}=q(),{handleSubmit:k,formState:{errors:i},control:u}=W({resolver:Z(H)}),A=L(),N=T(),E=new URLSearchParams(N.search).get("redirectUrl")||"/",I=async o=>{const{username:X,password:U,email:m}=o;if(!c){w(!0);try{const a=await y({username:m,password:U,email:""});if(console.log(a),(a==null?void 0:a.status)==="failed")throw a.message.includes("400")?new Error("Username Already Exist"):new Error("Technical Error! please try again after sometime or email at fdm@epd.punjab.gov.pk");{p(!1),v("");const r=await C({username:m,password:U});if((r==null?void 0:r.status)==="failed")throw new Error(r.message);d({email:m,userName:m.split("@")[0]}),A(E)}}catch(a){if(console.log("its in error",a.response),s==null||s("test"),a.response){const r=a.response.data;console.log(r),r!=null&&r.username?s==null||s(`Username: ${r.username[0]}`):r!=null&&r.email?s==null||s(`Email: ${r.email[0]}`):s==null||s("An unknown error occurred.")}else s==null||s(a.message||"An unknown error occurred.")}finally{w(!1)}}};return e.jsx("div",{className:t,children:e.jsxs(Y,{onSubmit:k(I),children:[e.jsx(h,{label:"Username",invalid:!!i.email,errorMessage:(j=i.email)==null?void 0:j.message,children:e.jsx(g,{name:"email",control:u,render:({field:o})=>e.jsx(f,{type:"text",placeholder:"Username",autoComplete:"off",...o})})}),e.jsx(h,{label:"Password",invalid:!!i.password,errorMessage:(S=i.password)==null?void 0:S.message,children:e.jsx(g,{name:"password",control:u,render:({field:o})=>e.jsx(f,{type:"password",autoComplete:"off",placeholder:"Password",...o})})}),e.jsx(h,{label:"Confirm Password",invalid:!!i.confirmPassword,errorMessage:(b=i.confirmPassword)==null?void 0:b.message,children:e.jsx(g,{name:"confirmPassword",control:u,render:({field:o})=>e.jsx(f,{type:"password",autoComplete:"off",placeholder:"Confirm Password",...o})})}),e.jsx(O,{block:!0,loading:x,variant:"solid",type:"submit",children:x?"Creating Account...":"Sign Up"})]})})},K=({signInUrl:n="/sign-in",disableSubmit:c})=>{const[t,s]=$(),d=R(p=>p.mode);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-8",children:e.jsx(_,{type:"streamline",mode:d,imgClass:"mx-auto",logoWidth:60})}),e.jsx("div",{className:"mb-8",children:e.jsx("h3",{className:"mb-1",children:"Sign Up"})}),t&&e.jsx(z,{showIcon:!0,className:"mb-4",type:"danger",children:e.jsx("span",{className:"break-all",children:t})}),e.jsx(J,{disableSubmit:c,setMessage:s}),e.jsx("div",{children:e.jsxs("div",{className:"mt-6 text-center",children:[e.jsx("span",{children:"Already have an account? "}),e.jsx(G,{to:n,className:"heading-text font-bold",themeColor:!1,children:"Sign in"})]})})]})},ce=()=>e.jsx(K,{});export{K as SignUpBase,ce as default};
