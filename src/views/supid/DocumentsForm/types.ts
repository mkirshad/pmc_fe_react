import type { Control, FieldErrors } from 'react-hook-form'

export type LicenseDetailFields = {
    licenseType: 'Producer' | 'Consumer' | 'Recycler' | 'Collector'
}

// ConsumerFields: Represents the data structure for consumers
export type LicenseDetailFieldsConsumer = {
    productsCapacity: string;       // List of products and installed capacity
    wasteGenerated: string;         // Types and quantities of waste generated
    plasticWasteAcquired: string;   // Details of plastic waste acquired
};

// CollectorFields: Represents the data structure for collectors
export type LicenseDetailFieldsCollector = {
    collectorName: string;          // Name of the collector
    collectorCapacity: number;      // Capacity in tons
};

type ManufacturingType = 'Carry bags' | 'Single-use Plastics' | 'Plastic Packing';

// ProducerFields: Represents the data structure for producers
export type LicenseDetailFieldsProducer = {
    tracking_number: string;
    
    registration_required_for: ManufacturingType[]; // List of manufacturing types
    registration_required_for_other: string[];
    single_use_plastic_items: string[];
    
    total_capacity_value: string;
    total_capacity_unit: string;
    registration_number: string;
    registration_date: string;
    date_of_setting_up: string;
    date_of_commencement_of_production: string;

    flow_diagram: File | null;  // Updated to handle file input
    is_compliance_with_rules: boolean;
    valid_consent_permit: boolean;
    consent_permit: File | null;  // Updated to handle file input
    total_waste_generated_value: string;
    total_waste_generated_unit: string;
    is_waste_storage_capacity: boolean;
    is_waste_disposal_provision: boolean;
    personnel_or_consumers_list: File | null;  // Updated to handle file input
    action_plan: File | null;  // Updated to handle file input
    applicant: string;
    
    products_list: string[];
    by_products_list: string[];
};

// RecyclerFields: Represents the data structure for recyclers
export type LicenseDetailFieldsRecycler = {
    registrationNumber: string;     // Registration number
    totalCapacity: number;          // Total capacity in tons
    complianceStatus: 'compliant' | 'non_compliant'; // Compliance status
};


export type LicenseDetailFormSchema = LicenseDetailFields & LicenseDetailFieldsConsumer & LicenseDetailFieldsProducer & LicenseDetailFieldsRecycler & LicenseDetailFieldsCollector

export type FormSectionBaseProps = {
    control: Control<LicenseDetailFormSchema>
    errors: FieldErrors<LicenseDetailFormSchema>
}
