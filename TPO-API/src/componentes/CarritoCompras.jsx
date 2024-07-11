import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { agregarProducto, eliminarProducto, eliminarTodoProducto, vaciarCarrito, confirmarCompra } from '../features/carritoSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/CarritoCompras.css";

function CarritoCompras({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productosCarrito = useSelector(state => state.carrito.productos);
    const usuario = useSelector(state => state.auth.user);

    const precioTotal = productosCarrito.reduce((total, producto) => {
        const precioString = producto.precio.toString().replace(/[^\d]+/g, ''); // Conversión a cadena antes de usar replace
        const precio = parseFloat(precioString);
        return total + (precio * producto.cantidad);
    }, 0);

    const handleAgregarUnidad = (producto) => {
        dispatch(agregarProducto({ ...producto, cantidad: 1 }));
    };

    const handleEliminarUnidad = (productoId) => {
        dispatch(eliminarProducto(productoId));
    };

    const handleEliminarTodoProducto = (productoId) => {
        dispatch(eliminarTodoProducto(productoId));
    };

    const handleVaciarCarrito = () => {
        dispatch(vaciarCarrito());
    };

    const handleConfirmarCompra = () => {
        console.log('Carrito actual antes de confirmar compra:', productosCarrito);
        if (!usuario) {
            console.error('Usuario no autenticado');
            return;
        } else {
            console.log('Usuario autenticado:', usuario);
        }
    
        const usuarioId = usuario.id;
        if (!usuarioId) {
            console.error('usuarioId no está definido:', usuario);
            return;
        }
    
        const compraData = {
            id_usuario: usuarioId,
            detalles: productosCarrito.map(item => ({
                id_producto: item.id,
                cantidad: item.cantidad
            })),
            total: precioTotal // Usar el total calculado
        };
    
        console.log('Enviando datos de compra:', compraData);
    
        dispatch(confirmarCompra(compraData))
            .then((result) => {
                if (result.type === 'carrito/confirmarCompra/fulfilled') {
                    document.getElementById("confirmacionCompra").style.display = "block";
                } else {
                    console.error('Error al confirmar la compra:', result.payload);
                }
            });
    };

    const handleRedireccionarInicio = () => {
        handleVaciarCarrito();
        const modales = ['carritoModal', 'checkoutCompra', 'confirmacionCompra'];
        modales.forEach(modalId => {
            const modalElement = document.getElementById(modalId);
            if (modalElement) {
                const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        });
        navigate('/');
    };

    return (
        <div>
            {children}
            <div className="modal fade" id="carritoModal" tabIndex="-1" data-bs-backdrop="false" aria-labelledby="carritoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="carritoModalLabel">Carrito de Compras</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {productosCarrito.map((producto, index) => (
                                <div key={index} className="d-flex align-items-center">
                                    <img src={producto.imagen} alt={producto.nombre} className="img-thumbnail mr-3" style={{ width: "100px", marginRight: "10px" }} />
                                    <div className="flex-grow-1" style={{ marginRight: '10px' }}>
                                        <p className="mb-0 texto-negro">{producto.nombre}</p>
                                        <p className="mb-0 texto-negro">${producto.precio}</p>
                                    </div>
                                    <div className="d-flex align-items-center me-2">
                                        <button className="btn btn-warning me-2" onClick={() => handleEliminarUnidad(producto.id)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <p className="mb-0">{producto.cantidad}</p>
                                        <button className="btn btn-success ms-2" onClick={() => handleAgregarUnidad(producto)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <button className="btn btn-danger" onClick={() => handleEliminarTodoProducto(producto.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <p className="texto-negro"> Total: ${precioTotal.toLocaleString()}</p>
                        </div>
                        <div className="modal-footer texto-negro">
                            <button type="button" className="btn btn-danger" onClick={handleVaciarCarrito} data-bs-dismiss="modal" disabled={productosCarrito.length === 0}>Borrar Carrito</button>
                            <button type="button" className="btn btn-success" data-bs-target="#checkoutCompra" data-bs-toggle="modal" disabled={productosCarrito.length === 0}>Comprar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="checkoutCompra" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="carritoModalLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title texto-negro" id="carritoModalLabel2">Checkout</h5>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <p className="texto-negro">Nombre y Apellido</p>
                                <input type="text" className="form-control" id="nombre" placeholder="Nombre y Apellido" />
                            </div>
                            <div className="mb-3">
                                <p className="texto-negro">Direccion</p>
                                <input type="text" className="form-control" id="direccion" placeholder="Dirección" />
                            </div>
                            <div className="mb-3">
                                <p className="texto-negro">Código Postal</p>
                                <input type="text" className="form-control" id="codigoPostal" placeholder="Código Postal" />
                            </div>
                            <div className="mb-3">
                                <p className="texto-negro">Número de Tarjeta</p>
                                <input type="text" className="form-control" id="tarjeta" placeholder="Número de Tarjeta" />
                            </div>
                            <div className="mb-3">
                                <p className="texto-negro">Fecha de Vencimiento</p>
                                <input type="text" className="form-control" id="fechaVencimiento" placeholder="MM/AA" />
                            </div>
                            <div className="mb-3">
                                <p className="texto-negro">CCV</p>
                                <input type="text" className="form-control" id="ccv" placeholder="CCV" />
                            </div>
                            <hr className="my-4" />
                            <div className='mb-3'>
                                <p className="texto-negro">Productos</p>
                            </div>
                            {productosCarrito.map((producto, index) => (
                                <div key={index} className="flex-grow-1" style={{ marginRight: '10px' }}>
                                    <p className="mb-0 texto-negro">{producto.nombre} (X{producto.cantidad})</p>
                                    <p className="mb-0 texto-negro">${producto.precio}</p>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <p className="texto-negro"> Total: ${precioTotal.toLocaleString()}</p>
                        </div>
                        <div className="modal-footer texto-negro">
                            <button type="button" className="btn btn-success" onClick={handleConfirmarCompra} data-bs-target="#confirmacionCompra" data-bs-toggle="modal" disabled={productosCarrito.length === 0}>Confirmar Compra</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="confirmacionCompra" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="carritoModalLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title texto-negro" id="carritoModalLabel2">Confirmacion</h5>
                        </div>
                        <div className="modal-body">
                            <p className="texto-negro">Su Compra ha sido Completada</p>
                        </div>
                        <div className="modal-footer texto-negro">
                            <button type="button" className="btn btn-success" onClick={handleRedireccionarInicio} data-bs-dismiss="modal">Volver al Inicio</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarritoCompras;
