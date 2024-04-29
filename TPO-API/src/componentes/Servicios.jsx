import 'bootstrap/dist/css/bootstrap.css';
import '../css/vendor.css';
import '../css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faTag,faTruck,faUserShield} from '@fortawesome/free-solid-svg-icons'


function Servicios(){
    return(
        <>
        <section id="company-services" className="padding-large">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 pb-3">
                        <div className="icon-box d-flex">
                            <div className="icon-box-icon pe-3 pb-3">
                                    <FontAwesomeIcon icon={faTruck} className='car-outline' />
                            </div>
                            <div className="icon-box-content">
                                <h3 className="card-title text-uppercase text-dark">Entrega gratuita</h3>
                                <p>Entregamos tus productos de forma gratuita en la puerta de tu hogar para tu comodidad.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 pb-3">
                        <div className="icon-box d-flex">
                            <div className="icon-box-icon pe-3 pb-3">
                                <FontAwesomeIcon icon={faStar} className='quality' />
                            </div>
                            <div className="icon-box-content">
                                <h3 className="card-title text-uppercase text-dark">Garantía de calidad</h3>
                                <p>Nos comprometemos a ofrecerte productos de la más alta calidad para tu satisfacción total.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 pb-3">
                        <div className="icon-box d-flex">
                            <div className="icon-box-icon pe-3 pb-3">
                                <FontAwesomeIcon icon={faTag} className='price-tag' />
                            </div>
                            <div className="icon-box-content">
                                <h3 className="card-title text-uppercase text-dark">Ofertas diarias</h3>
                                <p>Aprovecha nuestras increíbles ofertas que actualizamos diariamente para que ahorres en tus compras.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 pb-3">
                        <div className="icon-box d-flex">
                            <div className="icon-box-icon pe-3 pb-3">
                                <FontAwesomeIcon icon={faUserShield} className='shield-plus' />
                            </div>
                            <div className="icon-box-content">
                                <h3 className="card-title text-uppercase text-dark">Pago 100% seguro</h3>
                                <p>Realiza tus pagos con total tranquilidad gracias a nuestro sistema de pago completamente seguro y protegido.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default Servicios
