import { Link } from "react-router-dom";
// HOOKS
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// MUI
import { Grid, TextField, Button, Typography } from "@mui/material";
function LoginForm() {
  // HOOKS
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  // LOGIN Form and Dispatch
  const handleLogin = event => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
      // Catch any Errors
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };

  return (
    <form className="formPanel" onSubmit={handleLogin}>
      <Typography 
      variant="h1" 
      sx={{fontSize: 50, mb: 4, textAlign: 'center'}}
      >
        Login
      </Typography>
      {/* ERROR Message for Login */}
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Grid item xs={12}>
        <TextField
          sx={{ mb: 2 }}
          type="email"
          label="Email"
          value={username}
          fullWidth
          required
          onChange={event => setUsername(event.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          type="password"
          label="Password"
          value={password}
          fullWidth
          required
          onChange={event => setPassword(event.target.value)}
        />
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
            <Link to="/registration" color="inherit" style={{ textDecoration: 'none' }}>
            Register
            </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
