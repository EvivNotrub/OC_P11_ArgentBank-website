
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './pages/Error/Error.jsx';
import UserPage from './pages/UserPage/UserPage.jsx';
import Authentification from './pages/Authentification/Authentification.jsx';
import Home from './pages/Home/Home.jsx';
import Header from './containers/Header/Header.jsx';
import Footer from './containers/Footer/Footer.jsx';
import './App.scss';
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/userSlice.js';

function App() {
  const dispatch = useDispatch();

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

  dispatch(setUser(data.userName))

  return (
    <Router>
      <Header user={data.userName}/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/authentification" element={<Authentification />} />
          {/*<Route path="/apartment/:apartId" element={<Apartment />}  /> */}
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
