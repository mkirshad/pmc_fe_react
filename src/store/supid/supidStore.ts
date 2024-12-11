import { create } from 'zustand';
import type { ApplicantDetailFormSchema } from '../../views/supid/ApplicantDetailForm/types';
import type { BusinessEntityFields, BusinessEntityFormSchema,  BusinessDetailFields, BusinessDetailIndividualFields} from '../../views/supid/BusinessEntityForm/types';
import type { LicenseDetailFields, LicenseDetailFormSchema, LicenseDetailFieldsConsumer, LicenseDetailFieldsCollector, LicenseDetailFieldsProducer, LicenseDetailFieldsRecycler } from '../../views/supid/LicenseDetailForm/types';

type FormStore = {
    applicantDetail: ApplicantDetailFormSchema;
    businessDetail: BusinessDetailFields;
    businessDetailIndividual: BusinessDetailIndividualFields;
    businessEntity: BusinessEntityFields;
    licenseDetail: LicenseDetailFields;
    licenseDetailConsumer: LicenseDetailFieldsConsumer;
    licenseDetailCollector: LicenseDetailFieldsCollector;
    licenseDetailProducer: LicenseDetailFieldsProducer;
    licenseDetailRecycler: LicenseDetailFieldsRecycler;

    completedSections: string[];

    updateApplicantDetail: (data: Partial<ApplicantDetailFormSchema>) => void;
    resetApplicantDetail: () => void;

    updateBusinessDetail: (data: Partial<BusinessDetailFields>) => void;
    resetBusinessDetail: () => void;

    updateBusinessDetailIndividual: (data: Partial<BusinessDetailIndividualFields>) => void;
    resetBusinessDetailIndividual: () => void;

    updateBusinessEntity: (data: Partial<BusinessEntityFields>) => void;
    resetBusinessEntity: () => void;

    markSectionAsCompleted: (sectionName: string, isCompleted: boolean) => void; // Add/Remove section
    resetCompletedSections: () => void; // Reset completed sections
    resetAll: () => void;

    getValuesFromStateBusinessEntity: () => Partial<BusinessEntityFormSchema>;

    updateLicenseDetail: (data: Partial<LicenseDetailFields>) => void;
    resetLicenseDetail: () => void;

    updateLicenseDetailProducer: (data: Partial<LicenseDetailFieldsProducer>) => void;
    resetLicenseDetailProducer: () => void;

    updateLicenseDetailConsumer: (data: Partial<LicenseDetailFieldsConsumer>) => void;
    resetLicenseDetailConsumer: () => void;

    updateLicenseDetailRecycler: (data: Partial<LicenseDetailFieldsRecycler>) => void;
    resetLicenseDetailRecycler: () => void;

    updateLicenseDetailCollector: (data: Partial<LicenseDetailFieldsCollector>) => void;
    resetLicenseDetailCollector: () => void;

    getValuesFromLicenseDetail: () => Partial<LicenseDetailFormSchema>;
};

const useFormStore = create<FormStore>((set, get) => ({
    // Initial state for each form section
    applicantDetail: {
        firstName: '',
        lastName: '',
        applicantDesignation: '',
        gender: '',
        cnic: '',
        email: '',
        mobileOperator: '',
        phoneNumber: '',
        id:0,
    },
    businessDetail: {
        firstName: '',
        lastName: '',
        applicantDesignation: '',
        gender: '',
        cnic: '',
        email: '',
        mobileOperator: '',
        phoneNumber: '',
    },
    businessDetailIndividual: {
        firstName: '',
        lastName: '',
        applicantDesignation: '',
        gender: '',
        cnic: '',
        email: '',
        mobileOperator: '',
        phoneNumber: '',
    },
    businessEntity: {
        businessEntityType: '',
    },
    completedSections: [],
    
    licenseDetail: {
        licenseType: ''
    },
    licenseDetailConsumer: {
        productsCapacity: '',       // List of products and installed capacity
        wasteGenerated: '',         // Types and quantities of waste generated
        plasticWasteAcquired: ''
    },
    licenseDetailCollector: {
        collectorName: '',          // Name of the collector
        collectorCapacity: 0      // Capacity in tons
    },
    licenseDetailProducer: {
        primaryPlastics: '',        // List of primary single-use plastics consumed
        annualProcurement: 0,      // Procurement in Kg/Day
        wasteDisposalBins: ''
    },
    licenseDetailRecycler: {
        registrationNumber: '',     // Registration number
        totalCapacity: 0,          // Total capacity in tons
        complianceStatus: '' 
    },


    // Update and reset functions for applicantDetail
    updateApplicantDetail: (data) =>
        set((state) => ({
            applicantDetail: { ...state.applicantDetail, ...data },
            completedSections: state.completedSections.includes('applicantDetail')
                ? state.completedSections
                : [...state.completedSections, 'applicantDetail'],
        })),
    resetApplicantDetail: () =>
        set((state) => ({
                applicantDetail: {
                firstName: '',
                lastName: '',
                applicantDesignation: '',
                gender: '',
                cnic: '',
                email: '',
                mobileOperator: '',
                phoneNumber: '',
                id:0,
                applicationStatus: 'Created'
            },
            completedSections: state.completedSections.filter((section) => section !== 'applicantDetail'),
        })),

    // Update and reset functions for businessDetail
    updateBusinessDetail: (data) =>
        set((state) => ({
            businessDetail: { ...state.businessDetail, ...data },
            completedSections: state.completedSections.includes('businessDetail')
                ? state.completedSections
                : [...state.completedSections, 'businessDetail'],
        })),
    resetBusinessDetail: () =>
        set((state) => ({
            businessDetail: {
                id:0,
                firstName: '',
                lastName: '',
                applicantDesignation: '',
                gender: '',
                cnic: '',
                email: '',
                mobileOperator: '',
                phoneNumber: '',
            },
            completedSections: state.completedSections.filter((section) => section !== 'businessDetail'),
        })),

    // Update and reset functions for businessDetailIndividual
    updateBusinessDetailIndividual: (data) =>
        set((state) => ({
            businessDetailIndividual: { ...state.businessDetailIndividual, ...data },
            completedSections: state.completedSections.includes('businessDetailIndividual')
                ? state.completedSections
                : [...state.completedSections, 'businessDetailIndividual'],
        })),
    resetBusinessDetailIndividual: () =>
        set((state) => ({
            businessDetailIndividual: {
                id:0,
                firstName: '',
                lastName: '',
                applicantDesignation: '',
                gender: '',
                cnic: '',
                email: '',
                mobileOperator: '',
                phoneNumber: '',
            },
            completedSections: state.completedSections.filter((section) => section !== 'businessDetailIndividual'),
        })),

    // Update and reset functions for businessEntity
    updateBusinessEntity: (data) =>
        set((state) => ({
            businessEntity: { ...state.businessEntity, ...data } as BusinessEntityFields,
            completedSections: state.completedSections.includes('businessEntity')
                ? state.completedSections
                : [...state.completedSections, 'businessEntity'],
        })),
    resetBusinessEntity: () =>
        set((state) => ({
            businessEntity: {
                businessEntityType: 'Individual',
            },
            completedSections: state.completedSections.filter((section) => section !== 'businessEntity'),
        })),

    // Mark a section as completed or remove it
    markSectionAsCompleted: (sectionName, isCompleted) =>
        set((state) => ({
            completedSections: isCompleted
                ? state.completedSections.includes(sectionName)
                    ? state.completedSections
                    : [...state.completedSections, sectionName]
                : state.completedSections.filter((section) => section !== sectionName),
        })),

    // Reset completed sections
    resetCompletedSections: () =>
        set(() => ({
            completedSections: [],
        })),

    updateLicenseDetail: (data) =>
            set((state) => ({
                licenseDetail: { ...state.licenseDetail, ...data },
                completedSections: state.completedSections.includes('licenseDetail')
                    ? state.completedSections
                    : [...state.completedSections, 'licenseDetail'],
            })),
    updateLicenseDetailProducer: (data) =>
        set((state) => ({
            licenseDetailProducer: { ...state.licenseDetailProducer, ...data },
            completedSections: state.completedSections.includes('licenseDetailProducer')
                ? state.completedSections
                : [...state.completedSections, 'licenseDetailProducer'],
        })),
    resetLicenseDetail:()=>
        set((state) => ({
            licenseDetail: {
                licenseType: 'Producer',
            },
            completedSections: state.completedSections.filter((section) => section !== 'licenseDetail'),
        })),
    resetLicenseDetailProducer: () =>
            set((state) => ({
                licenseDetailProducer: {
                    tracking_number: '',
                    registration_required_for: [],
                    registration_required_for_other: [],
                    plain_plastic_Sheets_for_food_wrapping: [],
                    PackagingItems: [],
                    number_of_machines: '',
                    total_capacity_value: '',
                    date_of_setting_up: '',
                    total_waste_generated_value: '',
                    has_waste_storage_capacity: '',
                    waste_disposal_provision: '',
                },
                completedSections: state.completedSections.filter((section) => section !== 'licenseDetailProducer'),
            })),
    updateLicenseDetailConsumer: (data) =>
        set((state) => ({
            licenseDetailConsumer: { ...state.licenseDetailConsumer, ...data },
            completedSections: state.completedSections.includes('licenseDetailConsumer')
                ? state.completedSections
                : [...state.completedSections, 'licenseDetailConsumer'],
        })),
    updateLicenseDetailRecycler: (data) =>
        set((state) => ({
            licenseDetailRecycler: { ...state.licenseDetailRecycler, ...data },
            completedSections: state.completedSections.includes('licenseDetailRecycler')
                ? state.completedSections
                : [...state.completedSections, 'licenseDetailRecycler'],
        })),
    updateLicenseDetailCollector: (data) =>
        set((state) => ({
            licenseDetailCollector: { ...state.licenseDetailCollector, ...data },
            completedSections: state.completedSections.includes('licenseDetailCollector')
                ? state.completedSections
                : [...state.completedSections, 'licenseDetailCollector'],
        })),
    // Reset all function
    resetAll: () => {
        set((state) => {
            state.resetApplicantDetail();
            state.resetBusinessDetail();
            state.resetBusinessDetailIndividual();
            state.resetBusinessEntity();
            state.resetCompletedSections();
            state.resetLicenseDetail();
            state.resetLicenseDetailProducer();
            state.resetLicenseDetailConsumer();
            state.resetLicenseDetailRecycler();
            state.resetLicenseDetailCollector();
        });
    },

    getValuesFromStateBusinessEntity: () => {
        const state = get();
        const defaultValues = {};

        if (state.completedSections.includes('businessDetail')) {
            Object.assign(defaultValues, state.businessDetail);
        }

        if (state.completedSections.includes('businessDetailIndividual')) {
            Object.assign(defaultValues, state.businessDetailIndividual);
        }

        if (state.completedSections.includes('businessEntity')) {
            Object.assign(defaultValues, state.businessEntity);
        }

        return defaultValues;
    },

    getValuesFromLicenseDetail: () => {
        const state = get();
        const defaultValues = {};

        if (state.completedSections.includes('licenseDetail')) {
            Object.assign(defaultValues, state.licenseDetail);
        }

        if (state.completedSections.includes('licenseDetailConsumer')) {
            Object.assign(defaultValues, state.licenseDetailConsumer);
        }

        if (state.completedSections.includes('licenseDetailProducer')) {
            Object.assign(defaultValues, state.licenseDetailProducer);
        }

        if (state.completedSections.includes('licenseDetailRecycler')) {
            Object.assign(defaultValues, state.licenseDetailRecycler);
        }

        if (state.completedSections.includes('licenseDetailCollector')) {
            Object.assign(defaultValues, state.licenseDetailCollector);
        }

        return defaultValues;
    },
}));


export default useFormStore;
