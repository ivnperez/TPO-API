import 'bootstrap/dist/css/bootstrap.css';
import '../css/vendor.css';
import '../css/style.css'

const jsonConsolasDestacadas = {
    "productos": [
      {
        "nombre": "PS5",
        "imagen": "/src/images/product-item6.jpg",
        "precio": "$900000"
      },
      {
        "nombre": "Heavy watch",
        "imagen": "/src/images/product-item7.jpg",
        "precio": "$680"
      },
      {
        "nombre": "Spotted watch",
        "imagen": "/src/images/product-item8.jpg",
        "precio": "$750"
      },
      {
        "nombre": "Black watch",
        "imagen": "/src/images/product-item9.jpg",
        "precio": "$650"
      },
      {
        "nombre": "Black watch",
        "imagen": "/src/images/product-item10.jpg",
        "precio": "$750"
      }
    ]
};

function generarSeccionDestacada(data) {
    return (
        <div className="swiper-wrapper">
            {data.productos.map((producto, index) => (
                <div className="swiper-slide" key={index}>
                    <div className="product-card position-relative">
                        <div className="image-holder">
                            <img src={producto.imagen} alt={producto.nombre} className="img-fluid"/>
                        </div>
                        <div className="cart-concern position-absolute">
                            <div className="cart-button d-flex">
                                <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                            </div>
                        </div>
                        <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                            <h3 className="card-title text-uppercase">
                                <a href="#">{producto.nombre}</a>
                            </h3>
                            <span className="item-price text-primary">{producto.precio}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ConsolasDestacadas() {
    return (
        <section id="smart-watches" className="product-store padding-large position-relative">
            <div className="container">
                <div className="row">
                    <div className="display-header d-flex justify-content-between pb-3">
                        <h2 className="display-7 text-dark text-uppercase">CONSOLAS</h2>
                        <div className="btn-right">
                            <a href="shop.html" className="btn btn-medium btn-normal text-uppercase">Go to Shop</a>
                        </div>
                    </div>
                    <div className="swiper product-watch-swiper">
                        {generarSeccionDestacada(jsonConsolasDestacadas)}
                    </div>
                </div>
            </div>
            <div className="swiper-pagination position-absolute text-center"></div>
        </section>
    );
}

export default ConsolasDestacadas;