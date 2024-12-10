import{r as d,j as a,an as K,X as Q,A as B,a3 as Z}from"./index-D3NpIeTA.js";import{B as N}from"./StatusIcon-BgZfNZIn.js";import{H as ee,I as ae,D as te,N as se}from"./Dialog-CMWUoX84.js";import{u as F,B as ie,C as T}from"./index-BzW6VJPv.js";import{ae as O,ah as ne}from"./TextField-B4YWiKqn.js";import{F as E,C as w}from"./FormControlLabel-hI4HWi_A.js";import"./proxy-DcPOjHDb.js";import"./index-BbLZr6si.js";const re=({groupList:t,children:b})=>{var C,D;const[g,o]=d.useState(t!==void 0&&t.length>1?t[1].value:""),[v,f]=d.useState({previousStage:!1,nextStage:!1}),{applicantDetail:h,updateApplicantDetail:p,completedSections:_}=F();console.log(h),d.useEffect(()=>{o(t!==void 0&&t.length>1?t[1].value:"")},[t]);const x=r=>{var y,c,S,k;const{name:n,checked:u}=r.target;if(f({previousStage:n==="previousStage"?u:!1,nextStage:n==="nextStage"?u:!1}),n==="previousStage"&&u){o((y=t[0])==null?void 0:y.value);const i={assignedGroup2:(c=t[0])==null?void 0:c.value};p(i)}else if(n==="nextStage"&&u){const i={assignedGroup2:(S=t[2])==null?void 0:S.value};p(i),o((k=t[2])==null?void 0:k.value)}},j=r=>{const n={remarks:r.target.value};p(n)};return console.log("Selected Group:",g),a.jsxs("div",{className:"p-4",style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"20px"},children:[a.jsxs("div",{children:[a.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Review Your Information"}),_.includes("applicantDetail")&&a.jsxs("div",{className:"mb-6",children:[a.jsx("h3",{className:"text-xl font-semibold mb-2",children:"Applicant Details"}),a.jsx("div",{children:Object.entries(h||{}).map(([r,n])=>r!=="applicationassignment"?a.jsxs("div",{children:[a.jsxs("strong",{children:[r,":"]})," ",n]},r):null)})]}),a.jsx("div",{style:{marginBottom:"20px"},children:a.jsx(O,{fullWidth:!0,children:a.jsx(ne,{id:"Remarks",label:"Remarks",variant:"filled",onChange:j})})}),a.jsx("div",{children:a.jsxs(O,{children:[a.jsx(E,{control:a.jsx(w,{name:"nextStage",checked:v.nextStage,onChange:x}),label:`Yes - Proceed to next stage (${(C=t[2])==null?void 0:C.label})`}),a.jsx(E,{control:a.jsx(w,{name:"previousStage",checked:v.previousStage,onChange:x}),label:`No - Proceed to previous stage (${(D=t[0])==null?void 0:D.label})`})]})})]}),a.jsx("div",{children:Object.entries(h||{}).map(([r,n])=>r==="applicationassignment"?a.jsx("div",{children:n}):null)}),b]})},Se=()=>{const{id:t}=K(),b=Q(),[g,o]=d.useState(0),[v,f]=d.useState(!1),[h,p]=d.useState(!1),[_,x]=d.useState(!1),j=s=>{if(s===3){o(6);return}if(s===5){o(2);return}s<0?o(0):s>6?o(6):o(s)},C=()=>j(g+1),D=()=>j(g-1);d.useEffect(()=>{console.log("its here1"),t?n(t):(I(),q(),M(),V())},[t]);const r=s=>a.jsxs("div",{children:[a.jsx("h3",{children:"Application Assignments"}),s.map(e=>a.jsxs("div",{style:{marginBottom:"20px"},children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Assigned Group:"})," ",e.assigned_group]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Remarks:"})," ",e.remarks||"No remarks"]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Updated Date/Time:"})," ",new Date(e.created_at).toLocaleString()]})]},e.id))]}),n=s=>{B.get(`/pmc/applicant-detail/${s}/`,{headers:{"Content-Type":"multipart/form-data"}}).then(e=>{const m={firstName:e.data.first_name,lastName:e.data.last_name,applicantDesignation:e.data.applicant_designation,gender:e.data.gender,cnic:e.data.cnic,email:e.data.email,mobileOperator:e.data.mobile_operator,phoneNumber:e.data.mobile_no,id:e.data.id,assignedGroup:e.data.assigned_group,applicationassignment:r(e.data.applicationassignment)};if(R(m),e.data.businessprofile){if(e.data.businessprofile.entity_type==="Company"){const l={applicant:e.data.id,businessName:e.data.businessprofile.business_name,ntn:e.data.businessprofile.ntn_strn_pra_no_company,email:e.data.businessprofile.email,id:e.data.businessprofile.id};L(l)}if(e.data.businessprofile.entity_type==="Individual"){const l={applicant:e.data.id,name:e.data.businessprofile.name,ntn:e.data.businessprofile.ntn_strn_pra_no_individual,email:e.data.businessprofile.email,id:e.data.businessprofile.id};$(l)}J({businessEntityType:e.data.businessprofile.entity_type})}if(U({licenseType:e.data.registration_for}),e.data.producer&&e.data.registration_for==="Producer"){const l=[];e.data.producer.is_carry_bags&&l.push("Carry bags"),e.data.producer.is_single_use_plastics&&l.push("Single-use Plastics"),e.data.producer.is_plastic_packing&&l.push("Plastic Packing");const z={applicant:e.data.producer.id,is_carry_bags:e.data.producer.is_carry_bags,is_single_use_plastics:e.data.producer.is_single_use_plastics,is_plastic_packing:e.data.producer.is_plastic_packing,registration_required_for:l};W(z)}}).catch(e=>{console.error("Error:",e)})},u=()=>{f(!1),te.push(a.jsx(se,{type:"success",children:"Customer discard!"}),{placement:"top-center"}),b("/concepts/customers/customer-list")},G=()=>{f(!0)},y=()=>{p(!0)},c=()=>{f(!1),p(!1)},S=()=>{p(!1),D()},k=async()=>{if(i.assignedGroup2!==""){const s=new FormData;if(s.append("assigned_group",i.assignedGroup2),i.id>0){try{const m=await B.put(`/pmc/applicant-detail/${i.id}/`,s,{headers:{"Content-Type":"multipart/form-data"}});x(!1),b("/home")}catch(m){console.error("Error in POST request:",m.response||m.message),x(!1)}C()}const e=new FormData;e.append("applicant",i.id.toString()),e.append("assigned_group",i.assignedGroup2),e.append("remarks",i.remarks),console.log(i.remarks),await B.post("/pmc/application-assignment/",e,{headers:{"Content-Type":"multipart/form-data"}})}},{applicantDetail:i,updateApplicantDetail:R,resetApplicantDetail:I,businessDetail:le,updateBusinessDetail:L,resetBusinessDetail:q,businessDetailIndividual:oe,updateBusinessDetailIndividual:$,resetBusinessDetailIndividual:M,businessEntity:ce,updateBusinessEntity:J,resetBusinessEntity:V,resetAll:de,completedSections:pe,getValuesFromStateBusinessEntity:Y,getValuesFromLicenseDetail:H,updateLicenseDetail:U,updateLicenseDetailCollector:ue,updateLicenseDetailConsumer:me,updateLicenseDetailProducer:W,updateLicenseDetailRecycler:ge,resetLicenseDetail:fe,resetLicenseDetailProducer:he}=F();Y(),H();const P=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","Download License"],A=X(i.assignedGroup);console.log("groupList",A);function X(s){const e=P.indexOf(s);return P.slice(Math.max(0,e-1),e+2).map(l=>({value:l,label:l}))}return a.jsxs(a.Fragment,{children:[a.jsx(re,{groupList:A,children:a.jsx(Z,{children:a.jsxs("div",{className:"flex items-center justify-between px-8",children:[a.jsx("span",{}),a.jsxs("div",{className:"flex items-center",children:[a.jsx(N,{className:"ltr:mr-3 rtl:ml-3",type:"button",customColorClass:()=>"border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent",icon:a.jsx(ee,{}),onClick:G,children:"Discard"}),a.jsx(N,{icon:a.jsx(ae,{}),className:"ltr:mr-3 rtl:ml-3",variant:"solid",type:"button",loading:_,disabled:g===0,onClick:y,children:"Back"}),a.jsx(N,{icon:a.jsx(ie,{}),variant:"solid",type:"button",onClick:k,loading:_,children:"Save"})]})]})})}),a.jsx(T,{isOpen:v,type:"danger",title:"Discard changes",onClose:c,onRequestClose:c,onCancel:c,onConfirm:u,children:a.jsx("p",{children:"Are you sure you want discard this?"})}),a.jsx(T,{isOpen:h,type:"danger",title:"Go Back",onClose:c,onRequestClose:c,onCancel:c,onConfirm:S,children:a.jsx("p",{children:"There are unsaved changes on this step, Are you sure you want to go back step?"})})]})};export{Se as default};
