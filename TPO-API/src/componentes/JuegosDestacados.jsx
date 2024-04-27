// Importa useState y useEffect desde React
import React, { useEffect, useState } from 'react';
// Importa las funciones desde tu archivo Juegos.js
import { getDestacados } from "../services/Juegos";
// Importa Swiper y otros componentes de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Importa los estilos CSS necesarios
import '../css/vendor.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

function JuegosDestacados() {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        getDestacados().then(data => {
            setProductos(data);
        })
    }, []);

    const generarSeccionDestacada = () => (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            {productos?.map((producto, index) => (
                <SwiperSlide key={index}>
                    <div className="product-card position-relative">
                        <img src={producto.imagen} alt={producto.nombre} />
                        <div className="cart-concern position-absolute">
                            <div className="cart-button d-flex">
                                <a href="#" className="btn btn-medium btn-black">Agregar al carrito
                                    <svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg>
                                </a>
                            </div>
                        </div>
                        <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                            <h3 className="card-title text-uppercase">
                                <a href="#">{producto.nombre}</a>
                            </h3>
                            <span className="item-price text-primary">{producto.precio}</span>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );

    // Renderizado de seccion
    return (
        <section id="mobile-products" className="product-store position-relative padding-large no-padding-top">
            <div className="container">
                <div className="row">
                    <div className="display-header d-flex justify-content-between pb-3">
                        <h2 className="display-7 text-dark text-uppercase">Juegos Destacados</h2>
                        <div className="btn-right">
                            <a href="shop.html" className="btn btn-medium btn-normal text-uppercase">Ir a la tienda</a>
                        </div>
                    </div>
                    <div className="swiper product-swiper">
                        {generarSeccionDestacada()}
                    </div>
                </div>
            </div>
            <div className="swiper-pagination position-absolute text-center"></div>
        </section>
    );
}

export default JuegosDestacados;