
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hasTokenAction } from './Redux/authSlice';
import Error from './pages/Error/Error.jsx';
import UserPage from './pages/UserPage/UserPage.jsx';
import Authentification from './pages/Authentification/Authentification.jsx';
import Home from './pages/Home/Home.jsx';
import Header from './containers/Header/Header.jsx';
import Footer from './containers/Footer/Footer.jsx';
import './App.scss';

function App() {
    // TODO: manage the problem with the token arriving before hastoken
    const hasToken = useSelector((state) => state.auth.hasToken);
    console.log('hasToken', hasToken);
    const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
    const dispatch = useDispatch();

    useEffect(() => {
        if(token && !hasToken){
            console.log('token is present and detected in home', token, "\nhasToken", hasToken);
            dispatch(hasTokenAction(true));
        }
    }, [dispatch, hasToken, token])

  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/authentification/:option" element={<Authentification />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
