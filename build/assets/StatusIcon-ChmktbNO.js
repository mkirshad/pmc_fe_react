import{r as e,j as n}from"./index-BLwYN0BW.js";import{j as l,k as x,l as f,n as m}from"./CloseButton-Ch3F0PoC.js";function E(o,c=0,s=!0){const t=e.useRef(),r=e.useRef(o),i=e.useCallback(()=>{t.current&&clearTimeout(t.current)},[]),u=e.useCallback(()=>{t.current&&clearTimeout(t.current),s&&(t.current=setTimeout(()=>{var a;(a=r.current)==null||a.call(r)},c))},[c,s]);return e.useEffect(()=>{r.current=o},[o]),e.useEffect(()=>(u(),i),[c,s,u,i]),{clear:i,reset:u}}const j={success:{color:"text-success",icon:n.jsx(l,{})},info:{color:"text-info",icon:n.jsx(x,{})},warning:{color:"text-warning",icon:n.jsx(f,{})},danger:{color:"text-error",icon:n.jsx(m,{})}},H=o=>{const{type:c="info",custom:s,iconColor:t}=o,r=j[c];return n.jsx("span",{className:`text-2xl ${t||r.color}`,children:s||r.icon})};export{H as S,E as u};
