import{r,j as s,A as P}from"./index-D7gsvq0q.js";import{M as H,T as q,O as Q,V as X,a as A,b as T,S as L,C as Y,F as V,c as W,f as ee,d as te,P as se,t as re,G as ie}from"./terraformer-wkt-parser-DvzUJjf7.js";import{h as ae,i as ce,j as oe,k as E,g as le}from"./index-BUihzZUz.js";import{M as ne}from"./index.esm-BzJtqdlq.js";import{P as I}from"./TextField-Ct4mkRVW.js";import{T as de}from"./FormControlLabel-Bc_CLxka.js";import"./DefaultPropsProvider-BP7L4F6z.js";import"./Autocomplete-CbjDOeDC.js";import"./Divider-DUO2S8PJ.js";import"./index-GeG-ga1p.js";function ue(d){switch(d){case"Producer":return"#FB923C";case"Distributor":return"#3B82F6";case"Collector":return"#FBBF24";case"Recycler":return"#22C55E";default:return"gray"}}const Ee=()=>{const d=r.useRef(null),[c,C]=r.useState(null),[n,p]=r.useState(null),[y,x]=r.useState(null),[o,u]=r.useState(null),[z,ye]=r.useState(null),[h,K]=r.useState([]),[U,fe]=r.useState([]),[f,b]=r.useState(null),[w,S]=r.useState(["Produced","Distributed","Collected","W-Collected","Recycled"]),[N,B]=r.useState(!1),[v,pe]=r.useState([8054803349056441e-9,3.6232483407283584e6]),[R,xe]=r.useState(6.53343814691434),[G,D]=r.useState(4);r.useEffect(()=>{const t=new H({target:d.current,layers:[new q({source:new Q})],view:new X({zoom:7,center:[8127130,3658593]})}),e=new A({source:new T});return t.addLayer(e),p(e),C(t),()=>t.setTarget(null)},[]),r.useEffect(()=>{if(!c)return;const t=new A({source:new T,style:e=>{const i=e.get("category");return new L({image:new Y({radius:G,fill:new V({color:ue(i)}),stroke:new W({color:"#fff",width:1})})})}});c.addLayer(t),x(t)},[c]),r.useEffect(()=>{(async()=>{try{const e=await P.get("/pmc/mis-district-plastic-stats/");K(e.data)}catch(e){console.error("Error fetching applicant data:",e)}})()},[]);const F=r.useMemo(()=>f?h.filter(t=>t.district_name===f):h,[f,h]),k=r.useMemo(()=>F.filter(t=>w),[F,w]);r.useEffect(()=>{if(!y)return;const t=y.getSource();t.clear(),k.forEach(e=>{if(e.latitude&&e.longitude){const i=ee([Number(e.longitude),Number(e.latitude)]),a=new te({geometry:new se(i)});t.addFeature(a)}})},[k,y]),r.useEffect(()=>{if(!c||!n||N)return;(async()=>{let e=z;e||(e=(await P.get("/pmc/districts-public")).data.filter($=>$.geom));const a={type:"FeatureCollection",features:e.map(m=>({type:"Feature",geometry:re.parse(m.geom.replace("SRID=4326;","")),properties:{district_id:m.district_id,district_name:m.district_name,district_code:m.district_code}}))},l=n.getSource();l.clear(),l.addFeatures(new ie().readFeatures(a,{featureProjection:"EPSG:3857"}));const _=l.getExtent();c.getView().fit(_,{padding:[50,50,50,50],maxZoom:10}),B(!0)})()},[c,n,N,z]),r.useEffect(()=>{n&&n.setStyle(t=>{const e=t.get("district_id"),i=h.find(l=>l.district_id===e);let a="rgba(200, 200, 200, 0.5)";if(i){let l=i.recycling_efficiency||0;l=Math.max(0,Math.min(l,100)),l<=0?a="rgba(255, 99, 71, 0.8)":l<20?a="rgba(255, 165, 0, 0.8)":l<50?a="rgba(144, 238, 144, 0.8)":l<80?a="rgba(34, 197, 94, 0.8)":a="rgba(0, 128, 0, 0.8)"}return new L({stroke:new W({color:"black",width:1}),fill:new V({color:a})})})},[n,h]),r.useEffect(()=>{if(!c||!n)return;const t=e=>{const i=c.getFeaturesAtPixel(e.pixel);if(i&&i.length>0){const a=i[0],l=a.getProperties(),_=l.district_name;if(f===_)b(null),u(null),c.getView().setCenter(v),c.getView().setZoom(R),D(3);else{b(_),u(l.district_id),D(5);const m=a.getGeometry();c.getView().fit(m.getExtent(),{padding:[50,50,50,50],maxZoom:10})}}else b(null),u(null),D(3),c.getView().setCenter(v),c.getView().setZoom(R)};return c.on("click",t),()=>c.un("click",t)},[c,n,f]);function O(t){return t.reduce((e,i)=>{e.Produced+=i.produced_kg_per_day||0,e.Distributed+=i.distributed_kg_per_day||0,e.Collected+=i.collected_kg_per_day||0,e["W-Collected"]+=i.waste_collected_kg_per_day||0,e.Recycled+=i.waste_disposed_kg_per_day||0,e["Un-Managed"]+=i.unmanaged_waste_kg_per_day||0;const a=Math.max(e.Collected,e["W-Collected"]);return e["Recycling Efficiency"]=a>0?Math.max(0,(e.Recycled/a*100).toFixed(2)):"0.00",e.districtCount+=1,e},{Produced:0,Distributed:0,Collected:0,"W-Collected":0,Recycled:0,"Un-Managed":0,"Recycling Efficiency":0,districtCount:0})}const j=O(F);console.log(j);const Z=w.reduce((t,e)=>t+j[e],0),[g,M]=r.useState([]),J=t=>{let e;typeof t=="function"?M(i=>(e=t(i),e)):(M(t),e=t)};return r.useEffect(()=>{let t=[];Array.isArray(g)?t=g:typeof g=="object"&&g!==null&&(t=Object.values(g));let e=null,i=["Producer","Distributor","Collector","Recycler"];t.forEach(a=>{a.id==="district_name"&&(e=a.value||null),a.id==="category"&&a.value&&(i=[a.value])}),b(e),S(i)},[g]),s.jsxs("div",{children:[s.jsx(ge,{stats:j,enabledCategories:w,setEnabledCategories:S,enabledTotal:Z}),s.jsxs("div",{className:"",children:[s.jsx("div",{ref:d,style:{height:"600px",width:"500px"},className:"mb-4"}),s.jsx("div",{className:"",children:s.jsx(me,{data:k,selectedDistrict:f,setSelectedDistrict:b,enabledCategories:w,setEnabledCategories:S,columnFilters:g,districtOptions:U,onColumnFiltersChange:J})})]})]})},ge=({stats:d,enabledCategories:c,setEnabledCategories:C,enabledTotal:n})=>{function p(o){return d[o]||0}const y=[{key:"Produced",bgColor:"bg-orange-500",icon:s.jsx(ae,{className:"text-white text-3xl"})},{key:"Distributed",bgColor:"bg-blue-500",icon:s.jsx(ce,{className:"text-white text-3xl"})},{key:"Collected",bgColor:"bg-yellow-500",icon:s.jsx(oe,{className:"text-white text-3xl"})},{key:"W-Collected",bgColor:"bg-yellow-500",icon:s.jsx(E,{className:"text-white text-3xl"})},{key:"Recycled",bgColor:"bg-green-500",icon:s.jsx(E,{className:"text-white text-3xl"})},{key:"Un-Managed",bgColor:"bg-gray-500",icon:s.jsx(le,{className:"text-white text-3xl"})}],x=[{key:"Recycling Efficiency",bgColor:"bg-green-500",icon:s.jsx(E,{className:"text-white text-3xl"})}];return s.jsxs(s.Fragment,{children:[s.jsxs(I,{elevation:3,sx:{p:2,border:"1px solid #ccc",borderRadius:2,position:"relative"},className:"",children:[s.jsx(de,{variant:"h6",sx:{position:"absolute",top:-16,left:16,backgroundColor:"white",px:1,fontWeight:"bold",color:"gray"},children:"Amount of Plastic Flow (Kg/Day)"}),s.jsx("div",{className:"grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4",children:y.map(o=>{const u=p(o.key);return s.jsxs("div",{className:`flex items-center justify-start p-4 rounded-lg shadow-md transition cursor-pointer
                opacity-100
                 ${o.bgColor}`,children:[s.jsx("div",{className:"mr-3",children:o.icon}),s.jsxs("h2",{className:"text-lg font-bold text-white",children:[o.key," ",u.toFixed(0)]})]},o.key)})})]}),s.jsx(I,{elevation:3,sx:{p:2,border:"1px solid #ccc",borderRadius:2,position:"relative"},className:"mt-1",children:s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4",children:x.map(o=>{const u=p(o.key);return s.jsxs("div",{className:`flex items-center justify-start p-4 rounded-lg shadow-md transition cursor-pointer
                  opacity-100  ${o.bgColor}`,children:[s.jsx("div",{className:"mr-3",children:o.icon}),s.jsxs("h2",{className:"text-lg font-bold text-white",children:[o.key," ",u]})]},o.key)})})})]})},me=({data:d,selectedDistrict:c,setSelectedDistrict:C,enabledCategories:n,setEnabledCategories:p,columnFilters:y,districtOptions:x,onColumnFiltersChange:o})=>{console.log("districtOptions",x);const u=r.useMemo(()=>[{accessorKey:"district_name",header:"District",minSize:50,maxSize:50,size:50},{accessorKey:"produced_kg_per_day",header:"Produced",minSize:50,maxSize:50,size:50},{accessorKey:"distributed_kg_per_day",header:"Distributed",minSize:50,maxSize:50,size:50},{accessorKey:"collected_kg_per_day",header:"Collected",minSize:50,maxSize:50,size:50},{accessorKey:"waste_collected_kg_per_day",header:"Waste Collected",minSize:50,maxSize:50,size:50},{accessorKey:"waste_disposed_kg_per_day",header:"Waste Recycled",minSize:50,maxSize:50,size:50},{accessorKey:"unmanaged_waste_kg_per_day",header:"Unmanaged Waste",minSize:50,maxSize:50,size:50},{accessorKey:"recycling_efficiency",header:"Recycling Efficiency",minSize:50,maxSize:50,size:50}],[d]);return s.jsx(ne,{columns:u,data:d,initialState:{showColumnFilters:!1,pagination:{pageSize:5}}})};export{Ee as default};
