
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './pages/Error/Error.jsx';
import UserPage from './pages/UserPage/UserPage.jsx';
import Authentification from './pages/Authentification/Authentification.jsx';
import Home from './pages/Home/Home.jsx';
import Header from './containers/Header/Header.jsx';
import Footer from './containers/Footer/Footer.jsx';
import './App.scss';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  console.log('isAuth in app jsx', isAuthorized);

  const data = {
    userName: 'Bob Denard',
    accounts: [
      {
        id: 'asd54f',
        name: 'savings',
        amount: '100',
        currency: '€'
      },
      {
        id: '6s54df',
        name: 'current',
        amount: '250',
        currency: '€'
      }
    ]
  }

  return (
    <Router>
      <Header user={data.userName} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/userpage" element={<UserPage isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
          <Route path="/authentification" element={<Authentification isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/apartment/:apartId" element={<Apartment />}  /> */}
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
