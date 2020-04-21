import React, {useState} from 'react';
import Form from "../Components/Form";
import Cookies from 'js-cookie';


function FormPage() {

	let initialState = {
		country: "Deutschland",
	};
	const keys = ["name", "email", "remote", "street", "zip_code", "city"];

	keys.forEach((key) => {
		let cookieValue = Cookies.get("form-" + key);
		if (cookieValue === undefined) {
			initialState[key] = (key !== "remote") ? "" : false;
		} else {
			initialState[key] = (key !== "remote") ? cookieValue : (cookieValue === "true");
		}
	})

	const [formValues, setFormValues] = useState(initialState);

	function submit() {
		console.log("Submit");

		keys.forEach((key) => {
			Cookies.set('form-' + key, formValues[key], {expires: 1});
		})

		setTimeout(() => {
			window.open("/verify", "_self");
			}, 500
		)
	}

	function reset() {
		console.log("Reset");

		keys.forEach((key) => {
			if (key !== "remote") {
				Cookies.remove('form-' + key);
			}
		})

		setFormValues({
			name: "",
			email: "",
			remote: formValues.remote,
			street: "",
			zip_code: "",
			city: "",
			country: "Deutschland"
		})
	}

	return (
		<React.Fragment>
			<Form formValues={formValues} setFormValues={setFormValues} handleSubmit={submit} handleReset={reset}/>
		</React.Fragment>
	);

}

export default FormPage;
