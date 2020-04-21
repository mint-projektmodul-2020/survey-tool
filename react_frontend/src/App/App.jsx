import React, {useState} from 'react';
import useStyles from "./styles";
import Container from "@material-ui/core/Container";


function App(props) {

	const classes = useStyles();

	const [addressVisible, setAdressVisible] = useState(false);

	const initialState = {
		name: "",
		email: "",
		street: "",
		zip_code: "",
		city: "",
		country: "Germany",
	}

	const [formValues, setFormValues] = useState(initialState);

	return (
		<div className={classes.page}>
			<Container maxWidth="sm">
				<div className={classes.main}>
					pass
				</div>
			</Container>
		</div>
	);

}

export default App;
