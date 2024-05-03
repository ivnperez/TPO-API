import Navbar from "./componentes/Navbar.jsx";
import Catalogo from "./componentes/Catalogo.jsx";
import CarritoCompras from "./componentes/CarritoCompras.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./componentes/Home.jsx";
import Abm from "./componentes/Abm.jsx";

function App() {
  return (
    <>
      <CarritoCompras>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Catalogo" element={<Catalogo />} />
          <Route path="/Abm" element={<Abm />} />
        </Routes>
      </CarritoCompras>
    </>
  );
}
export default App;
