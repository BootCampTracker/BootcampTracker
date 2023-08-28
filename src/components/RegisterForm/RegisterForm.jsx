import { Link } from "react-router-dom";
// HOOKS
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// MUI
import { Grid, TextField, Button, Typography } from "@mui/material";
function RegisterForm() {
  // HOOKS
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  // Register Form and Dispatch
  const handleRegister = event => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  };

  return (
    <form className="formPanel" onSubmit={handleRegister}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Register
      </Typography>
      {/* ERROR Message for Registration */}
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
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
        Register
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to="/login" variant="body2" className="signin-link">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
