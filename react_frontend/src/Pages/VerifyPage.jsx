import React from 'react';
import useStyles from "../styles";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Cookies from 'js-cookie';

function VerifyPage() {

	const classes = useStyles();

	const cookieEmail =  Cookies.get('form-email');

	return (
		<React.Fragment>
			<div className={classes.textBox3}>
				<Typography variant="h4">
					Bitte bestätige deine Email Adresse!
				</Typography>
			</div>

			<div className={classes.textBox3}>
				<Typography variant="subtitle1">
					{([undefined, ""].includes(cookieEmail)) && (
						<React.Fragment>
							Mail Adresse nochmal ändern?
						</React.Fragment>
					)}

					{(![undefined, ""].includes(cookieEmail)) && (
						<React.Fragment>
							<strong>{cookieEmail}</strong> ist nicht deine Mail Adresse?
						</React.Fragment>
					)}
				</Typography>
			</div>

			<div className={classes.flexBoxRow}>
				<Link to="/form">
					<div className={classes.button}>
						<Button variant="contained" disableElevation>
							Zum Formular
						</Button>
					</div>
				</Link>
				<a href="https://mail.tum.de/" target="_self">
					<div className={classes.button}>
						<Button variant="contained" color="primary" disableElevation>
							mail.tum.de öffnen
						</Button>
					</div>
				</a>
			</div>
		</React.Fragment>
	);

}

export default VerifyPage;
