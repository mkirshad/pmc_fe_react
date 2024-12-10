import * as Yup from 'yup';

const customerFormSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phoneNumber: Yup.string()
        .matches(/^03[0-9]{2}-[0-9]{7}$/, "Invalid phone number format. Example: 0311-1001172")
        .required("Phone number is required"),
});

export default customerFormSchema;