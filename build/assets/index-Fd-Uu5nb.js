import{l as U,W as E,r as F,J as q,X as L,Y as R,j as e,u as T}from"./index-DiD8XqQv.js";import{L as _}from"./Logo-BYR5iY82.js";import{u as W,A as $,a as z}from"./useTimeOutMessage-Cppm1uH9.js";import{z as m,u as J,F as O,a as f,C as h,I as x,t as X}from"./index-KZQEv5Oq.js";import{B as Y}from"./StatusIcon-CokTakxq.js";import"./proxy-Dvkuq-Bo.js";import"./isNil-B5OJRuHX.js";const G=m.object({email:m.string({required_error:"Please enter your email"}),password:m.string({required_error:"Password Required"}),confirmPassword:m.string({required_error:"Confirm Password Required"})}).refine(n=>n.password===n.confirmPassword,{message:"Password not match",path:["confirmPassword"]}),H=n=>{var j,S,b;const{disableSubmit:c=!1,className:t,setMessage:s}=n,d=U(o=>o.setUser),u=U(o=>o.setSessionSignedIn),{token:Q,setToken:v}=E(),[g,w]=F.useState(!1),{signUp:y,signIn:C}=q(),{handleSubmit:N,formState:{errors:i},control:p}=J({resolver:X(G)}),A=L(),k=R(),I=new URLSearchParams(k.search).get("redirectUrl")||"/",B=async o=>{const{username:Z,password:P,email:l}=o;if(!c){w(!0);try{const a=await y({username:l,password:P,email:""});if((a==null?void 0:a.status)==="failed")throw new Error("Username Already Exist");{u(!1),v("");const r=await C({username:l,password:P});if((r==null?void 0:r.status)==="failed")throw new Error(r.message);d({email:l,userName:l.split("@")[0]}),A(I)}}catch(a){if(console.log("its in error",a.response),s==null||s("test"),a.response){const r=a.response.data;console.log(r),r!=null&&r.username?s==null||s(`Username: ${r.username[0]}`):r!=null&&r.email?s==null||s(`Email: ${r.email[0]}`):s==null||s("An unknown error occurred.")}else s==null||s(a.message||"An unknown error occurred.")}finally{w(!1)}}};return e.jsx("div",{className:t,children:e.jsxs(O,{onSubmit:N(B),children:[e.jsx(f,{label:"Username",invalid:!!i.email,errorMessage:(j=i.email)==null?void 0:j.message,children:e.jsx(h,{name:"email",control:p,render:({field:o})=>e.jsx(x,{type:"text",placeholder:"Username",autoComplete:"off",...o})})}),e.jsx(f,{label:"Password",invalid:!!i.password,errorMessage:(S=i.password)==null?void 0:S.message,children:e.jsx(h,{name:"password",control:p,render:({field:o})=>e.jsx(x,{type:"password",autoComplete:"off",placeholder:"Password",...o})})}),e.jsx(f,{label:"Confirm Password",invalid:!!i.confirmPassword,errorMessage:(b=i.confirmPassword)==null?void 0:b.message,children:e.jsx(h,{name:"confirmPassword",control:p,render:({field:o})=>e.jsx(x,{type:"password",autoComplete:"off",placeholder:"Confirm Password",...o})})}),e.jsx(Y,{block:!0,loading:g,variant:"solid",type:"submit",children:g?"Creating Account...":"Sign Up"})]})})},K=({signInUrl:n="/sign-in",disableSubmit:c})=>{const[t,s]=W(),d=T(u=>u.mode);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-8",children:e.jsx(_,{type:"streamline",mode:d,imgClass:"mx-auto",logoWidth:60})}),e.jsx("div",{className:"mb-8",children:e.jsx("h3",{className:"mb-1",children:"Sign Up"})}),t&&e.jsx($,{showIcon:!0,className:"mb-4",type:"danger",children:e.jsx("span",{className:"break-all",children:t})}),e.jsx(H,{disableSubmit:c,setMessage:s}),e.jsx("div",{children:e.jsxs("div",{className:"mt-6 text-center",children:[e.jsx("span",{children:"Already have an account? "}),e.jsx(z,{to:n,className:"heading-text font-bold",themeColor:!1,children:"Sign in"})]})})]})},ne=()=>e.jsx(K,{});export{K as SignUpBase,ne as default};