import React from "react";
import styles from "./SignIn.module.css";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";

const SignIn = () => {
  return (
    <>
      <Nav />
      <main className="bgDark">
        <section className={styles.signInContent}>
          <i className={`fa fa-user-circle ${styles.signInIcon}`}></i>
          <h1>Sign In</h1>
          <form>
            <div className={styles.inputWrapper}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className={styles.inputRemember}>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="/user" className={styles.signInButton}>
              Sign In
            </a>
            {/* Replace with button when backend is implemented */}
            {/* <button className={styles.signInButton}>Sign In</button> */}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;
