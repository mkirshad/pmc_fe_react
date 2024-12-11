import{r as j,j as s,a0 as S,X as N}from"./index-BEzI-Y-J.js";import{u as F,A as y,a as R}from"./useTimeOutMessage-CFFhlc5b.js";import{B as g}from"./StatusIcon-TSJlbom4.js";import{z as m,u as k,F as B,a as h,C as f,t as q}from"./index-2BOgAsS5.js";import{P as x}from"./PasswordInput-BkkNJqdi.js";import"./proxy-DpCyprZj.js";import"./isNil-CzlIT2sR.js";const A=m.object({newPassword:m.string({required_error:"Please enter your password"}),confirmPassword:m.string({required_error:"Confirm Password Required"})}).refine(e=>e.newPassword===e.confirmPassword,{message:"Your passwords do not match",path:["confirmPassword"]}),M=e=>{var w,p;const[r,o]=j.useState(!1),{className:i,setMessage:a,setResetComplete:t,resetComplete:l,children:P}=e,{handleSubmit:b,formState:{errors:d},control:u}=k({resolver:q(A)}),v=async n=>{const{newPassword:C}=n;try{await S({password:C})&&(o(!1),t==null||t(!0))}catch(c){a==null||a(typeof c=="string"?c:"Failed to reset password"),o(!1)}o(!1)};return s.jsx("div",{className:i,children:l?s.jsx(s.Fragment,{children:P}):s.jsxs(B,{onSubmit:b(v),children:[s.jsx(h,{label:"Password",invalid:!!d.newPassword,errorMessage:(w=d.newPassword)==null?void 0:w.message,children:s.jsx(f,{name:"newPassword",control:u,render:({field:n})=>s.jsx(x,{autoComplete:"off",placeholder:"••••••••••••",...n})})}),s.jsx(h,{label:"Confirm Password",invalid:!!d.confirmPassword,errorMessage:(p=d.confirmPassword)==null?void 0:p.message,children:s.jsx(f,{name:"confirmPassword",control:u,render:({field:n})=>s.jsx(x,{autoComplete:"off",placeholder:"Confirm Password",...n})})}),s.jsx(g,{block:!0,loading:r,variant:"solid",type:"submit",children:r?"Submiting...":"Submit"})]})})},Y=({signInUrl:e="/sign-in"})=>{const[r,o]=j.useState(!1),[i,a]=F(),t=N(),l=()=>{t(e)};return s.jsxs("div",{children:[s.jsx("div",{className:"mb-6",children:r?s.jsxs(s.Fragment,{children:[s.jsx("h3",{className:"mb-1",children:"Reset done"}),s.jsx("p",{className:"font-semibold heading-text",children:"Your password has been successfully reset"})]}):s.jsxs(s.Fragment,{children:[s.jsx("h3",{className:"mb-1",children:"Set new password"}),s.jsx("p",{className:"font-semibold heading-text",children:"Your new password must different to previos password"})]})}),i&&s.jsx(y,{showIcon:!0,className:"mb-4",type:"danger",children:s.jsx("span",{className:"break-all",children:i})}),s.jsx(M,{resetComplete:r,setMessage:a,setResetComplete:o,children:s.jsx(g,{block:!0,variant:"solid",type:"button",onClick:l,children:"Continue"})}),s.jsxs("div",{className:"mt-4 text-center",children:[s.jsx("span",{children:"Back to "}),s.jsx(R,{to:e,className:"heading-text font-bold",themeColor:!1,children:"Sign in"})]})]})},X=()=>s.jsx(Y,{});export{Y as ResetPasswordBase,X as default};
