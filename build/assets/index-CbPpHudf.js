import{r as o,j as e,A as P}from"./index-_pHfSknz.js";import{L as E}from"./Logo-BhXJt8nY.js";import{u as H,A as F}from"./useTimeOutMessage-C2rJy8Sf.js";import{B as X}from"./Button-Jv5w_P3k.js";import{I as x}from"./Input-BVtjYE_W.js";import{P as S}from"./PasswordInput-DRfGY0QG.js";import{S as j,I as w}from"./index-DXdX13Pt.js";import{A as W}from"./ActionLink-CjqYiKFO.js";import{D as Z}from"./Divider-aU52AM-r.js";import"./StatusIcon-c916OI0M.js";import"./proxy-DOmYVzIW.js";import"./classNames-DXpqXTWN.js";const K=()=>{const[r,v]=o.useState(0),[c,C]=o.useState(""),[m,I]=o.useState(""),[d,A]=o.useState(""),[u,D]=o.useState(""),[b,L]=o.useState(""),[f,M]=o.useState(""),[y,B]=o.useState(""),[g,n]=H(),[R,p]=o.useState(!1),T=s=>{s.key==="Backspace"&&C(k(c,!0))},k=(s,t)=>{let i=s.replace(/[^a-zA-Z0-9]/g,""),l=i.slice(0,3).toUpperCase().replace(/[^A-Z]/g,""),a=i.slice(3,6).toUpperCase().replace(/[^A-Z]/g,""),N=i.slice(6).replace(/[^0-9]/g,"");if(t)return[l,a,N].filter(Boolean).join("-");let h="";return l&&(h+=l+(l.length===3?"-":"")),a&&(h+=a+(a.length===3?"-":"")),N&&(h+=N),h},U=s=>{const t=s.replace(/\D/g,"").slice(0,17);I(t)},V=s=>{const t=s.replace(/\D/g,"");t.length<=10&&(t.startsWith("3")||t==="")&&A(t)},O=async()=>{var s,t,i,l;if(r===0){if(!c&&!m||!d||!u){n("Please provide either Tracking Number or PSID generated by this portal and Mobile Number and CNIC of the applicant.");return}p(!0);try{const a=await P.post("/accounts/find-user/",{tracking_number:c,psid:m,mobile_number:d,cnic:u});L(a.data.username||"Unknown"),n(null),v(1)}catch(a){n(((t=(s=a.response)==null?void 0:s.data)==null?void 0:t.detail)||"Error finding user.")}finally{p(!1)}}else if(r===1){if(f!==y){n("Passwords do not match.");return}p(!0);try{await P.post("/accounts/reset-forgot-password/",{tracking_number:c,psid:m,mobile_number:d,cnic:u,username:b,new_password:f}),n("Password reset successfully.")}catch(a){n(((l=(i=a.response)==null?void 0:i.data)==null?void 0:l.detail)||"Error resetting password.")}finally{p(!1)}}},_=()=>{r>0&&v(r-1)};return e.jsx("div",{className:"flex items-center justify-center min-h-screen bg-gray-50",children:e.jsxs("div",{className:"w-full max-w-lg p-8 bg-white shadow-2xl rounded-lg",children:[e.jsx("div",{className:"mb-6 text-center",children:e.jsx(E,{type:"streamline",imgClass:"mx-auto",logoWidth:60})}),e.jsxs(j,{current:r,className:"mb-6",children:[e.jsx(j.Item,{title:"Find User"}),e.jsx(j.Item,{title:"Reset Password"})]}),g&&e.jsx(F,{showIcon:!0,className:"mb-6",type:g.toLowerCase().includes("success")||g.toLowerCase().includes("copied")?"success":"danger",children:g}),r===0&&e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsx("h6",{className:"font-bold mb-3 text-center",children:"Tracking Number or PSID generated by this portal"}),e.jsx(x,{value:c,onChange:s=>C(k(s.target.value,!1)),placeholder:"Tracking Number (e.g., LHR-PRO-001)",onKeyDown:T,className:"mb-2",title:"Tracking Number (e.g., LHR-PRO-001)"}),e.jsx(Z,{textAlign:"left",className:"my-4 text-gray-500 font-medium mb-2 mt-2",children:"OR"}),e.jsx(w,{mask:"99999999999999999",placeholder:"PSID (17 digits)",value:m,onChange:s=>U(s.target.value),children:s=>e.jsx(x,{type:"text",autoComplete:"off",className:"mt-2",title:"PSID (17 digits)",...s})})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsx("h6",{className:"font-bold mb-3 text-center",children:"Mobile Number and CNIC of the applicant"}),e.jsx(w,{mask:"3999999999",placeholder:"Mobile Number (e.g., 3001234567)",value:d,onChange:s=>V(s.target.value),children:s=>e.jsx(x,{type:"text",autoComplete:"off",className:"mb-2",title:"Mobile Number (e.g., 3001234567)",...s})}),e.jsx(w,{mask:"99999-9999999-9",placeholder:"CNIC (XXXXX-XXXXXXX-X)",value:u,onChange:s=>D(s.target.value),children:s=>e.jsx(x,{type:"text",autoComplete:"off",className:"mt-2",title:"CNIC (XXXXX-XXXXXXX-X)",...s})})]})]}),r===1&&e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:e.jsx("strong",{children:"Username"})}),e.jsxs("div",{className:"flex items-center bg-gray-50 border border-gray-300 rounded-md p-2",children:[e.jsx("input",{type:"text",value:b,readOnly:!0,className:"flex-grow text-gray-900 bg-transparent focus:outline-none"}),e.jsx("button",{type:"button",onClick:()=>{navigator.clipboard.writeText(b),n("Username copied")},className:"ml-2 p-1 text-blue-500 hover:text-blue-700",title:"Copy Username",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8m4 4h2a2 2 0 012 2v8a2 2 0 01-2 2h-8m4-12V4m0 4V4m0 0V4m0 0H4"})})})]})]}),e.jsx("h6",{className:"font-bold mb-4 text-center",children:"Reset Password"}),e.jsx(S,{value:f,onChange:s=>M(s.target.value),placeholder:"New Password",className:"mb-4",title:"New Password"}),e.jsx(S,{value:y,onChange:s=>B(s.target.value),placeholder:"Confirm Password",title:"Confirm Password"})]}),e.jsxs("div",{className:"mt-6 flex justify-between",children:[r>0&&e.jsx(X,{onClick:_,variant:"outline",className:"mr-2",children:"Back"}),e.jsx(X,{block:!0,onClick:O,loading:R,variant:"solid",children:r===0?"Next":"Reset Password"})]}),e.jsxs("div",{className:"mt-4 text-center",children:[e.jsx("span",{children:"Back to "}),e.jsx(W,{to:"/sign-in",className:"heading-text font-bold",themeColor:!1,children:"Sign in"})]})]})})},oe=()=>e.jsx(K,{});export{K as ForgotPasswordBase,oe as default};
