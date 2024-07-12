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
    <>
      <div style={{ textAlign: "center" }}>
        {producto && (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        )}
      </div>
      <h3>{producto && producto.nombre}</h3>
      <p>Descripción: {producto && producto.descripcion}</p>
      <p>Precio: {producto && producto.precio}</p>
      <p>Año de Lanzamiento: {producto && producto.lanzamiento}</p>
      <p>Desarrollador: {producto && producto.desarrollador}</p>
      <button
        className="btn btn-medium btn-black"
        onClick={() => dispatch(agregarProducto(producto))}
      >
        Agregar al carrito
      </button>
    </>
  );
}

export default DetalleProducto;
