import React, { useEffect, useState } from "react";
import { getProductos } from "../services/Productos";
import "../css/Catalogo.css";
import DetalleProducto from "./DetalleProducto";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const productosPorPagina = 9;

  useEffect(() => {
    getProductos()
      .then((data) => {
        console.log(data);
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  const productosPaginaActual = productos.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const abrirDetalleProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  const cerrarDetalleProducto = () => {
    setProductoSeleccionado(null);
  };

  return (
    <div className="catalogo-container">
      <div className="catalogo-grid">
        {productosPaginaActual.map((product) => (
          <div
            key={product.id}
            className="card"
            onClick={() => abrirDetalleProducto(product)}
          >
            <img src={product.imagen} className="card-img-top" alt="..."></img>
            <div className="card-content">
              <div className="card-body">
                <h5 className="card-title">{product.nombre}</h5>
                <p className="card-text">{product.precio}</p>
              </div>
              <div className="card-footer">
                <a href="#" className="btn btn-primary">
                  Agregar al carrito
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <div className="pagination">
          {[
            ...Array(Math.ceil(productos.length / productosPorPagina)).keys(),
          ].map((numero) => (
            <button key={numero + 1} onClick={() => cambiarPagina(numero + 1)}>
              {numero + 1}
            </button>
          ))}
        </div>
      </div>
      {productoSeleccionado && (
        <DetalleProducto
          producto={productoSeleccionado}
          onClose={cerrarDetalleProducto}
        />
      )}
    </div>
  );
}

export default Catalogo;
