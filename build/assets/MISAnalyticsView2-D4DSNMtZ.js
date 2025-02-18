import{r,j as t,b as z,A}from"./index-4RLLXVPi.js";import{M as te,T as se,O as re,V as ae,a as R,b as I,S as V,C as oe,F as G,c as B,f as ce,d as ie,P as ne,t as le,G as ue}from"./terraformer-wkt-parser-BKyrT5Ip.js";import{g as de,h as K,i as O,j as Z,k as U}from"./index-CTKbsKXa.js";import{M as me}from"./index.esm-Cjidw_FN.js";import{D as ge}from"./Divider-CM2zM9r0.js";import"./TextField-CplAdzQS.js";import"./DefaultPropsProvider-DBrdpgGe.js";import"./FormControlLabel-0kfgVLKv.js";import"./Autocomplete-C-KpBT6P.js";import"./index-BxCdGLaZ.js";function fe(y){switch(y){case"Producer":return"#FB923C";case"Distributor":return"#3B82F6";case"Collector":return"#FBBF24";case"Recycler":return"#22C55E";default:return"gray"}}const _e=({onDistrictClick:y})=>{const l=r.useRef(null),[o,b]=r.useState(null),[n,h]=r.useState(null),[m,C]=r.useState(null),[a,u]=r.useState(null),[d,N]=r.useState(null),[w,J]=r.useState([]),[$,H]=r.useState([]),[p,S]=r.useState(null),[D,F]=r.useState(["Producer","Distributor","Collector","Recycler"]),[k,W]=r.useState(!1),[_,we]=r.useState([8054803349056441e-9,3.6232483407283584e6]),[L,Se]=r.useState(6.53343814691434),[Y,v]=r.useState(4);r.useEffect(()=>{const s=new te({target:l.current,layers:[new se({source:new re})],view:new ae({zoom:7,center:[8127130,3658593]})}),e=new R({source:new I});return s.addLayer(e),h(e),b(s),()=>s.setTarget(null)},[]),r.useEffect(()=>{if(!o)return;const s=new R({source:new I,style:e=>{const c=e.get("category");return new V({image:new oe({radius:Y,fill:new G({color:fe(c)}),stroke:new B({color:"#fff",width:1})})})}});o.addLayer(s),C(s)},[o]),r.useEffect(()=>{(async()=>{try{const e=await A.get("/pmc/applicant-location-public/");J(e.data);const c=new Set(e.data.map(g=>g.district_name).filter(Boolean)),i=Array.from(c).sort();H(i)}catch(e){console.error("Error fetching applicant data:",e)}})()},[]);const P=r.useMemo(()=>p?w.filter(s=>s.district_name===p):w,[p,w]),E=r.useMemo(()=>P.filter(s=>D.includes(s.category)),[P,D]);r.useEffect(()=>{if(!m)return;const s=m.getSource();s.clear(),E.forEach(e=>{if(e.latitude&&e.longitude){const c=ce([Number(e.longitude),Number(e.latitude)]),i=new ie({geometry:new ne(c),category:e.category});s.addFeature(i)}})},[E,m]),r.useEffect(()=>{if(!o||!n||k)return;(async()=>{let e=d;e||(e=(await A.get("/pmc/districts-public")).data.filter(ee=>ee.geom));const i={type:"FeatureCollection",features:e.map(x=>({type:"Feature",geometry:le.parse(x.geom.replace("SRID=4326;","")),properties:{district_id:x.district_id,district_name:x.district_name,district_code:x.district_code}}))},g=n.getSource();g.clear(),g.addFeatures(new ue().readFeatures(i,{featureProjection:"EPSG:3857"}));const j=g.getExtent();o.getView().fit(j,{padding:[50,50,50,50],maxZoom:10}),W(!0)})()},[o,n,k,d]),r.useEffect(()=>{n&&n.setStyle(s=>{const e=s.get("district_id")===a;return new V({stroke:new B({color:e?"red":"blue",width:e?3:2}),fill:new G({color:e?"rgba(255, 0, 0, 0.1)":"rgba(0, 0, 255, 0.1)"})})})},[n,a]),r.useEffect(()=>{if(!o||!n)return;const s=e=>{const c=o.getFeaturesAtPixel(e.pixel);if(c&&c.length>0){const i=c[0],g=i.getProperties(),j=g.district_name;if(p===j)S(null),u(null),o.getView().setCenter(_),o.getView().setZoom(L),v(3);else{S(j),u(g.district_id),v(5);const x=i.getGeometry();o.getView().fit(x.getExtent(),{padding:[50,50,50,50],maxZoom:10})}}else S(null),u(null),v(3),o.getView().setCenter(_),o.getView().setZoom(L)};return o.on("click",s),()=>o.un("click",s)},[o,n,p]);function q(s){const e={Total:s.length,Producer:0,Distributor:0,Collector:0,Recycler:0};return s.forEach(c=>{c.category==="Producer"&&e.Producer++,c.category==="Distributor"&&e.Distributor++,c.category==="Collector"&&e.Collector++,c.category==="Recycler"&&e.Recycler++}),e}const M=q(P),Q=D.reduce((s,e)=>s+M[e],0),[f,T]=r.useState([]),X=s=>{let e;typeof s=="function"?T(c=>(e=s(c),e)):(T(s),e=s)};return r.useEffect(()=>{let s=[];Array.isArray(f)?s=f:typeof f=="object"&&f!==null&&(s=Object.values(f));let e=null,c=["Producer","Distributor","Collector","Recycler"];s.forEach(i=>{i.id==="district_name"&&(e=i.value||null),i.id==="category"&&i.value&&(c=[i.value])}),S(e),F(c)},[f]),t.jsxs("div",{className:"banner-container2 grid",children:[t.jsxs("header",{className:"banner-header",children:[t.jsx(z,{to:"/pub",className:"transition-all duration-300 ease-in-out transform hover:scale-105",children:t.jsxs("div",{className:"logo-section",children:[t.jsx("img",{src:"/img/logo/epa_logo-removebg-preview.png",alt:"GOP Logo",className:"header-logo"}),t.jsx("img",{src:"/img/logo/epccd.png",alt:"EPCCD Logo",className:"header-logo"}),t.jsx("img",{src:"/img/logo/gop.png",alt:"GOP Logo",className:"header-logo"}),t.jsx("span",{className:"header-text",children:"PLMIS"})]})}),t.jsxs("h6",{className:"header-text",children:[t.jsx("span",{className:"font-bold",children:"Management Information System"}),t.jsx("span",{className:"text-sm ml-2",children:"Public Directory"})]}),t.jsx("nav",{className:"banner-nav",children:t.jsx(z,{to:"/sign-in",className:"nav-link transition-all duration-300 ease-in-out transform hover:scale-105",style:{paddingLeft:300},children:"Login"})})]}),t.jsx(xe,{stats:M,enabledCategories:D,setEnabledCategories:F,enabledTotal:Q}),t.jsxs("div",{className:"flex flex-col md:flex-row",children:[t.jsx("div",{ref:l,style:{height:"600px",width:"500px"},className:"mb-4"}),t.jsx("div",{className:"ml-4 flex-grow",children:t.jsx(he,{data:E,selectedDistrict:p,setSelectedDistrict:S,enabledCategories:D,setEnabledCategories:F,columnFilters:f,districtOptions:$,onColumnFiltersChange:X})})]}),t.jsx(ge,{textAlign:"left"}),t.jsx("footer",{className:"footer-container",children:t.jsxs("span",{className:"footer-text",children:["Copyright © ",new Date().getFullYear()," ",t.jsx("span",{className:"font-semibold",children:"PLMIS"})," All rights reserved.",t.jsx("br",{}),"Plastic Management Cell, Strategic Planning & Implementation Unit, Environmental Protection Agency, and Environment Protection & Climate Change Department, Government of the Punjab."]})})]})},xe=({stats:y,enabledCategories:l,setEnabledCategories:o,enabledTotal:b})=>{const n=a=>{if(a==="Total"){l.length===4?o([]):o(["Producer","Distributor","Collector","Recycler"]);return}l.includes(a)?o(l.filter(u=>u!==a)):o([...l,a])},h=a=>a==="Total"?l.length>0:l.includes(a);function m(a){return a==="Total"?h("Total")?b:0:y[a]||0}const C=[{key:"Total",bgColor:"bg-gray-500",icon:t.jsx(de,{className:"text-white text-3xl"})},{key:"Producer",bgColor:"bg-orange-500",icon:t.jsx(K,{className:"text-white text-3xl"})},{key:"Distributor",bgColor:"bg-blue-500",icon:t.jsx(O,{className:"text-white text-3xl"})},{key:"Collector",bgColor:"bg-yellow-500",icon:t.jsx(Z,{className:"text-white text-3xl"})},{key:"Recycler",bgColor:"bg-green-500",icon:t.jsx(U,{className:"text-white text-3xl"})}];return t.jsx("div",{className:"grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4",children:C.map(a=>{const u=h(a.key),d=m(a.key);return t.jsx("div",{onClick:()=>n(a.key),className:`shadow-md rounded p-6 w-full cursor-pointer transition
              ${u?"opacity-100":"opacity-50"}
              ${a.bgColor}
            `,children:t.jsxs("div",{className:"flex items-center space-x-2",children:[a.icon,t.jsx("h2",{className:"text-2xl font-bold text-white",children:a.key}),t.jsx("p",{className:"text-2xl font-bold text-white",children:d})]})},a.key)})})},ye={Producer:t.jsx(K,{className:"text-xl"}),Distributor:t.jsx(O,{className:"text-xl"}),Collector:t.jsx(Z,{className:"text-xl"}),Recycler:t.jsx(U,{className:"text-xl"})},pe={Producer:"text-orange-500",Distributor:"text-blue-500",Collector:"text-yellow-500",Recycler:"text-green-500"},he=({data:y,selectedDistrict:l,setSelectedDistrict:o,enabledCategories:b,setEnabledCategories:n,columnFilters:h,districtOptions:m,onColumnFiltersChange:C})=>{console.log("districtOptions",m);const a=r.useMemo(()=>[{accessorKey:"district_name",header:"District",minSize:50,maxSize:50,size:50},{accessorKey:"tehsil_name",header:"Tehsil",minSize:50,maxSize:50,size:50},{accessorKey:"category",header:"Category",Cell:({cell:u})=>{const d=u.getValue(),N=ye[d],w=pe[d]||"text-gray-500";return N?t.jsxs("div",{className:`flex items-center ${w}`,children:[N,t.jsx("span",{className:"ml-1",children:d})]}):d},minSize:50,maxSize:50,size:50},{accessorKey:"business_name",header:"Business Name",minSize:50,maxSize:50,size:50},{accessorKey:"postal_address",header:"Postal Address",minSize:50,maxSize:100,size:100},{accessorKey:"material_flow_kg_per_day",header:"Material Flow (Kg/Day)",minSize:50,maxSize:100,size:100}],[m]);return t.jsx(me,{columns:a,data:y,initialState:{showColumnFilters:!1,pagination:{pageSize:5}}})};export{_e as default};
