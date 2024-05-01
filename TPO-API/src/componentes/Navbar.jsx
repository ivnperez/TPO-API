import imgLogo from '../images/main-logo.png'
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faUser,faCartShopping,faBars} from '@fortawesome/free-solid-svg-icons'
import '../css/vendor.css'
import '../css/style.css'
import '../css/Navbar.css'


function Navbar(){
    return(
    <>
        <header id="header" className="site-header header-scrolled position-relative text-black bg-light">
            <nav id="header-nav" className="navbar navbar-expand-lg px-3 mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="index.html">
                        <img src={imgLogo} className="logo"/>
                    </a>
                    <button className="navbar-toggler d-flex d-lg-none order-3 p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faBars} className="navbar-icon"/>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="bdNavbar" aria-labelledby="bdNavbarOffcanvasLabel">
                        <div className="offcanvas-header px-4 pb-0">
                            <a className="navbar-brand" href="index.html">
                                <img src={imgLogo} className="logo"/>
                            </a>
                            <button type="button" className="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdNavbar"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul id="navbar" className="navbar-nav text-uppercase justify-content-end align-items-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link me-4 active" href="#billboard">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link me-4" href="#company-services">Servicios</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link me-4" href="#mobile-products">Juegos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link me-4" href="#smart-watches">Consolas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link me-4" href="#yearly-sale">Ofertas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link me-4" href="#latest-blog">Contacto</a>
                                </li>
                                <li className="nav-item">
                                <div className="user-items ps-5">
                                    <ul className="d-flex justify-content-end list-unstyled">
                                        <li className="search-item pe-3">
                                            <a href="#" className="search-button">
                                            <FontAwesomeIcon icon={faSearch} className="search" />
                                            </a>
                                        </li>
                                        <li className="pe-3">
                                                <a href="#">
                                                    <FontAwesomeIcon icon={faUser} className='user'/>
                                                </a>
                                            </li>
                                        <li>
                                                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#carritoModal">
                                                        <FontAwesomeIcon icon={faCartShopping} className='cart' />
                                                </button>
                                        </li>
                                    </ul>
                                </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </>
    )
}
export default Navbar
