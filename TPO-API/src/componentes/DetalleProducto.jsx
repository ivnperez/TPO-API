import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductoByID } from "../features/productoSlice";
import { agregarProducto } from "../features/carritoSlice";

function DetalleProducto() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const producto = useSelector((state) => state.productos.productoSeleccionado);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductoByID(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="row w-100">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          {producto && (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          )}
        </div>
        <div className="col-md-8">
          <h3>{producto && producto.nombre}</h3>
          <p>Descripción: {producto && producto.descripcion}</p>
          <p>Precio: {producto && producto.precio}</p>
          <p>
            Descuento:
            <span style={{ color: "red" }}>
              -{producto && producto.descuento}%
            </span>
          </p>
          <p>Año de Lanzamiento: {producto && producto.lanzamiento}</p>
          <p>Desarrollador: {producto && producto.desarrollador}</p>
          <button
            className="btn btn-medium btn-black"
            onClick={() => dispatch(agregarProducto(producto))}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
