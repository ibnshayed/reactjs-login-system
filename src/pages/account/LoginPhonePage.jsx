import {
	Box,
	Button,
	Divider,
	Grid,
	InputAdornment,
	Paper,
	TextField,
	Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import GoogleIcon from "@material-ui/icons/Google";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AlertBasic from "../../components/AlertBasic";
import { EMAIL_OTP_PATH, LOGIN_PATH, SIGNUP_PATH } from "../../routes/slug";

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
  input: {
    marginBottom: "40px",
  },
}));

const LoginPhonePage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    document.title = "Sign with Phone";
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("phone Number =====> ", phoneNumber);
    if (phoneNumber.length >= 11) {
      history.push(`${EMAIL_OTP_PATH}/?mobile=${phoneNumber}`);
    }
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
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              Log in
            </Typography>

            {phoneNumber && phoneNumber.length < 11 && (
              <Box mb={4}>
                <AlertBasic type="warning" title="Warning">
                  Please enter a valid phone number
                </AlertBasic>
              </Box>
            )}

            <form onSubmit={submitHandler} autoComplete="off">
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    value={phoneNumber}
                    label="Enter your phone number"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIphoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* <div id="recaptcha-container"></div> */}

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Sign in
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
                    }}
                    component={Link}
                    to={LOGIN_PATH}
                  >
                    Sign in with password
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" textAlign="center">
                    Don't have an account? <Link to={SIGNUP_PATH}>Sign Up</Link>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider textAlign="center">
                    <Typography variant="h6">Or</Typography>
                  </Divider>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                    >
                      Sign with Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      startIcon={<GoogleIcon />}
                    >
                      Sign with Google
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPhonePage;
