import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../stores/slices/user.slice";
import styles from "./Nav.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); 

  const handleLogout = () => {
    dispatch(logout());
  };

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
        {user?.infos ? (
          <div className={styles.mainNavItem}>
            <Link to="/profile">
              <i className="fa fa-user-circle" />
              <span className={styles.spanUser}>{user?.infos?.firstName}</span>
            </Link>
            <Link to="/" onClick={handleLogout} className={styles.signOutLink}>
              <i className="fa fa-sign-out-alt" />
              Sign Out
            </Link>
          </div>
        ) : (
          <div className={styles.mainNavItem}>
            <Link to="/sign-in">
              <i className="fa fa-user-circle" />
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
