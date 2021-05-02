import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import FacebookIcon from "@material-ui/icons/Facebook";
import GoogleIcon from '@material-ui/icons/Google';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { useState } from "react";
import { Link } from "react-router-dom";
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

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("phone Number =====> ", phoneNumber);
    console.log("Password =====> ", password);
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

            <form onSubmit={submitHandler} noValidate autoComplete="off">
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    type="number"
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

                <Grid item xs={12}>
                  <FormControl
                    // className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOpenIcon />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
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
                      // fontSize: "20px",
                    }}
                  >
                    Sign in with password
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
										to={LOGIN_PHONE_PATH}
                  >
                    Forget password? Sign in via other means instead!
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
