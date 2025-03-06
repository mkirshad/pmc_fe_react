import{r as p,y as g,j as e,C as $,b as A,a5 as F}from"./index-BW1Hx4NO.js";import{h as H,P as Y,i as L,n as b,A as I,D as P,d as O,a as q,b as U,g as z,j as B}from"./Notification-AfFZhpBc.js";import{a as J}from"./index-CUW6dhaT.js";import{m as k}from"./isNil-Cr14PySr.js";import{T as Q}from"./index-g-LJ14pM.js";const K=p.createContext({}),W=K.Provider,X=K.Consumer,D=p.forwardRef((t,s)=>{const{children:l,className:r,defaultActiveKeys:n=[],defaultExpandedKeys:a=[],defaultCollapseActiveKeys:i=[],menuItemHeight:c=48,onSelect:x,sideCollapsed:d=!1,...m}=t,C=g("menu",r);return e.jsx("nav",{ref:s,className:C,...m,children:e.jsx(W,{value:{onSelect:x,menuItemHeight:c,sideCollapsed:d,defaultExpandedKeys:a,defaultActiveKeys:n,defaultCollapseActiveKeys:i},children:l})})});D.displayName="Menu";const _=p.createContext(null),Z=_.Provider,R=_.Consumer,w=p.createContext(!1),v=w.Provider,ee=w.Consumer,G=t=>{const{eventKey:s,...l}=t;return e.jsx(X,{children:r=>e.jsx(R,{children:()=>e.jsx(ee,{children:()=>e.jsx(H,{menuItemHeight:r.menuItemHeight,isActive:r.defaultActiveKeys.includes(s),eventKey:s,onSelect:r.onSelect,...l})})})})};G.displayName="MenuItem";const S=t=>{const{active:s,children:l,className:r,eventKey:n,expanded:a=!1,indent:i=!0,label:c=null,dotIndent:x,onToggle:d}=t,[m,o]=p.useState(a),{sideCollapsed:C,defaultExpandedKeys:j,defaultCollapseActiveKeys:M}=p.useContext(K),{direction:h}=$();p.useEffect(()=>{j.includes(n)&&o(!0),a!==m&&o(!0)},[a,n,j]);const N=u=>{typeof d=="function"&&d(!m,u),o(!m)},f=g("menu-collapse-item",(M&&M.includes(n)||s)&&"menu-collapse-item-active",r);return e.jsxs("div",{className:"menu-collapse",children:[e.jsxs("div",{className:f,role:"presentation",onClick:N,children:[e.jsxs("span",{className:"flex items-center gap-2",children:[x&&e.jsx(Y,{className:g("text-3xl w-[24px]",!s&&"opacity-25")}),c]}),e.jsx(k.span,{className:"text-lg mt-1",initial:{transform:"rotate(0deg)"},animate:{transform:m?"rotate(-180deg)":"rotate(0deg)"},transition:{duration:.15},children:C?null:e.jsx(J,{})})]}),e.jsx(v,{value:m,children:e.jsx(k.ul,{className:i?h==="rtl"?"mr-8":"ml-8":"",initial:{opacity:0,height:0,overflow:"hidden"},animate:{opacity:m?1:0,height:m?"auto":0},transition:{duration:.15},children:l})})]})};S.displayName="MenuCollapse";const V=t=>{const{label:s,children:l,className:r}=t,{sideCollapsed:n}=p.useContext(K),i=g("menu-group",r),c=L("entity-header-");return e.jsxs("div",{className:i,children:[s&&!n&&e.jsx("div",{className:g("menu-title"),id:c,children:s}),e.jsx(Z,{value:null,children:e.jsx("ul",{children:l})})]})};V.displayName="MenuGroup";const y=D;y.MenuItem=G;y.MenuCollapse=S;y.MenuGroup=V;const E=({icon:t})=>typeof t!="string"&&!t?e.jsx(e.Fragment,{}):e.jsx(e.Fragment,{children:b[t]&&e.jsx("span",{className:"text-2xl",children:b[t]})}),{MenuItem:te}=y,se=({nav:t,children:s,direction:l,renderAsIcon:r,onLinkClick:n,userAuthority:a,t:i})=>e.jsx(I,{userAuthority:a,authority:t.authority,children:r?e.jsx(Q,{title:i(t.translateKey,t.title),placement:l==="rtl"?"left":"right",children:s}):e.jsx(P.Item,{children:t.path?e.jsx(A,{className:"h-full w-full flex items-center outline-none",to:t.path,target:t.isExternalLink?"_blank":"",onClick:()=>n==null?void 0:n({key:t.key,title:t.title,path:t.path}),children:e.jsx("span",{children:i(t.translateKey,t.title)})}):e.jsx("span",{children:i(t.translateKey,t.title)})})}),T=t=>{const{nav:s,onLinkClick:l,showTitle:r,indent:n,showIcon:a=!0,userAuthority:i,t:c}=t;return e.jsx(I,{userAuthority:i,authority:s.authority,children:e.jsx(te,{eventKey:s.key,dotIndent:n,children:e.jsxs(A,{to:s.path,className:"flex items-center gap-2 h-full w-full",target:s.isExternalLink?"_blank":"",onClick:()=>l==null?void 0:l({key:s.key,title:s.title,path:s.path}),children:[a&&e.jsx(E,{icon:s.icon}),r&&e.jsx("span",{children:c(s.translateKey,s.title)})]})},s.key)})},ne=({nav:t,onLinkClick:s,sideCollapsed:l,direction:r,indent:n,renderAsIcon:a,userAuthority:i,showIcon:c,showTitle:x,t:d})=>e.jsx(e.Fragment,{children:l?e.jsx(se,{nav:t,direction:r,renderAsIcon:a,userAuthority:i,t:d,onLinkClick:s,children:e.jsx(T,{nav:t,sideCollapsed:l,userAuthority:i,showIcon:c,showTitle:x,t:d,onLinkClick:s})}):e.jsx(T,{nav:t,sideCollapsed:l,userAuthority:i,showIcon:c,showTitle:x,indent:n,t:d,onLinkClick:s})}),{MenuItem:le,MenuCollapse:re}=y,oe=({nav:t,indent:s,dotIndent:l,children:r,userAuthority:n,t:a})=>e.jsx(I,{userAuthority:n,authority:t.authority,children:e.jsx(re,{label:e.jsxs(e.Fragment,{children:[e.jsx(E,{icon:t.icon}),e.jsx("span",{children:a(t.translateKey,t.title)})]}),eventKey:t.key,expanded:!1,dotIndent:l,indent:s,children:r},t.key)}),ae=({nav:t,direction:s,children:l,t:r,renderAsIcon:n,userAuthority:a})=>{const i=e.jsx(le,{eventKey:t.key,className:"mb-2",children:e.jsx(E,{icon:t.icon})},t.key),c=e.jsx("div",{children:r(t.translateKey,t.title)},t.key);return e.jsx(I,{userAuthority:a,authority:t.authority,children:e.jsx(P,{trigger:"hover",renderTitle:n?i:c,placement:s==="rtl"?"left-start":"right-start",children:l})})},ie=({sideCollapsed:t,...s})=>t?e.jsx(ae,{...s}):e.jsx(oe,{...s}),{MenuGroup:ue}=y,he=t=>{const{collapsed:s,routeKey:l,navigationTree:r=[],onMenuItemClick:n,direction:a=F.direction,translationSetup:i,userAuthority:c}=t,{t:x}=O(!i),[d,m]=p.useState([]),{activedRoute:o}=q(r,l);p.useEffect(()=>{d.length===0&&(o!=null&&o.parentKey)&&m([o==null?void 0:o.parentKey])},[o==null?void 0:o.parentKey]);const C=()=>{n==null||n()},j=(M,h=0,N)=>{const f=h+1;return e.jsx(e.Fragment,{children:M.map(u=>e.jsxs(p.Fragment,{children:[u.type===U&&e.jsx(ne,{nav:u,sideCollapsed:s,direction:a,indent:N,renderAsIcon:h<=0,showIcon:h<=0,userAuthority:c,showTitle:s?h>=1:h<=1,t:x,onLinkClick:C},u.key),u.type===z&&e.jsx(ie,{nav:u,sideCollapsed:s,direction:a,indent:f>=2,dotIndent:f>=2,renderAsIcon:f<=1,userAuthority:c,t:x,onLinkClick:n,children:u.subMenu&&u.subMenu.length>0&&j(u.subMenu,f,!0)},u.key),u.type===B&&e.jsx(ue,{label:x(u.translateKey)||u.title,children:u.subMenu&&u.subMenu.length>0&&j(u.subMenu,h,!1)},u.key)]},u.key))})};return e.jsx(y,{className:"px-4 pb-4",sideCollapsed:s,defaultActiveKeys:o!=null&&o.key?[o.key]:[],defaultExpandedKeys:d,defaultCollapseActiveKeys:o!=null&&o.parentKey?[o.parentKey]:[],children:j(r,0)})};export{y as M,he as V};
