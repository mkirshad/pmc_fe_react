import{r as i,E as X,U as Y,y as N,j as f}from"./index-CYtqHYmC.js";import{u as tt,c as et,b as nt}from"./Button-C6ecODYZ.js";import{i as j}from"./isNil-CkmcXcI4.js";const st=i.forwardRef((a,R)=>{var I,v,z;const{asElement:E="input",className:p,disabled:d,invalid:b,prefix:e,size:w,suffix:n,textArea:l,type:W="text",rows:A,style:m,unstyle:$=!1,...c}=a,[F,L]=i.useState(0),[P,T]=i.useState(0),{controlSize:O,direction:x}=X(),V=(I=tt())==null?void 0:I.size,D=(v=et())==null?void 0:v.invalid,U=(z=nt())==null?void 0:z.size,h=w||U||V||O,y=b||D,Z=t=>typeof t>"u"||t===null?"":t;"value"in a&&(c.value=Z(a.value),delete c.defaultValue);const _="input",k=`input-${h} ${Y[h].h}`,q="focus:ring-primary focus-within:ring-primary focus-within:border-primary focus:border-primary",B=N("input-wrapper",e||n?p:""),H=N(_,!l&&k,!y&&q,!e&&!n?p:"",d&&"input-disabled",y&&"input-invalid",l&&"input-textarea"),u=i.useRef(null),o=i.useRef(null),J=()=>{var s,G;if(!u.current&&!o.current)return;const t=(s=u==null?void 0:u.current)==null?void 0:s.offsetWidth,r=(G=o==null?void 0:o.current)==null?void 0:G.offsetWidth;j(t)&&j(r)||(t&&L(t),r&&T(r))};i.useEffect(()=>{J()},[e,n]);const C=t=>.0625*t,K=()=>{const t=`${C(F)+1}rem`,r=`${C(P)+1}rem`,s={};return x==="ltr"&&(e&&(s.paddingLeft=t),n&&(s.paddingRight=r)),x==="rtl"&&(e&&(s.paddingRight=t),n&&(s.paddingLeft=r)),s},S={className:$?"":H,disabled:d,type:W,ref:R,...c},M=f.jsx("textarea",{style:m,rows:A,...S}),g=f.jsx(E,{style:{...K(),...m},...S}),Q=f.jsxs("span",{className:B,children:[e?f.jsxs("div",{ref:u,className:"input-suffix-start",children:[" ",e," "]}):null,g,n?f.jsx("div",{ref:o,className:"input-suffix-end",children:n}):null]});return l?M:e||n?Q:g});st.displayName="Input";export{st as I};
