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
	}
}))

export default useStyles;
