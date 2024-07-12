import React, { useState, useEffect } from 'react';
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
    const [error, setError] = useState(null);
    const [isConfirming, setIsConfirming] = useState(false);
    
    useEffect(() => {
        setError(null);
    }, [productosCarrito]);

    const precioTotal = productosCarrito.reduce((total, producto) => {
        const precioString = producto.precio.toString().replace(/[^\d]+/g, ''); // Conversión a cadena antes de usar replace
        const precio = parseFloat(precioString);
        return total + (precio * producto.cantidad);
    }, 0);

    const precioTotalConDescuento = productosCarrito.reduce((total, producto) => {
        const precioDescuentoString = producto.precioDescuento.toString().replace(/[^\d]+/g, ''); // Conversión a cadena antes de usar replace
        const precioDescuento = parseFloat(precioDescuentoString);
        return total + (precioDescuento * producto.cantidad);
    }, 0);

    const cerrarModales = () => {
        const modales = ['carritoModal', 'checkoutCompra', 'confirmacionCompra'];
        modales.forEach(modalId => {
            const modalElement = document.getElementById(modalId);
            if (modalElement) {
                let modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                if (!modalInstance) {
                    modalInstance = new window.bootstrap.Modal(modalElement);
                }
                if (modalInstance) {
                    console.log(`Cerrando modal: ${modalId}`);
                    modalInstance.hide();
                    modalElement.classList.remove('show');
                    modalElement.setAttribute('aria-hidden', 'true');
                    modalElement.style.display = 'none';  // Asegúrate de configurar display: none
                    document.body.classList.remove('modal-open');  // Quitar la clase modal-open del body
                    document.querySelector('.modal-backdrop')?.remove();  // Quitar cualquier backdrop
                } else {
                    console.log(`No se encontró instancia de modal para: ${modalId}`);
                }
            } else {
                console.log(`No se encontró el elemento modal: ${modalId}`);
            }
        });
    };

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
        if (!usuario?.access_token) {
            setError('Debe iniciar sesión para confirmar la compra');
            return;
        } else {
            console.log('Usuario autenticado:', usuario);
            setError(null); // Limpiar el error si el usuario está autenticado
        }
    
        const usuarioId = usuario.id;
        
        const compraData = {
            id_usuario: usuarioId,
            detalles: productosCarrito.map(item => ({
                id_producto: item.id,
                cantidad: item.cantidad
            })),
            total: precioTotalConDescuento // Usar el total con descuento calculado
        };
    
        console.log('Enviando datos de compra:', compraData);
    
        setIsConfirming(true); // Deshabilitar el botón mientras se confirma la compra
        dispatch(confirmarCompra(compraData))
            .then((result) => {
                if (result.type === 'carrito/confirmarCompra/fulfilled') {
                    setError(null); // Limpiar errores en caso de éxito
                    cerrarModales(); // Asegúrate de cerrar todos los modales primero
                    const confirmacionModalElement = document.getElementById('confirmacionCompra');
                    const confirmacionModalInstance = window.bootstrap.Modal.getOrCreateInstance(confirmacionModalElement);
                    confirmacionModalInstance.show();
                } else {
                    const errorMessage = result.payload?.error || 'Error al confirmar la compra';
                    setError(errorMessage);
                    console.error('Error al confirmar la compra:', errorMessage);
                }
            })
            .finally(() => {
                setIsConfirming(false); // Habilitar el botón después de la confirmación
            });
    };
    

    const handleRedireccionarInicio = () => {
        handleVaciarCarrito();
        cerrarModales();
        const confirmacionModalElement = document.getElementById('confirmacionCompra');
        const confirmacionModalInstance = window.bootstrap.Modal.getInstance(confirmacionModalElement);
        if (confirmacionModalInstance) {
            console.log('Cerrando modal de confirmación');
            confirmacionModalInstance.hide();
        } else {
            console.log('No se encontró instancia de modal de confirmación');
        }
        navigate('/');
    };

    const handleCloseCheckoutModal = () => {
        handleModalHide();
        cerrarModales();
    };

    const handleModalHide = () => {
        setError(null);
    };

    return (
        <div>
            {children}
            <div className="modal fade" id="carritoModal" tabIndex="-1" data-bs-backdrop="false" aria-labelledby="carritoModalLabel" aria-hidden="true" onHide={handleModalHide}>
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="carritoModalLabel">Carrito de Compras</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalHide}></button>
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
                        <div className="modal-footer d-flex flex-column align-items-start">
                            <p className="texto-negro"> Total: ${precioTotal.toLocaleString()}</p>
                            <p className="texto-negro"> Total con Descuento: ${precioTotalConDescuento.toLocaleString()}</p>
                        </div>
                        <div className="modal-footer texto-negro">
                            <button type="button" className="btn btn-danger" onClick={handleVaciarCarrito} data-bs-dismiss="modal" disabled={productosCarrito.length === 0}>Borrar Carrito</button>
                            <button type="button" className="btn btn-success" data-bs-target={usuario?.access_token ? "#checkoutCompra" : ""} data-bs-toggle={usuario?.access_token ? "modal" : ""} onClick={!usuario?.access_token ? () => setError('Debe iniciar sesión para confirmar la compra') : null} disabled={productosCarrito.length === 0}>Comprar</button>
                            {error && <div className="alert alert-danger mt-3 w-100">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="checkoutCompra" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="carritoModalLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title texto-negro" id="carritoModalLabel2">Checkout</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseCheckoutModal}></button>
                        </div>
                        <div className="modal-body">
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
                        <div className="modal-footer d-flex flex-column align-items-start">
                            <p className="texto-negro"> Total: ${precioTotal.toLocaleString()}</p>
                            <p className="texto-negro"> Total con Descuento: ${precioTotalConDescuento.toLocaleString()}</p>
                        </div>
                        <div className="modal-footer texto-negro">
                            <button 
                                type="button" 
                                className="btn btn-success" 
                                onClick={handleConfirmarCompra} 
                                disabled={productosCarrito.length === 0 || isConfirming}
                            >
                                Confirmar Compra
                            </button>
                            {error && <div className="alert alert-danger mt-3 w-100">{error}</div>}
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
