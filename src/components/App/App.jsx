// import HOOKS and React Router
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// import Components
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Home from "../Home/Home";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import AlumniForm from "../AlumniForm/AlumniForm";
import ProfilePage from "../ProfilePage/ProfilePage";
import ComparisonPage from "../ComparisonPage/ComparisonPage";
import AdminPage from "../AdminPage/AdminPage";
// import MUI and CSS
import "./App.css";
import { Box } from "@mui/material";
// import Chart.js
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";

Chart.register(CategoryScale);

// React component function: App
// all front-end routing will be taking place in this component
function App() {
  // save useDispatch hook in the variable dispatch
  const dispatch = useDispatch();
  // bring in the global state of user
  const user = useSelector(store => store.user);
  // useEffect hook will send a dispatch on page load every time that there is a dispatch on the page
  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Box sx={{ marginBottom: 10 }}>
          <Nav />
        </Box>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/home"
          >
            <Home />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the Landing page
              <LoginPage />
            )}
          </Route>

          <ProtectedRoute exact path="/alumniform">
            <AlumniForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/adminpage">
            {/* Add access level conditional */}
            <AdminPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile">
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/compare">
            <ComparisonPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
