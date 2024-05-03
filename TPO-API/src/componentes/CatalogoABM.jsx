import React, { useEffect, useState } from "react";
import { getProductos, agregarProducto, eliminarProducto } from "../services/Productos";
import { getFiltros } from "../services/Filtros";
import "../css/Catalogo.css";
import DetalleProducto from "./DetalleProducto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";

function CatalogoABM() {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const productosPorPagina = 9;
  const [filtros, setFiltros] = useState({
    generos: [],
    tipos: [],
    plataformas: [],
  });
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
  const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    anioLanzamiento: "",
    imagen: ""
  });

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
    return productosFiltradosTemp;
  };

  const limpiarFiltros = () => {
    setGenerosSeleccionados([]);
    setTiposSeleccionados([]);
    setPlataformasSeleccionadas([]);
    aplicarFiltro(); // Aplicar filtro vacío para mostrar todos los productos
  };

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

  const generarControlesFiltro = () => {
    return (
      <div>
        <button
          className="btn btn-success mt-3"
          onClick={() => setMostrarFormulario(true)}
        >
          <FontAwesomeIcon icon={faPlusSquare} />
          Agregar Producto
        </button>
        <div
          className={`modal fade ${mostrarFormulario ? "show" : ""}`}
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: mostrarFormulario ? "block" : "none" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Agregar Producto
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setMostrarFormulario(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      value={nuevoProducto.nombre}
                      onChange={(e) =>
                        setNuevoProducto({
                          ...nuevoProducto,
                          nombre: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="precio" className="form-label">
                      Precio
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="precio"
                      value={nuevoProducto.precio}
                      onChange={(e) =>
                        setNuevoProducto({
                          ...nuevoProducto,
                          precio: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                      Descripción
                    </label>
                    <textarea
                      className="form-control"
                      id="descripcion"
                      rows="3"
                      value={nuevoProducto.descripcion}
                      onChange={(e) =>
                        setNuevoProducto({
                          ...nuevoProducto,
                          descripcion: e.target.value
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="anioLanzamiento" className="form-label">
                      Año de Lanzamiento
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="anioLanzamiento"
                      value={nuevoProducto.anioLanzamiento}
                      onChange={(e) =>
                        setNuevoProducto({
                          ...nuevoProducto,
                          anioLanzamiento: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">
                      URL de la imagen
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="imagen"
                      value={nuevoProducto.imagen}
                      onChange={(e) =>
                        setNuevoProducto({
                          ...nuevoProducto,
                          imagen: e.target.value
                        })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={agregarNuevoProducto}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const agregarNuevoProducto = () => {
    agregarProducto(nuevoProducto)
      .then(() => {
        getProductos()
          .then((data) => {
            setProductos(data);
            setProductosFiltrados(aplicarFiltro());
            setMostrarFormulario(false);
            setNuevoProducto({
              nombre: "",
              precio: "",
              descripcion: "",
              anioLanzamiento: "",
              imagen: ""
            });
          })
          .catch((error) => {
            console.error("Error al obtener getProductos:", error);
          });
      })
      .catch((error) => {
        console.error("Error al agregar el producto:", error);
      });
  };

  const abrirDetalleProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  const cerrarDetalleProducto = () => {
    setProductoSeleccionado(null);
  };

  const eliminarProductoSeleccionado = (id) => {
    eliminarProducto(id)
      .then(() => {
        const nuevosProductos = productos.filter((producto) => producto.id !== id);
        setProductos(nuevosProductos);
        setProductosFiltrados(aplicarFiltro());
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };

  const modificarProductoSeleccionado = (producto) => {
    // Implementa la lógica para abrir un formulario modal de edición de producto
    // y utilizar la función modificarProducto para guardar los cambios
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
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarProductoSeleccionado(product.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      modificarProductoSeleccionado(product);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
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

export default CatalogoABM;
