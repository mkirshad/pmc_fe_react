import{u as ne,j as e,d as Y,e as oe,y as ie,r as g,f,k as ae,l as R}from"./index-BBnKa-Tf.js";import{L as le}from"./Logo-BACZAys9.js";import{u as ce,a as de,b as ue,c as xe,d as he,e as pe,f as me,s as ge,g as ye,h as fe,i as je,j as ke,k as be,l as we,m as Ne,F as Ce,n as Me,o as Ee,p as Ie,q as Le,r as Fe,t as Te,v as Ke,w as Ae,A as U}from"./index-BUPnm9L7.js";import{A as b,n as w,b as L,g as G,D as z,d as Pe,a as He,e as Re}from"./Notification-CvsDLL4B.js";import{T as N,a as ze}from"./toast-C3C8AalC.js";const Je=({mode:n})=>{const a=ne(o=>o.mode);return e.jsx(Y,{to:oe.authenticatedEntryPath,children:e.jsx(le,{imgClass:"max-h-10",mode:n||a,className:"hidden lg:block"})})},E=({path:n,children:a,isExternalLink:o,className:r,onClick:i})=>e.jsx(Y,{className:ie("w-full flex items-center outline-0",r),to:n,target:o?"_blank":"",onClick:i,children:a}),F=g.forwardRef((n,a)=>{const{className:o,active:r,asElement:i="button",...u}=n,d={className:f("font-semibold inline-flex h-9 w-max items-center justify-center rounded-lg bg-background px-4 py-2 dark:text-gray-300 dark:hover:text-gray-100 text-gray-900 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors",o,r&&"bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20")};if(i==="a"){const{path:l,isExternalLink:h,...t}=u;return e.jsx(E,{path:l,isExternalLink:h,...d,...t})}return i==="button"?e.jsx("button",{ref:a,...d,...u}):e.jsx(e.Fragment,{})});F.displayName="HorizontalMenuDropdownTrigger";const D=g.createContext({getItemProps:()=>({}),activeIndex:null,setActiveIndex:()=>{},setHasFocusInside:()=>{},isOpen:!1}),De=n=>{const{menuContent:a,triggerContent:o,dropdownLean:r}=n,[i,u]=g.useState(!1),[d,l]=g.useState(!1),[h,t]=g.useState(null),c=g.useRef([]),p=g.useRef([]),s=g.useContext(D),x=ce(),m=de(),j=ue(),C=xe(),y=j!=null,{floatingStyles:q,refs:K,context:k}=he({nodeId:m,open:i,onOpenChange:u,placement:y?"right-start":r?"bottom-start":"bottom",middleware:[Te({mainAxis:y?0:4,alignmentAxis:y?-4:0}),Ke(),Ae()],whileElementsMounted:Fe}),{isMounted:A,styles:B}=pe(k,{common:({side:M})=>({transformOrigin:{top:"bottom",bottom:"top",left:"right",right:"left"}[M]}),initial:{transform:"translateY(-5%)",opacity:0},duration:200,open:{opacity:1,transform:"translateY(0%)"},close:{opacity:0,transform:"translateY(-5%)"}}),J=me(k,{enabled:y,handleClose:ge({blockPointerEvents:!0})}),Q=ye(k,{event:"mousedown",toggle:!y,ignoreMouse:y}),W=fe(k,{role:"menu"}),X=je(k,{bubbles:!0}),Z=ke(k,{listRef:c,activeIndex:h,nested:y,onNavigate:t}),$=be(k,{listRef:p,onMatch:i?t:void 0,activeIndex:h}),{getReferenceProps:v,getFloatingProps:ee,getItemProps:te}=we([J,Q,W,X,Z,$]),I=()=>{u(!1)};g.useEffect(()=>{if(!x)return;function M(){I()}function P(H){H.nodeId!==m&&H.parentId===j&&I()}return x.events.on("click",M),x.events.on("menuopen",P),()=>{x.events.off("click",M),x.events.off("menuopen",P)}},[x,m,j]),g.useEffect(()=>{i&&x&&x.events.emit("menuopen",{parentId:j,nodeId:m})},[x,i,m,j]);const se=Ne([K.setReference,C.ref]),re={...v(s.getItemProps({...n,onFocus(){l(!1),s.setHasFocusInside(!0)}}))};return e.jsx(Ce,{children:e.jsxs(Me,{id:m,children:[o==null?void 0:o({ref:se,props:re,hasFocusInside:d,isOpen:A}),e.jsx(D.Provider,{value:{activeIndex:h,setActiveIndex:t,getItemProps:te,setHasFocusInside:l,isOpen:i},children:e.jsx(Ee,{elementsRef:c,labelsRef:p,children:A&&e.jsx(Ie,{children:e.jsx(Le,{context:k,modal:!1,initialFocus:y?-1:0,returnFocus:!y,children:e.jsx("div",{ref:K.setFloating,style:q,className:"outline-none z-30",...ee(),children:a==null?void 0:a({styles:B,handleDropdownClose:I})})})})})})]})})},T={1:{grid:"grid-cols-1",width:"w-[150px]"},2:{grid:"grid-cols-2",width:"w-[350px]"},3:{grid:"grid-cols-3",width:"w-[750px]"},4:{grid:"grid-cols-4",width:"w-[950px]"},5:{grid:"grid-cols-5",width:"w-[1150px]"}},V=({children:n,className:a,active:o,...r})=>e.jsx("div",{className:f("cursor-pointer font-semibold px-3 rounded-lg flex items-center w-full whitespace-nowrap gap-x-2 transition-colors duration-150 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800",o&&"bg-gray-100 dark:bg-gray-800",a),role:"menuitem",...r,children:n}),S=({icon:n})=>typeof n!="string"&&!n?e.jsx(e.Fragment,{}):e.jsx(e.Fragment,{children:w[n]&&e.jsx("span",{className:"text-xl",children:w[n]||e.jsx(N,{})})}),_=({path:n,isExternalLink:a,onClick:o,icon:r,title:i,description:u,active:d})=>e.jsx(E,{path:n,isExternalLink:a,className:"gap-2",onClick:o,children:e.jsxs(V,{className:"py-2 px-2 gap-3",active:d,children:[e.jsx("div",{children:e.jsx(U,{className:f("bg-white dark:bg-transparent p-2 border-2 border-gray-200 dark:border-gray-600",d?"text-primary":"heading-text"),size:40,icon:r,shape:"round"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"heading-text font-bold",children:i}),e.jsx("div",{className:"text-xs truncate",children:u})]})]})}),Se=n=>{var h;const{navigationTree:a,t:o,onDropdownClose:r,columns:i=1,showColumnTitle:u=!0,routeKey:d,userAuthority:l}=n;return e.jsxs("div",{className:"flex max-w-[1400px] w-full",children:[e.jsx("div",{className:f("grid gap-y-6 gap-x-8 p-6 flex-1",(h=T[i])==null?void 0:h.grid),children:a.map(t=>t.subMenu.length>0?e.jsx(b,{userAuthority:l,authority:t.authority,children:e.jsxs("div",{className:"max-w-[250px]",children:[u&&e.jsx("div",{className:"heading-text font-bold mb-2",children:o(t.translateKey,t.title)}),t.subMenu.map(c=>{var p,s,x,m;return e.jsx(b,{userAuthority:l,authority:c.authority,children:e.jsx("div",{children:e.jsx(_,{path:c.path,isExternalLink:c.isExternalLink,icon:w[c.icon]||e.jsx(N,{}),title:o(c.translateKey,c.title),description:o(((s=(p=c.meta)==null?void 0:p.description)==null?void 0:s.translateKey)||"",((m=(x=c.meta)==null?void 0:x.description)==null?void 0:m.label)||""),active:c.key===d,onClick:r})},c.key)},c.key)})]})},t.key):null)}),a.some(t=>t.type===L)&&e.jsx("div",{className:f("ltr:border-l rtl:border-r border-gray-200 dark:border-gray-800 min-w-[280px] p-4 flex flex-col"),children:a.map(t=>{var c,p,s,x;return t.subMenu.length===0&&t.type===L?e.jsx(b,{userAuthority:l,authority:t.authority,children:e.jsx(_,{path:t.path,isExternalLink:t.isExternalLink,icon:w[t.icon]||e.jsx(N,{}),title:o(t.translateKey,t.title),description:o(((p=(c=t.meta)==null?void 0:c.description)==null?void 0:p.translateKey)||"",((x=(s=t.meta)==null?void 0:s.description)==null?void 0:x.label)||""),active:t.key===d,onClick:r},t.key)},t.key):null})})]})},O=({navigationTree:n,t:a,onDropdownClose:o,routeKey:r,userAuthority:i})=>{const u=(d,l)=>{const h=l+1;return e.jsx("div",{className:f(l===0&&"p-3"),children:d.map(t=>e.jsx(b,{userAuthority:i,authority:t.authority,children:e.jsxs("ul",{children:[t.type===L&&e.jsx(z.Item,{active:r===t.key,children:e.jsxs(E,{path:t.path,isExternalLink:t.isExternalLink,className:"gap-2 h-full",onClick:o,children:[e.jsx(S,{icon:t.icon}),e.jsx("span",{children:a(t.translateKey,t.title)})]})}),t.type===G&&e.jsx(z,{renderTitle:e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(S,{icon:t.icon}),e.jsx("span",{children:a(t.translateKey,t.title)})]}),children:t.subMenu&&t.subMenu.length>0&&u(t.subMenu,h)})]})},t.key))})};return e.jsx(e.Fragment,{children:u(n,0)})},_e=({navigationTree:n,t:a,onDropdownClose:o,columns:r,routeKey:i,userAuthority:u,routeParentKey:d})=>{var t,c,p;const[l,h]=g.useState(n.some(s=>s.key===d)?d:n[0].key);return e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"p-4",children:n.map(s=>{var x,m,j,C;return s.subMenu.length>0?e.jsx(b,{userAuthority:u,authority:s.authority,children:e.jsx("div",{className:"min-w-[250px]",children:e.jsx("div",{children:e.jsxs(V,{className:"py-2 px-2 gap-3",active:s.key===l,onClick:()=>h(s.key),children:[e.jsx("div",{children:e.jsx(U,{className:f("bg-white dark:bg-transparent p-2 border-2 border-gray-200 dark:border-gray-600",s.key===i?"text-primary":"heading-text"),size:40,icon:w[s.icon]||e.jsx(N,{}),shape:"round"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"heading-text font-bold",children:a(s.translateKey,s.title)}),e.jsx("div",{className:"text-xs truncate",children:a(((m=(x=s.meta)==null?void 0:x.description)==null?void 0:m.translateKey)||"",((C=(j=s.meta)==null?void 0:j.description)==null?void 0:C.label)||"")})]})]})},s.key)})},s.key):null})}),n.some(s=>s.key===l&&s.type===G)&&e.jsx("div",{className:"ltr:border-l rtl:border-r border-gray-200 dark:border-gray-800 p-6",children:e.jsx("div",{className:f("grid gap-x-8 flex-1",(t=T[r])==null?void 0:t.grid,(c=T[r])==null?void 0:c.width),children:(p=n.find(s=>s.key===l))==null?void 0:p.subMenu.map(s=>e.jsx(b,{userAuthority:u,authority:s.authority,children:e.jsx(E,{path:s.path,isExternalLink:s.isExternalLink,className:"gap-2 group",onClick:()=>o(),children:e.jsxs("div",{className:f("flex items-center gap-2 h-[42px] heading-text group-hover:text-primary",i===s.key&&"text-primary"),children:[e.jsx("span",{className:"text-xl",children:w[s.icon]||e.jsx(N,{})}),e.jsx("span",{children:a(s.translateKey,s.title)})]})})},s.key))})})]})},Oe=n=>{const{style:a,navigationTree:o,layoutMeta:r,...i}=n;return e.jsxs("div",{className:"rounded-2xl bg-white dark:bg-gray-900 ring-0 shadow-[0px_48px_64px_-16px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-gray-800 focus:outline-none min-w-[180px]",style:a,children:[(r==null?void 0:r.layout)==="default"&&e.jsx(O,{navigationTree:o,...i}),(r==null?void 0:r.layout)==="columns"&&e.jsx(Se,{navigationTree:o,columns:r.columns,showColumnTitle:r.showColumnTitle,...i}),(r==null?void 0:r.layout)==="tabs"&&e.jsx(_e,{navigationTree:o,columns:r.columns,...i}),!r&&e.jsx(O,{navigationTree:o,...i})]})},Ye=n=>{const{routeKey:a,navigationTree:o=[],translationSetup:r,userAuthority:i}=n,{t:u}=Pe(!r),{activedRoute:d}=He(o,a);return e.jsx("div",{className:"flex gap-1",children:o.map(l=>{var h,t;return e.jsx(b,{userAuthority:i,authority:l.authority,children:l.subMenu.length>0?e.jsx(De,{dropdownLean:((t=(h=l.meta)==null?void 0:h.horizontalMenu)==null?void 0:t.layout)==="default",triggerContent:({ref:c,props:p})=>e.jsx(F,{ref:c,...p,asElement:"button",children:e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("span",{children:u(l.translateKey,l.title)}),e.jsx(ze,{})]})}),menuContent:({styles:c,handleDropdownClose:p})=>{var s;return e.jsx(Oe,{style:c,navigationTree:l.subMenu,t:u,layoutMeta:(s=l==null?void 0:l.meta)==null?void 0:s.horizontalMenu,routeKey:a,routeParentKey:d==null?void 0:d.parentKey,userAuthority:i,onDropdownClose:p})}}):e.jsx(F,{...n,path:l.path,isExternalLink:l.isExternalLink,active:(d==null?void 0:d.key)===l.key,asElement:"a",children:e.jsx("div",{className:"flex items-center gap-1",children:e.jsx("span",{children:u(l.translateKey,l.title)})})})},l.key)})})},Qe=({translationSetup:n=!0})=>{const a=ae(i=>i.currentRouteKey),o=R(i=>i.user.authority),r=R(i=>i.fetchUserGroups);return console.log("its here kkj"),g.useEffect(()=>{console.log("userAuthority",o),r()},[]),e.jsx(Ye,{navigationTree:Re,routeKey:a,userAuthority:o||[],translationSetup:n})};export{Qe as H,Je as a};
