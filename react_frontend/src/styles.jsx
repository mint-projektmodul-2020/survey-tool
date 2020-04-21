import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	page: {
		width: "100vw",
		minHeight: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	main: {
		marginTop: 72,
		marginBottom: 72,
		width: "100%",
	},
	formField: {
	},
	flexBoxRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	logoBox: {
		height: 100,
		marginBottom: theme.spacing(5),
	},
	logoBoxLogo: {
		maxHeight: "100%",
		marginLeft: theme.spacing(1.5),
		marginRight: theme.spacing(1.5),
	},
	titleTextBox1: {
		marginBottom: theme.spacing(5),
		textAlign: "center",
	},
	titleTextBox2: {
		marginBottom: theme.spacing(5),
		textAlign: "center",
	},

	textBox5: {
		marginBottom: theme.spacing(5),
		textAlign: "center",
	},
	textBox3: {
		marginBottom: theme.spacing(3),
		textAlign: "center",
	},
	button: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	cornerLogoBox: {
		position: "absolute",
		top: 16,
		left: 16,
		height: 40,
		zIndex: "1000",
	},
	cornerLogo: {
		maxHeight: "100%",
		zIndex: "1000",
	},
}))

export default useStyles;
