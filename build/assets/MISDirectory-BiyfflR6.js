import{r as s,j as o,A as v}from"./index-BUmH887k.js";import{M as Y,V as ee,T as te,O as se,a as A,b as L,S as V,C as re,c as I,F as B,f as ce,d as oe,P as ae}from"./OSM-CHMvphyu.js";import{t as ie,G as le}from"./terraformer-wkt-parser-DYyDonAX.js";import{h as ne,i as K,j as G,k as Z,l as O}from"./index-Cv0YIGQi.js";import{M as ue}from"./index.esm-zzro7Vhh.js";import"./TextField-BHlAeOZa.js";import"./DefaultPropsProvider-CxugKlR0.js";import"./Autocomplete-II9qOCLw.js";import"./FormControlLabel-CvOE0z_u.js";import"./Divider-Beq1bW_6.js";import"./index-DUfXPSSW.js";function de(n){switch(n){case"Producer":return"#FB923C";case"Distributor":return"#3B82F6";case"Collector":return"#FBBF24";case"Recycler":return"#22C55E";default:return"gray"}}const _e=()=>{const n=s.useRef(null),[r,m]=s.useState(null),[l,b]=s.useState(null),[f,p]=s.useState(null),[S,c]=s.useState(null),[u,g]=s.useState(null),[h,j]=s.useState([]),[J,U]=s.useState([]),[w,D]=s.useState(null),[C,N]=s.useState(["Producer","Distributor","Collector","Recycler"]),[T,$]=s.useState(!1),[z,xe]=s.useState([8054803349056441e-9,3.6232483407283584e6]),[R,pe]=s.useState(6.53343814691434),[H,E]=s.useState(4);s.useEffect(()=>{const t=new Y({target:n.current,layers:[new te({source:new se})],view:new ee({zoom:7,center:[8127130,3658593]})}),e=new A({source:new L});return t.addLayer(e),b(e),m(t),()=>t.setTarget(null)},[]),s.useEffect(()=>{if(!r)return;const t=new A({source:new L,style:e=>{const a=e.get("category");return new V({image:new re({radius:H,fill:new B({color:de(a)}),stroke:new I({color:"#fff",width:1})})})}});r.addLayer(t),p(t)},[r]),s.useEffect(()=>{(async()=>{try{const e=await v.get("/pmc/applicant-location-public/");j(e.data);const a=new Set(e.data.map(d=>d.district_name).filter(Boolean)),i=Array.from(a).sort();U(i)}catch(e){console.error("Error fetching applicant data:",e)}})()},[]);const k=s.useMemo(()=>w?h.filter(t=>t.district_name===w):h,[w,h]),_=s.useMemo(()=>k.filter(t=>C.includes(t.category)),[k,C]);s.useEffect(()=>{if(!f)return;const t=f.getSource();t.clear(),_.forEach(e=>{if(e.latitude&&e.longitude){const a=ce([Number(e.longitude),Number(e.latitude)]),i=new oe({geometry:new ae(a),category:e.category});t.addFeature(i)}})},[_,f]),s.useEffect(()=>{if(!r||!l||T)return;(async()=>{let e=u;e||(e=(await v.get("/pmc/districts-public")).data.filter(X=>X.geom));const i={type:"FeatureCollection",features:e.map(x=>({type:"Feature",geometry:ie.parse(x.geom.replace("SRID=4326;","")),properties:{district_id:x.district_id,district_name:x.district_name,district_code:x.district_code}}))},d=l.getSource();d.clear(),d.addFeatures(new le().readFeatures(i,{featureProjection:"EPSG:3857"}));const F=d.getExtent();r.getView().fit(F,{padding:[50,50,50,50],maxZoom:10}),$(!0)})()},[r,l,T,u]),s.useEffect(()=>{l&&l.setStyle(t=>{const e=t.get("district_id")===S;return new V({stroke:new I({color:e?"red":"blue",width:e?3:2}),fill:new B({color:e?"rgba(255, 0, 0, 0.1)":"rgba(0, 0, 255, 0.1)"})})})},[l,S]),s.useEffect(()=>{if(!r||!l)return;const t=e=>{const a=r.getFeaturesAtPixel(e.pixel);if(a&&a.length>0){const i=a[0],d=i.getProperties(),F=d.district_name;if(w===F)D(null),c(null),r.getView().setCenter(z),r.getView().setZoom(R),E(3);else{D(F),c(d.district_id),E(5);const x=i.getGeometry();r.getView().fit(x.getExtent(),{padding:[50,50,50,50],maxZoom:10})}}else D(null),c(null),E(3),r.getView().setCenter(z),r.getView().setZoom(R)};return r.on("click",t),()=>r.un("click",t)},[r,l,w]);function W(t){const e={Total:t.length,Producer:0,Distributor:0,Collector:0,Recycler:0};return t.forEach(a=>{a.category==="Producer"&&e.Producer++,a.category==="Distributor"&&e.Distributor++,a.category==="Collector"&&e.Collector++,a.category==="Recycler"&&e.Recycler++}),e}const P=W(k),q=C.reduce((t,e)=>t+P[e],0),[y,M]=s.useState([]),Q=t=>{let e;typeof t=="function"?M(a=>(e=t(a),e)):(M(t),e=t)};return s.useEffect(()=>{let t=[];Array.isArray(y)?t=y:typeof y=="object"&&y!==null&&(t=Object.values(y));let e=null,a=["Producer","Distributor","Collector","Recycler"];t.forEach(i=>{i.id==="district_name"&&(e=i.value||null),i.id==="category"&&i.value&&(a=[i.value])}),D(e),N(a)},[y]),o.jsxs("div",{children:[o.jsx(me,{stats:P,enabledCategories:C,setEnabledCategories:N,enabledTotal:q}),o.jsxs("div",{className:"flex flex-col md:flex-row",children:[o.jsx("div",{ref:n,style:{height:"600px",width:"500px"},className:"mb-4"}),o.jsx("div",{className:"ml-4 flex-grow",children:o.jsx(ye,{data:_,selectedDistrict:w,setSelectedDistrict:D,enabledCategories:C,setEnabledCategories:N,columnFilters:y,districtOptions:J,onColumnFiltersChange:Q})})]})]})},me=({stats:n,enabledCategories:r,setEnabledCategories:m,enabledTotal:l})=>{const b=c=>{if(c==="Total"){r.length===4?m([]):m(["Producer","Distributor","Collector","Recycler"]);return}r.includes(c)?m(r.filter(u=>u!==c)):m([...r,c])},f=c=>c==="Total"?r.length>0:r.includes(c);function p(c){return c==="Total"?f("Total")?l:0:n[c]||0}const S=[{key:"Total",bgColor:"bg-gray-500",icon:o.jsx(ne,{className:"text-white text-3xl"})},{key:"Producer",bgColor:"bg-orange-500",icon:o.jsx(K,{className:"text-white text-3xl"})},{key:"Distributor",bgColor:"bg-blue-500",icon:o.jsx(G,{className:"text-white text-3xl"})},{key:"Collector",bgColor:"bg-yellow-500",icon:o.jsx(Z,{className:"text-white text-3xl"})},{key:"Recycler",bgColor:"bg-green-500",icon:o.jsx(O,{className:"text-white text-3xl"})}];return o.jsx("div",{className:"grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4",children:S.map(c=>{const u=f(c.key),g=p(c.key);return o.jsx("div",{onClick:()=>b(c.key),className:`shadow-md rounded p-6 w-full cursor-pointer transition
              ${u?"opacity-100":"opacity-50"}
              ${c.bgColor}
            `,children:o.jsxs("div",{className:"flex items-center space-x-2",children:[c.icon,o.jsx("h2",{className:"text-2xl font-bold text-white",children:c.key}),o.jsx("p",{className:"text-2xl font-bold text-white",children:g})]})},c.key)})})},fe={Producer:o.jsx(K,{className:"text-xl"}),Distributor:o.jsx(G,{className:"text-xl"}),Collector:o.jsx(Z,{className:"text-xl"}),Recycler:o.jsx(O,{className:"text-xl"})},ge={Producer:"text-orange-500",Distributor:"text-blue-500",Collector:"text-yellow-500",Recycler:"text-green-500"},ye=({data:n,selectedDistrict:r,setSelectedDistrict:m,enabledCategories:l,setEnabledCategories:b,columnFilters:f,districtOptions:p,onColumnFiltersChange:S})=>{console.log("districtOptions",p);const c=s.useMemo(()=>[{accessorKey:"district_name",header:"District",minSize:50,maxSize:50,size:50},{accessorKey:"tehsil_name",header:"Tehsil",minSize:50,maxSize:50,size:50},{accessorKey:"category",header:"Category",Cell:({cell:u})=>{const g=u.getValue(),h=fe[g],j=ge[g]||"text-gray-500";return h?o.jsxs("div",{className:`flex items-center ${j}`,children:[h,o.jsx("span",{className:"ml-1",children:g})]}):g},minSize:50,maxSize:50,size:50},{accessorKey:"business_name",header:"Business Name",minSize:50,maxSize:50,size:50},{accessorKey:"postal_address",header:"Postal Address",minSize:50,maxSize:100,size:100},{accessorKey:"material_flow_kg_per_day",header:"Material Flow (Kg/Day)",minSize:50,maxSize:100,size:100}],[p]);return o.jsx(ue,{columns:c,data:n,initialState:{showColumnFilters:!1,pagination:{pageSize:5}}})};export{_e as default};
