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
		marginTop: theme.spacing(6),
		marginBottom: theme.spacing(6),
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
}))

export default useStyles;
