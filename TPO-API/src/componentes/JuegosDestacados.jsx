import 'bootstrap/dist/css/bootstrap.css'
import '../css/vendor.css'
const jsonJuegosDestacados = {
    "productos": [
      {
        "nombre": "Iphone 10",
        "imagen": "/src/images/product-item1.jpg",
        "precio": "$980"
      },
      {
        "nombre": "Iphone 11",
        "imagen": "/src/images/product-item2.jpg",
        "precio": "$1100"
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

function JuegosDestacados() {
    return (
        <section id="mobile-products" className="product-store position-relative padding-large no-padding-top">
            <div className="container">
                <div className="row">
                    <div className="display-header d-flex justify-content-between pb-3">
                        <h2 className="display-7 text-dark text-uppercase">Mobile Products</h2>
                        <div className="btn-right">
                            <a href="shop.html" className="btn btn-medium btn-normal text-uppercase">Go to Shop</a>
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