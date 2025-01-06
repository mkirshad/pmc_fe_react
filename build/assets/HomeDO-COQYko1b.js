import{r as p,U as E,j as u,A as C}from"./index-DT7ys5lm.js";import{M}from"./index.esm-BElZc4H8.js";import"./TextField-B7dr8yz9.js";import"./Divider-C-I7DPMj.js";import"./FormControlLabel-CAzWIPhv.js";import"./Autocomplete-7BOB4tNU.js";import"./index-B5FQV8Ci.js";const P=s=>{const i=(s.assigned_group==="APPLICANT"&&s.applicationassignment||[]).filter(a=>a.assigned_group==="APPLICANT"&&a.remarks&&a.remarks!=="undefined").map(a=>a.remarks),l=i.length>0?i.join("; "):"N/A",n=s.applicationassignment.filter(a=>a.assigned_group===s.assigned_group),D=n.reduce((a,m)=>new Date(m.updated_at).getTime()>new Date(a.updated_at).getTime()?m:a,n[0]);let A="N/A";if(D&&D.updated_at){const a=new Date(D.updated_at),w=new Date-a;A=Math.floor(w/(1e3*60*60*24))}return{id:s.id,tracking_number:s.tracking_number,first_name:s.first_name,last_name:s.last_name,CNIC:s.cnic,mobile_no:s.mobile_no,application_status:s.application_status,assigned_group:s.assigned_group,registration_for:s.registration_for,days_pending_for:A,remarks:l}},z=s=>s.map(_=>{const i=P(_);return Object.keys(i).forEach(l=>{(i[l]===void 0||i[l]===null)&&(i[l]="N/A")}),i}),K=()=>{const[s,_]=p.useState([]),[i,l]=p.useState([]),[n,D]=p.useState(null),[A,a]=p.useState(0),[m,w]=p.useState(null),[I,N]=p.useState({}),[T,b]=p.useState(null);console.log(m);const R=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","Download License"],y={APPLICANT:"Applicant",LSO:"LSO",LSM:"LSM",DO:"DO",LSM2:"LSM",TL:"TL",DEO:"DEO","Download License":"Download License"},k=async e=>{try{if(b(e),e==="LSO1"||e==="LSO2"||e==="LSO3"){const c=e==="LSO1"?1:e==="LSO2"?2:0,d=((await C.get("/pmc/applicant-detail-main-do-list/",{params:{assigned_group:"LSO"}})).data||[]).filter(S=>{var g;return((g=S.submittedapplication)==null?void 0:g.id)%3===c}),t=x(d,!!n.length,n[0]);_(t.flattenedData),l(t.columns)}else{const h=(await C.get("/pmc/applicant-detail-main-do-list/",{params:{assigned_group:e!=="All-Applications"&&e!=="Challan-Downloaded"?e:void 0,application_status:e==="Challan-Downloaded"?"Fee Challan":void 0}})).data||[],d=x(h,!!n.length,n[0]);_(d.flattenedData),l(d.columns)}}catch(c){console.error("Error fetching filtered data:",c),_([]),l([])}},x=(e,c,h)=>{const d=["first_name","CNIC","mobile_no","tracking_number","registration_for","days_pending_for","remarks"],t=z(e),S=t[0];console.log(e);const g=[...Object.keys(S).filter(f=>d.includes(f)).map(f=>{let o=160;return["mobile_no","application_status","assigned_group","total_fee_amount"].includes(f)?o=120:["first_name"].includes(f)&&(o=180),{accessorKey:f,header:f.replace(/_/g," ").replace(/\b\w/g,r=>r.toUpperCase()),size:o,Cell:({cell:r,row:L})=>{const v=`/spuid-review/${L.original.id}?group=${h}`;return u.jsx("a",{href:v,target:"_blank",rel:"noopener noreferrer",style:{cursor:"pointer",color:"blue",textDecoration:"underline"},children:r.getValue()||"-"})}}})];return{flattenedData:t,columns:g}},O=E();return p.useEffect(()=>{(async()=>{var h,d;try{const t=await C.get("/pmc/ping/",{headers:{"Content-Type":"application/json"}})}catch(t){const S={status:(h=t.response)==null?void 0:h.status,data:(d=t.response)==null?void 0:d.data,message:t.message};O("/error",{state:{error:S}})}try{let t=[];try{t=(await C.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],D(t.map(r=>r.name))}catch(o){console.error("Error fetching user groups:",o),D([])}console.log("groupsResponse",t);const g=(await C.get("/pmc/applicant-detail/",{headers:{"Content-Type":"multipart/form-data"}})).data;if(Array.isArray(g)&&g.length>0){const o=x(g,t.length>0,t.map(L=>L.name)[0]);_(o.flattenedData),l(o.columns),console.log("Flattened Data:",o.flattenedData);const r=o.flattenedData[o.flattenedData.length-1];if(console.log("Last Row:",r),r&&r.id){w(r.id),console.log("Last Row ID:",r.id);const L=R.indexOf(r.assigned_group);L!==-1&&a(L)}}const f=await C.get("/pmc/fetch-statistics-do-view-groups/",{headers:{"Content-Type":"multipart/form-data"}});N(f.data)}catch(t){console.error("Error fetching data:",t)}})(),w(25);const c=R.indexOf("LSO");c!==-1&&a(c)},[]),p.useEffect(()=>{console.log("userGroups:",n),n&&!n.includes("DO")&&O("/home")},[n,O]),console.log("selectedRowId:",m),console.log(m),u.jsxs("div",{children:[u.jsx("div",{className:"tiles-container",children:Object.entries(I).map(([e,c])=>u.jsxs("div",{className:"tile",style:{cursor:"pointer",backgroundColor:T===e?"#007BFF":"#f8f9fa",color:T===e?"#fff":"#000"},onClick:()=>k(e),children:[u.jsx("h3",{children:y[e]||e})," ",u.jsx("p",{children:c})]},e))}),u.jsx("div",{className:"mb-4",children:u.jsxs("h3",{children:[n&&n.filter(e=>e!=="Download License"&&e!=="Applicant"&&e!=="LSM2").join(" - ")," Dashboard"]})}),u.jsx(M,{columns:[...i],data:s.map(e=>({...e,assigned_group_title:y[e.assigned_group]||e.assigned_group})),getRowId:e=>e.id,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:420,minSize:200,size:100},enableColumnResizing:!0,columnResizeMode:"onChange",enableTopToolbar:!0,enablePagination:!0},m)]})};export{K as default};
