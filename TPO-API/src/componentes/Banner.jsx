import React from 'react';
import '../css/vendor.css';
import '../css/Carrusel.css';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import imgBanner from '../images/banner-image.png';

function Banner() {
    return (
        <section id="billboard" className="position-relative overflow-hidden bg-light-blue">
            <div className="swiper main-swiper">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="container">
                            <div className="row d-flex align-items-center">
                                <div className="col-md-6">
                                    <div className="banner-content">
                                        <h1 className="display-2 text-uppercase text-dark pb-5">Your Products Are Great.</h1>
                                        <a href="shop.html" className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Product</a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="image-holder">
                                        <img src={imgBanner} alt="banner"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="container">
                            <div className="row d-flex align-items-center">
                                <div className="col-md-6">
                                    <div className="banner-content">
                                        <h1 className="display-2 text-uppercase text-dark pb-5">Technology Hack You Won't Get</h1>
                                        <a href="shop.html" className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Product</a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="image-holder">
                                        <img src={imgBanner} alt="banner"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="swiper-icon swiper-arrow swiper-arrow-prev">
                <svg className="chevron-left">
                    <use xlinkHref="#chevron-left" />
                </svg>
            </div>
            <div className="swiper-icon swiper-arrow swiper-arrow-next">
                <svg className="chevron-right">
                    <use xlinkHref="#chevron-right" />
                </svg>
            </div>
        </section>
    );
}

export default Banner;
