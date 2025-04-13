import{r as a,V as m,k as i,j as s,A as h}from"./index-CX9DdW7s.js";import{M as u,E as g}from"./index.esm-w1fdXNfR.js";import{I as _}from"./Autocomplete-7H0JHAC6.js";import"./TextField-Ba9dDGkV.js";import"./DefaultPropsProvider-BoJpczoY.js";import"./FormControlLabel-Bu5Tnr9p.js";import"./Divider-BLUvYVUo.js";import"./index-BQdWZqCx.js";const v=()=>{const[n,c]=a.useState([]),[l,o]=a.useState(!1),d=m();a.useEffect(()=>{(async()=>{o(!0);try{const t=await h.get("/pmc/inspection-report/district_summary/");c(t.data)}catch(t){console.error("Error fetching reports:",t)}finally{o(!1)}})()},[]),i(e=>e.user.district_id);const r=i(e=>e.user.district_name)||"",p=e=>{d(`/edit-inspection/${e.id}`,{state:{reportData:e}})},f=[{accessorKey:"district",header:"District Name",size:200},{accessorKey:"total_inspections",header:"Total No. of Inspections",size:200},{accessorKey:"total_notices_issued",header:"Total No. of Notices Issued",size:200},{accessorKey:"total_plastic_bags_confiscated",header:"Total Kgs of Plastic Bags Confiscated",size:250},{accessorKey:"total_confiscated_plastic",header:`Total Kgs of confiscated Plastic
(Other than plastic bags)`,size:250},{accessorKey:"total_firs_registered",header:"Total No. of FIRs registered",size:200},{accessorKey:"total_premises_sealed",header:"No. of Premises Sealed",size:200},{accessorKey:"total_complaints_filed",header:`No. of Complaints filed before
the Environmental Magistrate`,size:300},{accessorKey:"total_fine_amount",header:"Total Fine Amount (PKR)",size:200},{accessorKey:"total_fine_recovered",header:"Total Fine Recovered (PKR)",size:200},{accessorKey:"pending_fine_amount",header:"Pending Fine Amount (PKR)",size:200},{accessorKey:"total_fines_pending",header:"Total Fines Pending",size:200},{accessorKey:"total_fines_partial",header:"Total Partially Paid Fines",size:200},{accessorKey:"total_fines_recovered",header:"Total Recovered Fines",size:200},{accessorKey:"total_de_sealed_premises",header:"Total De-Sealed Premises",size:200},{accessorKey:"edit",header:"Actions",size:100,Cell:({row:e})=>s.jsx(_,{onClick:()=>p(e.original),children:s.jsx(g,{})})}];return s.jsxs("div",{children:[s.jsxs("h2",{className:"text-lg font-bold mb-4",children:["Inspection Reports ",r!==""?" - ":""," ",r]}),l?s.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[s.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),s.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):s.jsx(u,{columns:f,data:n,enableColumnResizing:!0,enablePagination:!0,initialState:{showColumnFilters:!1},muiTableHeadCellProps:{sx:{backgroundColor:"#f5f5f5",fontWeight:"bold",borderBottom:"2px solid #ccc",textAlign:"center"}},muiTableBodyCellProps:{sx:{borderRight:"1px solid #ddd",padding:"10px"}},muiTableBodyRowProps:{sx:{"&:nth-of-type(even)":{backgroundColor:"#f9f9f9"},"&:hover":{backgroundColor:"#e0f7fa"}}},enableZebraStripes:!0})]})};export{v as default};
