import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductoByID } from "../services/Productos";

function DetalleProducto({}) {
  const id = useParams().id;
  const [producto, setProducto] = useState(null);
  useEffect(() => {
    getProductoByID(Number(id)).then((data) => {
      setProducto(data);
    });
  }, [id]);
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
    </>
  );
}

export default DetalleProducto;
