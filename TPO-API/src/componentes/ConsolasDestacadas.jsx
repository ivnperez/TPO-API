import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.css'

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';    //documentacion: https://swiperjs.com/react

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const jsonConsolasDestacadas = {
    "productos": [
      {
        "nombre": "PS5 Spiderman Edition",
        "imagen": "/src/images/product-item6.jpg",
        "precio": "$900.000"
      },
      {
        "nombre": "Nintendo Switch Edicion Zelda",
        "imagen": "/src/images/product-item7.jpg",
        "precio": "$580.000"
      },
      {
        "nombre": "XBOX Series X Halo Infinite",
        "imagen": "/src/images/product-item8.jpg",
        "precio": "$90.000"
      },
      {
        "nombre": "Playstation Mini",
        "imagen": "/src/images/product-item9.jpg",
        "precio": "$300.000"
      },
      {
        "nombre": "Nintendo Switch Lite",
        "imagen": "/src/images/product-item10.jpg",
        "precio": "$350.000"
      }
    ]
};

function generarSeccionDestacada(data) {
    return (
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
        {data.productos.map((producto, index) => (
            <SwiperSlide key={index}>
            <div className="product-card position-relative">
                <img src={producto.imagen} alt={producto.nombre} />
                <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                        <a href="#" className="btn btn-medium btn-black">Agregar al carrito<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
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
}

function ConsolasDestacadas() {
    return (
        <section id="mobile-products" className="product-store position-relative padding-large no-padding-top">
            <div className="container">
                <div className="row">
                    <div className="display-header d-flex justify-content-between pb-3">
                        <h2 className="display-7 text-dark text-uppercase">Consolas Destacadas</h2>
                        <div className="btn-right">
                            <a href="shop.html" className="btn btn-medium btn-normal text-uppercase">Ir a la tienda</a>
                        </div>
                    </div>
                    <div className="swiper product-swiper">
                        {generarSeccionDestacada(jsonConsolasDestacadas)}
                    </div>
                </div>
            </div>
            <div className="swiper-pagination position-absolute text-center"></div>
        </section>
    );
}

export default ConsolasDestacadas;