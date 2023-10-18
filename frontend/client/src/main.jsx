import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      {/* <Header/> */}
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<App />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
          <Route path="/apartment/:apartId" element={<Apartment />}  /> */}
      </Routes>
      {/* <Footer/> */}
    </Router>
  </React.StrictMode>,
)
