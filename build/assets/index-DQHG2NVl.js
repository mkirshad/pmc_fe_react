import{r as I,l as N,J as P,j as e,f as C,u as F}from"./index-DiD8XqQv.js";import{L as U}from"./Logo-BYR5iY82.js";import{u as k,A as B,a as A}from"./useTimeOutMessage-Cppm1uH9.js";import{z as u,u as q,F as L,a as f,C as b,I as M,t as E}from"./index-KZQEv5Oq.js";import{B as H}from"./StatusIcon-CokTakxq.js";import{P as T}from"./PasswordInput-Dibnc2Cc.js";import"./proxy-Dvkuq-Bo.js";import"./isNil-B5OJRuHX.js";const W=u.object({email:u.string({required_error:"Please enter your email"}).min(1,{message:"Please enter your email"}),password:u.string({required_error:"Please enter your password"}).min(1,{message:"Please enter your password"})}),_=n=>{var x,h,j;const[i,o]=I.useState(!1),t=N(s=>s.setUser),{disableSubmit:l=!1,className:m,setMessage:a,passwordHint:p}=n,{handleSubmit:w,formState:{errors:r},control:g}=q({defaultValues:{email:"",password:""},resolver:E(W)}),{signIn:S}=P(),v=async s=>{const{email:d,password:y}=s;if(!l){o(!0);const c=await S({username:d,password:y});(c==null?void 0:c.status)==="failed"?a==null||a("Invalid Credentials!"):t({email:d,userName:d.split("@")[0]})}o(!1)};return e.jsx("div",{className:m,children:e.jsxs(L,{onSubmit:w(v),children:[e.jsx(f,{label:"Username",invalid:!!r.email,errorMessage:(x=r.email)==null?void 0:x.message,children:e.jsx(b,{name:"email",control:g,render:({field:s})=>e.jsx(M,{type:"text",placeholder:"Username",autoComplete:"off",...s})})}),e.jsx(f,{label:"Password",invalid:!!r.password,errorMessage:(h=r.password)==null?void 0:h.message,className:C(p&&"mb-0",((j=r.password)==null?void 0:j.message)&&"mb-8"),children:e.jsx(b,{name:"password",control:g,rules:{required:!0},render:({field:s})=>e.jsx(T,{type:"text",placeholder:"Password",autoComplete:"off",...s})})}),p,e.jsx(H,{block:!0,loading:i,variant:"solid",type:"submit",children:i?"Signing in...":"Sign In"})]})})},z=({signUpUrl:n="/sign-up",forgetPasswordUrl:i="/forgot-password",disableSubmit:o})=>{const[t,l]=k(),m=F(a=>a.mode);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-8",children:e.jsx(U,{type:"streamline",mode:m,imgClass:"mx-auto",logoWidth:60})}),e.jsxs("div",{className:"mb-10",children:[e.jsx("h2",{className:"mb-2",children:"Welcome back!"}),e.jsx("p",{className:"font-semibold heading-text",children:"Please enter your credentials to sign in!"})]}),t&&e.jsx(B,{showIcon:!0,className:"mb-4",type:"danger",children:e.jsx("span",{className:"break-all",children:t})}),e.jsx(_,{disableSubmit:o,setMessage:l,passwordHint:e.jsx("div",{className:"mb-7 mt-2",children:e.jsxs("span",{children:["In case you have forgot username or password, please email at ",e.jsx("b",{children:"fmd@epd.punjab.gov.pk"})]})})}),e.jsx("div",{children:e.jsxs("div",{className:"mt-6 text-center",children:[e.jsxs("span",{children:["Don't have an account yet?"," "]}),e.jsx(A,{to:n,className:"heading-text font-bold",themeColor:!1,children:"Sign up"})]})})]})},X=()=>e.jsx(z,{});export{z as SignInBase,X as default};