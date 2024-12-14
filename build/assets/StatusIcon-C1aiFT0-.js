import{r,j as i,at as ne,x as X,G as h,C as oe,R as b,O as N,K as D}from"./index-CGvqLpWI.js";import{M as ie,u as U,P as se,a as ae,L as le}from"./proxy-DxsW8ZQM.js";class ce extends r.Component{getSnapshotBeforeUpdate(a){const n=this.props.childRef.current;if(n&&a.isPresent&&!this.props.isPresent){const t=this.props.sizeRef.current;t.height=n.offsetHeight||0,t.width=n.offsetWidth||0,t.top=n.offsetTop,t.left=n.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function ue({children:e,isPresent:a}){const n=r.useId(),t=r.useRef(null),c=r.useRef({width:0,height:0,top:0,left:0}),{nonce:s}=r.useContext(ie);return r.useInsertionEffect(()=>{const{width:f,height:o,top:m,left:C}=c.current;if(a||!t.current||!f||!o)return;t.current.dataset.motionPopId=n;const l=document.createElement("style");return s&&(l.nonce=s),document.head.appendChild(l),l.sheet&&l.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${f}px !important;
            height: ${o}px !important;
            top: ${m}px !important;
            left: ${C}px !important;
          }
        `),()=>{document.head.removeChild(l)}},[a]),i.jsx(ce,{isPresent:a,childRef:t,sizeRef:c,children:r.cloneElement(e,{ref:t})})}const de=({children:e,initial:a,isPresent:n,onExitComplete:t,custom:c,presenceAffectsLayout:s,mode:f})=>{const o=U(he),m=r.useId(),C=r.useCallback(u=>{o.set(u,!0);for(const g of o.values())if(!g)return;t&&t()},[o,t]),l=r.useMemo(()=>({id:m,initial:a,isPresent:n,custom:c,onExitComplete:C,register:u=>(o.set(u,!1),()=>o.delete(u))}),s?[Math.random(),C]:[n,C]);return r.useMemo(()=>{o.forEach((u,g)=>o.set(g,!1))},[n]),r.useEffect(()=>{!n&&!o.size&&t&&t()},[n]),f==="popLayout"&&(e=i.jsx(ue,{isPresent:n,children:e})),i.jsx(se.Provider,{value:l,children:e})};function he(){return new Map}const E=e=>e.key||"";function K(e){const a=[];return r.Children.forEach(e,n=>{r.isValidElement(n)&&a.push(n)}),a}const je=({children:e,exitBeforeEnter:a,custom:n,initial:t=!0,onExitComplete:c,presenceAffectsLayout:s=!0,mode:f="sync"})=>{const o=r.useMemo(()=>K(e),[e]),m=o.map(E),C=r.useRef(!0),l=r.useRef(o),u=U(()=>new Map),[g,I]=r.useState(o),[v,w]=r.useState(o);ae(()=>{C.current=!1,l.current=o;for(let p=0;p<v.length;p++){const d=E(v[p]);m.includes(d)?u.delete(d):u.get(d)!==!0&&u.set(d,!1)}},[v,m.length,m.join("-")]);const M=[];if(o!==g){let p=[...o];for(let d=0;d<v.length;d++){const k=v[d],j=E(k);m.includes(j)||(p.splice(d,0,k),M.push(k))}f==="wait"&&M.length&&(p=M),w(K(p)),I(o);return}const{forceRender:L}=r.useContext(le);return i.jsx(i.Fragment,{children:v.map(p=>{const d=E(p),k=o===v||m.includes(d),j=()=>{if(u.has(d))u.set(d,!0);else return;let y=!0;u.forEach(S=>{S||(y=!1)}),y&&(L==null||L(),w(l.current),c&&c())};return i.jsx(de,{isPresent:k,initial:!C.current||t?void 0:!1,custom:k?void 0:n,presenceAffectsLayout:s,mode:f,onExitComplete:k?void 0:j,children:p},d)})})};function R(...e){return ne(X(e))}function fe(e){return h({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"},child:[]}]})(e)}function ze(e){return h({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"},child:[]}]})(e)}function Re(e){return h({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}function pe(e){return h({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",clipRule:"evenodd"},child:[]}]})(e)}function me(e){return h({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"},child:[]}]})(e)}function xe(e){return h({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"},child:[]}]})(e)}function ge(e){return h({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}function Be(e){return h({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M11 17l-5-5m0 0l5-5m-5 5h12"},child:[]}]})(e)}function Ee(e){return h({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 7l5 5m0 0l-5 5m5-5H6"},child:[]}]})(e)}function He(e){return h({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},child:[]}]})(e)}function Ie(e){return h({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"},child:[]}]})(e)}function Se(e){return h({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"},child:[]}]})(e)}function $e(e){return h({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"},child:[]},{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"},child:[]}]})(e)}function Ne(e){return h({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},child:[]}]})(e)}function Oe(e){return h({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 12h16M4 18h7"},child:[]}]})(e)}function Fe(e){return h({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 12h16M4 18h16"},child:[]}]})(e)}const Ce=r.forwardRef((e,a)=>{const{absolute:n,className:t,resetDefaultClass:c,...s}=e,o=X(!c&&"close-button button-press-feedback",n&&"absolute z-10",t);return i.jsx("button",{ref:a,className:o,type:"button",...s,children:i.jsx(ge,{})})});Ce.displayName="CloseButton";const O=r.createContext(null),Pe=O.Provider,Ae=O.Consumer;function ve(){return r.useContext(O)}const F=r.createContext(null),We=F.Provider;F.Consumer;function Ge(){return r.useContext(F)}const P=r.createContext(null),Te=P.Provider,De=P.Consumer;function ke(){return r.useContext(P)}const H={round:"rounded-xl",circle:"rounded-full",none:"rounded-none"},be=r.forwardRef((e,a)=>{var W,G,T;const{asElement:n="button",active:t=!1,block:c=!1,children:s,className:f,clickFeedback:o=!0,customColorClass:m,disabled:C,icon:l,loading:u=!1,shape:g="round",size:I,variant:v="default",iconAlignment:w="start",...M}=e,{controlSize:L,ui:p}=oe(),d=(W=ve())==null?void 0:W.size,k=(G=ke())==null?void 0:G.size,j="button",y="inline-flex items-center justify-center",S=I||k||d||L,V=!((T=p==null?void 0:p.button)!=null&&T.disableClickFeedback)||o,B=C||u,Z=()=>{let x="";switch(S){case N.LG:x=R(b.lg.h,H[g],l&&!s?`${b.lg.w} ${y} text-2xl`:"px-8 py-2 text-base");break;case N.SM:x=R(b.sm.h,g==="round"?"rounded-xl":H[g],l&&!s?`${b.sm.w} ${y} text-lg`:"px-3 py-2 text-sm");break;case N.XS:x=R(b.xs.h,g==="round"?"rounded-lg":H[g],l&&!s?`${b.xs.w} ${y} text-base`:"px-3 py-1 text-xs");break;default:x=R(b.md.h,H[g],l&&!s?`${b.md.w} ${y} text-xl`:"px-5 py-2");break}return x},_="opacity-50 cursor-not-allowed",q=()=>$({bgColor:t?"bg-primary-deep":"bg-primary",textColor:"text-neutral",hoverColor:t?"":"hover:bg-primary-mild",activeColor:""}),J=()=>$({bgColor:t?"":"dark:primary-mild dark:bg-opacity-20",textColor:"",hoverColor:t?"":"hover:text-primary-mild",activeColor:"dark:active:primary-mild dark:active:bg-opacity-40"}),A=()=>$({bgColor:t?"bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500":"bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700",textColor:"text-gray-600 dark:text-gray-100",hoverColor:t?"":"ring-primary dark:ring-white hover:border-primary dark:hover:border-white hover:ring-1 hover:text-primary dark:hover:text-white dark:hover:bg-transparent",activeColor:""}),$=({bgColor:x,hoverColor:z,activeColor:te,textColor:re})=>`${x} ${B?_:z+" "+te} ${re}`,Q=R(j,(()=>{switch(v){case"solid":return q();case"plain":return J();case"default":return A();default:return A()}})(),Z(),f,c?"w-full":"",V&&!B&&"button-press-feedback",m==null?void 0:m({active:t,unclickable:B})),Y=x=>{const{onClick:z}=e;if(B){x.preventDefault();return}z==null||z(x)},ee=()=>u&&s?i.jsxs("span",{className:"flex items-center justify-center",children:[i.jsx(D,{enableTheme:!1,className:"mr-1"}),s]}):l&&!s&&u?i.jsx(D,{enableTheme:!1}):l&&!s&&!u?i.jsx(i.Fragment,{children:l}):l&&s&&!u?i.jsxs("span",{className:"flex gap-1 items-center justify-center",children:[w==="start"&&i.jsx("span",{className:"text-lg",children:l}),i.jsx("span",{children:s}),w==="end"&&i.jsx("span",{className:"text-lg",children:l})]}):i.jsx(i.Fragment,{children:s});return i.jsx(n,{ref:a,className:Q,...M,onClick:Y,children:ee()})});be.displayName="Button";function Ke(e,a=0,n=!0){const t=r.useRef(),c=r.useRef(e),s=r.useCallback(()=>{t.current&&clearTimeout(t.current)},[]),f=r.useCallback(()=>{t.current&&clearTimeout(t.current),n&&(t.current=setTimeout(()=>{var o;(o=c.current)==null||o.call(c)},a))},[a,n]);return r.useEffect(()=>{c.current=e},[e]),r.useEffect(()=>(f(),s),[a,n,f,s]),{clear:s,reset:f}}const ye={success:{color:"text-success",icon:i.jsx(fe,{})},info:{color:"text-info",icon:i.jsx(me,{})},warning:{color:"text-warning",icon:i.jsx(pe,{})},danger:{color:"text-error",icon:i.jsx(xe,{})}},Xe=e=>{const{type:a="info",custom:n,iconColor:t}=e,c=ye[a];return i.jsx("span",{className:`text-2xl ${t||c.color}`,children:n||c.icon})};export{je as A,be as B,Ce as C,Pe as F,Be as H,Te as I,Xe as S,Ee as a,Fe as b,R as c,Oe as d,De as e,ke as f,Se as g,$e as h,Ke as i,fe as j,me as k,pe as l,xe as m,ze as n,Ge as o,Re as p,ge as q,Ae as r,We as s,Ie as t,ve as u,He as v,Ne as w};
