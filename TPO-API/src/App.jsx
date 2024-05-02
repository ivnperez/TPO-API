import Navbar from "./componentes/Navbar.jsx";
import Catalogo from "./componentes/Catalogo.jsx";
import CarritoCompras from "./componentes/CarritoCompras.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./componentes/Home.jsx";

function App() {
  return (
    <>
      <CarritoCompras>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Catalogo" element={<Catalogo />} />
        </Routes>
      </CarritoCompras>
    </>
  );
}
export default App;
