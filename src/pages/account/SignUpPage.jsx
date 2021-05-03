import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
// import GoogleIcon from '@material-ui/icons/Google';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { LoadingButton } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../actions/userActions";
import { useQuery } from "../../common/utils";
import AlertBasic from "../../components/AlertBasic";
import { LOGIN_PATH } from "../../routes/slug";
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

const SignUpPage = () => {
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const path = query.get("next");
  const redirect = path ? path : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    document.title = "Sign Up";
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("phone Number =====> ", phoneNumber);
    // console.log("Name =====> ", name);
    // console.log("Email =====> ", email);
    // console.log("Password =====> ", password);

    dispatch(register(phoneNumber, name, email, password));
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
              Create a new account
            </Typography>

            {error && (
              <Box mb={3}>
                <AlertBasic type="error" title="Error">
                  {error && error}
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
                    type="text"
                    value={name}
                    label="Enter your name"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="email"
                    value={email}
                    label="Enter your email"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
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
                            onClick={() => showPasswordHandler()}
                            // onMouseDown={handleMouseDownPassword}
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
                      // fontSize: "20px",
                    }}
                  >
                    Sign up
                  </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                  {/* <Link to={LOGIN_PATH}> */}
                  <Button
                    variant="text"
                    startIcon={<ArrowBackOutlinedIcon />}
                    component={Link}
                    to={LOGIN_PATH}
                  >
                    Go back to sign in
                  </Button>

                  {/* </Link> */}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUpPage;
