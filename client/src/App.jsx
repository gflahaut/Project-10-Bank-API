import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/home/Home';
import SignIn from './screens/sign-in/SignIn';
import Profile from './screens/profile/Profile';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchProfile } from './stores/slices/user.slice';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      dispatch(fetchProfile(token)); // Action pour récupérer le profil utilisateur avec le token
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;