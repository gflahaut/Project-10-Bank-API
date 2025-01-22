import React, { useState, useEffect } from "react";
import styles from "./SignIn.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../stores/slices/user.slice';
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (user?.token) {
      navigate("/profile");
    }
  }, [user, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Nav />
      <main className="bgDark">
        <section className={styles.signInContent}>
          <i className={`fa fa-user-circle ${styles.signInIcon}`}></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputRemember}>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className={styles.signInButton} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;