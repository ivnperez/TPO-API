import Navbar from "./componentes/Navbar.jsx";
import Banner from "./componentes/Banner.jsx";
import Servicios from "./componentes/Servicios.jsx";
import Catalogo from "./componentes/Catalogo.jsx";
import ProductosDestacados from "./componentes/ProductosDestacados.jsx";
import CarritoCompras from './componentes/CarritoCompras.jsx';


function App() {
  return (
    <>
      <CarritoCompras>
      <Navbar />
      <Banner />
      <Servicios />
      <ProductosDestacados />
      <Catalogo />
      </CarritoCompras>
    </>
  );
}
export default App;

