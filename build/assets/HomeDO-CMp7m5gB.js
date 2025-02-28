import{r as c,l as B,X as P,j as t,A as _}from"./index-CYtqHYmC.js";import{M as U}from"./index.esm-CZ51xm8X.js";import{a as Y}from"./index-D5JnZ2uo.js";import"./TextField-tJrIwGg1.js";import"./DefaultPropsProvider-DeD93qIk.js";import"./Autocomplete-UKS4WuEL.js";import"./FormControlLabel-ankuZ4-5.js";import"./Divider-DTJvDORb.js";import"./index-CxASTyQA.js";const $=s=>{const d=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","DG","Download License"],u=d.indexOf(s.assigned_group),r=s.applicationassignment||[],o=(()=>{if(r.length>1){const L=r[r.length-2];return d.indexOf(L.assigned_group)}return-1})(),D=o!==-1&&o>u;return r.find(L=>d.indexOf(L.assigned_group)===o),{id:s.id,tracking_number:s.tracking_number,first_name:s.first_name,last_name:s.last_name,CNIC:s.cnic,mobile_no:s.mobile_no,application_status:s.application_status,assigned_group:s.assigned_group,registration_for:s.registration_for,remarks:s.remarks||"N/A",is_assigned_back:D?"Yes":"No"}},V=s=>s.map(d=>{const u=$(d);return Object.keys(u).forEach(r=>{(u[r]===void 0||u[r]===null)&&(u[r]="N/A")}),u}),te=()=>{const[s,d]=c.useState([]),[u,r]=c.useState([]),[o,D]=c.useState(null),[L,v]=c.useState(0),[A,j]=c.useState(null),[I,M]=c.useState({}),[N,F]=c.useState(null),[G,S]=c.useState(!1),E=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","DG","Download License"],O={APPLICANT:"Applicant",LSO:"LSO",LSM:"LSM",DO:"DO",LSM2:"LSM",TL:"TL",DEO:"DEO",DG:"DG","Download License":"Download License"},k=B(e=>e.user.authority)||[],R=async e=>{try{if(S(!0),F(e),e==="LSO1"||e==="LSO2"||e==="LSO3"){const i=e==="LSO1"?1:e==="LSO2"?2:0,m=((await _.get("/pmc/applicant-detail-main-do-list/",{params:{assigned_group:"LSO"}})).data||[]).filter(b=>{var l;return((l=b.submittedapplication)==null?void 0:l.id)%3===i}),g=w(m,!!o.length,o[0]);d(g.flattenedData),r(g.columns)}else{const n=(await _.get("/pmc/applicant-detail-main-do-list/",{params:{assigned_group:e!=="All-Applications"&&e!=="Challan-Downloaded"?e:void 0,application_status:e==="Challan-Downloaded"?"Fee Challan":void 0}})).data||[],m=w(n,!!o.length,o[0]);d(m.flattenedData),r(m.columns)}}catch(i){console.error("Error fetching filtered data:",i),d([]),r([])}finally{S(!1)}},w=(e,i,n)=>{const m=["first_name","CNIC","mobile_no","tracking_number","registration_for","days_pending_for","remarks","is_assigned_back"],g=V(e),b=g[0],l=[...Object.keys(b).filter(a=>m.includes(a)).map(a=>{let f=160;return["mobile_no","application_status","assigned_group","total_fee_amount"].includes(a)?f=120:["first_name"].includes(a)&&(f=180),a==="is_assigned_back"?{accessorKey:a,header:"Assigned Back",size:f,Filter:({column:p})=>t.jsxs("select",{value:p.getFilterValue()||"",onChange:h=>p.setFilterValue(h.target.value||void 0),style:{width:"100%",padding:"4px"},children:[t.jsx("option",{value:"",children:"All"}),t.jsx("option",{value:"Yes",children:"Yes"}),t.jsx("option",{value:"",children:"No"})]}),filterFn:(p,h,x)=>x===""||p.original[a]===x,Cell:({cell:p,row:h})=>{const x=h.original.id,C=h.original.is_assigned_back,y=`/spuid-review/${x}?group=${n}`;return t.jsx("a",{href:y,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:C==="Yes"?"red":"blue",textDecoration:"underline"},children:p.getValue()||"-"})}}:{accessorKey:a,header:a.replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase()),size:f,Cell:({cell:p,row:h})=>{const x=h.original.id,C=h.original.is_assigned_back,y=`/spuid-review/${x}?group=${n}`;return t.jsx("a",{href:y,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:C==="Yes"?"red":"blue",textDecoration:"underline"},children:p.getValue()||"-"})}}})];return{flattenedData:g,columns:l}},T=P();c.useEffect(()=>{(async()=>{S(!0);try{let n=[];try{n=(await _.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],D(n.map(a=>a.name))}catch(l){console.error("Error fetching user groups:",l),D([])}console.log("groupsResponse",n);const g=(await _.get("/pmc/applicant-detail/",{headers:{"Content-Type":"multipart/form-data"}})).data;if(Array.isArray(g)&&g.length>0){const l=w(g,n.length>0,n.map(f=>f.name)[0]);d(l.flattenedData),r(l.columns),console.log("Flattened Data:",l.flattenedData);const a=l.flattenedData[l.flattenedData.length-1];if(console.log("Last Row:",a),a&&a.id){j(a.id),console.log("Last Row ID:",a.id);const f=E.indexOf(a.assigned_group);f!==-1&&v(f)}}const b=await _.get("/pmc/fetch-statistics-do-view-groups/",{headers:{"Content-Type":"multipart/form-data"}});M(b.data)}catch(n){console.error("Error fetching data:",n)}finally{S(!1)}})(),j(25);const i=E.indexOf("LSO");i!==-1&&v(i)},[]),c.useEffect(()=>{console.log("userGroups:",o),o&&!o.includes("DO")&&T("/home")},[o,T]),c.useEffect(()=>{const e=Object.keys(O).find(i=>k.includes(i));R(e)},[k]),console.log("selectedRowId:",A),console.log(A);const z=async()=>{try{const e=await _.post("/pmc/export-applicant/",{applicant_ids:s==null?void 0:s.map(m=>m.id)},{responseType:"blob"}),i=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a");n.href=i,n.setAttribute("download",`Applicant_Details_${new Date().toISOString()}.xlsx`),document.body.appendChild(n),n.click(),document.body.removeChild(n)}catch(e){console.error("Export failed:",e)}};return t.jsxs("div",{children:[t.jsx("div",{className:"tiles-container",children:Object.entries(I).map(([e,i])=>t.jsxs("div",{className:"tile",style:{cursor:"pointer",backgroundColor:N===e?"#007BFF":"#f8f9fa",color:N===e?"#fff":"#000"},onClick:()=>R(e),children:[t.jsx("h3",{children:O[e]||e})," ",t.jsx("p",{children:i})]},e))}),t.jsx("div",{className:"mb-4",children:t.jsxs("h3",{children:[o&&o.filter(e=>e!=="Download License"&&e!=="Applicant"&&e!=="LSM2").join(" - ")," Dashboard"]})}),t.jsxs("div",{className:"grid md:grid-cols-5 gap-5 items-center mb-4",children:[t.jsx("h6",{className:"text-red-500 col-span-3",children:"Records highlighted in red require immediate attention, as they have been returned from a next step."}),t.jsx("span",{}),t.jsxs("button",{type:"button",onClick:z,className:"flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200",children:[t.jsx(Y,{className:"mr-2 text-xl"}),"Export to Excel"]})]}),G?t.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[t.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),t.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):t.jsx(U,{columns:[...u],data:s.map(e=>({...e,assigned_group_title:O[e.assigned_group]||e.assigned_group})),getRowId:e=>e.id,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:420,minSize:200,size:100},enableColumnResizing:!0,columnResizeMode:"onChange",enableTopToolbar:!0,enablePagination:!0})]})};export{te as default};
