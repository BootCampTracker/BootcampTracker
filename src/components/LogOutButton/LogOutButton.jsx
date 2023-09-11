import React from "react";
// HOOKS and React Router
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Link
      className="navLink"
      onClick={() => dispatch({ type: "LOGOUT" })}
      to="/login"
    >
      Log Out
    </Link>
  );
}

export default LogOutButton;
