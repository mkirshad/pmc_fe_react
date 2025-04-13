import{r as o,k as P,V as B,j as t,A as w}from"./index-CX9DdW7s.js";import{M as U}from"./index.esm-w1fdXNfR.js";import{a as V}from"./index-75CIUXDo.js";import"./TextField-Ba9dDGkV.js";import"./DefaultPropsProvider-BoJpczoY.js";import"./Autocomplete-7H0JHAC6.js";import"./FormControlLabel-Bu5Tnr9p.js";import"./Divider-BLUvYVUo.js";import"./index-BQdWZqCx.js";const Y=s=>{var C,x,L,T,F,_;const g=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","DG","Download License"],f=g.indexOf(s.assigned_group),l=s.applicationassignment||[],u=(()=>{if(l.length>1){const a=l[l.length-2];return g.indexOf(a.assigned_group)}return-1})(),v=u!==-1&&u>f;l.find(a=>g.indexOf(a.assigned_group)===u);const E=a=>new Intl.NumberFormat("en-PK",{style:"currency",currency:"PKR",minimumFractionDigits:2}).format(a),A=s.applicationassignment.filter(a=>a.assigned_group===s.assigned_group),p=A.reduce((a,d)=>new Date(d.updated_at).getTime()>new Date(a.updated_at).getTime()?d:a,A[0]),k=p?(C=p.updated_at)==null?void 0:C.substring(0,16):"N/A";let N="N/A";if(p&&p.updated_at){const a=new Date(p.updated_at),b=new Date-a;N=Math.floor(b/(1e3*60*60*24))}let j="N/A";if((x=s.submittedapplication)!=null&&x.created_at&&((L=s.submittedapplication)!=null&&L.created_at)){const a=new Date((T=s.submittedapplication)==null?void 0:T.created_at),b=new Date-a;j=Math.floor(b/(1e3*60*60*24))}const O=s.applicantfees?s.applicantfees.reduce((a,d)=>a+parseFloat(d.fee_amount||0),0):0,R=s.applicantfees?s.applicantfees.filter(a=>a.is_settled).reduce((a,d)=>a+parseFloat(d.fee_amount||0),0):0;return{id:s.id,application_Submission_Time:((_=(F=s.submittedapplication)==null?void 0:F.created_at)==null?void 0:_.substring(0,16))||"N/A",duration:j||"N/A",tracking_number:s.tracking_number,first_name:s.first_name,mobile_no:s.mobile_no,application_status:s.application_status,assigned_group:s.assigned_group,group_assignment_time:k,group_assignment_days:N,total_fee_amount:E(O.toFixed(2)),verified_fee_amount:E(R.toFixed(2)),is_assigned_back:v?"Yes":"No"}},K=s=>s.map(g=>{const f=Y(g);return Object.keys(f).forEach(l=>{(f[l]===void 0||f[l]===null)&&(f[l]="N/A")}),f}),te=()=>{const[s,g]=o.useState([]),[f,l]=o.useState([]),[u,v]=o.useState(null),[E,A]=o.useState(0),[p,k]=o.useState(null),[N,j]=o.useState({}),[O,R]=o.useState(null),[C,x]=o.useState(!1),[L,T]=o.useState([]);console.log(p);const F=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","DG","Download License"],_={"All-Applications":"All-Applications","Challan-Downloaded":"Challan-Downloaded",Submitted:"Submitted",PMC:"PMC",DO:"DO",DEO:"DEO",DG:"DG"},a=P(e=>e.user.authority)||[],d=async e=>{try{if(x(!0),R(e),e==="LSO1"||e==="LSO2"||e==="LSO3"){const n=e==="LSO1"?1:e==="LSO2"?2:0,c=((await w.get("/pmc/applicant-detail-main-list/",{params:{assigned_group:"LSO"}})).data||[]).filter(r=>{var S;return((S=r.submittedapplication)==null?void 0:S.id)%3===n}),D=b(c);g(D.flattenedData),l(D.columns)}else{const i=(await w.get("/pmc/applicant-detail-main-list/",{params:{assigned_group:e!=="All-Applications"&&e!=="Challan-Downloaded"?e:void 0,application_status:e==="Challan-Downloaded"?"Fee Challan":void 0}})).data||[],c=b(i);g(c.flattenedData),l(c.columns)}}catch(n){console.error("Error fetching filtered data:",n),g([]),l([])}finally{x(!1)}},b=e=>{const n=["first_name","last_name","cnic","mobile_no","application_status","tracking_number","assigned_group","registration_for","application_Start_Time","application_Submission_Time","duration","remarks","group_assignment_days","total_fee_amount","verified_fee_amount","is_assigned_back"],i=K(e),c=i[0],D=[...Object.keys(c).filter(r=>n.includes(r)).map(r=>{let S=160;return["mobile_no","application_status","assigned_group","total_fee_amount"].includes(r)?S=120:["first_name"].includes(r)&&(S=180),r==="is_assigned_back"?{accessorKey:r,header:"Assigned Back",size:S,Filter:({column:m})=>t.jsxs("select",{value:m.getFilterValue()||"",onChange:h=>m.setFilterValue(h.target.value||void 0),style:{width:"100%",padding:"4px"},children:[t.jsx("option",{value:"",children:"All"}),t.jsx("option",{value:"Yes",children:"Yes"}),t.jsx("option",{value:"",children:"No"})]}),filterFn:(m,h,y)=>y===""||m.original[r]===y,Cell:({cell:m,row:h})=>{const y=h.original.id,I=h.original.is_assigned_back,M=`/spuid-review/${y}`;return t.jsx("a",{href:M,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:I==="Yes"?"red":"blue",textDecoration:"underline"},children:m.getValue()||"-"})}}:{accessorKey:r,header:r.replace(/_/g," ").replace(/\b\w/g,m=>m.toUpperCase()),size:S,Cell:({cell:m,row:h})=>{const y=h.original.id,I=h.original.is_assigned_back,M=`/spuid-review/${y}`;return t.jsx("a",{href:M,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:I==="Yes"?"red":"blue",textDecoration:"underline"},children:m.getValue()||"-"})}}})];return{flattenedData:i,columns:D}},G=B();o.useEffect(()=>{(async()=>{x(!0);try{const n=await w.get("/pmc/report-fee/");T(n.data)}catch(n){console.error("Error fetching fee statistics:",n)}finally{x(!1)}})()},[]),o.useEffect(()=>{const e=Object.keys(_).find(n=>a.includes(n));d(e)},[a]),o.useEffect(()=>{(async()=>{x(!0);try{let i=[];try{i=(await w.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],v(i.map(r=>r.name))}catch(D){console.error("Error fetching user groups:",D),v([])}console.log("groupsResponse",i);const c=await w.get("/pmc/fetch-statistics-view-groups/",{headers:{"Content-Type":"multipart/form-data"}});j(c.data)}catch(i){console.error("Error fetching data:",i)}finally{x(!1)}})(),k(25);const n=F.indexOf("LSO");n!==-1&&A(n)},[]),o.useEffect(()=>{console.log("userGroups:",u),u&&!u.includes("Super")&&G("/home")},[u,G]),console.log("selectedRowId:",p),console.log(p);const z=async()=>{try{const e=await w.post("/pmc/export-applicant/",{applicant_ids:s==null?void 0:s.map(c=>c.id)},{responseType:"blob"}),n=window.URL.createObjectURL(new Blob([e.data])),i=document.createElement("a");i.href=n,i.setAttribute("download",`Applicant_Details_${new Date().toISOString()}.xlsx`),document.body.appendChild(i),i.click(),document.body.removeChild(i)}catch(e){console.error("Export failed:",e)}};return t.jsxs("div",{children:[t.jsx("div",{className:"tiles-container",children:Object.entries(N).filter(([e])=>_[e]).map(([e,n])=>t.jsxs("div",{className:"tile",style:{cursor:"pointer",backgroundColor:O===e?"#007BFF":"#f8f9fa",color:O===e?"#fff":"#000"},onClick:()=>d(e),children:[t.jsx("h3",{children:_[e]||e}),t.jsx("p",{children:n})]},e))}),t.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",children:L.map((e,n)=>{const i=c=>new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}).format(c);return t.jsxs("div",{className:"bg-white shadow-md rounded-lg p-4 border border-gray-300",children:[t.jsxs("h4",{className:"text-xl font-semibold text-gray-700 text-center",children:["Fee amount till ",e.till]}),t.jsxs("div",{className:"mt-3 flex justify-around text-center",children:[t.jsxs("p",{className:"text-sm text-gray-600",children:["Received: ",t.jsx("br",{}),t.jsx("span",{className:"font-bold text-blue-600",children:i(e.fee_received)})]}),t.jsxs("p",{className:"text-sm text-gray-600",children:["Verified: ",t.jsx("br",{}),t.jsx("span",{className:"font-bold text-green-600",children:i(e.fee_verified)})]}),t.jsxs("p",{className:"text-sm text-gray-600",children:["Unverified: ",t.jsx("br",{}),t.jsx("span",{className:"font-bold text-red-600",children:i(e.fee_unverified)})]})]})]},n)})}),t.jsx("div",{className:"mb-4",children:t.jsxs("h3",{children:[u&&u.filter(e=>e!=="Download License"&&e!=="Applicant"&&e!=="LSM2").join(" - ")," Dashboard"]})}),t.jsxs("div",{className:"grid md:grid-cols-5 gap-5 items-center mb-4",children:[t.jsx("h6",{className:"text-red-500 col-span-3",children:"Records highlighted in red require immediate attention, as they have been returned from a next step."}),t.jsx("span",{}),t.jsxs("button",{type:"button",onClick:z,className:"flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200",children:[t.jsx(V,{className:"mr-2 text-xl"}),"Export to Excel"]})]}),C?t.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[t.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),t.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):t.jsx(U,{columns:[...f],data:s.map(e=>({...e,assigned_group_title:_[e.assigned_group]||e.assigned_group})),getRowId:e=>e.id,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:200,minSize:1,size:50},enableColumnResizing:!0,columnResizeMode:"onChange",enableTopToolbar:!0,enablePagination:!0},p)]})};export{te as default};
