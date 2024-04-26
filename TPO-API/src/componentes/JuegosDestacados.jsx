// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';    //documentacion: https://swiperjs.com/react
import React, { useRef, useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// import css
import '../css/vendor.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.css'

const jsonJuegosDestacados = {
    "productos": [
      {
        "nombre": "The Witcher 3",
        "imagen": "/src/images/product-item1.jpg",
        "precio": "$25000"
      },
      {
        "nombre": "Red dead Redemtion 2",
        "imagen": "/src/images/product-item2.jpg",
        "precio": "$30000"
      },
      {
        "nombre": "Iphone 8",
        "imagen": "/src/images/product-item3.jpg",
        "precio": "$780"
      },
      {
        "nombre": "Iphone 13",
        "imagen": "/src/images/product-item4.jpg",
        "precio": "$1500"
      },
      {
        "nombre": "Iphone 12",
        "imagen": "/src/images/product-item5.jpg",
        "precio": "$1300"
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

function JuegosDestacados() {
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
                        {generarSeccionDestacada(jsonJuegosDestacados)}
                    </div>
                </div>
            </div>
            <div className="swiper-pagination position-absolute text-center"></div>
        </section>
    );
}

export default JuegosDestacados;