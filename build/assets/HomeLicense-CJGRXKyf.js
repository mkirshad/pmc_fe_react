import{r as i,V as T,j as m,A as S}from"./index-CX9DdW7s.js";import{M as A}from"./index.esm-w1fdXNfR.js";import"./TextField-Ba9dDGkV.js";import"./DefaultPropsProvider-BoJpczoY.js";import"./Autocomplete-7H0JHAC6.js";import"./FormControlLabel-Bu5Tnr9p.js";import"./Divider-BLUvYVUo.js";import"./index-BQdWZqCx.js";const O=t=>t,w=t=>t.map(p=>{const r=O(p);return Object.keys(r).forEach(c=>{(r[c]===void 0||r[c]===null)&&(r[c]="N/A")}),r}),B=()=>{const[t,p]=i.useState([]),[r,c]=i.useState([]),[b,_]=i.useState([]),[j,h]=i.useState(0),[g,x]=i.useState(null),y=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","DG","Download License"],C=(n,o,e)=>{const u=["id","license_number","date_of_issue","license_for","license_duration","owner_name","business_name","district_name","tehsil_name","city_name","address","types_of_plastics","particulars","fee_amount","is_active"],s=w(n),a=s[0];console.log(n);const l=[...Object.keys(a).filter(d=>u.includes(d)).map(d=>({accessorKey:d,header:d.replace(/_/g," ").replace(/\b\w/g,f=>f.toUpperCase()),Cell:({cell:f,row:z})=>m.jsx("span",{style:{cursor:"pointer",color:"blue",textDecoration:"underline"},onClick:()=>{const D=z.original.license_number,K=z.original.date_of_issue;window.location.href=`/generate-license-pdf?license_number=${D}&date_of_issue=${K}`},children:f.getValue()||"-"})}))];return{flattenedData:s,columns:l}};return T(),i.useEffect(()=>{(async()=>{try{let e=[];try{e=(await S.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],_(e.map(l=>l.name))}catch(a){console.error("Error fetching user groups:",a),_([])}console.log("groupsResponse",e);const s=(await S.get("/pmc/license-by-user/",{headers:{"Content-Type":"multipart/form-data"}})).data;if(console.log(s),Array.isArray(s)&&s.length>0){const a=C(s,e.length>0,e.map(l=>l.name)[0]);p(a.flattenedData),c(a.columns)}}catch(e){console.error("Error fetching data:",e)}})(),x(25);const o=y.indexOf("LSO");o!==-1&&h(o)},[]),console.log("flattenedData",t),m.jsx("div",{children:m.jsx(A,{columns:[{accessorKey:"license_number",header:"License Number",minSize:50,maxSize:500,size:150,Cell:({row:n})=>{const o=n.original.license_number,e=n.original.date_of_issue,u=`/api/pmc/license-pdf?license_number=${o}&date_of_issue=${e}`;return m.jsx("a",{style:{cursor:"pointer",color:"blue",textDecoration:"underline"},href:u,target:"_blank",rel:"noopener noreferrer",children:o})}},{accessorKey:"date_of_issue",header:"Date Of Issue",minSize:50,maxSize:500,size:150},{accessorKey:"license_for",header:"License For",minSize:50,maxSize:500,size:150},{accessorKey:"license_duration",header:"License Duration",minSize:50,maxSize:500,size:150},{accessorKey:"owner_name",header:"Owner Name",minSize:50,maxSize:500,size:200},{accessorKey:"business_name",header:"Business Name",minSize:50,maxSize:500,size:150},{accessorKey:"district_name",header:"District Name",minSize:50,maxSize:500,size:150},{accessorKey:"tehsil_name",header:"Tehsil Name",minSize:50,maxSize:500,size:150},{accessorKey:"city_name",header:"City Name",minSize:50,maxSize:500,size:150},{accessorKey:"address",header:"Address",minSize:50,maxSize:500,size:150},{accessorKey:"types_of_plastics",header:"Types Of Plastics",minSize:100,maxSize:500,size:500},{accessorKey:"particulars",header:"Particulars",minSize:100,maxSize:100,size:150},{accessorKey:"fee_amount",header:"Fee Amount",minSize:50,maxSize:500,size:150},{accessorKey:"is_active",header:"Is Active",minSize:50,maxSize:500,size:150}],data:t,enableColumnFilters:!0,enableSorting:!0,enableStickyHeader:!0,muiTableProps:{sx:{border:"1px solid #ddd"}},muiTableHeadCellProps:{sx:{backgroundColor:"#f5f5f5",fontWeight:"bold",borderBottom:"2px solid #ccc",textAlign:"center"}},muiTableBodyCellProps:{sx:{borderRight:"1px solid #ddd",padding:"10px"}},muiTableBodyRowProps:{sx:{"&:nth-of-type(even)":{backgroundColor:"#f9f9f9"},"&:hover":{backgroundColor:"#e0f7fa"}}},enableZebraStripes:!0,enableColumnResizing:!0,enableTopToolbar:b.length>0,enablePagination:!0},g)})};export{B as default};
