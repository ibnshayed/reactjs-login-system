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
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "../../common/utils";
import firebase from "../../firebase";
import {
  EMAIL_OTP_PATH,
  LOGIN_PATH,
  LOGIN_PHONE_PATH,
} from "../../routes/slug";

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

const PhoneOtpPage = () => {
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();

  const [phoneOtp, setPhoneOtp] = useState("");

  const mobile = query.get("mobile");

  if (!mobile) {
    history.push(LOGIN_PHONE_PATH);
  }

  useEffect(() => {
    document.title = "Phone OTP";
  }, []);

  const setUpReCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // submitHandler();
        },
      }
    );
  };

  const submitHandler = (e) => {
		e.preventDefault();
		setUpReCaptcha();

    console.log("phone OTP =====> ", phoneOtp, mobile);
    const phoneNumber = mobile;
		const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        const code = phoneOtp;
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
						const user = result.user;
						console.log("USER sign in", user);
            // ...
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
          });
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
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
              <strong>PHONE</strong>
            </Typography>

            <form onSubmit={submitHandler} noValidate autoComplete="off">
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    inputProps={{ min: 0, style: { textAlign: "center" } }}
                    variant="standard"
                    value={phoneOtp}
                    multiline={false}
                    autoFocus
                    placeholder={"SMS OTP"}
                    margin="normal"
                    fullWidth
                    onChange={(e) => setPhoneOtp(e.target.value)}
                  />
                </Grid>

                {/* <Grid item xs={12}> */}
                  <div id="recaptcha-container"></div>
                {/* </Grid> */}

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{
                      textTransform: "none",
                      // fontSize: "20px",
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
                      // fontSize: "18px",
                    }}
                    component={Link}
                    to={EMAIL_OTP_PATH}
                    startIcon={<MailOutlineIcon />}
                  >
                    Send OTP to my email
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

export default PhoneOtpPage;
