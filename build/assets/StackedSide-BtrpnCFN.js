import{r as k,i as f,j as e,b as g,d as b,H as T,S as R,e as H,D as E,f as M,u as v,h as w,k as L,l as A,m as V,n as O}from"./index-D-LbIvFe.js";import{L as U}from"./Logo-DlcIXxlZ.js";import{M as p,V as $}from"./VerticalMenuContent-Czz80tjW.js";import{a as P,b as F,c as C,A as Y,n as K,d as B,u as I,e as G,H as W,M as q,N as z,S as J,U as Q}from"./Notification-XlZjzSg3.js";import{H as X,a as Z}from"./StatusIcon-CHEhPwZG.js";import{L as ee}from"./LayoutBase-D5pJQh0f.js";import"./toast-B58Xane-.js";import"./index-D6hm-Tvg.js";import"./proxy-DF1nPA_X.js";import"./_getPrototype-BnG6WSsu.js";const te=l=>{const{onChange:a,routeKey:s,activeKeys:r,onSetActiveKey:c,direction:d,navigationTree:n,userAuthority:o,mode:u,selectedMenu:m,t:x,...y}=l,{includedRouteTree:i}=P(n,s),j=({key:t,title:h,menu:_,translateKey:D})=>{a({title:h,menu:_,translateKey:D}),c([t])},S=({key:t})=>{a({}),c([t])};k.useEffect(()=>{i.type!==F&&!f(i)&&a({key:i.key,title:i.title,menu:i.subMenu,translateKey:i.translateKey})},[i.key]);const N=r&&r.length>0?r:f(m)?[]:[i.key];return e.jsxs("div",{...y,children:[e.jsx(g,{to:b.authenticatedEntryPath,className:"stacked-mini-nav-header flex items-center justify-center",style:{height:T},children:e.jsx(U,{imgClass:"max-h-10",mode:u,type:"streamline",className:R})}),e.jsx(C,{autoHide:!0,direction:d,children:e.jsx(p,{className:"px-4 pb-4",defaultActiveKeys:N,children:n.map(t=>e.jsx(Y,{authority:t.authority,userAuthority:o,children:e.jsx("div",{title:x(t.translateKey,t.title),children:t.subMenu&&t.subMenu.length>0?e.jsx(p.MenuItem,{eventKey:t.key,className:"mb-2",onSelect:()=>j({key:t.key,title:t.title,menu:t.subMenu,translateKey:t.translateKey}),children:e.jsx("div",{className:"text-2xl",children:K[t.icon]})}):e.jsx(g,{to:t.path,className:"flex items-center h-full w-full",onClick:()=>S({key:t.key}),children:e.jsx(p.MenuItem,{eventKey:t.key,className:"mb-2",children:e.jsx("div",{className:"text-2xl",children:K[t.icon]})})})})},t.key))})})]})},se=l=>{const{className:a,title:s,menu:r,routeKey:c,onCollapse:d,direction:n,translationSetup:o,userAuthority:u,...m}=l,x=()=>{d()};return e.jsxs("div",{className:H("h-full",a),...m,children:[e.jsxs("div",{className:"flex items-center justify-between gap-4 pl-6 pr-4",style:{height:T},children:[e.jsx("h5",{className:"font-bold",children:s}),e.jsxs("button",{type:"button",className:"close-button",onClick:x,children:[n===E&&e.jsx(X,{}),n===M&&e.jsx(Z,{})]})]}),e.jsx(C,{autoHide:!0,direction:n,children:e.jsx($,{routeKey:c,navigationTree:r,translationSetup:o,userAuthority:u})})]})},ae={width:V},ne=({translationSetup:l=!0})=>{const{t:a}=B(!l),[s,r]=k.useState({}),[c,d]=k.useState([]),n=v(t=>t.mode),o=v(t=>t.direction),u=w(t=>t.currentRouteKey),m=L(t=>t.user.authority),{larger:x}=I(),y=(t,h)=>`${t}-${h}`,i=t=>{r(t)},j=()=>{r({}),d([])},S=t=>{d(t)},N=()=>{let t={};const h=`${-A}px`;return o===E&&(t={marginLeft:h}),o===M&&(t={marginRight:h}),t};return e.jsx(e.Fragment,{children:x.md&&e.jsxs("div",{className:"stacked-side-nav",children:[e.jsx(te,{className:`stacked-side-nav-mini ${y("stacked-side-nav-mini",n)}`,style:ae,routeKey:u,activeKeys:c,mode:n,direction:o,navigationTree:G,userAuthority:m||[],selectedMenu:s,t:a,onChange:i,onSetActiveKey:S}),e.jsx("div",{className:`stacked-side-nav-secondary ${y("stacked-side-nav-secondary",n)}`,style:{width:A,...f(s)?N():{}},children:!f(s)&&e.jsx(se,{title:a(s.translateKey,s.title),menu:s.menu,routeKey:u,direction:o,translationSetup:l,userAuthority:m||[],onCollapse:j})})]})})},ye=({children:l})=>{const{larger:a,smaller:s}=I();return e.jsx(ee,{type:O,className:"app-layout-stacked-side flex flex-auto flex-col",children:e.jsxs("div",{className:"flex flex-auto min-w-0",children:[a.lg&&e.jsx(ne,{}),e.jsxs("div",{className:"flex flex-col flex-auto min-h-screen min-w-0 relative w-full",children:[e.jsx(W,{className:"shadow dark:shadow-2xl",headerStart:e.jsx(e.Fragment,{children:s.lg&&e.jsx(q,{})}),headerEnd:e.jsxs(e.Fragment,{children:[e.jsx(z,{}),e.jsx(J,{}),e.jsx(Q,{hoverable:!1})]})}),e.jsx("div",{className:"h-full flex flex-auto flex-col",children:l})]})]})})};export{ye as default};