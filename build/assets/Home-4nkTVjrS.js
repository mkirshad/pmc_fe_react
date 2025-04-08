import{r,k,V as I,j as s,A as w}from"./index-DES3wWRf.js";import{M}from"./index.esm-CVHX6eL5.js";import{T as P}from"./index-DinpkD1s.js";import{a as $}from"./index-YtoiCA5N.js";import"./TextField-1fzJ-bjB.js";import"./DefaultPropsProvider-DLC-1ufs.js";import"./Autocomplete-UFZH3_Ds.js";import"./FormControlLabel-DoJnp3po.js";import"./Divider-BwXBn1A3.js";import"./index-BCXlQ-fF.js";import"./useControllableState-CR2sjB1Z.js";import"./classNames-yePmP466.js";const{TabNav:te,TabList:se,TabContent:ae}=P,z=t=>{var n,f,S;const o=(t.assigned_group==="APPLICANT"&&t.applicationassignment||[]).filter(c=>c.assigned_group==="APPLICANT"&&c.remarks&&c.remarks!=="undefined").map(c=>c.remarks),m=o.length>0?o.join("; "):"N/A";return{id:t.id,tracking_number:t.tracking_number,first_name:t.first_name,last_name:t.last_name,CNIC:t.cnic,mobile_no:t.mobile_no,application_status:t.application_status,assigned_group:t.assigned_group,registration_for:t.registration_for,application_Start_Time:((n=t.created_at)==null?void 0:n.substring(0,16))||"N/A",application_Submission_Time:((S=(f=t.submittedapplication)==null?void 0:f.created_at)==null?void 0:S.substring(0,16))||"N/A",remarks:m}},F=t=>t.map(x=>{const o=z(x);return Object.keys(o).forEach(m=>{(o[m]===void 0||o[m]===null)&&(o[m]="N/A")}),o}),ne=()=>{const[t,x]=r.useState([]),[o,m]=r.useState([]),[n,f]=r.useState([]),[S,c]=r.useState(0),[_,A]=r.useState(null),[y,N]=r.useState({}),[U,G]=r.useState("tab1");console.log(_);const[O,D]=r.useState(!1),C=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","Download License"],T={APPLICANT:"Applicant",LSO:"LSO",LSM:"LSM",DO:"DO",LSM2:"LSM",TL:"TL",DEO:"DEO","Download License":"Download License"},E=k(e=>e.user.authority)||[];console.log("user authority:",E);const v=(e,p,a)=>{const l=["first_name","last_name","cnic","mobile_no","application_status","tracking_number","assigned_group","registration_for","application_Start_Time","application_Submission_Time","remarks"],d=F(e),g=d[0];console.log(e);const u=[...Object.keys(g).filter(i=>l.includes(i)).map(i=>({accessorKey:i,header:i.replace(/_/g," ").replace(/\b\w/g,b=>b.toUpperCase()),Cell:({cell:b,row:R})=>s.jsx("span",{style:{cursor:"pointer",color:"blue",textDecoration:"underline"},onClick:()=>{const L=R.original.id;console.log(`Clicked ${i}:`,b.getValue()),console.log(`Navigating with ID: ${L}`),window.location.href=p?`/spuid-review/${L}?group=${a}`:`/spuid-signup/${L}`},children:b.getValue()||"-"})}))];return{flattenedData:d,columns:u}},h=I();r.useEffect(()=>{(async()=>{D(!0);try{let a=[];try{if(navigator.onLine)a=(await w.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],f(a.map(d=>d.name));else throw new Error("Application is offline. Cannot fetch data.")}catch(l){console.error("Error fetching user groups:",l),f([])}if(console.log("groupsResponse",a),navigator.onLine){const d=(await w.get("/pmc/applicant-detail/",{headers:{"Content-Type":"multipart/form-data"}})).data;if(Array.isArray(d)&&d.length>0){const g=v(d,a.length>0,a.map(i=>i.name)[0]);x(g.flattenedData),m(g.columns),console.log("Flattened Data:",g.flattenedData);const u=g.flattenedData[g.flattenedData.length-1];if(console.log("Last Row:",u),u&&u.id){A(u.id),console.log("Last Row ID:",u.id);const i=C.indexOf(u.assigned_group);i!==-1&&c(i)}}}else throw new Error("Application is offline. Cannot fetch data.");if(navigator.onLine){const l=await w.get("/pmc/fetch-statistics-view-groups/",{headers:{"Content-Type":"multipart/form-data"}});N(l.data)}else throw new Error("Application is offline. Cannot fetch data.")}catch(a){console.error("Error fetching data:",a)}finally{D(!1)}})(),A(25);const p=C.indexOf("LSO");p!==-1&&c(p)},[]),r.useEffect(()=>{console.log("userGroups:",n),n.includes("DEO")||n.includes("DG")?h("/home-deo"):n.includes("Admin")?h("/home-admin"):n.includes("DO")?h("/home-do"):n.includes("Super")&&h("/home-super")},[n,h]),console.log("selectedRowId:",_),console.log(_);const j=async()=>{try{const e=await w.post("/pmc/export-applicant/",{applicant_ids:t==null?void 0:t.map(l=>l.id)},{responseType:"blob"}),p=window.URL.createObjectURL(new Blob([e.data])),a=document.createElement("a");a.href=p,a.setAttribute("download",`Applicant_Details_${new Date().toISOString()}.xlsx`),document.body.appendChild(a),a.click(),document.body.removeChild(a)}catch(e){console.error("Export failed:",e)}};return s.jsxs("div",{children:[s.jsx("div",{className:"tiles-container",children:Object.entries(y).map(([e,p])=>s.jsxs("div",{className:"tile",children:[s.jsx("h3",{children:T[e]||e})," ",s.jsx("p",{children:p})]},e))}),n.length>0&&s.jsx("div",{className:"mb-4",children:s.jsxs("h3",{children:[n.filter(e=>e!=="Download License"&&e!=="Applicant"&&e!=="LSM2").join(" - ")," Dashboard"]})}),O?s.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[s.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),s.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"grid md:grid-cols-5 gap-5 items-center mb-4",children:[s.jsx("span",{className:"text-red-500 col-span-3"}),s.jsx("span",{}),s.jsxs("button",{type:"button",onClick:j,className:"flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200",children:[s.jsx($,{className:"mr-2 text-xl"}),"Export to Excel"]})]}),s.jsx(M,{columns:[...o],data:t.map(e=>({...e,assigned_group_title:T[e.assigned_group]||e.assigned_group})),getRowId:e=>e.id,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:420,minSize:100,size:140},enableColumnResizing:!0,enableTopToolbar:n.length>0,enablePagination:!0},_)]})]})};export{ne as default};
