import{r as y,j as h}from"./index-4RLLXVPi.js";import{g as C,a as A,s as f,m as u,u as D,c as R,b as L,d as S}from"./DefaultPropsProvider-DBrdpgGe.js";function W(i){return A("MuiDivider",i)}const j=C("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),I=i=>{const{absolute:t,children:e,classes:n,flexItem:s,light:l,orientation:r,textAlign:a,variant:o}=i;return L({root:["root",t&&"absolute",o,l&&"light",r==="vertical"&&"vertical",s&&"flexItem",e&&"withChildren",e&&r==="vertical"&&"withChildrenVertical",a==="right"&&r!=="vertical"&&"textAlignRight",a==="left"&&r!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",r==="vertical"&&"wrapperVertical"]},W,n)},$=f("div",{name:"MuiDivider",slot:"Root",overridesResolver:(i,t)=>{const{ownerState:e}=i;return[t.root,e.absolute&&t.absolute,t[e.variant],e.light&&t.light,e.orientation==="vertical"&&t.vertical,e.flexItem&&t.flexItem,e.children&&t.withChildren,e.children&&e.orientation==="vertical"&&t.withChildrenVertical,e.textAlign==="right"&&e.orientation!=="vertical"&&t.textAlignRight,e.textAlign==="left"&&e.orientation!=="vertical"&&t.textAlignLeft]}})(u(({theme:i})=>({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(i.vars||i).palette.divider,borderBottomWidth:"thin",variants:[{props:{absolute:!0},style:{position:"absolute",bottom:0,left:0,width:"100%"}},{props:{light:!0},style:{borderColor:i.vars?`rgba(${i.vars.palette.dividerChannel} / 0.08)`:S(i.palette.divider,.08)}},{props:{variant:"inset"},style:{marginLeft:72}},{props:{variant:"middle",orientation:"horizontal"},style:{marginLeft:i.spacing(2),marginRight:i.spacing(2)}},{props:{variant:"middle",orientation:"vertical"},style:{marginTop:i.spacing(1),marginBottom:i.spacing(1)}},{props:{orientation:"vertical"},style:{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"}},{props:{flexItem:!0},style:{alignSelf:"stretch",height:"auto"}},{props:({ownerState:t})=>!!t.children,style:{display:"flex",textAlign:"center",border:0,borderTopStyle:"solid",borderLeftStyle:"solid","&::before, &::after":{content:'""',alignSelf:"center"}}},{props:({ownerState:t})=>t.children&&t.orientation!=="vertical",style:{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(i.vars||i).palette.divider}`,borderTopStyle:"inherit"}}},{props:({ownerState:t})=>t.orientation==="vertical"&&t.children,style:{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(i.vars||i).palette.divider}`,borderLeftStyle:"inherit"}}},{props:({ownerState:t})=>t.textAlign==="right"&&t.orientation!=="vertical",style:{"&::before":{width:"90%"},"&::after":{width:"10%"}}},{props:({ownerState:t})=>t.textAlign==="left"&&t.orientation!=="vertical",style:{"&::before":{width:"10%"},"&::after":{width:"90%"}}}]}))),T=f("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(i,t)=>{const{ownerState:e}=i;return[t.wrapper,e.orientation==="vertical"&&t.wrapperVertical]}})(u(({theme:i})=>({display:"inline-block",paddingLeft:`calc(${i.spacing(1)} * 1.2)`,paddingRight:`calc(${i.spacing(1)} * 1.2)`,whiteSpace:"nowrap",variants:[{props:{orientation:"vertical"},style:{paddingTop:`calc(${i.spacing(1)} * 1.2)`,paddingBottom:`calc(${i.spacing(1)} * 1.2)`}}]}))),v=y.forwardRef(function(t,e){const n=D({props:t,name:"MuiDivider"}),{absolute:s=!1,children:l,className:r,orientation:a="horizontal",component:o=l||a==="vertical"?"div":"hr",flexItem:c=!1,light:b=!1,role:d=o!=="hr"?"separator":void 0,textAlign:x="center",variant:m="fullWidth",...w}=n,p={...n,absolute:s,component:o,flexItem:c,light:b,orientation:a,role:d,textAlign:x,variant:m},g=I(p);return h.jsx($,{as:o,className:R(g.root,r),role:d,ref:e,ownerState:p,"aria-orientation":d==="separator"&&(o!=="hr"||a==="vertical")?a:void 0,...w,children:l?h.jsx(T,{className:g.wrapper,ownerState:p,children:l}):null})});v&&(v.muiSkipListHighlight=!0);export{v as D,j as d};
