import{r as k,i as f,j as e,d as g,e as b,H as T,S as R,f as H,D as E,h as M,u as v,k as w,l as L,m as A,n as V,o as O}from"./index-BEzI-Y-J.js";import{L as U}from"./Logo-BaiXnulK.js";import{M as N,V as $}from"./VerticalMenuContent-B4q5qo2a.js";import{S as C}from"./ScrollBar-BO5tPBjn.js";import{a as P,N as F,A as Y,n as K,b as B,u as I,c as G,H as W,M as q,S as z,U as J}from"./SidePanel-DeXsw5fO.js";import{H as Q,a as X}from"./StatusIcon-TSJlbom4.js";import{L as Z}from"./LayoutBase-Bp55QTKa.js";import"./toast-cHGaVhbO.js";import"./index-Bj9L55nc.js";import"./proxy-DpCyprZj.js";import"./_getPrototype-7fe7d4Ns.js";import"./isNil-CzlIT2sR.js";const ee=l=>{const{onChange:a,routeKey:s,activeKeys:r,onSetActiveKey:c,direction:d,navigationTree:n,userAuthority:o,mode:u,selectedMenu:m,t:y,...x}=l,{includedRouteTree:i}=P(n,s),S=({key:t,title:h,menu:_,translateKey:D})=>{a({title:h,menu:_,translateKey:D}),c([t])},j=({key:t})=>{a({}),c([t])};k.useEffect(()=>{i.type!==F&&!f(i)&&a({key:i.key,title:i.title,menu:i.subMenu,translateKey:i.translateKey})},[i.key]);const p=r&&r.length>0?r:f(m)?[]:[i.key];return e.jsxs("div",{...x,children:[e.jsx(g,{to:b.authenticatedEntryPath,className:"stacked-mini-nav-header flex items-center justify-center",style:{height:T},children:e.jsx(U,{imgClass:"max-h-10",mode:u,type:"streamline",className:R})}),e.jsx(C,{autoHide:!0,direction:d,children:e.jsx(N,{className:"px-4 pb-4",defaultActiveKeys:p,children:n.map(t=>e.jsx(Y,{authority:t.authority,userAuthority:o,children:e.jsx("div",{title:y(t.translateKey,t.title),children:t.subMenu&&t.subMenu.length>0?e.jsx(N.MenuItem,{eventKey:t.key,className:"mb-2",onSelect:()=>S({key:t.key,title:t.title,menu:t.subMenu,translateKey:t.translateKey}),children:e.jsx("div",{className:"text-2xl",children:K[t.icon]})}):e.jsx(g,{to:t.path,className:"flex items-center h-full w-full",onClick:()=>j({key:t.key}),children:e.jsx(N.MenuItem,{eventKey:t.key,className:"mb-2",children:e.jsx("div",{className:"text-2xl",children:K[t.icon]})})})})},t.key))})})]})},te=l=>{const{className:a,title:s,menu:r,routeKey:c,onCollapse:d,direction:n,translationSetup:o,userAuthority:u,...m}=l,y=()=>{d()};return e.jsxs("div",{className:H("h-full",a),...m,children:[e.jsxs("div",{className:"flex items-center justify-between gap-4 pl-6 pr-4",style:{height:T},children:[e.jsx("h5",{className:"font-bold",children:s}),e.jsxs("button",{type:"button",className:"close-button",onClick:y,children:[n===E&&e.jsx(Q,{}),n===M&&e.jsx(X,{})]})]}),e.jsx(C,{autoHide:!0,direction:n,children:e.jsx($,{routeKey:c,navigationTree:r,translationSetup:o,userAuthority:u})})]})},se={width:V},ae=({translationSetup:l=!0})=>{const{t:a}=B(!l),[s,r]=k.useState({}),[c,d]=k.useState([]),n=v(t=>t.mode),o=v(t=>t.direction),u=w(t=>t.currentRouteKey),m=L(t=>t.user.authority),{larger:y}=I(),x=(t,h)=>`${t}-${h}`,i=t=>{r(t)},S=()=>{r({}),d([])},j=t=>{d(t)},p=()=>{let t={};const h=`${-A}px`;return o===E&&(t={marginLeft:h}),o===M&&(t={marginRight:h}),t};return e.jsx(e.Fragment,{children:y.md&&e.jsxs("div",{className:"stacked-side-nav",children:[e.jsx(ee,{className:`stacked-side-nav-mini ${x("stacked-side-nav-mini",n)}`,style:se,routeKey:u,activeKeys:c,mode:n,direction:o,navigationTree:G,userAuthority:m||[],selectedMenu:s,t:a,onChange:i,onSetActiveKey:j}),e.jsx("div",{className:`stacked-side-nav-secondary ${x("stacked-side-nav-secondary",n)}`,style:{width:A,...f(s)?p():{}},children:!f(s)&&e.jsx(te,{title:a(s.translateKey,s.title),menu:s.menu,routeKey:u,direction:o,translationSetup:l,userAuthority:m||[],onCollapse:S})})]})})},fe=({children:l})=>{const{larger:a,smaller:s}=I();return e.jsx(Z,{type:O,className:"app-layout-stacked-side flex flex-auto flex-col",children:e.jsxs("div",{className:"flex flex-auto min-w-0",children:[a.lg&&e.jsx(ae,{}),e.jsxs("div",{className:"flex flex-col flex-auto min-h-screen min-w-0 relative w-full",children:[e.jsx(W,{className:"shadow dark:shadow-2xl",headerStart:e.jsx(e.Fragment,{children:s.lg&&e.jsx(q,{})}),headerEnd:e.jsxs(e.Fragment,{children:[e.jsx(z,{}),e.jsx(J,{hoverable:!1})]})}),e.jsx("div",{className:"h-full flex flex-auto flex-col",children:l})]})]})})};export{fe as default};
