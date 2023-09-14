import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

// TODO replace with with REAL GitHub link!!!

function Footer() {
  return <div className="footer">
             <a href="https://github.com/BootCampTracker/BootcampTracker" target="_href" className="footer-link">Contribute to this project!</a>
  </div>;
}

export default Footer;
