import{r as j,j as s,$ as S,U as N}from"./index-Cw8nRmZO.js";import{u as F,A as y}from"./useTimeOutMessage-BMyvljs_.js";import{B as g}from"./Button-CfeoYdX-.js";import{A as R}from"./ActionLink-X48b7K6h.js";import{u as k,F as B,a as f,C as h}from"./index.esm-CkeEdEOe.js";import{P as x}from"./PasswordInput-Bey8E47L.js";import{z as c,t as A}from"./index-CtqECTZc.js";import"./StatusIcon-Bvu-DyUd.js";import"./CloseButton-C6zUhPqL.js";import"./classNames-CDcQePYC.js";import"./index-CaOsPfco.js";import"./Input-DuprZGfq.js";const q=c.object({newPassword:c.string({required_error:"Please enter your password"}),confirmPassword:c.string({required_error:"Confirm Password Required"})}).refine(e=>e.newPassword===e.confirmPassword,{message:"Your passwords do not match",path:["confirmPassword"]}),M=e=>{var u,w;const[r,o]=j.useState(!1),{className:i,setMessage:a,setResetComplete:t,resetComplete:l,children:P}=e,{handleSubmit:b,formState:{errors:d},control:p}=k({resolver:A(q)}),v=async n=>{const{newPassword:C}=n;try{await S({password:C})&&(o(!1),t==null||t(!0))}catch(m){a==null||a(typeof m=="string"?m:"Failed to reset password"),o(!1)}o(!1)};return s.jsx("div",{className:i,children:l?s.jsx(s.Fragment,{children:P}):s.jsxs(B,{onSubmit:b(v),children:[s.jsx(f,{label:"Password",invalid:!!d.newPassword,errorMessage:(u=d.newPassword)==null?void 0:u.message,children:s.jsx(h,{name:"newPassword",control:p,render:({field:n})=>s.jsx(x,{autoComplete:"off",placeholder:"••••••••••••",...n})})}),s.jsx(f,{label:"Confirm Password",invalid:!!d.confirmPassword,errorMessage:(w=d.confirmPassword)==null?void 0:w.message,children:s.jsx(h,{name:"confirmPassword",control:p,render:({field:n})=>s.jsx(x,{autoComplete:"off",placeholder:"Confirm Password",...n})})}),s.jsx(g,{block:!0,loading:r,variant:"solid",type:"submit",children:r?"Submiting...":"Submit"})]})})},Y=({signInUrl:e="/sign-in"})=>{const[r,o]=j.useState(!1),[i,a]=F(),t=N(),l=()=>{t(e)};return s.jsxs("div",{children:[s.jsx("div",{className:"mb-6",children:r?s.jsxs(s.Fragment,{children:[s.jsx("h3",{className:"mb-1",children:"Reset done"}),s.jsx("p",{className:"font-semibold heading-text",children:"Your password has been successfully reset"})]}):s.jsxs(s.Fragment,{children:[s.jsx("h3",{className:"mb-1",children:"Set new password"}),s.jsx("p",{className:"font-semibold heading-text",children:"Your new password must different to previos password"})]})}),i&&s.jsx(y,{showIcon:!0,className:"mb-4",type:"danger",children:s.jsx("span",{className:"break-all",children:i})}),s.jsx(M,{resetComplete:r,setMessage:a,setResetComplete:o,children:s.jsx(g,{block:!0,variant:"solid",type:"button",onClick:l,children:"Continue"})}),s.jsxs("div",{className:"mt-4 text-center",children:[s.jsx("span",{children:"Back to "}),s.jsx(R,{to:e,className:"heading-text font-bold",themeColor:!1,children:"Sign in"})]})]})},K=()=>s.jsx(Y,{});export{Y as ResetPasswordBase,K as default};
