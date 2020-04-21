import React from 'react';
import {Switch, Route, BrowserRouter, Link} from 'react-router-dom';
import IndexPage from "./Pages/IndexPage";
import FormPage from "./Pages/FormPage";
import VerifyPage from "./Pages/VerifyPage";
import SuccessPage from "./Pages/SuccessPage";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import MSELogo from './Components/assets/MSELogo.png';

function Content (props) {
	const classes = useStyles();

	return (
		<div className={classes.page}>
			<div className={classes.cornerLogoBox}>
				<Link to="/">
					<img src={MSELogo} alt="MSE Logo" className={classes.cornerLogo}/>
				</Link>
			</div>
			<Container maxWidth="sm">
				<div className={classes.main}>
					{props.children}
				</div>
			</Container>
		</div>
	)
}


function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact strict path="/">
					<Content>
						<IndexPage/>
					</Content>
				</Route>

				<Route exact strict path="/form">
					<Content>
						<FormPage/>
					</Content>
				</Route>

				<Route exact strict path="/verify">
					<Content>
						<VerifyPage/>
					</Content>
				</Route>

				<Route exact strict path="/success">
					<Content>
						<SuccessPage/>
					</Content>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}


export default Router;
