import{r as i,k as I,W as k,j as a,A as w}from"./index-CwX1nUbx.js";import{M as j}from"./index.esm-CK6a-GTY.js";import{T as M}from"./index-De3fS16M.js";import"./TextField-C466wn8a.js";import"./DefaultPropsProvider-XmVvMjD7.js";import"./Autocomplete-CMvTRBBw.js";import"./FormControlLabel-B7fW3vcQ.js";import"./Divider-B1E8UkCv.js";import"./index-CGwFXcP3.js";import"./useControllableState-BSuL2CNC.js";import"./classNames-Di997-Te.js";const{TabNav:Y,TabList:Z,TabContent:ee}=M,P=t=>{var s,f,x;const n=(t.assigned_group==="APPLICANT"&&t.applicationassignment||[]).filter(l=>l.assigned_group==="APPLICANT"&&l.remarks&&l.remarks!=="undefined").map(l=>l.remarks),p=n.length>0?n.join("; "):"N/A";return{id:t.id,tracking_number:t.tracking_number,first_name:t.first_name,last_name:t.last_name,CNIC:t.cnic,mobile_no:t.mobile_no,application_status:t.application_status,assigned_group:t.assigned_group,registration_for:t.registration_for,application_Start_Time:((s=t.created_at)==null?void 0:s.substring(0,16))||"N/A",application_Submission_Time:((x=(f=t.submittedapplication)==null?void 0:f.created_at)==null?void 0:x.substring(0,16))||"N/A",remarks:p}},z=t=>t.map(_=>{const n=P(_);return Object.keys(n).forEach(p=>{(n[p]===void 0||n[p]===null)&&(n[p]="N/A")}),n}),te=()=>{const[t,_]=i.useState([]),[n,p]=i.useState([]),[s,f]=i.useState([]),[x,l]=i.useState(0),[S,b]=i.useState(null),[N,O]=i.useState({}),[$,G]=i.useState("tab1");console.log(S);const[v,A]=i.useState(!1),T=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","Download License"],C={APPLICANT:"Applicant",LSO:"LSO",LSM:"LSM",DO:"DO",LSM2:"LSM",TL:"TL",DEO:"DEO","Download License":"Download License"},R=I(e=>e.user.authority)||[];console.log("user authority:",R);const y=(e,g,r)=>{const u=["first_name","last_name","cnic","mobile_no","application_status","tracking_number","assigned_group","registration_for","application_Start_Time","application_Submission_Time","remarks"],c=z(e),m=c[0];console.log(e);const d=[...Object.keys(m).filter(o=>u.includes(o)).map(o=>({accessorKey:o,header:o.replace(/_/g," ").replace(/\b\w/g,L=>L.toUpperCase()),Cell:({cell:L,row:E})=>a.jsx("span",{style:{cursor:"pointer",color:"blue",textDecoration:"underline"},onClick:()=>{const D=E.original.id;console.log(`Clicked ${o}:`,L.getValue()),console.log(`Navigating with ID: ${D}`),window.location.href=g?`/spuid-review/${D}?group=${r}`:`/spuid-signup/${D}`},children:L.getValue()||"-"})}))];return{flattenedData:c,columns:d}},h=k();return i.useEffect(()=>{(async()=>{A(!0);try{let r=[];try{if(navigator.onLine)r=(await w.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],f(r.map(c=>c.name));else throw new Error("Application is offline. Cannot fetch data.")}catch(u){console.error("Error fetching user groups:",u),f([])}if(console.log("groupsResponse",r),navigator.onLine){const c=(await w.get("/pmc/applicant-detail/",{headers:{"Content-Type":"multipart/form-data"}})).data;if(Array.isArray(c)&&c.length>0){const m=y(c,r.length>0,r.map(o=>o.name)[0]);_(m.flattenedData),p(m.columns),console.log("Flattened Data:",m.flattenedData);const d=m.flattenedData[m.flattenedData.length-1];if(console.log("Last Row:",d),d&&d.id){b(d.id),console.log("Last Row ID:",d.id);const o=T.indexOf(d.assigned_group);o!==-1&&l(o)}}}else throw new Error("Application is offline. Cannot fetch data.");if(navigator.onLine){const u=await w.get("/pmc/fetch-statistics-view-groups/",{headers:{"Content-Type":"multipart/form-data"}});O(u.data)}else throw new Error("Application is offline. Cannot fetch data.")}catch(r){console.error("Error fetching data:",r)}finally{A(!1)}})(),b(25);const g=T.indexOf("LSO");g!==-1&&l(g)},[]),i.useEffect(()=>{console.log("userGroups:",s),s.includes("DEO")||s.includes("DG")?h("/home-deo"):s.includes("Admin")?h("/home-admin"):s.includes("DO")?h("/home-do"):s.includes("Super")&&h("/home-super")},[s,h]),console.log("selectedRowId:",S),console.log(S),a.jsxs("div",{children:[a.jsx("div",{className:"tiles-container",children:Object.entries(N).map(([e,g])=>a.jsxs("div",{className:"tile",children:[a.jsx("h3",{children:C[e]||e})," ",a.jsx("p",{children:g})]},e))}),s.length>0&&a.jsx("div",{className:"mb-4",children:a.jsxs("h3",{children:[s.filter(e=>e!=="Download License"&&e!=="Applicant"&&e!=="LSM2").join(" - ")," Dashboard"]})}),v?a.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[a.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),a.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):a.jsx(j,{columns:[...n],data:t.map(e=>({...e,assigned_group_title:C[e.assigned_group]||e.assigned_group})),getRowId:e=>e.id,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:420,minSize:100,size:140},enableColumnResizing:!0,enableTopToolbar:s.length>0,enablePagination:!0},S)]})};export{te as default};
