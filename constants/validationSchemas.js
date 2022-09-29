import * as Yup from "yup";
const isNumeric = value =>
	/^([0-9]\.[1-9]|[1-9][0-9]*\.[1-9]|[1-9][0-9]*)$/.test(value);
const isIntMoreThan1 = value => /^([1-9][0-9]{0,100}|100)$/.test(value);

export const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Field should contain a valid email")
		.max(255)
		.required("Email is required"),
	password: Yup.string()
		.min(6, "minimum 6 characters")
		.max(50, "Maximum 50 characters")
		.required("Required"),
});

export const registerSchema = Yup.object().shape({
	usename: Yup.string().required("Required"),
	email: Yup.string().email("Invalid email!").required("Required"),
	password: Yup.string()
		.min(6, "minimum 6 characters")
		.max(50, "Maximum 50 characters")
		.required("Required"),
	passwordConfirmation: Yup.string()
		.required("Required")
		.oneOf([Yup.ref("password")]),
});
