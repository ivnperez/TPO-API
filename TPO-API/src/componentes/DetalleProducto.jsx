import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DetalleProducto({ producto, onClose }) {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ textAlign: 'center' }}>
                    {producto && <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '100%', maxHeight: '400px' }} />}
                </div>
                <h3>{producto && producto.nombre}</h3>
                <p>Descripción: {producto && producto.descripcion}</p>
                <p>Precio: {producto && producto.precio}</p>
                <p>Año de Lanzamiento: {producto && producto.lanzamiento}</p>
                <p>Desarrollador: {producto && producto.desarrollador}</p>
                <p>Plataforma: {producto && producto.plataforma}</p>
                <p>Género: {producto && producto.genero}</p>
                {/* Agrega más campos según sea necesario */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DetalleProducto;
