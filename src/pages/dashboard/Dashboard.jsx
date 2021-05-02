import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { DASHBOARD_PATH, LOGIN_PATH } from "../../routes/slug"


const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}
}))

const Dashboard = () => {

	const classes = useStyles()

	const history = useHistory()
	const userInfo = null

	if (!userInfo) {
		history.push(`${LOGIN_PATH}?next=${DASHBOARD_PATH}`)
	}

	useEffect(() => {
		document.title = "DashBoard"
  }, []);

	return (
		<div className={classes.root}>
			<Typography variant="h1">Welcome to the Dashboard</Typography>
		</div>
	)
}

export default Dashboard
