import{r,y as D,j as s,U as V,A as S}from"./index-C-ogvoVx.js";import{M as F}from"./index.esm-CFM7rjcH.js";import{u as G,a as U}from"./useControllableState-CD8LHUjS.js";import{c as K}from"./classNames-B7nmrHQ2.js";import"./TextField-Bv_PD1P4.js";import"./DefaultPropsProvider-CdUnOLHs.js";import"./FormControlLabel-DMXVvjya.js";import"./Autocomplete-CphVPMF-.js";import"./Divider-Hr5ccXAn.js";import"./index-FdmSbpHH.js";const y=r.createContext({}),B=y.Provider;y.Consumer;function A(){return r.useContext(y)}const P=r.forwardRef((e,d)=>{const{className:t,defaultValue:n,onChange:a,value:l,variant:p="underline",...i}=e,[m,b]=G({prop:l,onChange:a,defaultProp:n}),x=D("tabs",t);return s.jsx(B,{value:{value:m,onValueChange:b,variant:p},children:s.jsx("div",{className:x,...i,ref:d})})});P.displayName="Tabs";const k=r.forwardRef((e,d)=>{const{className:t,children:n,...a}=e,{variant:l}=A(),p=D("tab-list",`tab-list-${l}`,t);return s.jsx("div",{ref:d,role:"tablist",className:p,...a,children:n})});k.displayName="TabList";const E=r.forwardRef((e,d)=>{const{value:t,disabled:n,className:a,icon:l,children:p,...i}=e,{value:m,onValueChange:b,variant:x}=A(),h=t===m,N=U(()=>{!h&&!n&&(b==null||b(t))}),T=K("tab-nav",`tab-nav-${x}`,h&&"tab-nav-active text-primary",h&&x==="underline"&&"border-primary",h&&x==="pill"&&"bg-primary text-neutral",n&&"tab-nav-disabled",!n&&!h&&"hover:text-primary",a);return s.jsxs("div",{ref:d,className:T,role:"tab","aria-selected":h,tabIndex:0,onClick:N,onKeyDown:N,...i,children:[l&&s.jsx("div",{className:"tab-nav-icon",children:l}),p]})});E.displayName="TabNav";const M=r.forwardRef((e,d)=>{const{value:t,children:n,className:a,...l}=e,p=A(),i=t===p.value,m=D("tab-content",i&&"tab-content-active",a);return s.jsx("div",{ref:d,role:"tabpanel",tabIndex:0,className:m,...l,children:i&&n})});M.displayName="TabContent";const R=P;R.TabList=k;R.TabNav=E;R.TabContent=M;const H=e=>{var a,l,p;const t=(e.assigned_group==="APPLICANT"&&e.applicationassignment||[]).filter(i=>i.assigned_group==="APPLICANT"&&i.remarks&&i.remarks!=="undefined").map(i=>i.remarks),n=t.length>0?t.join("; "):"N/A";return{id:e.id,tracking_number:e.tracking_number,first_name:e.first_name,last_name:e.last_name,CNIC:e.cnic,mobile_no:e.mobile_no,application_status:e.application_status,assigned_group:e.assigned_group,registration_for:e.registration_for,application_Start_Time:((a=e.created_at)==null?void 0:a.substring(0,16))||"N/A",application_Submission_Time:((p=(l=e.submittedapplication)==null?void 0:l.created_at)==null?void 0:p.substring(0,16))||"N/A",remarks:n}},q=e=>e.map(d=>{const t=H(d);return Object.keys(t).forEach(n=>{(t[n]===void 0||t[n]===null)&&(t[n]="N/A")}),t}),ne=()=>{const[e,d]=r.useState([]),[t,n]=r.useState([]),[a,l]=r.useState([]),[p,i]=r.useState(0),[m,b]=r.useState(null),[x,h]=r.useState({});r.useState("tab1"),console.log(m);const[N,T]=r.useState(!1),j=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","Download License"],O={APPLICANT:"Applicant",LSO:"LSO",LSM:"LSM",DO:"DO",LSM2:"LSM",TL:"TL",DEO:"DEO","Download License":"Download License"},$=(o,v,u)=>{const I=["first_name","last_name","cnic","mobile_no","application_status","tracking_number","assigned_group","registration_for","application_Start_Time","application_Submission_Time","remarks"],_=q(o),L=_[0];console.log(o);const g=[...Object.keys(L).filter(c=>I.includes(c)).map(c=>({accessorKey:c,header:c.replace(/_/g," ").replace(/\b\w/g,f=>f.toUpperCase()),Cell:({cell:f,row:z})=>s.jsx("span",{style:{cursor:"pointer",color:"blue",textDecoration:"underline"},onClick:()=>{const w=z.original.id;console.log(`Clicked ${c}:`,f.getValue()),console.log(`Navigating with ID: ${w}`),window.location.href=v?`/spuid-review/${w}?group=${u}`:`/spuid-signup/${w}`},children:f.getValue()||"-"})}))];return{flattenedData:_,columns:g}},C=V();return r.useEffect(()=>{(async()=>{T(!0);try{const u=await S.get("/pmc/ping/",{headers:{"Content-Type":"application/json"}})}catch{C("/error")}try{let u=[];try{u=(await S.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],l(u.map(c=>c.name))}catch(g){console.error("Error fetching user groups:",g),l([])}console.log("groupsResponse",u);const _=(await S.get("/pmc/applicant-detail/",{headers:{"Content-Type":"multipart/form-data"}})).data;if(Array.isArray(_)&&_.length>0){const g=$(_,u.length>0,u.map(f=>f.name)[0]);d(g.flattenedData),n(g.columns),console.log("Flattened Data:",g.flattenedData);const c=g.flattenedData[g.flattenedData.length-1];if(console.log("Last Row:",c),c&&c.id){b(c.id),console.log("Last Row ID:",c.id);const f=j.indexOf(c.assigned_group);f!==-1&&i(f)}}const L=await S.get("/pmc/fetch-statistics-view-groups/",{headers:{"Content-Type":"multipart/form-data"}});h(L.data)}catch(u){console.error("Error fetching data:",u)}finally{T(!1)}})(),b(25);const v=j.indexOf("LSO");v!==-1&&i(v)},[]),r.useEffect(()=>{console.log("userGroups:",a),a.includes("Super")?C("/home-super"):a.includes("Admin")?C("/home-admin"):a.includes("DO")&&C("/home-do")},[a,C]),console.log("selectedRowId:",m),console.log(m),s.jsxs("div",{children:[s.jsx("div",{className:"tiles-container",children:Object.entries(x).map(([o,v])=>s.jsxs("div",{className:"tile",children:[s.jsx("h3",{children:O[o]||o})," ",s.jsx("p",{children:v})]},o))}),a.length>0&&s.jsx("div",{className:"mb-4",children:s.jsxs("h3",{children:[a.filter(o=>o!=="Download License"&&o!=="Applicant"&&o!=="LSM2").join(" - ")," Dashboard"]})}),N?s.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[s.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),s.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):s.jsx(F,{columns:[...t],data:e.map(o=>({...o,assigned_group_title:O[o.assigned_group]||o.assigned_group})),getRowId:o=>o.id,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:420,minSize:100,size:140},enableColumnResizing:!0,enableTopToolbar:a.length>0,enablePagination:!0},m)]})};export{ne as default};
