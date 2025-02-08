import{r as o,V as j,j as d,A as f}from"./index-ClZ1D3YW.js";import{M as O}from"./index.esm-CXbb75wt.js";import"./TextField-9Vn3-ST6.js";import"./DefaultPropsProvider-DjBBzL5c.js";import"./FormControlLabel-D6ioM6ZB.js";import"./Autocomplete-CpDavdaV.js";import"./Divider-kQut3RUJ.js";import"./index-DAdE-ZFy.js";const A=t=>t,R=t=>t.map(p=>{const n=A(p);return Object.keys(n).forEach(c=>{(n[c]===void 0||n[c]===null)&&(n[c]="N/A")}),n}),G=()=>{const[t,p]=o.useState([]),[n,c]=o.useState([]),[h,z]=o.useState([]),[T,g]=o.useState(0),[y,x]=o.useState(null),b=["APPLICANT","LSO","LSM","DO","LSM2","TL","DEO","Download License"],K=(r,i,e)=>{const m=["id","license_number","date_of_issue","license_for","license_duration","owner_name","business_name","district_name","tehsil_name","city_name","address","types_of_plastics","particulars","fee_amount","is_active"],s=R(r),a=s[0];console.log(r);const l=[...Object.keys(a).filter(u=>m.includes(u)).map(u=>({accessorKey:u,header:u.replace(/_/g," ").replace(/\b\w/g,_=>_.toUpperCase()),Cell:({cell:_,row:S})=>d.jsx("span",{style:{cursor:"pointer",color:"blue",textDecoration:"underline"},onClick:()=>{const D=S.original.license_number,w=S.original.date_of_issue;window.location.href=`/generate-license-pdf?license_number=${D}&date_of_issue=${w}`},children:_.getValue()||"-"})}))];return{flattenedData:s,columns:l}},C=j();return o.useEffect(()=>{(async()=>{try{const e=await f.get("/pmc/ping/",{headers:{"Content-Type":"application/json"}})}catch{C("/error")}try{let e=[];try{e=(await f.get("/pmc/user-groups/",{headers:{"Content-Type":"application/json"}})).data||[],z(e.map(l=>l.name))}catch(a){console.error("Error fetching user groups:",a),z([])}console.log("groupsResponse",e);const s=(await f.get("/pmc/license-by-user/",{headers:{"Content-Type":"multipart/form-data"}})).data;if(console.log(s),Array.isArray(s)&&s.length>0){const a=K(s,e.length>0,e.map(l=>l.name)[0]);p(a.flattenedData),c(a.columns)}}catch(e){console.error("Error fetching data:",e)}})(),x(25);const i=b.indexOf("LSO");i!==-1&&g(i)},[]),console.log("flattenedData",t),d.jsx("div",{children:d.jsx(O,{columns:[{accessorKey:"license_number",header:"license_number",minSize:50,maxSize:500,size:150,Cell:({row:r})=>{const i=r.original.license_number,e=r.original.date_of_issue,m=`/api/pmc/license-pdf?license_number=${i}&date_of_issue=${e}`;return d.jsx("a",{style:{cursor:"pointer",color:"blue",textDecoration:"underline"},href:m,target:"_blank",rel:"noopener noreferrer",children:i})}},{accessorKey:"date_of_issue",header:"date_of_issue",minSize:50,maxSize:500,size:150},{accessorKey:"license_for",header:"license_for",minSize:50,maxSize:500,size:150},{accessorKey:"license_duration",header:"license_duration",minSize:50,maxSize:500,size:150},{accessorKey:"owner_name",header:"owner_name",minSize:50,maxSize:500,size:200},{accessorKey:"business_name",header:"business_name",minSize:50,maxSize:500,size:150},{accessorKey:"district_name",header:"district_name",minSize:50,maxSize:500,size:150},{accessorKey:"tehsil_name",header:"tehsil_name",minSize:50,maxSize:500,size:150},{accessorKey:"city_name",header:"city_name",minSize:50,maxSize:500,size:150},{accessorKey:"address",header:"address",minSize:50,maxSize:500,size:150},{accessorKey:"types_of_plastics",header:"types_of_plastics",minSize:100,maxSize:500,size:500},{accessorKey:"particulars",header:"particulars",minSize:100,maxSize:100,size:150},{accessorKey:"fee_amount",header:"fee_amount",minSize:50,maxSize:500,size:150},{accessorKey:"is_active",header:"is_active",minSize:50,maxSize:500,size:150}],data:t,initialState:{showColumnFilters:!1},defaultColumn:{maxSize:420,minSize:100,size:140},enableColumnResizing:!0,enableTopToolbar:h.length>0,enablePagination:!0},y)})};export{G as default};
