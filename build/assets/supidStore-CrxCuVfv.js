import{au as n}from"./index-Cw8nRmZO.js";const a=n((l,c)=>({applicantDetail:{firstName:"",lastName:"",applicantDesignation:"",gender:"",cnic:"",email:"",mobileOperator:"",phoneNumber:"",id:0},businessDetail:{firstName:"",lastName:"",applicantDesignation:"",gender:"",cnic:"",email:"",mobileOperator:"",phoneNumber:""},businessDetailIndividual:{firstName:"",lastName:"",applicantDesignation:"",gender:"",cnic:"",email:"",mobileOperator:"",phoneNumber:""},businessEntity:{businessEntityType:""},completedSections:[],licenseDetail:{licenseType:""},licenseDetailConsumer:{productsCapacity:"",wasteGenerated:"",plasticWasteAcquired:""},licenseDetailCollector:{collectorName:"",collectorCapacity:0},licenseDetailProducer:{primaryPlastics:"",annualProcurement:0,wasteDisposalBins:""},licenseDetailRecycler:{registrationNumber:"",totalCapacity:0,complianceStatus:""},updateApplicantDetail:i=>l(e=>({applicantDetail:{...e.applicantDetail,...i},completedSections:e.completedSections.includes("applicantDetail")?e.completedSections:[...e.completedSections,"applicantDetail"]})),resetApplicantDetail:()=>l(i=>({applicantDetail:{firstName:"",lastName:"",applicantDesignation:"",gender:"",cnic:"",email:"",mobileOperator:"",phoneNumber:"",id:0,applicationStatus:"Created"},completedSections:i.completedSections.filter(e=>e!=="applicantDetail")})),updateBusinessDetail:i=>l(e=>({businessDetail:{...e.businessDetail,...i},completedSections:e.completedSections.includes("businessDetail")?e.completedSections:[...e.completedSections,"businessDetail"]})),resetBusinessDetail:()=>l(i=>({businessDetail:{id:0,firstName:"",lastName:"",applicantDesignation:"",gender:"",cnic:"",email:"",mobileOperator:"",phoneNumber:""},completedSections:i.completedSections.filter(e=>e!=="businessDetail")})),updateBusinessDetailIndividual:i=>l(e=>({businessDetailIndividual:{...e.businessDetailIndividual,...i},completedSections:e.completedSections.includes("businessDetailIndividual")?e.completedSections:[...e.completedSections,"businessDetailIndividual"]})),resetBusinessDetailIndividual:()=>l(i=>({businessDetailIndividual:{id:0,firstName:"",lastName:"",applicantDesignation:"",gender:"",cnic:"",email:"",mobileOperator:"",phoneNumber:""},completedSections:i.completedSections.filter(e=>e!=="businessDetailIndividual")})),updateBusinessEntity:i=>l(e=>({businessEntity:{...e.businessEntity,...i},completedSections:e.completedSections.includes("businessEntity")?e.completedSections:[...e.completedSections,"businessEntity"]})),resetBusinessEntity:()=>l(i=>({businessEntity:{businessEntityType:"Individual"},completedSections:i.completedSections.filter(e=>e!=="businessEntity")})),markSectionAsCompleted:(i,e)=>l(t=>({completedSections:e?t.completedSections.includes(i)?t.completedSections:[...t.completedSections,i]:t.completedSections.filter(s=>s!==i)})),resetCompletedSections:()=>l(()=>({completedSections:[]})),updateLicenseDetail:i=>l(e=>({licenseDetail:{...e.licenseDetail,...i},completedSections:e.completedSections.includes("licenseDetail")?e.completedSections:[...e.completedSections,"licenseDetail"]})),updateLicenseDetailProducer:i=>l(e=>({licenseDetailProducer:{...e.licenseDetailProducer,...i},completedSections:e.completedSections.includes("licenseDetailProducer")?e.completedSections:[...e.completedSections,"licenseDetailProducer"]})),resetLicenseDetail:()=>l(i=>({licenseDetail:{licenseType:"Producer"},completedSections:i.completedSections.filter(e=>e!=="licenseDetail")})),resetLicenseDetailProducer:()=>l(i=>({licenseDetailProducer:{tracking_number:"",registration_required_for:[],registration_required_for_other:[],plain_plastic_Sheets_for_food_wrapping:[],PackagingItems:[],number_of_machines:"",total_capacity_value:"",date_of_setting_up:"",total_waste_generated_value:"",has_waste_storage_capacity:"",waste_disposal_provision:""},completedSections:i.completedSections.filter(e=>e!=="licenseDetailProducer")})),resetLicenseDetailConsumer:()=>l(i=>({...i,licenseDetailConsumer:{registration_required_for:[],registration_required_for_other:[],plain_plastic_Sheets_for_food_wrapping:[],PackagingItems:[],consumption:0,provisionwaste_disposal_provision:"No",no_of_waste_disposible_bins:void 0,segregated_plastics_handed_over_to_registered_re_cyclers:"No"},completedSections:i.completedSections.filter(e=>e!=="licenseDetailConsumer")})),resetLicenseDetailCollector:()=>l(i=>({...i,licenseDetailCollector:{registration_required_for:[],registration_required_for_other:[],selectedCategoriesCollector:[],total_capacity_value_collector:0,number_of_vehicles:0,number_of_persons:0},completedSections:i.completedSections.filter(e=>e!=="licenseDetailCollector")})),resetLicenseDetailRecycler:()=>l(i=>({...i,licenseDetailRecycler:{selectedCategories:[],plastic_waste_acquired_through:[],has_adequate_pollution_control_systems:"",pollution_control_details:""},completedSections:i.completedSections.filter(e=>e!=="licenseDetailRecycler")})),updateLicenseDetailConsumer:i=>l(e=>({licenseDetailConsumer:{...e.licenseDetailConsumer,...i},completedSections:e.completedSections.includes("licenseDetailConsumer")?e.completedSections:[...e.completedSections,"licenseDetailConsumer"]})),updateLicenseDetailRecycler:i=>l(e=>({licenseDetailRecycler:{...e.licenseDetailRecycler,...i},completedSections:e.completedSections.includes("licenseDetailRecycler")?e.completedSections:[...e.completedSections,"licenseDetailRecycler"]})),updateLicenseDetailCollector:i=>l(e=>({licenseDetailCollector:{...e.licenseDetailCollector,...i},completedSections:e.completedSections.includes("licenseDetailCollector")?e.completedSections:[...e.completedSections,"licenseDetailCollector"]})),resetAll:()=>{l(i=>{i.resetApplicantDetail(),i.resetBusinessDetail(),i.resetBusinessDetailIndividual(),i.resetBusinessEntity(),i.resetCompletedSections(),i.resetLicenseDetail(),i.resetLicenseDetailProducer(),i.resetLicenseDetailConsumer(),i.resetLicenseDetailRecycler(),i.resetLicenseDetailCollector()})},getValuesFromStateBusinessEntity:()=>{const i=c(),e={};return i.completedSections.includes("businessDetail")&&Object.assign(e,i.businessDetail),i.completedSections.includes("businessDetailIndividual")&&Object.assign(e,i.businessDetailIndividual),i.completedSections.includes("businessEntity")&&Object.assign(e,i.businessEntity),e},getValuesFromLicenseDetail:()=>{const i=c(),e={};return i.completedSections.includes("licenseDetail")&&Object.assign(e,i.licenseDetail),i.completedSections.includes("licenseDetailConsumer")&&Object.assign(e,i.licenseDetailConsumer),i.completedSections.includes("licenseDetailProducer")&&Object.assign(e,i.licenseDetailProducer),i.completedSections.includes("licenseDetailRecycler")&&Object.assign(e,i.licenseDetailRecycler),i.completedSections.includes("licenseDetailCollector")&&Object.assign(e,i.licenseDetailCollector),e}}));export{a as u};
