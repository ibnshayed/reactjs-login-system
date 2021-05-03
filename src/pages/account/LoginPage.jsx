import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import FacebookIcon from "@material-ui/icons/Facebook";
import GoogleIcon from "@material-ui/icons/Google";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { LoadingButton } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../actions/userActions";
import { useQuery } from "../../common/utils";
import AlertBasic from "../../components/AlertBasic";
import { LOGIN_PHONE_PATH, SIGNUP_PATH } from "../../routes/slug";

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

const LoginPage = () => {
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const path = query.get("next");
  const redirect = path ? path : "/";

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    document.title = "Login";
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(phoneNumber, password));
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

            {error && (
              <Box mb={3}>
                <AlertBasic type="error" title="Error">
                  {error && <p>Phone Number or Password don't match</p>}
                </AlertBasic>
              </Box>
            )}

            <form
              onSubmit={submitHandler}
              // noValidate
              autoComplete="off"
            >
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
                    // error={phoneNumber.length <= 0}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIphoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    // labelWidth={70}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpenIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

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
                    }}
                  >
                    Sign in with password
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
                    to={LOGIN_PHONE_PATH}
                  >
                    Forget password? Sign in via other means instead!
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" textAlign="center">
                    Don't have an account?{" "}
                    <Link to={`${SIGNUP_PATH}?next=${redirect}`}>Sign Up</Link>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider textAlign="center">
                    <Typography variant="h6">Or</Typography>
                  </Divider>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                    >
                      Sign with Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
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

export default LoginPage;
