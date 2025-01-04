import React from "react";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className={styles.mainNav}>
      <Link to="/" className={styles.mainNavLogo}>
        <img
          className={styles.mainNavLogoImage}
          src="assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="srOnly">Argent Bank</h1>
      </Link>
      <div>
        <Link className={styles.mainNavItem} to="/sign-in">
          <i className="fa fa-user-circle" />
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
