import{X as p,l as a,r as h,j as i}from"./index-DKOm2JUA.js";import{M as m,E as f}from"./index.esm-Bh_dxNVa.js";import{u as x}from"./useInspectionStore-B2Mp0fzE.js";import{I as b}from"./Autocomplete-DQU4a1-T.js";import"./TextField-DgJFoVIF.js";import"./DefaultPropsProvider-DoHP1UXG.js";import"./FormControlLabel-Cxhuj3f6.js";import"./Divider-Df8Q54Bk.js";import"./index-CCbGUrOo.js";const r=s=>s?Array.isArray(s)?s.join(", "):typeof s=="object"?JSON.stringify(s,null,2):s:"N/A",K=()=>{const s=p(),{reports:o,fetchReports:n,loading:l,syncReports:c}=x();a(e=>e.user.district_id);const t=a(e=>e.user.district_name)||"";h.useEffect(()=>{c().then(()=>n())},[]);const d=[{accessorKey:"id",header:"ID",size:50,Cell:({row:e})=>i.jsx("a",{href:`/auth/EPAOperations/ReportViolation?id=${e.original.id}`,className:"text-blue-500 underline",children:e.original.id})},{accessorKey:"business_name",header:"Business Name",size:200,Cell:({row:e})=>i.jsx("a",{href:`/auth/EPAOperations/ReportViolation?id=${e.original.id}`,className:"text-blue-500 underline",children:e.original.business_name})},{accessorKey:"inspection_date",header:"Inspection Date",size:200,Cell:({row:e})=>i.jsx("a",{href:`/auth/EPAOperations/ReportViolation?id=${e.original.id}`,className:"text-blue-500 underline",children:e.original.inspection_date})},{accessorKey:"business_type",header:"Business Type",size:150,Cell:({row:e})=>i.jsx("a",{href:`/auth/EPAOperations/ReportViolation?id=${e.original.id}`,className:"text-blue-500 underline",children:e.original.business_type})},{accessorKey:"license_number",header:"License Number",size:150,Cell:({row:e})=>i.jsx("a",{href:`/auth/EPAOperations/ReportViolation?id=${e.original.id}`,className:"text-blue-500 underline",children:e.original.license_number})},{accessorKey:"violation_found",header:"Violation Found",size:80,Cell:({cell:e})=>i.jsx("pre",{children:r(e.getValue())})},{accessorKey:"violation_type",header:"Violation Type",size:400,Cell:({cell:e})=>i.jsx("pre",{children:r(e.getValue())})},{accessorKey:"action_taken",header:"Action Taken",size:400,Cell:({cell:e})=>i.jsx("pre",{children:r(e.getValue())})},{accessorKey:"total_confiscation",header:"Total Confiscation (KG)",size:200},{accessorKey:"district",header:"District",size:150},{accessorKey:"created_at",header:"Created At",size:200},{accessorKey:"edit",header:"Actions",size:100,Cell:({row:e})=>i.jsx(b,{onClick:()=>u(e.original),children:i.jsx(f,{})})}],u=e=>{s(`/auth/EPAOperations/ReportViolation?id=${e.id}`)};return i.jsxs("div",{children:[i.jsxs("h2",{className:"text-lg font-bold mb-4",children:["Inspection Reports ",t!==""?" - ":""," ",t]}),l?i.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[i.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),i.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):i.jsx(m,{columns:d,data:o,enableColumnResizing:!0,enablePagination:!0,initialState:{showColumnFilters:!1},muiTableHeadCellProps:{sx:{backgroundColor:"#f5f5f5",fontWeight:"bold",borderBottom:"2px solid #ccc",textAlign:"center"}},muiTableBodyCellProps:{sx:{borderRight:"1px solid #ddd",padding:"10px"}},muiTableBodyRowProps:{sx:{"&:nth-of-type(even)":{backgroundColor:"#f9f9f9"},"&:hover":{backgroundColor:"#e0f7fa"}}},enableZebraStripes:!0})]})};export{K as default};
