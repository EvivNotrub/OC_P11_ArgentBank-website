
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './pages/Error/Error.jsx';
import Authentification from './pages/Authentification/Authentification.jsx';
import Home from './pages/Home/Home.jsx';
import Header from './containers/Header/Header.jsx';
import Footer from './containers/Footer/Footer.jsx';
import './App.scss';

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/authentification" element={<Authentification />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/apartment/:apartId" element={<Apartment />}  /> */}
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
