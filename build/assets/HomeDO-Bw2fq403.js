import{r as u,k as z,U as P,j as s,A as D}from"./index-BLwYN0BW.js";import{M as B}from"./index.esm-D1ydRdI6.js";import"./TextField-O4t8MnQ_.js";import"./DefaultPropsProvider-DqQ2WyRj.js";import"./FormControlLabel-CIt4uZh6.js";import"./Autocomplete-DpRitwOB.js";import"./Divider-rJ8gbucv.js";import"./index-DXCJI3fi.js";const U=n=>{const p=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","DG","Download License"],g=p.indexOf(n.assigned_group),o=n.applicationassignment||[],r=(()=>{if(o.length>1){const S=o[o.length-2];return p.indexOf(S.assigned_group)}return-1})(),L=r!==-1&&r>g;return o.find(S=>p.indexOf(S.assigned_group)===r),{id:n.id,tracking_number:n.tracking_number,first_name:n.first_name,last_name:n.last_name,CNIC:n.cnic,mobile_no:n.mobile_no,application_status:n.application_status,assigned_group:n.assigned_group,registration_for:n.registration_for,remarks:n.remarks||"N/A",is_assigned_back:L?"Yes":"No"}},Y=n=>n.map(p=>{const g=U(p);return Object.keys(g).forEach(o=>{(g[o]===void 0||g[o]===null)&&(g[o]="N/A")}),g}),X=()=>{const[n,p]=u.useState([]),[g,o]=u.useState([]),[r,L]=u.useState(null),[S,y]=u.useState(0),[j,T]=u.useState(null),[E,M]=u.useState({}),[N,G]=u.useState(null),[F,O]=u.useState(!1),k=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","DG","Download License"],C={APPLICANT:"Applicant",LSO:"LSO",LSM:"LSM",DO:"DO",LSM2:"LSM",TL:"TL",DEO:"DEO",DG:"DG","Download License":"Download License"},R=z(e=>e.user.authority)||[],I=async e=>{try{if(O(!0),G(e),e==="LSO1"||e==="LSO2"||e==="LSO3"){const c=e==="LSO1"?1:e==="LSO2"?2:0,m=((await D.get("/pmc/applicant-detail-main-do-list/",{params:{assigned_group:"LSO"}})).data||[]).filter(_=>{var h;return((h=_.submittedapplication)==null?void 0:h.id)%3===c}),a=b(m,!!r.length,r[0]);p(a.flattenedData),o(a.columns)}else{const f=(await D.get("/pmc/applicant-detail-main-do-list/",{params:{assigned_group:e!=="All-Applications"&&e!=="Challan-Downloaded"?e:void 0,application_status:e==="Challan-Downloaded"?"Fee Challan":void 0}})).data||[],m=b(f,!!r.length,r[0]);p(m.flattenedData),o(m.columns)}}catch(c){console.error("Error fetching filtered data:",c),p([]),o([])}finally{O(!1)}},b=(e,c,f)=>{const m=["first_name","CNIC","mobile_no","tracking_number","registration_for","days_pending_for","remarks","is_assigned_back"],a=Y(e),_=a[0],h=[...Object.keys(_).filter(d=>m.includes(d)).map(d=>{let i=160;return["mobile_no","application_status","assigned_group","total_fee_amount"].includes(d)?i=120:["first_name"].includes(d)&&(i=180),d==="is_assigned_back"?{accessorKey:d,header:"Assigned Back",size:i,Filter:({column:t})=>s.jsxs("select",{value:t.getFilterValue()||"",onChange:l=>t.setFilterValue(l.target.value||void 0),style:{width:"100%",padding:"4px"},children:[s.jsx("option",{value:"",children:"All"}),s.jsx("option",{value:"Yes",children:"Yes"}),s.jsx("option",{value:"",children:"No"})]}),filterFn:(t,l,x)=>x===""||t.original[d]===x,Cell:({cell:t,row:l})=>{const x=l.original.id,v=l.original.is_assigned_back,A=`/spuid-review/${x}?group=${f}`;return s.jsx("a",{href:A,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:v==="Yes"?"red":"blue",textDecoration:"underline"},children:t.getValue()||"-"})}}:{accessorKey:d,header:d.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()),size:i,Cell:({cell:t,row:l})=>{const x=l.original.id,v=l.original.is_assigned_back,A=`/spuid-review/${x}?group=${f}`;return s.jsx("a",{href:A,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:v==="Yes"?"red":"blue",textDecoration:"underline"},children:t.getValue()||"-"})}}})];return{flattenedData:a,columns:h}},w=P();return u.useEffect(()=>{(async()=>{var f,m;O(!0);try{const a=await D.get("/pmc/ping/",{headers:{"Content-Type":"application/json"}})}catch(a){const _={status:(f=a.response)==null?void 0:f.status,data:(m=a.response)==null?void 0:m.data,message:a.message};w("/error",{state:{error:_}})}try{let a=[];try{a=(await D.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],L(a.map(t=>t.name))}catch(i){console.error("Error fetching user groups:",i),L([])}console.log("groupsResponse",a);const h=(await D.get("/pmc/applicant-detail/",{headers:{"Content-Type":"multipart/form-data"}})).data;if(Array.isArray(h)&&h.length>0){const i=b(h,a.length>0,a.map(l=>l.name)[0]);p(i.flattenedData),o(i.columns),console.log("Flattened Data:",i.flattenedData);const t=i.flattenedData[i.flattenedData.length-1];if(console.log("Last Row:",t),t&&t.id){T(t.id),console.log("Last Row ID:",t.id);const l=k.indexOf(t.assigned_group);l!==-1&&y(l)}}const d=await D.get("/pmc/fetch-statistics-do-view-groups/",{headers:{"Content-Type":"multipart/form-data"}});M(d.data)}catch(a){console.error("Error fetching data:",a)}finally{O(!1)}})(),T(25);const c=k.indexOf("LSO");c!==-1&&y(c)},[]),u.useEffect(()=>{console.log("userGroups:",r),r&&!r.includes("DO")&&w("/home")},[r,w]),u.useEffect(()=>{const e=Object.keys(C).find(c=>R.includes(c));I(e)},[R]),console.log("selectedRowId:",j),console.log(j),s.jsxs("div",{children:[s.jsx("div",{className:"tiles-container",children:Object.entries(E).map(([e,c])=>s.jsxs("div",{className:"tile",style:{cursor:"pointer",backgroundColor:N===e?"#007BFF":"#f8f9fa",color:N===e?"#fff":"#000"},onClick:()=>I(e),children:[s.jsx("h3",{children:C[e]||e})," ",s.jsx("p",{children:c})]},e))}),s.jsx("div",{className:"mb-4",children:s.jsxs("h3",{children:[r&&r.filter(e=>e!=="Download License"&&e!=="Applicant"&&e!=="LSM2").join(" - ")," Dashboard"]})}),s.jsx("div",{children:s.jsx("h6",{className:"text-red-500",children:"Records highlighted in red require immediate attention, as they have been returned from a next step."})}),F?s.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[s.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),s.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):s.jsx(B,{columns:[...g],data:n.map(e=>({...e,assigned_group_title:C[e.assigned_group]||e.assigned_group})),getRowId:e=>e.id,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:420,minSize:200,size:100},enableColumnResizing:!0,columnResizeMode:"onChange",enableTopToolbar:!0,enablePagination:!0})]})};export{X as default};
