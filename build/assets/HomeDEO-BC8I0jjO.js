import{r as o,k as z,U as P,j as t,A as y}from"./index-BLwYN0BW.js";import{M as B}from"./index.esm-D1ydRdI6.js";import"./TextField-O4t8MnQ_.js";import"./DefaultPropsProvider-DqQ2WyRj.js";import"./FormControlLabel-CIt4uZh6.js";import"./Autocomplete-DpRitwOB.js";import"./Divider-rJ8gbucv.js";import"./index-DXCJI3fi.js";const U=a=>{var O,_,L,T,F,x;const f=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","DG","Download License"],g=f.indexOf(a.assigned_group),l=a.applicationassignment||[],d=(()=>{if(l.length>1){const s=l[l.length-2];return f.indexOf(s.assigned_group)}return-1})(),w=d!==-1&&d>g;l.find(s=>f.indexOf(s.assigned_group)===d);const E=s=>new Intl.NumberFormat("en-PK",{style:"currency",currency:"PKR",minimumFractionDigits:2}).format(s),A=a.applicationassignment.filter(s=>s.assigned_group===a.assigned_group),u=A.reduce((s,c)=>new Date(c.updated_at).getTime()>new Date(s.updated_at).getTime()?c:s,A[0]),R=u?(O=u.updated_at)==null?void 0:O.substring(0,16):"N/A";let N="N/A";if(u&&u.updated_at){const s=new Date(u.updated_at),D=new Date-s;N=Math.floor(D/(1e3*60*60*24))}let j="N/A";if((_=a.submittedapplication)!=null&&_.created_at&&((L=a.submittedapplication)!=null&&L.created_at)){const s=new Date((T=a.submittedapplication)==null?void 0:T.created_at),D=new Date-s;j=Math.floor(D/(1e3*60*60*24))}const C=a.applicantfees?a.applicantfees.reduce((s,c)=>s+parseFloat(c.fee_amount||0),0):0,k=a.applicantfees?a.applicantfees.filter(s=>s.is_settled).reduce((s,c)=>s+parseFloat(c.fee_amount||0),0):0;return{id:a.id,application_Submission_Time:((x=(F=a.submittedapplication)==null?void 0:F.created_at)==null?void 0:x.substring(0,16))||"N/A",duration:j||"N/A",tracking_number:a.tracking_number,first_name:a.first_name,mobile_no:a.mobile_no,application_status:a.application_status,assigned_group:a.assigned_group,group_assignment_time:R,group_assignment_days:N,total_fee_amount:E(C.toFixed(2)),verified_fee_amount:E(k.toFixed(2)),is_assigned_back:w?"Yes":"No"}},V=a=>a.map(f=>{const g=U(f);return Object.keys(g).forEach(l=>{(g[l]===void 0||g[l]===null)&&(g[l]="N/A")}),g}),X=()=>{const[a,f]=o.useState([]),[g,l]=o.useState([]),[d,w]=o.useState(null),[E,A]=o.useState(0),[u,R]=o.useState(null),[N,j]=o.useState({}),[C,k]=o.useState(null),[O,_]=o.useState(!1),[L,T]=o.useState([]);console.log(u);const F=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","DG","Download License"],x={"All-Applications":"All-Applications","Challan-Downloaded":"Challan-Downloaded",Submitted:"Submitted",PMC:"PMC",DO:"DO",DEO:"DEO",DG:"DG"},s=z(e=>e.user.authority)||[],c=async e=>{try{if(_(!0),k(e),e==="LSO1"||e==="LSO2"||e==="LSO3"){const n=e==="LSO1"?1:e==="LSO2"?2:0,m=((await y.get("/pmc/applicant-detail-main-list/",{params:{assigned_group:"LSO"}})).data||[]).filter(r=>{var S;return((S=r.submittedapplication)==null?void 0:S.id)%3===n}),b=D(m);f(b.flattenedData),l(b.columns)}else{const i=(await y.get("/pmc/applicant-detail-main-list/",{params:{assigned_group:e!=="All-Applications"&&e!=="Challan-Downloaded"?e:void 0,application_status:e==="Challan-Downloaded"?"Fee Challan":void 0}})).data||[],m=D(i);f(m.flattenedData),l(m.columns)}}catch(n){console.error("Error fetching filtered data:",n),f([]),l([])}finally{_(!1)}},D=e=>{const n=["first_name","last_name","cnic","mobile_no","application_status","tracking_number","assigned_group","registration_for","application_Start_Time","application_Submission_Time","duration","remarks","group_assignment_days","total_fee_amount","verified_fee_amount","is_assigned_back"],i=V(e),m=i[0],b=[...Object.keys(m).filter(r=>n.includes(r)).map(r=>{let S=160;return["mobile_no","application_status","assigned_group","total_fee_amount"].includes(r)?S=120:["first_name"].includes(r)&&(S=180),r==="is_assigned_back"?{accessorKey:r,header:"Assigned Back",size:S,Filter:({column:p})=>t.jsxs("select",{value:p.getFilterValue()||"",onChange:h=>p.setFilterValue(h.target.value||void 0),style:{width:"100%",padding:"4px"},children:[t.jsx("option",{value:"",children:"All"}),t.jsx("option",{value:"Yes",children:"Yes"}),t.jsx("option",{value:"",children:"No"})]}),filterFn:(p,h,v)=>v===""||p.original[r]===v,Cell:({cell:p,row:h})=>{const v=h.original.id,M=h.original.is_assigned_back,G=`/spuid-review/${v}`;return t.jsx("a",{href:G,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:M==="Yes"?"red":"blue",textDecoration:"underline"},children:p.getValue()||"-"})}}:{accessorKey:r,header:r.replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase()),size:S,Cell:({cell:p,row:h})=>{const v=h.original.id,M=h.original.is_assigned_back,G=`/spuid-review/${v}`;return t.jsx("a",{href:G,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:M==="Yes"?"red":"blue",textDecoration:"underline"},children:p.getValue()||"-"})}}})];return{flattenedData:i,columns:b}},I=P();return o.useEffect(()=>{(async()=>{_(!0);try{const n=await y.get("/pmc/report-fee/");T(n.data)}catch(n){console.error("Error fetching fee statistics:",n)}finally{_(!1)}})()},[]),o.useEffect(()=>{const e=Object.keys(x).find(n=>s.includes(n));c(e)},[s]),o.useEffect(()=>{(async()=>{_(!0);try{const i=await y.get("/pmc/ping/",{headers:{"Content-Type":"application/json"}})}catch{I("/error")}try{let i=[];try{i=(await y.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],w(i.map(r=>r.name))}catch(b){console.error("Error fetching user groups:",b),w([])}console.log("groupsResponse",i);const m=await y.get("/pmc/fetch-statistics-view-groups/",{headers:{"Content-Type":"multipart/form-data"}});j(m.data)}catch(i){console.error("Error fetching data:",i)}finally{_(!1)}})(),R(25);const n=F.indexOf("LSO");n!==-1&&A(n)},[]),o.useEffect(()=>{console.log("userGroups:",d),d&&!d.includes("Super")&&I("/home")},[d,I]),console.log("selectedRowId:",u),console.log(u),t.jsxs("div",{children:[t.jsx("div",{className:"tiles-container",children:Object.entries(N).filter(([e])=>x[e]).map(([e,n])=>t.jsxs("div",{className:"tile",style:{cursor:"pointer",backgroundColor:C===e?"#007BFF":"#f8f9fa",color:C===e?"#fff":"#000"},onClick:()=>c(e),children:[t.jsx("h3",{children:x[e]||e}),t.jsx("p",{children:n})]},e))}),t.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",children:L.map((e,n)=>{const i=m=>new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}).format(m);return t.jsxs("div",{className:"bg-white shadow-md rounded-lg p-4 border border-gray-300",children:[t.jsxs("h4",{className:"text-xl font-semibold text-gray-700 text-center",children:["Fee amount till ",e.till]}),t.jsxs("div",{className:"mt-3 flex justify-around text-center",children:[t.jsxs("p",{className:"text-sm text-gray-600",children:["Received: ",t.jsx("br",{}),t.jsx("span",{className:"font-bold text-blue-600",children:i(e.fee_received)})]}),t.jsxs("p",{className:"text-sm text-gray-600",children:["Verified: ",t.jsx("br",{}),t.jsx("span",{className:"font-bold text-green-600",children:i(e.fee_verified)})]}),t.jsxs("p",{className:"text-sm text-gray-600",children:["Unverified: ",t.jsx("br",{}),t.jsx("span",{className:"font-bold text-red-600",children:i(e.fee_unverified)})]})]})]},n)})}),t.jsx("div",{className:"mb-4",children:t.jsxs("h3",{children:[d&&d.filter(e=>e!=="Download License"&&e!=="Applicant"&&e!=="LSM2").join(" - ")," Dashboard"]})}),t.jsx("div",{className:"mb-2",children:t.jsx("h6",{className:"text-red-500",children:"Records highlighted in red require immediate attention, as they have been returned from a next step."})}),O?t.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[t.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),t.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):t.jsx(B,{columns:[...g],data:a.map(e=>({...e,assigned_group_title:x[e.assigned_group]||e.assigned_group})),getRowId:e=>e.id,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:200,minSize:1,size:50},enableColumnResizing:!0,columnResizeMode:"onChange",enableTopToolbar:!0,enablePagination:!0},u)]})};export{X as default};
