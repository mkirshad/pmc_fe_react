import{r as a,U as p,j as e,A as f}from"./index-Cw8nRmZO.js";import{M as m,E as h}from"./index.esm-DpIVMnC4.js";import{I as g}from"./Autocomplete-TkBijOZ0.js";import"./TextField-Y6nxmfyM.js";import"./DefaultPropsProvider-BmXUMQmF.js";import"./FormControlLabel-BBpqEU0J.js";import"./Divider-DYMMRSsp.js";import"./index-C-2FXszD.js";const z=()=>{const[r,i]=a.useState([]),[c,o]=a.useState(!1),n=p();a.useEffect(()=>{(async()=>{o(!0);try{const t=await f.get("/pmc/inspection-report/district_summary/");i(t.data)}catch(t){console.error("Error fetching reports:",t)}finally{o(!1)}})()},[]);const l=s=>{n(`/edit-inspection/${s.id}`,{state:{reportData:s}})},d=[{accessorKey:"district",header:"District Name",size:200},{accessorKey:"total_inspections",header:"Total No. of Inspections",size:200},{accessorKey:"total_notices_issued",header:"Total No. of Notices Issued",size:200},{accessorKey:"total_plastic_bags_confiscated",header:"Total Kgs of Plastic Bags Confiscated",size:250},{accessorKey:"total_confiscated_plastic",header:`Total Kgs of confiscated Plastic
(Other than plastic bags)`,size:250},{accessorKey:"total_firs_registered",header:"Total No. of FIRs registered",size:200},{accessorKey:"total_premises_sealed",header:"No. of Premises Sealed",size:200},{accessorKey:"total_complaints_filed",header:`No. of Complaints filed before
the Environmental Magistrate`,size:300},{accessorKey:"edit",header:"Actions",size:100,Cell:({row:s})=>e.jsx(g,{onClick:()=>l(s.original),children:e.jsx(h,{})})}];return e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-bold mb-4",children:"Inspection Reports"}),c?e.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-50",children:[e.jsx("div",{className:"w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"}),e.jsx("p",{className:"mt-4 text-lg font-medium text-gray-600",children:"Loading data, please wait..."})]}):e.jsx(m,{columns:d,data:r,enableColumnResizing:!0,enablePagination:!0,initialState:{showColumnFilters:!1}})]})};export{z as default};
