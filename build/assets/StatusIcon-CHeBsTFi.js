import{r,j as i,au as ne,x as K,G as c,C as oe,R as b,O as $,K as V}from"./index-QAdcP4cp.js";import{M as ie,u as X,P as ae,a as se,L as le}from"./proxy-n5qVji6A.js";class ce extends r.Component{getSnapshotBeforeUpdate(s){const n=this.props.childRef.current;if(n&&s.isPresent&&!this.props.isPresent){const t=this.props.sizeRef.current;t.height=n.offsetHeight||0,t.width=n.offsetWidth||0,t.top=n.offsetTop,t.left=n.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function ue({children:e,isPresent:s}){const n=r.useId(),t=r.useRef(null),u=r.useRef({width:0,height:0,top:0,left:0}),{nonce:a}=r.useContext(ie);return r.useInsertionEffect(()=>{const{width:f,height:o,top:m,left:C}=u.current;if(s||!t.current||!f||!o)return;t.current.dataset.motionPopId=n;const l=document.createElement("style");return a&&(l.nonce=a),document.head.appendChild(l),l.sheet&&l.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${f}px !important;
            height: ${o}px !important;
            top: ${m}px !important;
            left: ${C}px !important;
          }
        `),()=>{document.head.removeChild(l)}},[s]),i.jsx(ce,{isPresent:s,childRef:t,sizeRef:u,children:r.cloneElement(e,{ref:t})})}const de=({children:e,initial:s,isPresent:n,onExitComplete:t,custom:u,presenceAffectsLayout:a,mode:f})=>{const o=X(he),m=r.useId(),C=r.useCallback(d=>{o.set(d,!0);for(const x of o.values())if(!x)return;t&&t()},[o,t]),l=r.useMemo(()=>({id:m,initial:s,isPresent:n,custom:u,onExitComplete:C,register:d=>(o.set(d,!1),()=>o.delete(d))}),a?[Math.random(),C]:[n,C]);return r.useMemo(()=>{o.forEach((d,x)=>o.set(x,!1))},[n]),r.useEffect(()=>{!n&&!o.size&&t&&t()},[n]),f==="popLayout"&&(e=i.jsx(ue,{isPresent:n,children:e})),i.jsx(ae.Provider,{value:l,children:e})};function he(){return new Map}const H=e=>e.key||"";function D(e){const s=[];return r.Children.forEach(e,n=>{r.isValidElement(n)&&s.push(n)}),s}const je=({children:e,exitBeforeEnter:s,custom:n,initial:t=!0,onExitComplete:u,presenceAffectsLayout:a=!0,mode:f="sync"})=>{const o=r.useMemo(()=>D(e),[e]),m=o.map(H),C=r.useRef(!0),l=r.useRef(o),d=X(()=>new Map),[x,I]=r.useState(o),[v,L]=r.useState(o);se(()=>{C.current=!1,l.current=o;for(let p=0;p<v.length;p++){const h=H(v[p]);m.includes(h)?d.delete(h):d.get(h)!==!0&&d.set(h,!1)}},[v,m.length,m.join("-")]);const w=[];if(o!==x){let p=[...o];for(let h=0;h<v.length;h++){const k=v[h],j=H(k);m.includes(j)||(p.splice(h,0,k),w.push(k))}f==="wait"&&w.length&&(p=w),L(D(p)),I(o);return}const{forceRender:y}=r.useContext(le);return i.jsx(i.Fragment,{children:v.map(p=>{const h=H(p),k=o===v||m.includes(h),j=()=>{if(d.has(h))d.set(h,!0);else return;let M=!0;d.forEach(S=>{S||(M=!1)}),M&&(y==null||y(),L(l.current),u&&u())};return i.jsx(de,{isPresent:k,initial:!C.current||t?void 0:!1,custom:k?void 0:n,presenceAffectsLayout:a,mode:f,onExitComplete:k?void 0:j,children:p},h)})})};function R(...e){return ne(K(e))}function fe(e){return c({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"},child:[]}]})(e)}function ze(e){return c({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"},child:[]}]})(e)}function Re(e){return c({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}function pe(e){return c({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",clipRule:"evenodd"},child:[]}]})(e)}function me(e){return c({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"},child:[]}]})(e)}function ge(e){return c({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"},child:[]}]})(e)}function xe(e){return c({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}function Be(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M11 17l-5-5m0 0l5-5m-5 5h12"},child:[]}]})(e)}function He(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 7l5 5m0 0l-5 5m5-5H6"},child:[]}]})(e)}function Ee(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"},child:[]}]})(e)}function Ie(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},child:[]}]})(e)}function Se(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"},child:[]}]})(e)}function Oe(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},child:[]}]})(e)}function $e(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"},child:[]}]})(e)}function Ne(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"},child:[]}]})(e)}function We(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"},child:[]},{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"},child:[]}]})(e)}function Ae(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},child:[]}]})(e)}function Fe(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"},child:[]}]})(e)}function Pe(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 12h16M4 18h7"},child:[]}]})(e)}function Ge(e){return c({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 12h16M4 18h16"},child:[]}]})(e)}const Ce=r.forwardRef((e,s)=>{const{absolute:n,className:t,resetDefaultClass:u,...a}=e,o=K(!u&&"close-button button-press-feedback",n&&"absolute z-10",t);return i.jsx("button",{ref:s,className:o,type:"button",...a,children:i.jsx(xe,{})})});Ce.displayName="CloseButton";const N=r.createContext(null),Te=N.Provider,Ve=N.Consumer;function ve(){return r.useContext(N)}const W=r.createContext(null),De=W.Provider;W.Consumer;function Ke(){return r.useContext(W)}const A=r.createContext(null),Xe=A.Provider,Ue=A.Consumer;function ke(){return r.useContext(A)}const E={round:"rounded-xl",circle:"rounded-full",none:"rounded-none"},be=r.forwardRef((e,s)=>{var P,G,T;const{asElement:n="button",active:t=!1,block:u=!1,children:a,className:f,clickFeedback:o=!0,customColorClass:m,disabled:C,icon:l,loading:d=!1,shape:x="round",size:I,variant:v="default",iconAlignment:L="start",...w}=e,{controlSize:y,ui:p}=oe(),h=(P=ve())==null?void 0:P.size,k=(G=ke())==null?void 0:G.size,j="button",M="inline-flex items-center justify-center",S=I||k||h||y,U=!((T=p==null?void 0:p.button)!=null&&T.disableClickFeedback)||o,B=C||d,Z=()=>{let g="";switch(S){case $.LG:g=R(b.lg.h,E[x],l&&!a?`${b.lg.w} ${M} text-2xl`:"px-8 py-2 text-base");break;case $.SM:g=R(b.sm.h,x==="round"?"rounded-xl":E[x],l&&!a?`${b.sm.w} ${M} text-lg`:"px-3 py-2 text-sm");break;case $.XS:g=R(b.xs.h,x==="round"?"rounded-lg":E[x],l&&!a?`${b.xs.w} ${M} text-base`:"px-3 py-1 text-xs");break;default:g=R(b.md.h,E[x],l&&!a?`${b.md.w} ${M} text-xl`:"px-5 py-2");break}return g},_="opacity-50 cursor-not-allowed",q=()=>O({bgColor:t?"bg-primary-deep":"bg-primary",textColor:"text-neutral",hoverColor:t?"":"hover:bg-primary-mild",activeColor:""}),J=()=>O({bgColor:t?"":"dark:primary-mild dark:bg-opacity-20",textColor:"",hoverColor:t?"":"hover:text-primary-mild",activeColor:"dark:active:primary-mild dark:active:bg-opacity-40"}),F=()=>O({bgColor:t?"bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500":"bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700",textColor:"text-gray-600 dark:text-gray-100",hoverColor:t?"":"ring-primary dark:ring-white hover:border-primary dark:hover:border-white hover:ring-1 hover:text-primary dark:hover:text-white dark:hover:bg-transparent",activeColor:""}),O=({bgColor:g,hoverColor:z,activeColor:te,textColor:re})=>`${g} ${B?_:z+" "+te} ${re}`,Q=R(j,(()=>{switch(v){case"solid":return q();case"plain":return J();case"default":return F();default:return F()}})(),Z(),f,u?"w-full":"",U&&!B&&"button-press-feedback",m==null?void 0:m({active:t,unclickable:B})),Y=g=>{const{onClick:z}=e;if(B){g.preventDefault();return}z==null||z(g)},ee=()=>d&&a?i.jsxs("span",{className:"flex items-center justify-center",children:[i.jsx(V,{enableTheme:!1,className:"mr-1"}),a]}):l&&!a&&d?i.jsx(V,{enableTheme:!1}):l&&!a&&!d?i.jsx(i.Fragment,{children:l}):l&&a&&!d?i.jsxs("span",{className:"flex gap-1 items-center justify-center",children:[L==="start"&&i.jsx("span",{className:"text-lg",children:l}),i.jsx("span",{children:a}),L==="end"&&i.jsx("span",{className:"text-lg",children:l})]}):i.jsx(i.Fragment,{children:a});return i.jsx(n,{ref:s,className:Q,...w,onClick:Y,children:ee()})});be.displayName="Button";function Ze(e,s=0,n=!0){const t=r.useRef(),u=r.useRef(e),a=r.useCallback(()=>{t.current&&clearTimeout(t.current)},[]),f=r.useCallback(()=>{t.current&&clearTimeout(t.current),n&&(t.current=setTimeout(()=>{var o;(o=u.current)==null||o.call(u)},s))},[s,n]);return r.useEffect(()=>{u.current=e},[e]),r.useEffect(()=>(f(),a),[s,n,f,a]),{clear:a,reset:f}}const Me={success:{color:"text-success",icon:i.jsx(fe,{})},info:{color:"text-info",icon:i.jsx(me,{})},warning:{color:"text-warning",icon:i.jsx(pe,{})},danger:{color:"text-error",icon:i.jsx(ge,{})}},_e=e=>{const{type:s="info",custom:n,iconColor:t}=e,u=Me[s];return i.jsx("span",{className:`text-2xl ${t||u.color}`,children:n||u.icon})};export{je as A,be as B,Ce as C,Ae as D,Te as F,Be as H,Xe as I,_e as S,He as a,Ge as b,R as c,Pe as d,Ue as e,ke as f,Se as g,Ee as h,Ie as i,Fe as j,Ne as k,We as l,Ze as m,fe as n,me as o,pe as p,ge as q,ze as r,Ke as s,Re as t,ve as u,xe as v,Ve as w,De as x,$e as y,Oe as z};
