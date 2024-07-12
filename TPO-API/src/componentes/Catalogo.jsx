import React, { useEffect, useState } from "react";
import { getProductos } from "../services/Productos";
import { getFiltros } from "../services/Filtros";
import "../css/Catalogo.css";
import DetalleProducto from "./DetalleProducto";
import FiltrosCatalogo from "./FiltrosCatalogo";
import store from "../store";
import { useDispatch, useSelector } from "react-redux";
import { agregarProducto } from "../features/carritoSlice";
import { Link } from "react-router-dom";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const productosPorPagina = 9;
  const dispatch = useDispatch();

  const [filtros, setFiltros] = useState({
    tipos: [],
  });
  const tokencito = useSelector((state) => state.auth.user);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);

  useEffect(() => {
    getProductos()
      .then((data) => {
        setProductos(data);
        console.log(tokencito);
        setProductosFiltrados(data);
      })
      .catch((error) => {
        console.error("Error al obtener getProductos:", error);
      });
    getFiltros()
      .then((data) => {
        setFiltros({ tipos: data.tipos });
      })
      .catch((error) => {
        console.error("Error al obtener getFiltros:", error);
      });
  }, []);

  const handleTipoChange = (event) => {
    const tipoId = parseInt(event.target.value);
    if (event.target.checked) {
      setTiposSeleccionados([...tiposSeleccionados, tipoId]);
    } else {
      setTiposSeleccionados(tiposSeleccionados.filter((id) => id !== tipoId));
    }
  };

  const aplicarFiltro = () => {
    setPaginaActual(1);
    let productosFiltradosTemp = productos.filter((producto) => {
      const filtroTipos =
        tiposSeleccionados.length === 0 ||
        tiposSeleccionados.some((tipo) => producto.tipo.includes(tipo));

      return filtroTipos;
    });

    setProductosFiltrados(productosFiltradosTemp);
  };

  const limpiarFiltros = () => {
    setTiposSeleccionados([]);
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

  const MantenerMovimientoCarrito = (e, producto) => {
    e.preventDefault();
    dispatch(agregarProducto({ ...producto, cantidad: 1 }));
  };

  return (
    <div className="catalogo-container">
      <div className="filtros-column">{generarControlesFiltro()}</div>
      <div className="productos-container">
        <h2 className="display-7 text-dark text-uppercase">Catalogo</h2>
        <div className="catalogo-grid">
          {productosPaginaActual.map((product) => (
            <div key={product.id} className="card">
              <Link to={`/Catalogo/${product.id}`}>
                <img src={product.imagen} className="card-img-top" alt="..." />
                <div className="card-content">
                  <div className="card-body">
                    <h5 className="card-title">{product.nombre}</h5>
                    <p className="card-text">
                      <strong>${product.precio}</strong>
                      {product.descuento && (
                        <span style={{ color: "red", marginLeft: "10px" }}>
                          -{product.descuento}%
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="card-footer">
                    <a
                      href="#"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        MantenerMovimientoCarrito(e, product);
                      }}
                    >
                      Agregar al carrito
                    </a>
                  </div>
                </div>
              </Link>
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
