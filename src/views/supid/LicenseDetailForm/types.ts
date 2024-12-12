import type { Control, FieldErrors } from 'react-hook-form'

export type LicenseDetailFields = {
    licenseType: 'Producer' | 'Consumer' | 'Recycler' | 'Collector'
}

// ConsumerFields: Represents the data structure for consumers
export type LicenseDetailFieldsConsumer = {
    registration_required_for: string[]; // Categories of Single Use Plastics
    registration_required_for_other: string[]; // Categories for Other Plastics
    plain_plastic_Sheets_for_food_wrapping?: string[]; // Additional Options for Packaging
    PackagingItems?: string[]; // Additional Packaging Items
    consumption: number; // Consumption (Kg per Day)
    provisionwaste_disposal_provision: 'Yes' | 'No'; // Provision of Waste Disposal Bins
    no_of_waste_disposible_bins?: number; // Number of Waste Disposal Bins (if Yes)
    segregated_plastics_handed_over_to_registered_re_cyclers: 'Yes' | 'No'; // Segregated Plastics handed over
};

// CollectorFields: Represents the data structure for collectors
export type LicenseDetailFieldsCollector = {
    registration_required_for: string[]; // Categories of Single Use Plastics
    registration_required_for_other: string[]; // Categories for Other Plastics
    selectedCategoriesCollector: {
        category: string; // Source of Disposal category (e.g., Recycler, Landfill Site, Incinerators)
        address: string; // Address of the waste source
    }[];
    total_capacity_value_collector: number; // Collection (Kg per day)
    number_of_vehicles: number; // Number of vehicles for collection
    number_of_persons: number; // Number of persons for collection
};

type ManufacturingType = 'Carry bags' | 'Packaging except food' | 'Hospital Products';
type SingleUseSheet = 'Plain Plastic Sheets for food wrapping'|'Other'

// ProducerFields: Represents the data structure for producers
export type LicenseDetailFieldsProducer = {
    tracking_number: string;
    
    registration_required_for: ManufacturingType[]; // List of manufacturing types
    registration_required_for_other: string[];
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
    selectedCategories: {
        category: string; // Category name (e.g., 'Carry bags')
        wasteCollection: number; // Waste Collection in Kg/day
        wasteDisposal: number; // Waste Disposal in Kg/day
    }[];
    plastic_waste_acquired_through: string[]; // Array of acquisition methods (e.g., ['Auction', 'Contract'])
    has_adequate_pollution_control_systems: string; // 'Yes' or 'No'
    pollution_control_details?: string; // Optional field for additional details if 'Yes'
};


export type LicenseDetailFormSchema = LicenseDetailFields & LicenseDetailFieldsConsumer & LicenseDetailFieldsProducer & LicenseDetailFieldsRecycler & LicenseDetailFieldsCollector

export type FormSectionBaseProps = {
    control: Control<LicenseDetailFormSchema>
    errors: FieldErrors<LicenseDetailFormSchema>
}
