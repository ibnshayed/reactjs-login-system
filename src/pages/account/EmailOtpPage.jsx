import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EMAIL_OTP_PATH, LOGIN_PATH } from "../../routes/slug";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    background: "#eee",
  },
  login: {
    padding: "40px",
    maxWidth: "600px",
  },
}));

const EmailOtpPage = () => {
  const classes = useStyles();

  const [emailOtp, setEmailOtp] = useState("");

  useEffect(() => {
    document.title = "Phone OTP";
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("phone OTP =====> ", emailOtp);
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <Paper className={classes.login}>
            <Typography
              variant="h5"
              sx={{ marginBottom: "20px" }}
              textAlign="center"
            >
              <PhoneIphoneIcon /> OTP has been sent to your{" "}
              <strong>EMAIL</strong>
            </Typography>

            <form onSubmit={submitHandler} noValidate autoComplete="off">
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    inputProps={{ min: 0, style: { textAlign: "center" } }}
                    variant="standard"
                    value={emailOtp}
                    multiline={false}
                    autoFocus
                    placeholder={"Email OTP"}
                    margin="normal"
                    fullWidth
                    onChange={(e) => setEmailOtp(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{
                      textTransform: "none",
                      fontSize: "20px",
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider textAlign="center">
                    <Typography variant="h6">Or</Typography>
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{
                      textTransform: "none",
                      fontSize: "18px",
                    }}
                    component={Link}
                    to={EMAIL_OTP_PATH}
                    startIcon={<MailOutlineIcon />}
                  >
                    Send OTP to my phone
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="text"
                    startIcon={<ArrowBackOutlinedIcon />}
                    component={Link}
                    to={LOGIN_PATH}
                  >
                    Go back to sign in
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmailOtpPage;
