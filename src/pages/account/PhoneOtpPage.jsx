import {
  Box,
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
import { LoadingButton } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../actions/userActions";
import { useQuery } from "../../common/utils";
import AlertBasic from "../../components/AlertBasic";
import firebase from "../../firebase";
import {
  DASHBOARD_PATH,
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
  const [confirmationResult, setConfirmationResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const mobile = query.get("mobile");

  const dispatch = useDispatch();

  if (!mobile) {
    history.push(LOGIN_PHONE_PATH);
  }

  const phoneSignIn = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("recaptchaVerifier resolved");
        },
      }
    );

    const phoneNumber = `+${mobile}`;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        // console.log(error);
        setLoginError(error.message);
      });
    // [END auth_phone_signin]
  };

  useEffect(() => {
    document.title = "Phone OTP";
    if (mobile) {
      phoneSignIn();
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    // console.log("phone OTP =====> ", phoneOtp, mobile);
    setLoading(true);

    // [START auth_phone_verify_code]
    const code = phoneOtp;
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
        console.log(user);
        console.log(user.phoneNumber);
        dispatch(login(user.phoneNumber));
        if (user && user.phoneNumber) {
          setLoading(false);
          history.push(DASHBOARD_PATH);
        }
      })
      .catch((error) => {
        setLoading(false);
        // User couldn't sign in (bad verification code?)
        // ...
        // console.log(error);
        setLoginError(error.message);
      });
    // [END auth_phone_verify_code]
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

            {loginError && (
              <Box mb={4}>
                <AlertBasic type="error" title="Error">
                  {loginError}
                </AlertBasic>
              </Box>
            )}

            <form onSubmit={submitHandler} autoComplete="off">
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
                    required
                    onChange={(e) => setPhoneOtp(e.target.value)}
                  />
                </Grid>

                <div id="recaptcha-container"></div>

                <Grid item xs={12}>
                  <LoadingButton
                    loading={loading}
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
                  </LoadingButton>
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
