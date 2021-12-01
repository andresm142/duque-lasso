import { Link } from "react-router-dom";
import Logo from "./logo.png";
import LogoUser from "./user.png";
import { useState } from "react";

function Sidebars(props) {
    const [clase, setClase] = useState({
        home: "nav-link py-3 border-bottom",
        cultivos: "nav-link py-3 border-bottom",
        predios: "nav-link py-3 border-bottom",
        users: "nav-link py-3 border-bottom",
        profile: "",
        login: "",
        accessDenied: "",
        pageNotFound: ""
    });
    const [active, setActive] = useState(false);

    // Al cargar la pagina se toma la ruta actual y se le asigna una clase

    if (active === false) {
        if (props.clase === "home") {
            setClase({
                home: "nav-link py-3 border-bottom active",
                cultivos: "nav-link py-3 border-bottom",
                predios: "nav-link py-3 border-bottom",
                users: "nav-link py-3 border-bottom",
                profile: "",
                login: "",
                accessDenied: "",
                pageNotFound: ""
            });
            setActive(true);
        } else if (props.clase === "cultivos") {
            setClase({
                home: "nav-link py-3 border-bottom",
                cultivos: "nav-link py-3 border-bottom active",
                predios: "nav-link py-3 border-bottom",
                users: "nav-link py-3 border-bottom",
                profile: "",
                login: "",
                accessDenied: "",
                pageNotFound: ""
            });
            setActive(true);
        } else if (props.clase === "predios") {
            setClase({
                home: "nav-link py-3 border-bottom",
                cultivos: "nav-link py-3 border-bottom",
                predios: "nav-link py-3 border-bottom active",
                users: "nav-link py-3 border-bottom",
                profile: "",
                login: "",
                accessDenied: "",
                pageNotFound: ""
            });
            setActive(true);
        } else if (props.clase === "users") {
            setClase({
                home: "nav-link py-3 border-bottom",
                cultivos: "nav-link py-3 border-bottom",
                predios: "nav-link py-3 border-bottom",
                users: "nav-link py-3 border-bottom active",
                profile: "",
                login: "",
                accessDenied: "",
                pageNotFound: ""
            });
            setActive(true);
      
        }
  

    }
    console.log(props.clase);



    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100" style={{ width: props.sizeBar.width+"px" }}>
            {/* <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <img src={Logo} className="" alt="Logo" width="100%" />
            </a> */}
            <hr></hr>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li className="nav-item">
                    <Link to="/home" className={clase.home}>
                        <i className="fas fa-home fa-lg mr-2"></i>
                        {props.sizeBar.width === 280 ? <span className="d-none d-md-inline">Home</span> : ""}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/cultivos" className={clase.cultivos}>
                        <i className="fa fa-seedling fa-lg mr-2"></i>
                        {props.sizeBar.width === 280 ? <span className="d-none d-md-inline">Cultivos</span> : ""}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/predios" className={clase.predios}>
                        <i className="fas fa-map-marked fa-lg mr-2"></i>
                        {props.sizeBar.width === 280 ? <span className="d-none d-md-inline">Predios</span> : ""}
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/users" className={clase.users}>
                        <i className="fas fa-users fa-lg mr-2"></i>
                        {props.sizeBar.width === 280 ? <span className="d-none d-md-inline">Users</span> : ""}
                    </Link>
                </li>

                <li> 
                    <a href="none" className="nav-link py-3 border-bottom"> 
                        <i className="fa fa-cog"></i> 
                            {props.sizeBar.width === 280 ? <small>Precios</small> : ""}
                    </a> 
                </li>
                <li> 
                    <a href="none" className="nav-link py-3 border-bottom"> 
                        <i className="fa fa-bookmark"></i> 
                            {props.sizeBar.width === 280 ? <small>Coniguracion</small> : ""}
                    </a> 
                </li>
            </ul>

            <div className="dropdown border-top"> <a href="none" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={LogoUser} alt="mdo" width="24" height="24" style={{ marginRight: "10px" }} className="rounded-circle"></img> Usuario</a>

                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">


                    <li className="nav-item">
                        <Link to="/profile" className="nav-link py-3 border-bottom dropdown-item">
                            <i className="fas fa-user fa-lg mr-2"></i>
                            <span className="d-none d-md-inline">Profile</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/login" className="nav-link py-3 border-bottom dropdown-item">
                            <i className="fas fa-sign-out-alt fa-lg mr-2"></i>
                            <span className="d-none d-md-inline">Logout</span>

                        </Link>

                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebars;