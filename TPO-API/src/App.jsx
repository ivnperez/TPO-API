import Navbar from "./componentes/Navbar.jsx";
import Catalogo from "./componentes/Catalogo.jsx";
import CarritoCompras from "./componentes/CarritoCompras.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./componentes/Home.jsx";
import Abm from "./componentes/Abm.jsx";
import Registro from "./componentes/Registro.jsx";
import DetalleProducto from "./componentes/DetalleProducto.jsx";
import Login from "./componentes/Login.jsx";

function App() {
  return (
    <>
      <CarritoCompras>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Catalogo" element={<Catalogo />} />
          <Route path="/Catalogo/:id" element={<DetalleProducto />} />
          <Route path="/Abm" element={<Abm />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </CarritoCompras>
    </>
  );
}
export default App;
