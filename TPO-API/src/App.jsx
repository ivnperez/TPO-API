import { useState } from "react";
import Navbar from "./componentes/Navbar.jsx";
import Banner from "./componentes/Banner.jsx";
import Servicios from "./componentes/Servicios.jsx";
import JuegosDestacados from "./componentes/JuegosDestacados.jsx";
import ConsolasDestacadas from "./componentes/ConsolasDestacadas.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <Servicios />
      <JuegosDestacados />
      <ConsolasDestacadas />
    </>
  );
}

export default App;