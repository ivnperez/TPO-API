import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import Navbar from './Navbar.jsx'
import Banner from './Banner.jsx'
import Servicios from './Servicios.jsx'
import JuegosDestacados from './JuegosDestacados.jsx'
//import Oferta from './Oferta.jsx' Cuando lo agregas revienta asumo que debe ser por la imagen que utiliza de fondo
import ConsolasDestacadas from './ConsolasDestacadas.jsx'
import Testimonios from './Testimonios.jsx'
//import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar/>
    <Banner/>
    <Servicios/>
    <JuegosDestacados/>
    <ConsolasDestacadas/>
    <Testimonios/>
  </React.StrictMode>,
)
