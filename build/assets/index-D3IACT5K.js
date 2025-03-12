import{r as b,y as m,j as i}from"./index-a-HTmf3D.js";import{u as R,a as w}from"./useControllableState-B4qTLvm2.js";import{c as P}from"./classNames-C-pI9n61.js";const p=b.createContext({}),L=p.Provider;p.Consumer;function x(){return b.useContext(p)}const T=b.forwardRef((s,n)=>{const{className:t,defaultValue:a,onChange:r,value:e,variant:o="underline",...l}=s,[d,v]=R({prop:e,onChange:r,defaultProp:a}),u=m("tabs",t);return i.jsx(L,{value:{value:d,onValueChange:v,variant:o},children:i.jsx("div",{className:u,...l,ref:n})})});T.displayName="Tabs";const f=b.forwardRef((s,n)=>{const{className:t,children:a,...r}=s,{variant:e}=x(),o=m("tab-list",`tab-list-${e}`,t);return i.jsx("div",{ref:n,role:"tablist",className:o,...r,children:a})});f.displayName="TabList";const y=b.forwardRef((s,n)=>{const{value:t,disabled:a,className:r,icon:e,children:o,...l}=s,{value:d,onValueChange:v,variant:u}=x(),c=t===d,C=w(()=>{!c&&!a&&(v==null||v(t))}),j=P("tab-nav",`tab-nav-${u}`,c&&"tab-nav-active text-primary",c&&u==="underline"&&"border-primary",c&&u==="pill"&&"bg-primary text-neutral",a&&"tab-nav-disabled",!a&&!c&&"hover:text-primary",r);return i.jsxs("div",{ref:n,className:j,role:"tab","aria-selected":c,tabIndex:0,onClick:C,onKeyDown:C,...l,children:[e&&i.jsx("div",{className:"tab-nav-icon",children:e}),o]})});y.displayName="TabNav";const h=b.forwardRef((s,n)=>{const{value:t,children:a,className:r,...e}=s,o=x(),l=t===o.value,d=m("tab-content",l&&"tab-content-active",r);return i.jsx("div",{ref:n,role:"tabpanel",tabIndex:0,className:d,...e,children:l&&a})});h.displayName="TabContent";const N=T;N.TabList=f;N.TabNav=y;N.TabContent=h;export{N as T};
