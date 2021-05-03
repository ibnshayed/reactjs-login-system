import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import { DASHBOARD_PATH, LOGIN_PATH } from "../../routes/slug";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 62px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo } = userLogin;

  if (!userInfo) {
    history.push(`${LOGIN_PATH}?next=${DASHBOARD_PATH}`);
  }

  useEffect(() => {
    document.title = "DashBoard";
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.root}>
        <Typography variant="h1">Welcome to the Dashboard</Typography>
      </div>
    </div>
  );
};

export default Dashboard;
