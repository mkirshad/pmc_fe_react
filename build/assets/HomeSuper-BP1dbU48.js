import{r as l,U as N,j as d,A as h}from"./index-BmmSaRMd.js";import{M as I}from"./index.esm-HrKTSwBG.js";import"./TextField-CCmcwC6_.js";import"./Divider-dls0HLV7.js";import"./FormControlLabel-BxkSjWdq.js";import"./Autocomplete-DBjqr0xB.js";import"./index-C80g_mgi.js";const z=t=>{var f,D,L;const u=s=>new Intl.NumberFormat("en-PK",{style:"currency",currency:"PKR",minimumFractionDigits:2}).format(s),i=t.applicationassignment.filter(s=>s.assigned_group===t.assigned_group),a=i.reduce((s,r)=>new Date(r.updated_at).getTime()>new Date(s.updated_at).getTime()?r:s,i[0]),n=a?(f=a.updated_at)==null?void 0:f.substring(0,16):"N/A";let _="N/A";if(a&&a.updated_at){const s=new Date(a.updated_at),O=new Date-s;_=Math.floor(O/(1e3*60*60*24))}const b=t.applicantfees?t.applicantfees.reduce((s,r)=>s+parseFloat(r.fee_amount||0),0):0,w=t.applicantfees?t.applicantfees.filter(s=>s.is_settled).reduce((s,r)=>s+parseFloat(r.fee_amount||0),0):0;return{id:t.id,application_Submission_Time:((L=(D=t.submittedapplication)==null?void 0:D.created_at)==null?void 0:L.substring(0,16))||"N/A",tracking_number:t.tracking_number,first_name:t.first_name,mobile_no:t.mobile_no,application_status:t.application_status,assigned_group:t.assigned_group,group_assignment_time:n,group_assignment_days:_,total_fee_amount:u(b.toFixed(2)),verified_fee_amount:u(w.toFixed(2))}},P=t=>t.map(u=>{const i=z(u);return Object.keys(i).forEach(a=>{(i[a]===void 0||i[a]===null)&&(i[a]="N/A")}),i}),H=()=>{const[t,u]=l.useState([]),[i,a]=l.useState([]),[n,_]=l.useState(null),[b,w]=l.useState(0),[f,D]=l.useState(null),[L,s]=l.useState({}),[r,O]=l.useState(null);console.log(f);const F=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","Download License"],y={APPLICANT:"Applicant",LSO:"LSO",LSO1:"Sana",LSO2:"Qaisar",LSO3:"Ameer",LSM:"LSM",DO:"DO",LSM2:"LSM",TL:"TL",DEO:"DEO","Download License":"Download License"},R=async e=>{try{if(O(e),e==="LSO1"||e==="LSO2"||e==="LSO3"){const c=e==="LSO1"?1:e==="LSO2"?2:0,p=((await h.get("/pmc/applicant-detail-main-list/",{params:{assigned_group:"LSO"}})).data||[]).filter(S=>{var T;return((T=S.submittedapplication)==null?void 0:T.id)%3===c}),m=v(p,!!n.length,n[0]);u(m.flattenedData),a(m.columns)}else{const o=(await h.get("/pmc/applicant-detail-main-list/",{params:{assigned_group:e!=="All-Applications"&&e!=="Challan-Downloaded"?e:void 0,application_status:e==="Challan-Downloaded"?"Fee Challan":void 0}})).data||[],p=v(o,!!n.length,n[0]);u(p.flattenedData),a(p.columns)}}catch(c){console.error("Error fetching filtered data:",c),u([]),a([])}},v=(e,c,o)=>{const p=["first_name","last_name","cnic","mobile_no","application_status","tracking_number","assigned_group","registration_for","application_Start_Time","application_Submission_Time","remarks","group_assignment_days","total_fee_amount","verified_fee_amount"],m=P(e),S=m[0],T=[...Object.keys(S).filter(g=>p.includes(g)).map(g=>{let A=160;return["mobile_no","application_status","assigned_group","total_fee_amount"].includes(g)?A=120:["first_name"].includes(g)&&(A=180),{accessorKey:g,header:g.replace(/_/g," ").replace(/\b\w/g,C=>C.toUpperCase()),size:A,Cell:({cell:C,row:E})=>{const M=`/spuid-review/${E.original.id}?group=${o}`;return d.jsx("a",{href:M,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:"blue",textDecoration:"underline"},children:C.getValue()||"-"})}}})];return{flattenedData:m,columns:T}},x=N();return l.useEffect(()=>{(async()=>{try{const o=await h.get("/pmc/ping/",{headers:{"Content-Type":"application/json"}})}catch{x("/error")}try{let o=[];try{o=(await h.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],_(o.map(S=>S.name))}catch(m){console.error("Error fetching user groups:",m),_([])}console.log("groupsResponse",o);const p=await h.get("/pmc/fetch-statistics-view-groups/",{headers:{"Content-Type":"multipart/form-data"}});s(p.data)}catch(o){console.error("Error fetching data:",o)}})(),D(25);const c=F.indexOf("LSO");c!==-1&&w(c)},[]),l.useEffect(()=>{console.log("userGroups:",n),n&&!n.includes("Super")&&x("/home")},[n,x]),console.log("selectedRowId:",f),console.log(f),d.jsxs("div",{children:[d.jsx("div",{className:"tiles-container",children:Object.entries(L).map(([e,c])=>d.jsxs("div",{className:"tile",style:{cursor:"pointer",backgroundColor:r===e?"#007BFF":"#f8f9fa",color:r===e?"#fff":"#000"},onClick:()=>R(e),children:[d.jsx("h3",{children:y[e]||e})," ",d.jsx("p",{children:c})]},e))}),d.jsx("div",{className:"mb-4",children:d.jsxs("h3",{children:[n&&n.filter(e=>e!=="Download License"&&e!=="Applicant"&&e!=="LSM2").join(" - ")," Dashboard"]})}),d.jsx(I,{columns:[...i],data:t.map(e=>({...e,assigned_group_title:y[e.assigned_group]||e.assigned_group})),getRowId:e=>e.id,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:200,minSize:1,size:50},enableColumnResizing:!0,columnResizeMode:"onChange",enableTopToolbar:!0,enablePagination:!0},f)]})};export{H as default};