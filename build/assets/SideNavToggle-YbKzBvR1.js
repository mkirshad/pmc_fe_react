import{u as r,k as x,l as h,r as y,j as s,f as u,d as f,e as S,H as C,S as E,s as T,t as p,v}from"./index-4Wa45sPC.js";import{c as j,e as _,w as A,u as R,f as D}from"./Notification-BZwn_rDJ.js";import{L as H}from"./Logo-CGqQv9Gb.js";import{V as I}from"./VerticalMenuContent-DnKbaTMk.js";const G={width:p,minWidth:p},L={width:v,minWidth:v},O=({translationSetup:i=!0,background:l=!0,className:n,contentClass:a,mode:c})=>{const d=r(e=>e.mode),o=r(e=>e.direction),t=r(e=>e.layout.sideNavCollapse),N=x(e=>e.currentRouteKey),m=h(e=>e.user.authority),g=h(e=>e.fetchUserGroups);return console.log("its here kkj"),y.useEffect(()=>{console.log("userAuthority",m),g()},[]),s.jsxs("div",{style:t?L:G,className:u("side-nav",l&&"side-nav-bg",!t&&"side-nav-expand",n),children:[s.jsx(f,{to:S.authenticatedEntryPath,className:"side-nav-header flex flex-col justify-center",style:{height:C},children:s.jsx(H,{imgClass:"max-h-10",mode:c||d,type:t?"streamline":"full",className:u(t&&"ltr:ml-[11.5px] ltr:mr-[11.5px]",t?E:T)})}),s.jsx("div",{className:u("side-nav-content",a),children:s.jsx(j,{style:{height:"100%"},direction:o,children:s.jsx(I,{collapsed:t,navigationTree:_,routeKey:N,direction:o,translationSetup:i,userAuthority:m||[]})})})]})},k=({className:i})=>{const{layout:l,setSideNavCollapse:n}=r(o=>o),a=l.sideNavCollapse,{larger:c}=R(),d=()=>{n(!a)};return s.jsx(s.Fragment,{children:c.md&&s.jsx("div",{className:i,role:"button",onClick:d,children:s.jsx(D,{className:"text-2xl",toggled:a})})})},W=A(k);export{O as S,W as a};
