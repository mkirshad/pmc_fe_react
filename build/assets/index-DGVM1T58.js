import{r as I,l as P,J as C,j as e,f as F,u as k}from"./index-sc-QLuM4.js";import{L as A}from"./Logo-B00nq8Nc.js";import{u as B,A as U}from"./useTimeOutMessage-CCNYH7vC.js";import{I as q}from"./Input-Zf0KY9TA.js";import{B as E}from"./Button-Dm-yvKbL.js";import{u as L,F as T,a as j,C as b}from"./index.esm-CpTCNfTK.js";import{P as H}from"./PasswordInput-BhiVOorx.js";import{z as u,t as W}from"./index-aggXzwDS.js";import{A as w}from"./ActionLink-DazWlBbd.js";import"./StatusIcon-Ba-m4mKY.js";import"./CloseButton-DdTVQlSx.js";import"./classNames-BTIJSEs2.js";import"./index-zCBMZ2W3.js";const _=u.object({email:u.string({required_error:"Please enter your email"}).min(1,{message:"Please enter your email"}),password:u.string({required_error:"Please enter your password"}).min(1,{message:"Please enter your password"})}),z=l=>{var x,h,f;const[o,t]=I.useState(!1),n=P(a=>a.setUser),{disableSubmit:m=!1,className:d,setMessage:s,passwordHint:p}=l,{handleSubmit:S,formState:{errors:r},control:g}=L({defaultValues:{email:"",password:""},resolver:W(_)}),{signIn:v}=C(),N=async a=>{const{email:c,password:y}=a;if(!m){t(!0);const i=await v({username:c,password:y});(i==null?void 0:i.status)==="failed"?i.message.includes("400")?s==null||s("Invalid Credentials!"):s==null||s("Technical Error! please try again after sometime or email at fdm@epd.punjab.gov.pk"):n({email:c,userName:c.split("@")[0]})}t(!1)};return e.jsx("div",{className:d,children:e.jsxs(T,{onSubmit:S(N),children:[e.jsx(j,{label:"Username",invalid:!!r.email,errorMessage:(x=r.email)==null?void 0:x.message,children:e.jsx(b,{name:"email",control:g,render:({field:a})=>e.jsx(q,{type:"text",placeholder:"Username",autoComplete:"off",...a})})}),e.jsx(j,{label:"Password",invalid:!!r.password,errorMessage:(h=r.password)==null?void 0:h.message,className:F(p&&"mb-0",((f=r.password)==null?void 0:f.message)&&"mb-8"),children:e.jsx(b,{name:"password",control:g,rules:{required:!0},render:({field:a})=>e.jsx(H,{type:"text",placeholder:"Password",autoComplete:"off",...a})})}),p,e.jsx(E,{block:!0,loading:o,variant:"solid",type:"submit",children:o?"Signing in...":"Sign In"})]})})},D=({signUpUrl:l="/sign-up",forgetPasswordUrl:o="/forgot-password",disableSubmit:t})=>{const[n,m]=B(),d=k(s=>s.mode);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-8",children:e.jsx(A,{type:"streamline",mode:d,imgClass:"mx-auto",logoWidth:60})}),e.jsxs("div",{className:"mb-10",children:[e.jsx("h2",{className:"mb-2",children:"Welcome back!"}),e.jsx("p",{className:"font-semibold heading-text",children:"Please enter your credentials to sign in!"})]}),n&&e.jsx(U,{showIcon:!0,className:"mb-4",type:"danger",children:e.jsx("span",{className:"break-all",children:n})}),e.jsx(z,{disableSubmit:t,setMessage:m,passwordHint:e.jsx("div",{className:"mb-7 mt-2",children:e.jsx(w,{to:o,className:"font-semibold heading-text mt-2 underline",themeColor:!1,children:"Forgot password"})})}),e.jsx("div",{children:e.jsxs("div",{className:"mt-6 text-center",children:[e.jsxs("span",{children:["Don't have an account yet?"," "]}),e.jsx(w,{to:l,className:"heading-text font-bold",themeColor:!1,children:"Sign up"})]})})]})},se=()=>e.jsx(D,{});export{D as SignInBase,se as default};
