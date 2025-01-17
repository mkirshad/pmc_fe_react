import{r as f,j as s,A as j,u as b}from"./index-D2VaOOux.js";import{L as g}from"./Logo-DfA8di3E.js";import{u as y,A as v}from"./useTimeOutMessage-yJ8BC7xc.js";import{u as N,F as C,a as m,C as w}from"./index.esm-DKxgNmis.js";import{P as u}from"./PasswordInput-3Hyx0d0G.js";import{B as S}from"./Button-K-qNIcnT.js";import{z as i,t as R}from"./index-DpBkD1Vb.js";import"./StatusIcon-BSwG_t1k.js";import"./CloseButton-CuJbWHRs.js";import"./classNames-C71j7n1V.js";import"./index-B0rqTsU_.js";import"./Input-Dh45_Sjz.js";const A=i.object({currentPassword:i.string().min(1,"Current password is required"),newPassword:i.string().min(3,"Password must be at least 3 characters"),confirmPassword:i.string().min(3,"Password must be at least 3 characters")}).refine(t=>t.newPassword===t.confirmPassword,{message:"Passwords do not match",path:["confirmPassword"]}),B=({disableSubmit:t=!1,setMessage:r})=>{var x,p,P;const[a,n]=f.useState(!1),{handleSubmit:c,formState:{errors:e},control:l}=N({resolver:R(A),defaultValues:{currentPassword:"",newPassword:"",confirmPassword:""}}),h=async o=>{if(!t){n(!0),r==null||r(null);try{const d=await j.post("/accounts/reset-password2/",{current_password:o.currentPassword,new_password:o.newPassword});r==null||r(d.data.message||"Password reset successfully.")}catch(d){console.log(d.response.data.detail),r==null||r(d.response.data.detail||"An error occurred.")}finally{n(!1)}}};return s.jsxs(C,{onSubmit:c(h),children:[s.jsx(m,{label:"Current Password",invalid:!!e.currentPassword,errorMessage:(x=e.currentPassword)==null?void 0:x.message,children:s.jsx(w,{name:"currentPassword",control:l,render:({field:o})=>s.jsx(u,{...o,placeholder:"Current Password"})})}),s.jsx(m,{label:"New Password",invalid:!!e.newPassword,errorMessage:(p=e.newPassword)==null?void 0:p.message,children:s.jsx(w,{name:"newPassword",control:l,render:({field:o})=>s.jsx(u,{...o,placeholder:"New Password"})})}),s.jsx(m,{label:"Confirm Password",invalid:!!e.confirmPassword,errorMessage:(P=e.confirmPassword)==null?void 0:P.message,children:s.jsx(w,{name:"confirmPassword",control:l,render:({field:o})=>s.jsx(u,{...o,placeholder:"Confirm Password"})})}),s.jsx(S,{type:"submit",block:!0,loading:a,disabled:a,variant:"solid",children:a?"Updating...":"Reset Password"})]})},F=({backToDashboardUrl:t="/dashboard",disableSubmit:r})=>{const[a,n]=y(),c=b(e=>e.mode);return s.jsx("div",{className:"flex items-center justify-center min-h-screen bg-gray-50",children:s.jsxs("div",{className:"w-full max-w-md p-6 bg-white shadow-lg rounded-lg",children:[s.jsx("div",{className:"mb-6",children:s.jsx(g,{type:"streamline",mode:c,imgClass:"mx-auto",logoWidth:60})}),s.jsx("h2",{className:"text-2xl font-bold text-center text-gray-800",children:"Reset Your Password"}),s.jsx("p",{className:"mt-2 mb-6 text-center text-gray-600",children:"Enter your current password and a new password to proceed."}),a&&s.jsx(v,{showIcon:!0,className:"mb-4",type:a.toLowerCase().includes("success")?"success":"danger",children:s.jsx("span",{className:"break-all",children:a})}),s.jsx(B,{disableSubmit:r,setMessage:n}),s.jsx("div",{className:"mt-6 text-center",children:s.jsx("a",{href:t,className:"text-blue-500 hover:underline font-semibold",children:"Back to Dashboard"})})]})})},W=()=>s.jsx(F,{});export{F as ResetPasswordBase,W as default};
