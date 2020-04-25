import React, {useState} from 'react';
import Form from "../Components/Form";
import Cookies from 'js-cookie';

import axios from 'axios';
import MessageSnackbar from "../Components/MessageSnackbar";
import queryString from 'query-string'

import {withRouter} from 'react-router-dom'


function FormPage(props) {

	const pathParams = queryString.parse(window.location.search);
	let initialState = {};
	const keys = ["name", "email", "remote"];

	keys.forEach((key) => {
		if (key in pathParams) {
			let value = (key !== "remote") ? pathParams[key].replace("+", " ") : (pathParams[key] === "true")
			Cookies.set("form-" + key, value, {expires: 1});
			initialState[key] = value;
		} else {
			let cookieValue = Cookies.get("form-" + key);
			if (cookieValue === undefined) {
				initialState[key] = (key !== "remote") ? "" : false;
			} else {
				initialState[key] = (key !== "remote") ? cookieValue : (cookieValue === "true");
			}
		}
	})

	const [formValues, setFormValuesRaw] = useState(initialState);

	function setFormValues(newValues) {
		closeMessage();
		setFormValuesRaw(newValues);
	}

	const [snackbar, setSnackbar] = useState({open: false, text: ""})
	const [submitting, setSubmitting] = useState(false);

	function closeMessage(){
		setSnackbar({open: false, text: snackbar.text});
	}

	function submit() {
		setSubmitting(true);
		closeMessage();
		console.log("Submit");

		keys.forEach((key) => {
			Cookies.set('form-' + key, formValues[key], {expires: 1});
		})

		axios.post("/backend/submit", formValues)
			.then(() => {
				props.history.push('/verify?email=' + formValues["email"]);
				setSubmitting(false);
			})
			.catch((error) => {
				setTimeout(() => {
					setSubmitting(false);
					setSnackbar({
						open: true,
						text: JSON.parse(error.request.response).status
					});
				}, 800)
			})
	}

	function reset() {
		console.log("Reset");

		keys.forEach((key) => {
			Cookies.remove('form-' + key);
		})

		setFormValues({
			name: "",
			email: "",
			remote: false,
		})
	}

	return (
		<React.Fragment>
			<Form
				formValues={formValues}
				setFormValues={setFormValues}
				handleSubmit={submit}
				handleReset={reset}
				submitting={submitting}
			/>
			<MessageSnackbar
				open={snackbar.open}
				text={snackbar.text}
				closeMessage={closeMessage}
			/>
		</React.Fragment>
	);

}

export default withRouter(FormPage);
