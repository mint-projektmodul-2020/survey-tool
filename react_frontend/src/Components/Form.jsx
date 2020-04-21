import React from 'react';
import useStyles from "../styles";
import {CustomTextField} from "./CustomTextField";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";


function Form(props) {

	const classes = useStyles();

	function handleFormChange(newValue) {

		// Deepcopy object without a library
		let newState = {};
		const keys = ["name", "email", "remote", "street", "zip_code", "city", "country"];

		keys.forEach((key) => {
			if (key in newValue) {
				newState[key] = newValue[key];
			} else {
				newState[key] = props.formValues[key];
			}
		})

		if ("remote" in newValue) {
			Cookies.set('form-remote', newValue["remote"], {expires: 1});
		}

		props.setFormValues(newState);
	}

	return (
		<React.Fragment>
			<Grid container justitfy="center" spacing={2}>
				<Grid item xs={12}>
					<CustomTextField
						label="Name"
						fullWidth
						value={props.formValues.name}
						variant="outlined"
						onChange={(newValue) => handleFormChange({name: newValue})}
					/>
				</Grid>
				<Grid item xs={12}>
					<CustomTextField
						label="Email"
						fullWidth
						value={props.formValues.email}
						variant="outlined"
						onChange={(newValue) => handleFormChange({email: newValue})}
					/>
				</Grid>
				<Grid item xs={12}>
					<div className={classes.flexBoxRow}>
						<Checkbox
							checked={props.formValues.remote}
							color="primary"
							onChange={() => handleFormChange({remote: !props.formValues.remote})}
						/>
						<Typography variant="subtitle1">
							Ich lebe <strong>nicht</strong> in München
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12}>
					<Collapse in={props.formValues.remote}>
						<Grid container justitfy="center" spacing={2}>

							<Grid item xs={12}>
								<Divider/>
							</Grid>

							<Grid item xs={12}>
								<CustomTextField
									label="Straße und Hausnummer"
									fullWidth
									value={props.formValues.street}
									variant="outlined"
									onChange={(newValue) => handleFormChange({street: newValue})}
								/>
							</Grid>
							<Grid item xs={4}>
								<CustomTextField
									label="Postleitzahl"
									fullWidth
									value={props.formValues.zip_code}
									variant="outlined"
									onChange={(newValue) => handleFormChange({zip_code: newValue})}
								/>
							</Grid>
							<Grid item xs={8}>
								<CustomTextField
									label="Ort"
									fullWidth
									value={props.formValues.city}
									variant="outlined"
									onChange={(newValue) => handleFormChange({city: newValue})}
								/>
							</Grid>
							<Grid item xs={12}>
								<CustomTextField
									disabled
									label="Land (für sonstiges, kontaktiere uns)"
									fullWidth
									value={props.formValues.country}
									variant="outlined"
									onChange={(newValue) => handleFormChange({country: newValue})}
								/>
							</Grid>

							<Grid item xs={12}>
							</Grid>
						</Grid>
					</Collapse>
				</Grid>
				<Grid item xs={12}>
					<div className={classes.flexBoxRow}>
						<div className={classes.button}>
							<Button
								variant="contained"
								onClick={props.handleReset}
								disableElevation>
								Zurücksetzen
							</Button>
						</div>
						<div className={classes.button}>
							<Button
								variant="contained"
								color="primary"
								onClick={props.handleSubmit}
								disableElevation>
								Kit Reservieren
							</Button>
						</div>
					</div>
				</Grid>
			</Grid>
		</React.Fragment>
	);

}

export default Form;
