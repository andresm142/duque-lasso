import Logo from "./pages/logo2.png";
import LogoUser from "./pages/user.png";
import Cultivos from './pages/Cultivos';
import Predios from './pages/Predios';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Home from './pages/Home';
import Configuracion from "./pages/Configuracion";
import AccessDenied from './pages/AccessDenied';
import PageNotFound from './pages/PageNotFound';
import "./pages/components/styleSearch.css";
import CultivosDetalles from './pages/components/CultivosDetalles';
// import CultivosAgregar from './pages/components/CultivosAgregar';
import PrediosDetalles from './pages/components/PrediosDetalles';
// import PrediosAgregar from './pages/components/PrediosAgregar';
import EditarPredios from "./pages/components/EditarPredios";
import EditarCultivos from "./pages/components/EditarCultivos";
import AutocompleteSearch from "./pages/components/AutocompleteSearch";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import { style } from "@mui/system";


function Sidebars(props) {
    const [clase, setClase] = useState({
        home: "nav_link text-white",
        cultivos: "nav_link text-white",
        predios: "nav_link text-white",
        users: "nav_link text-white",
        profile: "",
        login: "",
        accessDenied: "",
        pageNotFound: ""
    });
    const [active, setActive] = useState(false);

    const onCerrarSesion = () => {
        props.cerrarSesion(true);
        // localStorage.setItem("isLogged", "false");
        sessionStorage.setItem("isLogged", "false");
    }

    return (

        <section id="body-pd">
            <div>
                <header className="header" id="header">


                    <div className="col-3">
                        <div className="header_toggle">
                            <i id="header-toggle" className="fas fa-bars text-white"></i>
                        </div>
                    </div>
                    <div className="col-3 ">

                        <div className="header_img">
                            <img src={Logo} alt="" />
                        </div>

                    </div>

                    <div className="col-6 d-flex align-items-center">
                        <div className="col-4"></div>
                        <div className="col-6">
                            <AutocompleteSearch />
                        </div>
                        <div className="col-2">

                            <form action="" className="buscar">

                                {/* <input className="search" type="text" placeholder="Buscar..." /> */}
                                <select className="select " id="select">
                                    <option value="cultivos">Cultivos</option>
                                    <option value="predios">Predios</option>
                                </select>
                                <button type="submit" style={{backgroundColor:"transparent",border:"none", padding:"5px"}} ><i className="fas fa-search" ></i></button>

                            </form>

                        </div>
                    </div>
                </header>
                <div className="l-navbar flex-column flex-shrink-0 vh-100" id="nav-bar">

                    <div>
                        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                            <li className="nav-item">
                                <a href="/home" className="nav_link active text-white" aria-current="page">
                                    <i className="fa fa-home"></i>
                                    <span className="nav_name">Home</span>
                                </a>

                            </li>
                            <li className="nav-item">
                                <a href="/cultivos" className="nav_link text-white">
                                    <i className="fa fa-seedling"></i>
                                    <span className="nav_name">Cultivos</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/predios" className="nav_link text-white">
                                    <i className="fa fa-map-marked"></i>
                                    <span className="nav_name">Predios</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/users" className="nav_link text-white">
                                    <i className="fa fa-users"></i>
                                    <span className="nav_name">Usuarios</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/configuracion" className="nav_link text-white">
                                    <i className="fa fa-cog"></i>
                                    <span className="nav_name">Configuración</span>
                                </a>
                            </li>

                        </ul>


                    </div>
                    {/* menu de usuario */}

                    <hr className="border-top" />

                    <a href="none" className="nav_link nav-link dropdown-toggle ml-1 d-flex text-white" role="button" id="navbarDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={LogoUser} alt="mdo" width="24" height="24" style={{ marginRight: "10px" }}
                            className="rounded-circle"></img>
                        <span className="nav_name"> Usuario</span>
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                        <li>
                            <a className="dropdown-item" href="/profile">
                                Perfil
                            </a>
                        </li>

                        <li>
                            <div className="dropdown-item logout" onClick={onCerrarSesion}>

                                Cerrar Sesión

                            </div>

                        </li>

                    </ul>

                </div>

            </div>
            {/* Container Main start */}

            <div className="container-fluid height-100">
                <div style={{ height: "10px" }} ></div>
                <Router>
                    <Routes>

                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/cultivos" element={<Cultivos />} />
                        <Route path="/cultivos/detalles" element={<CultivosDetalles />} />
                        <Route path="/cultivos/agregar" element={<EditarCultivos />} />
                        <Route path="/cultivos/editar" element={<EditarCultivos />} />
                        <Route path="/predios" element={<Predios />} />
                        <Route path="/predios/detalles" element={<PrediosDetalles />} />
                        <Route path="/predios/agregar" element={<EditarPredios />} />
                        <Route path="/predios/editar" element={<EditarPredios />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/configuracion" element={<Configuracion />} />
                        <Route path="/none" element={<AccessDenied />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </div>
            {/* Container Main end */}

        </section >

    );
}
export default Sidebars;