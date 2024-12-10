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

type ManufacturingType = 'Carry bags' | 'Packaging except food' | 'Hospital Products';
type SingleUseSheet = 'Plain Plastic Sheets for food wrapping'|'Other'

// ProducerFields: Represents the data structure for producers
export type LicenseDetailFieldsProducer = {
    tracking_number: string;
    
    registration_required_for: ManufacturingType[]; // List of manufacturing types
    plain_plastic_Sheets_for_food_wrapping: SingleUseSheet[]; 
    PackagingItems: string[];
    
    number_of_machines: string;
    total_capacity_value: string;
    date_of_setting_up: string;
    total_waste_generated_value: string;
    has_waste_storage_capacity: string;
    waste_disposal_provision: string
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
