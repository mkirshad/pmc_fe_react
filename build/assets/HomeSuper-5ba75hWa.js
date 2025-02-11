import{r as l,U as G,j as t,A as b}from"./index-D7gsvq0q.js";import{M as B}from"./index.esm-BzJtqdlq.js";import"./TextField-Ct4mkRVW.js";import"./DefaultPropsProvider-BP7L4F6z.js";import"./FormControlLabel-Bc_CLxka.js";import"./Autocomplete-CbjDOeDC.js";import"./Divider-DUO2S8PJ.js";import"./index-GeG-ga1p.js";const U=s=>{var T,f,j,C,F,L;const m=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","Download License"],g=m.indexOf(s.assigned_group),o=s.applicationassignment||[],r=(()=>{if(o.length>1){const a=o[o.length-2];return m.indexOf(a.assigned_group)}return-1})(),w=r!==-1&&r>g;o.find(a=>m.indexOf(a.assigned_group)===r);const I=a=>new Intl.NumberFormat("en-PK",{style:"currency",currency:"PKR",minimumFractionDigits:2}).format(a),N=s.applicationassignment.filter(a=>a.assigned_group===s.assigned_group),d=N.reduce((a,c)=>new Date(c.updated_at).getTime()>new Date(a.updated_at).getTime()?c:a,N[0]),M=d?(T=d.updated_at)==null?void 0:T.substring(0,16):"N/A";let y="N/A";if(d&&d.updated_at){const a=new Date(d.updated_at),h=new Date-a;y=Math.floor(h/(1e3*60*60*24))}let A="N/A";if((f=s.submittedapplication)!=null&&f.created_at&&((j=s.submittedapplication)!=null&&j.created_at)){const a=new Date((C=s.submittedapplication)==null?void 0:C.created_at),h=new Date-a;A=Math.floor(h/(1e3*60*60*24))}const O=s.applicantfees?s.applicantfees.reduce((a,c)=>a+parseFloat(c.fee_amount||0),0):0,k=s.applicantfees?s.applicantfees.filter(a=>a.is_settled).reduce((a,c)=>a+parseFloat(c.fee_amount||0),0):0;return{id:s.id,application_Submission_Time:((L=(F=s.submittedapplication)==null?void 0:F.created_at)==null?void 0:L.substring(0,16))||"N/A",duration:A||"N/A",tracking_number:s.tracking_number,first_name:s.first_name,mobile_no:s.mobile_no,application_status:s.application_status,assigned_group:s.assigned_group,group_assignment_time:M,group_assignment_days:y,total_fee_amount:I(O.toFixed(2)),verified_fee_amount:I(k.toFixed(2)),is_assigned_back:w?"Yes":"No"}},V=s=>s.map(m=>{const g=U(m);return Object.keys(g).forEach(o=>{(g[o]===void 0||g[o]===null)&&(g[o]="N/A")}),g}),X=()=>{const[s,m]=l.useState([]),[g,o]=l.useState([]),[r,w]=l.useState(null),[I,N]=l.useState(0),[d,M]=l.useState(null),[y,A]=l.useState({}),[O,k]=l.useState(null),[T,f]=l.useState(!1),[j,C]=l.useState([]);console.log(d);const F=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","Download License"],L={APPLICANT:"Applicant",LSO:"LSO",LSO1:"Sana",LSO2:"Qaisar",LSO3:"Ameer",LSM:"LSM",DO:"DO",LSM2:"LSM",TL:"TL",DEO:"DEO","Download License":"Download License"},a=async e=>{try{if(f(!0),k(e),e==="LSO1"||e==="LSO2"||e==="LSO3"){const i=e==="LSO1"?1:e==="LSO2"?2:0,u=((await b.get("/pmc/applicant-detail-main-list/",{params:{assigned_group:"LSO"}})).data||[]).filter(v=>{var R;return((R=v.submittedapplication)==null?void 0:R.id)%3===i}),x=c(u,!!r.length,r[0]);m(x.flattenedData),o(x.columns)}else{const n=(await b.get("/pmc/applicant-detail-main-list/",{params:{assigned_group:e!=="All-Applications"&&e!=="Challan-Downloaded"?e:void 0,application_status:e==="Challan-Downloaded"?"Fee Challan":void 0}})).data||[],u=c(n,!!r.length,r[0]);m(u.flattenedData),o(u.columns)}}catch(i){console.error("Error fetching filtered data:",i),m([]),o([])}finally{f(!1)}},c=(e,i,n)=>{const u=["first_name","last_name","cnic","mobile_no","application_status","tracking_number","assigned_group","registration_for","application_Start_Time","application_Submission_Time","duration","remarks","group_assignment_days","total_fee_amount","verified_fee_amount","is_assigned_back"],x=V(e),v=x[0],R=[...Object.keys(v).filter(_=>u.includes(_)).map(_=>{let E=160;return["mobile_no","application_status","assigned_group","total_fee_amount"].includes(_)?E=120:["first_name"].includes(_)&&(E=180),_==="is_assigned_back"?{accessorKey:_,header:"Assigned Back",size:E,Filter:({column:p})=>t.jsxs("select",{value:p.getFilterValue()||"",onChange:S=>p.setFilterValue(S.target.value||void 0),style:{width:"100%",padding:"4px"},children:[t.jsx("option",{value:"",children:"All"}),t.jsx("option",{value:"Yes",children:"Yes"}),t.jsx("option",{value:"",children:"No"})]}),filterFn:(p,S,D)=>D===""||p.original[_]===D,Cell:({cell:p,row:S})=>{const D=S.original.id,z=S.original.is_assigned_back,P=`/spuid-review/${D}?group=${n}`;return t.jsx("a",{href:P,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:z==="Yes"?"red":"blue",textDecoration:"underline"},children:p.getValue()||"-"})}}:{accessorKey:_,header:_.replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase()),size:E,Cell:({cell:p,row:S})=>{const D=S.original.id,z=S.original.is_assigned_back,P=`/spuid-review/${D}?group=${n}`;return t.jsx("a",{href:P,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:z==="Yes"?"red":"blue",textDecoration:"underline"},children:p.getValue()||"-"})}}})];return{flattenedData:x,columns:R}},h=G();return l.useEffect(()=>{(async()=>{f(!0);try{const i=await b.get("/pmc/report-fee/");C(i.data)}catch(i){console.error("Error fetching fee statistics:",i)}finally{f(!1)}})()},[]),l.useEffect(()=>{(async()=>{f(!0);try{const n=await b.get("/pmc/ping/",{headers:{"Content-Type":"application/json"}})}catch{h("/error")}try{let n=[];try{n=(await b.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],w(n.map(v=>v.name))}catch(x){console.error("Error fetching user groups:",x),w([])}console.log("groupsResponse",n);const u=await b.get("/pmc/fetch-statistics-view-groups/",{headers:{"Content-Type":"multipart/form-data"}});A(u.data)}catch(n){console.error("Error fetching data:",n)}finally{f(!1)}})(),M(25);const i=F.indexOf("LSO");i!==-1&&N(i)},[]),l.useEffect(()=>{console.log("userGroups:",r),r&&!r.includes("Super")&&h("/home")},[r,h]),console.log("selectedRowId:",d),console.log(d),t.jsxs("div",{children:[t.jsx("div",{className:"tiles-container",children:Object.entries(y).map(([e,i])=>t.jsxs("div",{className:"tile",style:{cursor:"pointer",backgroundColor:O===e?"#007BFF":"#f8f9fa",color:O===e?"#fff":"#000"},onClick:()=>a(e),children:[t.jsx("h3",{children:L[e]||e})," ",t.jsx("p",{children:i})]},e))}),t.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",children:j.map((e,i)=>{const n=u=>new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}).format(u);return t.jsxs("div",{className:"bg-white shadow-md rounded-lg p-4 border border-gray-300",children:[t.jsxs("h4",{className:"text-xl font-semibold text-gray-700 text-center",children:["Fee amount till ",e.till]}),t.jsxs("div",{className:"mt-3 flex justify-around text-center",children:[t.jsxs("p",{className:"text-sm text-gray-600",children:["Received: ",t.jsx("br",{}),t.jsx("span",{className:"font-bold text-blue-600",children:n(e.fee_received)})]}),t.jsxs("p",{className:"text-sm text-gray-600",children:["Verified: ",t.jsx("br",{}),t.jsx("span",{className:"font-bold text-green-600",children:n(e.fee_verified)})]}),t.jsxs("p",{className:"text-sm text-gray-600",children:["Unverified: ",t.jsx("br",{}),t.jsx("span",{className:"font-bold text-red-600",children:n(e.fee_unverified)})]})]})]},i)})}),t.jsx("div",{className:"mb-4",children:t.jsxs("h3",{children:[r&&r.filter(e=>e!=="Download License"&&e!=="Applicant"&&e!=="LSM2").join(" - ")," Dashboard"]})}),t.jsx("div",{className:"mb-2",children:t.jsx("h6",{className:"text-red-500",children:"Records highlighted in red require immediate attention, as they have been returned from a next step."})}),T?t.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[t.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),t.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):t.jsx(B,{columns:[...g],data:s.map(e=>({...e,assigned_group_title:L[e.assigned_group]||e.assigned_group})),getRowId:e=>e.id,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:200,minSize:1,size:50},enableColumnResizing:!0,columnResizeMode:"onChange",enableTopToolbar:!0,enablePagination:!0},d)]})};export{X as default};
