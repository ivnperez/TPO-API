import React, { useState } from 'react'
import Navbar from './componentes/Navbar.jsx'
import Banner from './componentes/Banner.jsx'
import Servicios from './componentes/Servicios.jsx'
import JuegosDestacados from './componentes/JuegosDestacados.jsx'
import ConsolasDestacadas from './componentes/ConsolasDestacadas.jsx'
import CarritoCompras from './componentes/CarritoCompras.jsx';

function App() {
  return (
    <>
    <CarritoCompras>
    <Navbar/>
    <Banner/>
    <Servicios/>
    <JuegosDestacados/>
    <ConsolasDestacadas/>
    </CarritoCompras>
    </>
  )
}

export default App
