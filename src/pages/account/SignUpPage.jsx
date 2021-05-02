import {
  Button,
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
// import GoogleIcon from '@material-ui/icons/Google';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../../routes/slug";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
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

  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		document.title = "Sign up"
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("phone Number =====> ", phoneNumber);
    console.log("Name =====> ", name);
    console.log("Email =====> ", email);
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
              Create a new account
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
                      fontSize: "20px",
                    }}
                  >
                    Sign up
                  </Button>
                </Grid>
                <Grid item xs={12}>
									{/* <Link to={LOGIN_PATH}> */}
										<Button
											variant='text'
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
