import{r as I,k as N,I as P,j as e,e as k,u as C}from"./index-Bub9wnZN.js";import{L as F}from"./Logo-Byy_FRFR.js";import{u as U,A as B,a as A}from"./useTimeOutMessage-Cb6OIfng.js";import{u as q,F as E,a as f,C as b,I as L}from"./index.esm-DndttYrY.js";import{B as T}from"./StatusIcon-C0LTMQmX.js";import{P as H}from"./PasswordInput-EZOIS53s.js";import{z as u,t as W}from"./index-CHTmtUsP.js";import"./proxy-B7Rih6Mm.js";const _=u.object({email:u.string({required_error:"Please enter your email"}).min(1,{message:"Please enter your email"}),password:u.string({required_error:"Please enter your password"}).min(1,{message:"Please enter your password"})}),z=i=>{var x,h,j;const[l,o]=I.useState(!1),t=N(a=>a.setUser),{disableSubmit:m=!1,className:d,setMessage:s,passwordHint:p}=i,{handleSubmit:w,formState:{errors:r},control:g}=q({defaultValues:{email:"",password:""},resolver:W(_)}),{signIn:S}=P(),v=async a=>{const{email:c,password:y}=a;if(!m){o(!0);const n=await S({username:c,password:y});(n==null?void 0:n.status)==="failed"?n.message.includes("400")?s==null||s("Invalid Credentials!"):s==null||s("Technical Error! please try again after sometime or email at fdm@epd.punjab.gov.pk"):t({email:c,userName:c.split("@")[0]})}o(!1)};return e.jsx("div",{className:d,children:e.jsxs(E,{onSubmit:w(v),children:[e.jsx(f,{label:"Username",invalid:!!r.email,errorMessage:(x=r.email)==null?void 0:x.message,children:e.jsx(b,{name:"email",control:g,render:({field:a})=>e.jsx(L,{type:"text",placeholder:"Username",autoComplete:"off",...a})})}),e.jsx(f,{label:"Password",invalid:!!r.password,errorMessage:(h=r.password)==null?void 0:h.message,className:k(p&&"mb-0",((j=r.password)==null?void 0:j.message)&&"mb-8"),children:e.jsx(b,{name:"password",control:g,rules:{required:!0},render:({field:a})=>e.jsx(H,{type:"text",placeholder:"Password",autoComplete:"off",...a})})}),p,e.jsx(T,{block:!0,loading:l,variant:"solid",type:"submit",children:l?"Signing in...":"Sign In"})]})})},D=({signUpUrl:i="/sign-up",forgetPasswordUrl:l="/forgot-password",disableSubmit:o})=>{const[t,m]=U(),d=C(s=>s.mode);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-8",children:e.jsx(F,{type:"streamline",mode:d,imgClass:"mx-auto",logoWidth:60})}),e.jsxs("div",{className:"mb-10",children:[e.jsx("h2",{className:"mb-2",children:"Welcome back!"}),e.jsx("p",{className:"font-semibold heading-text",children:"Please enter your credentials to sign in!"})]}),t&&e.jsx(B,{showIcon:!0,className:"mb-4",type:"danger",children:e.jsx("span",{className:"break-all",children:t})}),e.jsx(z,{disableSubmit:o,setMessage:m,passwordHint:e.jsx("div",{className:"mb-7 mt-2",children:e.jsxs("span",{children:["In case you have forgot username or password, please email at ",e.jsx("b",{children:"fdm@epd.punjab.gov.pk"})]})})}),e.jsx("div",{children:e.jsxs("div",{className:"mt-6 text-center",children:[e.jsxs("span",{children:["Don't have an account yet?"," "]}),e.jsx(A,{to:i,className:"heading-text font-bold",themeColor:!1,children:"Sign up"})]})})]})},X=()=>e.jsx(D,{});export{D as SignInBase,X as default};