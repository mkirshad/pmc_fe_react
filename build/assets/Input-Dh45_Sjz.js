import{r as i,C as X,R as Y,y as N,j as f}from"./index-D2VaOOux.js";import{u as tt,c as et,b as nt}from"./Button-K-qNIcnT.js";import{i as R}from"./CloseButton-CuJbWHRs.js";const st=i.forwardRef((a,j)=>{var I,v,z;const{asElement:b="input",className:p,disabled:d,invalid:w,prefix:e,size:E,suffix:n,textArea:l,type:W="text",rows:A,style:m,unstyle:$=!1,...c}=a,[F,L]=i.useState(0),[P,T]=i.useState(0),{controlSize:O,direction:x}=X(),V=(I=tt())==null?void 0:I.size,D=(v=et())==null?void 0:v.invalid,Z=(z=nt())==null?void 0:z.size,h=E||Z||V||O,C=w||D,_=t=>typeof t>"u"||t===null?"":t;"value"in a&&(c.value=_(a.value),delete c.defaultValue);const k="input",q=`input-${h} ${Y[h].h}`,B="focus:ring-primary focus-within:ring-primary focus-within:border-primary focus:border-primary",H=N("input-wrapper",e||n?p:""),J=N(k,!l&&q,!C&&B,!e&&!n?p:"",d&&"input-disabled",C&&"input-invalid",l&&"input-textarea"),u=i.useRef(null),o=i.useRef(null),K=()=>{var s,G;if(!u.current&&!o.current)return;const t=(s=u==null?void 0:u.current)==null?void 0:s.offsetWidth,r=(G=o==null?void 0:o.current)==null?void 0:G.offsetWidth;R(t)&&R(r)||(t&&L(t),r&&T(r))};i.useEffect(()=>{K()},[e,n]);const y=t=>.0625*t,M=()=>{const t=`${y(F)+1}rem`,r=`${y(P)+1}rem`,s={};return x==="ltr"&&(e&&(s.paddingLeft=t),n&&(s.paddingRight=r)),x==="rtl"&&(e&&(s.paddingRight=t),n&&(s.paddingLeft=r)),s},S={className:$?"":J,disabled:d,type:W,ref:j,...c},Q=f.jsx("textarea",{style:m,rows:A,...S}),g=f.jsx(b,{style:{...M(),...m},...S}),U=f.jsxs("span",{className:H,children:[e?f.jsxs("div",{ref:u,className:"input-suffix-start",children:[" ",e," "]}):null,g,n?f.jsx("div",{ref:o,className:"input-suffix-end",children:n}):null]});return l?Q:e||n?U:g});st.displayName="Input";export{st as I};
