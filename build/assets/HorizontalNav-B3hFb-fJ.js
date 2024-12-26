import{u as re,j as e,d as O,e as ne,x as oe,r as g,f,k as ie,l as ae}from"./index-BaJroj_P.js";import{L as le}from"./Logo-o8XlwqRK.js";import{u as ce,a as de,b as ue,c as xe,d as he,o as pe,f as me,s as ge,e as ye,g as fe,h as je,i as ke,j as be,k as we,l as Ne,m as Ce,n as Me,p as Ee,q as Ie,F as Le,r as Fe,t as Te,v as Ke,w as Pe,T as N,A as Y,x as Ae}from"./toast-BHcrNEhN.js";import{A as b,n as w,b as L,g as U,D as R,d as He,a as Re,e as ze}from"./Notification-DqKTycg_.js";const Be=({mode:n})=>{const i=re(o=>o.mode);return e.jsx(O,{to:ne.authenticatedEntryPath,children:e.jsx(le,{imgClass:"max-h-10",mode:n||i,className:"hidden lg:block"})})},E=({path:n,children:i,isExternalLink:o,className:r,onClick:l})=>e.jsx(O,{className:oe("w-full flex items-center outline-0",r),to:n,target:o?"_blank":"",onClick:l,children:i}),F=g.forwardRef((n,i)=>{const{className:o,active:r,asElement:l="button",...u}=n,d={className:f("font-semibold inline-flex h-9 w-max items-center justify-center rounded-lg bg-background px-4 py-2 dark:text-gray-300 dark:hover:text-gray-100 text-gray-900 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors",o,r&&"bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20")};if(l==="a"){const{path:a,isExternalLink:h,...t}=u;return e.jsx(E,{path:a,isExternalLink:h,...d,...t})}return l==="button"?e.jsx("button",{ref:i,...d,...u}):e.jsx(e.Fragment,{})});F.displayName="HorizontalMenuDropdownTrigger";const z=g.createContext({getItemProps:()=>({}),activeIndex:null,setActiveIndex:()=>{},setHasFocusInside:()=>{},isOpen:!1}),De=n=>{const{menuContent:i,triggerContent:o,dropdownLean:r}=n,[l,u]=g.useState(!1),[d,a]=g.useState(!1),[h,t]=g.useState(null),c=g.useRef([]),p=g.useRef([]),s=g.useContext(z),x=ce(),m=de(),j=ue(),C=xe(),y=j!=null,{floatingStyles:q,refs:K,context:k}=he({nodeId:m,open:l,onOpenChange:u,placement:y?"right-start":r?"bottom-start":"bottom",middleware:[pe({mainAxis:y?0:4,alignmentAxis:y?-4:0}),me(),ge()],whileElementsMounted:ye}),{isMounted:P,styles:$}=fe(k,{common:({side:M})=>({transformOrigin:{top:"bottom",bottom:"top",left:"right",right:"left"}[M]}),initial:{transform:"translateY(-5%)",opacity:0},duration:200,open:{opacity:1,transform:"translateY(0%)"},close:{opacity:0,transform:"translateY(-5%)"}}),B=je(k,{enabled:y,handleClose:ke({blockPointerEvents:!0})}),G=be(k,{event:"mousedown",toggle:!y,ignoreMouse:y}),J=we(k,{role:"menu"}),Q=Ne(k,{bubbles:!0}),W=Ce(k,{listRef:c,activeIndex:h,nested:y,onNavigate:t}),X=Me(k,{listRef:p,onMatch:l?t:void 0,activeIndex:h}),{getReferenceProps:Z,getFloatingProps:v,getItemProps:ee}=Ee([B,G,J,Q,W,X]),I=()=>{u(!1)};g.useEffect(()=>{if(!x)return;function M(){I()}function A(H){H.nodeId!==m&&H.parentId===j&&I()}return x.events.on("click",M),x.events.on("menuopen",A),()=>{x.events.off("click",M),x.events.off("menuopen",A)}},[x,m,j]),g.useEffect(()=>{l&&x&&x.events.emit("menuopen",{parentId:j,nodeId:m})},[x,l,m,j]);const te=Ie([K.setReference,C.ref]),se={...Z(s.getItemProps({...n,onFocus(){a(!1),s.setHasFocusInside(!0)}}))};return e.jsx(Le,{children:e.jsxs(Fe,{id:m,children:[o==null?void 0:o({ref:te,props:se,hasFocusInside:d,isOpen:P}),e.jsx(z.Provider,{value:{activeIndex:h,setActiveIndex:t,getItemProps:ee,setHasFocusInside:a,isOpen:l},children:e.jsx(Te,{elementsRef:c,labelsRef:p,children:P&&e.jsx(Ke,{children:e.jsx(Pe,{context:k,modal:!1,initialFocus:y?-1:0,returnFocus:!y,children:e.jsx("div",{ref:K.setFloating,style:q,className:"outline-none z-30",...v(),children:i==null?void 0:i({styles:$,handleDropdownClose:I})})})})})})]})})},T={1:{grid:"grid-cols-1",width:"w-[150px]"},2:{grid:"grid-cols-2",width:"w-[350px]"},3:{grid:"grid-cols-3",width:"w-[750px]"},4:{grid:"grid-cols-4",width:"w-[950px]"},5:{grid:"grid-cols-5",width:"w-[1150px]"}},V=({children:n,className:i,active:o,...r})=>e.jsx("div",{className:f("cursor-pointer font-semibold px-3 rounded-lg flex items-center w-full whitespace-nowrap gap-x-2 transition-colors duration-150 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800",o&&"bg-gray-100 dark:bg-gray-800",i),role:"menuitem",...r,children:n}),D=({icon:n})=>typeof n!="string"&&!n?e.jsx(e.Fragment,{}):e.jsx(e.Fragment,{children:w[n]&&e.jsx("span",{className:"text-xl",children:w[n]||e.jsx(N,{})})}),S=({path:n,isExternalLink:i,onClick:o,icon:r,title:l,description:u,active:d})=>e.jsx(E,{path:n,isExternalLink:i,className:"gap-2",onClick:o,children:e.jsxs(V,{className:"py-2 px-2 gap-3",active:d,children:[e.jsx("div",{children:e.jsx(Y,{className:f("bg-white dark:bg-transparent p-2 border-2 border-gray-200 dark:border-gray-600",d?"text-primary":"heading-text"),size:40,icon:r,shape:"round"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"heading-text font-bold",children:l}),e.jsx("div",{className:"text-xs truncate",children:u})]})]})}),Se=n=>{var h;const{navigationTree:i,t:o,onDropdownClose:r,columns:l=1,showColumnTitle:u=!0,routeKey:d,userAuthority:a}=n;return e.jsxs("div",{className:"flex max-w-[1400px] w-full",children:[e.jsx("div",{className:f("grid gap-y-6 gap-x-8 p-6 flex-1",(h=T[l])==null?void 0:h.grid),children:i.map(t=>t.subMenu.length>0?e.jsx(b,{userAuthority:a,authority:t.authority,children:e.jsxs("div",{className:"max-w-[250px]",children:[u&&e.jsx("div",{className:"heading-text font-bold mb-2",children:o(t.translateKey,t.title)}),t.subMenu.map(c=>{var p,s,x,m;return e.jsx(b,{userAuthority:a,authority:c.authority,children:e.jsx("div",{children:e.jsx(S,{path:c.path,isExternalLink:c.isExternalLink,icon:w[c.icon]||e.jsx(N,{}),title:o(c.translateKey,c.title),description:o(((s=(p=c.meta)==null?void 0:p.description)==null?void 0:s.translateKey)||"",((m=(x=c.meta)==null?void 0:x.description)==null?void 0:m.label)||""),active:c.key===d,onClick:r})},c.key)},c.key)})]})},t.key):null)}),i.some(t=>t.type===L)&&e.jsx("div",{className:f("ltr:border-l rtl:border-r border-gray-200 dark:border-gray-800 min-w-[280px] p-4 flex flex-col"),children:i.map(t=>{var c,p,s,x;return t.subMenu.length===0&&t.type===L?e.jsx(b,{userAuthority:a,authority:t.authority,children:e.jsx(S,{path:t.path,isExternalLink:t.isExternalLink,icon:w[t.icon]||e.jsx(N,{}),title:o(t.translateKey,t.title),description:o(((p=(c=t.meta)==null?void 0:c.description)==null?void 0:p.translateKey)||"",((x=(s=t.meta)==null?void 0:s.description)==null?void 0:x.label)||""),active:t.key===d,onClick:r},t.key)},t.key):null})})]})},_=({navigationTree:n,t:i,onDropdownClose:o,routeKey:r,userAuthority:l})=>{const u=(d,a)=>{const h=a+1;return e.jsx("div",{className:f(a===0&&"p-3"),children:d.map(t=>e.jsx(b,{userAuthority:l,authority:t.authority,children:e.jsxs("ul",{children:[t.type===L&&e.jsx(R.Item,{active:r===t.key,children:e.jsxs(E,{path:t.path,isExternalLink:t.isExternalLink,className:"gap-2 h-full",onClick:o,children:[e.jsx(D,{icon:t.icon}),e.jsx("span",{children:i(t.translateKey,t.title)})]})}),t.type===U&&e.jsx(R,{renderTitle:e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(D,{icon:t.icon}),e.jsx("span",{children:i(t.translateKey,t.title)})]}),children:t.subMenu&&t.subMenu.length>0&&u(t.subMenu,h)})]})},t.key))})};return e.jsx(e.Fragment,{children:u(n,0)})},_e=({navigationTree:n,t:i,onDropdownClose:o,columns:r,routeKey:l,userAuthority:u,routeParentKey:d})=>{var t,c,p;const[a,h]=g.useState(n.some(s=>s.key===d)?d:n[0].key);return e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"p-4",children:n.map(s=>{var x,m,j,C;return s.subMenu.length>0?e.jsx(b,{userAuthority:u,authority:s.authority,children:e.jsx("div",{className:"min-w-[250px]",children:e.jsx("div",{children:e.jsxs(V,{className:"py-2 px-2 gap-3",active:s.key===a,onClick:()=>h(s.key),children:[e.jsx("div",{children:e.jsx(Y,{className:f("bg-white dark:bg-transparent p-2 border-2 border-gray-200 dark:border-gray-600",s.key===l?"text-primary":"heading-text"),size:40,icon:w[s.icon]||e.jsx(N,{}),shape:"round"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"heading-text font-bold",children:i(s.translateKey,s.title)}),e.jsx("div",{className:"text-xs truncate",children:i(((m=(x=s.meta)==null?void 0:x.description)==null?void 0:m.translateKey)||"",((C=(j=s.meta)==null?void 0:j.description)==null?void 0:C.label)||"")})]})]})},s.key)})},s.key):null})}),n.some(s=>s.key===a&&s.type===U)&&e.jsx("div",{className:"ltr:border-l rtl:border-r border-gray-200 dark:border-gray-800 p-6",children:e.jsx("div",{className:f("grid gap-x-8 flex-1",(t=T[r])==null?void 0:t.grid,(c=T[r])==null?void 0:c.width),children:(p=n.find(s=>s.key===a))==null?void 0:p.subMenu.map(s=>e.jsx(b,{userAuthority:u,authority:s.authority,children:e.jsx(E,{path:s.path,isExternalLink:s.isExternalLink,className:"gap-2 group",onClick:()=>o(),children:e.jsxs("div",{className:f("flex items-center gap-2 h-[42px] heading-text group-hover:text-primary",l===s.key&&"text-primary"),children:[e.jsx("span",{className:"text-xl",children:w[s.icon]||e.jsx(N,{})}),e.jsx("span",{children:i(s.translateKey,s.title)})]})})},s.key))})})]})},Oe=n=>{const{style:i,navigationTree:o,layoutMeta:r,...l}=n;return e.jsxs("div",{className:"rounded-2xl bg-white dark:bg-gray-900 ring-0 shadow-[0px_48px_64px_-16px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-gray-800 focus:outline-none min-w-[180px]",style:i,children:[(r==null?void 0:r.layout)==="default"&&e.jsx(_,{navigationTree:o,...l}),(r==null?void 0:r.layout)==="columns"&&e.jsx(Se,{navigationTree:o,columns:r.columns,showColumnTitle:r.showColumnTitle,...l}),(r==null?void 0:r.layout)==="tabs"&&e.jsx(_e,{navigationTree:o,columns:r.columns,...l}),!r&&e.jsx(_,{navigationTree:o,...l})]})},Ye=n=>{const{routeKey:i,navigationTree:o=[],translationSetup:r,userAuthority:l}=n,{t:u}=He(!r),{activedRoute:d}=Re(o,i);return e.jsx("div",{className:"flex gap-1",children:o.map(a=>{var h,t;return e.jsx(b,{userAuthority:l,authority:a.authority,children:a.subMenu.length>0?e.jsx(De,{dropdownLean:((t=(h=a.meta)==null?void 0:h.horizontalMenu)==null?void 0:t.layout)==="default",triggerContent:({ref:c,props:p})=>e.jsx(F,{ref:c,...p,asElement:"button",children:e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("span",{children:u(a.translateKey,a.title)}),e.jsx(Ae,{})]})}),menuContent:({styles:c,handleDropdownClose:p})=>{var s;return e.jsx(Oe,{style:c,navigationTree:a.subMenu,t:u,layoutMeta:(s=a==null?void 0:a.meta)==null?void 0:s.horizontalMenu,routeKey:i,routeParentKey:d==null?void 0:d.parentKey,userAuthority:l,onDropdownClose:p})}}):e.jsx(F,{...n,path:a.path,isExternalLink:a.isExternalLink,active:(d==null?void 0:d.key)===a.key,asElement:"a",children:e.jsx("div",{className:"flex items-center gap-1",children:e.jsx("span",{children:u(a.translateKey,a.title)})})})},a.key)})})},Ge=({translationSetup:n=!0})=>{const i=ie(r=>r.currentRouteKey),o=ae(r=>r.user.authority);return e.jsx(Ye,{navigationTree:ze,routeKey:i,userAuthority:o||[],translationSetup:n})};export{Be as H,Ge as a};
