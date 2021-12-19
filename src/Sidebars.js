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
import Gestion from "./pages/Gestion";
import AutocompleteSearch from "./pages/components/AutocompleteSearch";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState,useEffect } from "react";

const rolUser = "";

function Sidebars(props) {
    const rolUser = JSON.parse(localStorage.getItem("datosUser")).rol;
  
    const [paginaActiva,setPaginaActiva] = useState("");
    useEffect(() => {
        setPaginaActiva(JSON.parse(sessionStorage.getItem("paginaActiva")));
    }, []);
   
    const onCerrarSesion = () => {
        props.cerrarSesion(true);
        // localStorage.setItem("isLogged", "false");
        sessionStorage.setItem("isLogged", "false");
    }
    
    return (

        <section id="body-pd" className="body-pd">  {/* className="body-pd" */}
            <div>
                <header className="header body-pd" id="header"> {/* body-pd */}

                    <div className="col-3">
                        <div className="header_toggle">
                            <i id="header-toggle" className="fas fa-bars text-white bx-x"></i> {/*bx-x */}
                        </div>
                    </div>
                    <div className="col-3 ">

                        <div className="header_img">
                            <img src={Logo} alt="" />
                        </div>

                    </div>

                    <div className="col-6 d-flex align-items-center">
                        <div className="col-1"></div>
                        <div className="col-6">
                            <AutocompleteSearch />
                        </div>
                        <div className="col-5">

                            <form action="" className="buscar">

                                {/* <input className="search" type="text" placeholder="Buscar..." /> */}
                                <select className="form-select select " id="select">
                                    <option value="cultivos">Cultivos</option>
                                    <option value="predios">Predios</option>
                                </select>
                                <button type="submit" style={{backgroundColor:"transparent",border:"none", padding:"5px"}} ><i className="fas fa-search" ></i></button>

                            </form>

                        </div>
                    </div>
                </header>
                <div className="l-navbar flex-column flex-shrink-0 vh-100 show" id="nav-bar"> {/*show */}

                    <div>
                        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                            <li className="nav-item">
                                <a href="/home" className={paginaActiva.home} aria-current="page">
                                    <i className="fa fa-home"></i>
                                    <span className="nav_name">Home</span>
                                </a>

                            </li>
                            <li className="nav-item">
                                <a href="/cultivos" className={paginaActiva.cultivos}>
                                    <i className="fa fa-seedling"></i>
                                    <span className="nav_name">Cultivos</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/predios" className={paginaActiva.predios}>
                                    <i className="fa fa-map-marked"></i>
                                    <span className="nav_name">Predios</span>
                                </a>
                            </li>
                            
                            {rolUser === "Admin" || rolUser==="userGestion" ?
                            <li className="nav-item">
                                <a href="/gestion" className={paginaActiva.gestion}>
                                    <i className="fa fa-cogs"></i>
                                    <span className="nav_name">Gestión</span>
                                </a>
                            </li>
                            :null}

                            {rolUser === "Admin" ?
                            <li className="nav-item">
                                <a href="/users" className={paginaActiva.users}>
                                    <i className="fa fa-users"></i>
                                    <span className="nav_name">Usuarios</span>
                                </a>
                            </li>
                            : null}

                            {rolUser !== "userGestion" ?
                            <li className="nav-item">
                                <a href="/configuracion" className={paginaActiva.coniguracion}>
                                    <i className="fa fa-cog"></i>
                                    <span className="nav_name">Configuración</span>
                                </a>
                            </li>
                            : null}

                        </ul>


                    </div>
                    {/* menu de usuario */}

                    <hr className="border-top" />

                    <a href="none" className={paginaActiva.profile} role="button" id="navbarDropdown"
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


            {/* Container Main Routes */}

            <div className="container-fluid height-100">
                <div style={{ height: "10px" }} ></div>
                <Router>
                    <Routes>

                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/cultivos" element={<Cultivos />} />
                        <Route path="/cultivos/detalles" element={<CultivosDetalles />} />
                        <Route path="/cultivos/agregar" element={<EditarCultivos />} />
                        <Route path="/cultivos/edit/*" element={<EditarCultivos />} />
                        <Route path="/predios" element={<Predios />} />
                        <Route path="/predios/detalles" element={<PrediosDetalles />} />
                        <Route path="/predios/agregar" element={<EditarPredios />} />
                        <Route path="/predios/edit/*" element={<EditarPredios />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/gestion" element={<Gestion />} />
                        <Route path="/configuracion" element={<Configuracion />} />
                        <Route path="/none" element={<AccessDenied />} />
                        <Route path="/accessDenied" element={<AccessDenied />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </div>
            {/* Container Main end */}

        </section >

    );
}
export default Sidebars;