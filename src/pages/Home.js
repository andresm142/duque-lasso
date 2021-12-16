
import { Fragment, useState, useEffect } from "react";
import BASE_URL from "../services/.config";

function Home() {

    sessionStorage.setItem("paginaActiva", JSON.stringify({
        home: "nav_link active text-white",
        cultivos: "nav_link text-white",
        predios: "nav_link text-white",
        users: "nav_link text-white",
        gestion: "nav_link text-white",
        profile: "nav_link nav-link dropdown-toggle ml-1 d-flex text-white",
        coniguracion: "nav_link text-white",
        accessDenied: "nav_link text-white",
        pageNotFound: "nav_link text-white"
    }))



    return (
        <Fragment>
           
            <div >
                <h1>Bienvenido a Servicios Agricolas Duque Lasso SAS </h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Servicios</h5>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec eget ex maximus, porta nunc eu,
                                    maximus nunc.
                                </p>
                                <a href="#" className="btn btn-primary">Ver</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </Fragment>
    );
}
export default Home;