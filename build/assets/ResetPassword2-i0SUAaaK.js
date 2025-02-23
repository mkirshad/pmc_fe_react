import{r as f,j as s,A as j,u as b,b as g}from"./index-CwX1nUbx.js";import{L as y}from"./Logo-C1y44TcR.js";import{u as v,A as N}from"./useTimeOutMessage-BoKCf8kG.js";import{u as C,F as S,a as m,C as w}from"./index.esm-lVpUFI5Q.js";import{P as u}from"./PasswordInput-C6WYnNBb.js";import{B as R}from"./Button-CA9lagoI.js";import{t as A,z as i}from"./index-BXP2dAaM.js";import"./StatusIcon-D9orr3fQ.js";import"./index-D7fHGOm8.js";import"./CloseButton-CAihpedd.js";import"./classNames-Di997-Te.js";import"./index-C_jd9xOT.js";import"./Input-BWwmQxXa.js";const B=i.object({currentPassword:i.string().min(1,"Current password is required"),newPassword:i.string().min(3,"Password must be at least 3 characters"),confirmPassword:i.string().min(3,"Password must be at least 3 characters")}).refine(t=>t.newPassword===t.confirmPassword,{message:"Passwords do not match",path:["confirmPassword"]}),F=({disableSubmit:t=!1,setMessage:r})=>{var x,p,P;const[a,n]=f.useState(!1),{handleSubmit:c,formState:{errors:e},control:l}=C({resolver:A(B),defaultValues:{currentPassword:"",newPassword:"",confirmPassword:""}}),h=async o=>{if(!t){n(!0),r==null||r(null);try{const d=await j.post("/accounts/reset-password2/",{current_password:o.currentPassword,new_password:o.newPassword});r==null||r(d.data.message||"Password reset successfully.")}catch(d){console.log(d.response.data.detail),r==null||r(d.response.data.detail||"An error occurred.")}finally{n(!1)}}};return s.jsxs(S,{onSubmit:c(h),children:[s.jsx(m,{label:"Current Password",invalid:!!e.currentPassword,errorMessage:(x=e.currentPassword)==null?void 0:x.message,children:s.jsx(w,{name:"currentPassword",control:l,render:({field:o})=>s.jsx(u,{...o,placeholder:"Current Password"})})}),s.jsx(m,{label:"New Password",invalid:!!e.newPassword,errorMessage:(p=e.newPassword)==null?void 0:p.message,children:s.jsx(w,{name:"newPassword",control:l,render:({field:o})=>s.jsx(u,{...o,placeholder:"New Password"})})}),s.jsx(m,{label:"Confirm Password",invalid:!!e.confirmPassword,errorMessage:(P=e.confirmPassword)==null?void 0:P.message,children:s.jsx(w,{name:"confirmPassword",control:l,render:({field:o})=>s.jsx(u,{...o,placeholder:"Confirm Password"})})}),s.jsx(R,{type:"submit",block:!0,loading:a,disabled:a,variant:"solid",children:a?"Updating...":"Reset Password"})]})},k=({backToDashboardUrl:t="/dashboard",disableSubmit:r})=>{const[a,n]=v(),c=b(e=>e.mode);return s.jsx("div",{className:"flex items-center justify-center min-h-screen bg-gray-50",children:s.jsxs("div",{className:"w-full max-w-md p-6 bg-white shadow-lg rounded-lg",children:[s.jsx("div",{className:"mb-6",children:s.jsx(g,{to:"/",children:s.jsx(y,{type:"streamline",mode:c,imgClass:"mx-auto",logoWidth:60})})}),s.jsx("h2",{className:"text-2xl font-bold text-center text-gray-800",children:"Reset Your Password"}),s.jsx("p",{className:"mt-2 mb-6 text-center text-gray-600",children:"Enter your current password and a new password to proceed."}),a&&s.jsx(N,{showIcon:!0,className:"mb-4",type:a.toLowerCase().includes("success")?"success":"danger",children:s.jsx("span",{className:"break-all",children:a})}),s.jsx(F,{disableSubmit:r,setMessage:n}),s.jsx("div",{className:"mt-6 text-center",children:s.jsx("a",{href:t,className:"text-blue-500 hover:underline font-semibold",children:"Back to Dashboard"})})]})})},G=()=>s.jsx(k,{});export{k as ResetPasswordBase,G as default};
