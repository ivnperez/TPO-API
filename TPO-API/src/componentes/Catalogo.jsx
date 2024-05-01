import React, { useEffect, useState } from "react";
import { getProductos } from "../services/Productos";
import { getFiltros } from "../services/Filtros";
import "../css/Catalogo.css";
import DetalleProducto from "./DetalleProducto";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const productosPorPagina = 9;
  const [filtros, setFiltros] = useState({
    generos: [],
    tipos: [],
    plataformas: []
  });  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
  const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState([]);

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
  useEffect(() => {
    getProductos()
      .then((data) => {
        console.log(data);
        setProductos(data);
        setProductosFiltrados(data);
      })
      .catch((error) => {
        console.error("Error al obtener getProductos:", error);
      });
    getFiltros()
      .then((data) => {
        console.log(data);
        setFiltros(data);
      })
      .catch((error) => {
        console.error("Error al obtener getFiltros:", error);
      });
  }, []);

  const productosPaginaActual = productosFiltrados.slice(
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

  const generarControlesFiltro = () => {
    return (
      <div className="card">
        <div className="card-body">
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
          <button className="btn btn-primary mt-3" onClick={aplicarFiltro}>
            Aplicar Filtro
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="catalogo-container">
      <h2 className="display-7 text-dark text-uppercase">Catalogo</h2>
      <div className="display-header d-flex justify-content-between pb-3">
        <div className="btn-right">{generarControlesFiltro()}</div>
      </div>
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
            ...Array(
              Math.ceil(productosFiltrados.length / productosPorPagina)
            ).keys(),
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
