import useFormStore from '../../../store/supid/supidStore'
import BottomStickyBar from '@/components/template/BottomStickyBar'

type CustomerFormProps = {
} & CommonProps

const ReviewAndSavePage = (props: CustomerFormProps) => {
  const {
    applicantDetail,
    businessDetail,
    businessDetailIndividual,
    businessEntity,
    licenseDetailConsumer,
    licenseDetailCollector,
    licenseDetailProducer,
    licenseDetailRecycler,
    completedSections,
  } = useFormStore();

  const {
    children,
} = props

   // Function to convert camelCase to spaced field names
   const convertCamelCaseToSpaced = (fieldName) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1') // Add a space before capital letters
      .toLowerCase() // Convert all letters to lowercase
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };
  console.log('business Entity fields and values', businessEntity)

  // Dynamically render fields for a given data object
  const renderFields = (data) => {
    return Object.keys(data).map((key) => {
      const fieldName = convertCamelCaseToSpaced(key); // Convert camelCase to spaced
      const value = data[key];
      if (value && value !== 'N/A') {
        return (
          <div key={key} className="mb-2">
            <strong>{fieldName}:</strong> {value}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Review Your Information</h2>

      {completedSections.includes('applicantDetail') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Applicant Details</h3>
          {renderFields(applicantDetail)}
        </div>
      )}

    {/* {completedSections.includes('businessEntity') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Business Entity</h3>
          {renderFields(businessEntity)}
        </div>
      )} */}

    {completedSections.includes('businessDetailIndividual') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Business Details Individual</h3>
          {renderFields(businessDetailIndividual)}
        </div>
      )}

      {completedSections.includes('businessDetail') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Business Details</h3>
          {renderFields(businessDetail)}
        </div>
      )}


      {completedSections.includes('licenseDetailConsumer') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">License Detail - Consumer</h3>
          {renderFields(licenseDetailConsumer)}
        </div>
      )}

      {completedSections.includes('licenseDetailProducer') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">License Detail - Producer</h3>
          {renderFields(licenseDetailProducer)}
        </div>
      )}

      {completedSections.includes('licenseDetailRecycler') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">License Detail - Recycler</h3>
          {renderFields(licenseDetailRecycler)}
        </div>
      )}

      {completedSections.includes('licenseDetailCollector') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">License Detail - Collector</h3>
          {renderFields(licenseDetailCollector)}
        </div>
      )}

<BottomStickyBar>{children}</BottomStickyBar>
    </div>
  );
};

export default ReviewAndSavePage;
