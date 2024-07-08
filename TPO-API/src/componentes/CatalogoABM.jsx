import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos, createProducto, deleteProducto, updateProducto } from '../features/abmSlice';
import { getFiltros } from "../services/Filtros";
import "../css/Catalogo.css";
import DetalleProducto from "./DetalleProducto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from 'react-bootstrap';

function CatalogoABM() {
  const dispatch = useDispatch();
  const productos = useSelector(state => state.abm.items || []);
  const status = useSelector(state => state.abm.status);
  const error = useSelector(state => state.abm.error);

  const [paginaActual, setPaginaActual] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
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
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    anioLanzamiento: "",
    imagen: null,
    desarrollador: "",
    tipo: "",
    stock: 0,
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductos());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (productos) {
      setProductosFiltrados(productos);
    }
  }, [productos]);

  useEffect(() => {
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

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setNuevoProducto({
      ...nuevoProducto,
      imagen: file
    });
  };

  const abrirModal = (modo, producto = null) => {
    setModoEdicion(modo === 'editar');
    setProductoSeleccionado(producto);
    setNuevoProducto(producto || {
      nombre: "",
      precio: "",
      descripcion: "",
      anioLanzamiento: "",
      imagen: null,
      desarrollador: "",
      tipo: "",
      stock: 0,
    });
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setProductoSeleccionado(null); // Asegurarse de que se cierre el detalle del producto
  };

  const manejarSubmit = () => {
    if (modoEdicion) {
      dispatch(updateProducto(nuevoProducto))
        .then(() => {
          dispatch(fetchProductos());
          cerrarModal();
        })
        .catch((error) => {
          console.error("Error al modificar el producto:", error);
        });
    } else {
      dispatch(createProducto(nuevoProducto))
        .then(() => {
          dispatch(fetchProductos());
          cerrarModal();
        })
        .catch((error) => {
          console.error("Error al agregar el producto:", error);
        });
    }
  };

  const eliminarProductoSeleccionado = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      dispatch(deleteProducto(id))
        .then(() => {
          dispatch(fetchProductos());
        })
        .catch((error) => {
          console.error("Error al eliminar el producto:", error);
        });
    }
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
      <div className="filtros-column">
        <button
          className="btn btn-success mt-3"
          onClick={() => abrirModal('agregar')}
        >
          <FontAwesomeIcon icon={faPlusSquare} /> Agregar Producto
        </button>
        <button
          className="btn btn-secondary mt-3"
          onClick={limpiarFiltros}
        >
          Limpiar Filtros
        </button>
      </div>
      <div className="productos-container">
        <h2 className="display-7 text-dark text-uppercase">Catalogo</h2>
        <div className="catalogo-grid">
          {productosPaginaActual.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => abrirModal('ver', product)}
            >
              <img src={product.imagen} className="card-img-top" alt={product.nombre} />
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
                      abrirModal('editar', product);
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
            onClose={cerrarModal}
          />
        )}
      </div>
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Modificar Producto" : "Agregar Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    nombre: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.precio}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    precio: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={nuevoProducto.descripcion}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    descripcion: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAnioLanzamiento">
              <Form.Label>Año de Lanzamiento</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.anioLanzamiento}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    anioLanzamiento: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formImagen">
              <Form.Label>Cargar imagen</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImagenChange}
              />
            </Form.Group>
            <Form.Group controlId="formDesarrollador">
              <Form.Label>Desarrollador</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.desarrollador}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    desarrollador: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.tipo}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    tipo: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={nuevoProducto.stock}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    stock: parseInt(e.target.value)
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={manejarSubmit}>
            {modoEdicion ? "Modificar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CatalogoABM;

