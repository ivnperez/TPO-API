import React, { useEffect, useState } from "react";
import { getProductos } from "../services/Productos";
import { getFiltros } from "../services/Filtros";
import "../css/Catalogo.css";
import DetalleProducto from "./DetalleProducto";
import { useCarrito } from "./CarritoCompras";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const productosPorPagina = 9;
  const { agregarAlCarrito } = useCarrito();

  const [filtros, setFiltros] = useState({
    generos: [],
    tipos: [],
    plataformas: [],
  });

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
  const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState([]);

  useEffect(() => {
    getProductos()
      .then((data) => {
        setProductos(data);
        setProductosFiltrados(data);
      })
      .catch((error) => {
        console.error("Error al obtener getProductos:", error);
      });
    getFiltros()
      .then((data) => {
        setFiltros(data);
      })
      .catch((error) => {
        console.error("Error al obtener getFiltros:", error);
      });
  }, []);

  const handleGeneroChange = (event) => {
    const generoId = parseInt(event.target.value);
    if (event.target.checked) {
      setGenerosSeleccionados([...generosSeleccionados, generoId]);
    } else {
      setGenerosSeleccionados(
        generosSeleccionados.filter((id) => id !== generoId)
      );
    }
  };

  const handleTipoChange = (event) => {
    const tipoId = parseInt(event.target.value);
    if (event.target.checked) {
      setTiposSeleccionados([...tiposSeleccionados, tipoId]);
    } else {
      setTiposSeleccionados(tiposSeleccionados.filter((id) => id !== tipoId));
    }
  };

  const handlePlataformaChange = (event) => {
    const plataformaId = parseInt(event.target.value);
    if (event.target.checked) {
      setPlataformasSeleccionadas([...plataformasSeleccionadas, plataformaId]);
    } else {
      setPlataformasSeleccionadas(
        plataformasSeleccionadas.filter((id) => id !== plataformaId)
      );
    }
  };

  const aplicarFiltro = () => {
    setPaginaActual(1);
    let productosFiltradosTemp = productos.filter((producto) => {
      const filtroGeneros =
        generosSeleccionados.length === 0 ||
        generosSeleccionados.some((gen) => producto.genero.includes(gen));

      const filtroTipos =
        tiposSeleccionados.length === 0 ||
        tiposSeleccionados.some((tipo) => producto.tipo.includes(tipo));

      const filtroPlataformas =
        plataformasSeleccionadas.length === 0 ||
        plataformasSeleccionadas.some((plataforma) =>
          producto.plataforma.includes(plataforma)
        );

      return filtroGeneros && filtroTipos && filtroPlataformas;
    });

    setProductosFiltrados(productosFiltradosTemp);
  };

  const limpiarFiltros = () => {
    setGenerosSeleccionados([]);
    setTiposSeleccionados([]);
    setPlataformasSeleccionadas([]);
    setProductosFiltrados(productos);
    document
      .querySelectorAll('.form-check-input[type="checkbox"]')
      .forEach((checkbox) => (checkbox.checked = false));
    setPaginaActual(1);
  };

  const generarControlesFiltro = () => {
    return (
      <div className="filtros-container">
        <div className="filtros-group">
          <h4>Géneros:</h4>
          {filtros.generos.map((genero, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={genero.id}
                id={`genero-${index}`}
                onChange={handleGeneroChange}
              />
              <label className="form-check-label" htmlFor={`genero-${index}`}>
                {genero.nombre}
              </label>
            </div>
          ))}
        </div>
        <div className="filtros-group">
          <h4>Tipos:</h4>
          {filtros.tipos.map((tipo, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={tipo.id}
                id={`tipo-${index}`}
                onChange={handleTipoChange}
              />
              <label className="form-check-label" htmlFor={`tipo-${index}`}>
                {tipo.nombre}
              </label>
            </div>
          ))}
        </div>
        <div className="filtros-group">
          <h4>Plataformas:</h4>
          {filtros.plataformas.map((plataforma, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={plataforma.id}
                id={`plataforma-${index}`}
                onChange={handlePlataformaChange}
              />
              <label
                className="form-check-label"
                htmlFor={`plataforma-${index}`}
              >
                {plataforma.nombre}
              </label>
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-3" onClick={aplicarFiltro}>
          Aplicar Filtro
        </button>
        <button className="btn btn-danger mt-3" onClick={limpiarFiltros}>
          Eliminar Filtros
        </button>
      </div>
    );
  };

  const abrirDetalleProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  const cerrarDetalleProducto = () => {
    setProductoSeleccionado(null);
  };

  const productosPaginaActual = productosFiltrados.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div className="catalogo-container">
      <div className="filtros-column">{generarControlesFiltro()}</div>
      <div className="productos-container">
        <h2 className="display-7 text-dark text-uppercase">Catalogo</h2>
        <div className="catalogo-grid">
          {productosPaginaActual.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => abrirDetalleProducto(product)}
            >
              <img src={product.imagen} className="card-img-top" alt="..." />
              <div className="card-content">
                <div className="card-body">
                  <h5 className="card-title">{product.nombre}</h5>
                  <p className="card-text">{product.precio}</p>
                </div>
                <div className="card-footer">
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      agregarAlCarrito(product);
                    }}
                  >
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
              ...Array(
                Math.ceil(productosFiltrados.length / productosPorPagina)
              ).keys(),
            ].map((numero) => (
              <button
                key={numero + 1}
                onClick={() => cambiarPagina(numero + 1)}
                className={`btn btn-outline-primary ${
                  numero + 1 === paginaActual ? "active" : ""
                }`}
              >
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
    </div>
  );
}

export default Catalogo;
