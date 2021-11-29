import { Link } from "react-router-dom";
import Logo from "./logo.jpeg";
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
       <div className="sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/home" className={clase.home}>
                        <img src={Logo} alt="Logo" className="logo" />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/home" className={clase.home}>
                        <i className="fas fa-home fa-lg mr-2"></i>
                        <span className="d-none d-md-inline">Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/cultivos" className={clase.cultivos}>
                        <i className="fas fa-seedling fa-lg mr-2"></i>
                        <span className="d-none d-md-inline">Cultivos</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/predios" className={clase.predios}>
                        <i className="fas fa-map-marked-alt fa-lg mr-2"></i>
                        <span className="d-none d-md-inline">Predios</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className={clase.users}>
                        <i className="fas fa-users fa-lg mr-2"></i>
                        <span className="d-none d-md-inline">Usuarios</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className={clase.profile}>
                        <i className="fas fa-user fa-lg mr-2"></i>
                        <span className="d-none d-md-inline">Profile</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className={clase.login}>
                        <i className="fas fa-sign-in-alt fa-lg mr-2"></i>
                        <span className="d-none d-md-inline">Login</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/accessDenied" className={clase.accessDenied}>
                        <i className="fas fa-exclamation-triangle fa-lg mr-2"></i>
                        <span className="d-none d-md-inline">Access Denied</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/pageNotFound" className={clase.pageNotFound}>
                        <i className="fas fa-exclamation-triangle fa-lg mr-2"></i>
                        <span className="d-none d-md-inline">Page Not Found</span>
                    </Link>
                </li>
            </ul>
        </div>
        

    );
}
export default Sidebars;