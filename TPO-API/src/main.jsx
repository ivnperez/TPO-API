import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import Navbar from './Navbar.jsx'
import Carrusel from './Carrusel.jsx'
//import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar/>
    <Carrusel/>
  </React.StrictMode>,
)
