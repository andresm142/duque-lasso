
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
            <div className="col-12 d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-8">
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active justify-content-center">
                            <img src="https://concepto.de/wp-content/uploads/2021/10/sector-agricola-actividades-siembra-e1635724551376.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item justify-content-center">
                            <img src="https://www.eltiempo.com/files/article_main/uploads/2019/07/11/5d27b935c0608.jpeg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://www.eltiempo.com/files/article_main/uploads/2019/03/22/5c94f69725d56.jpeg" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                </div>
            </div>

            <div className="container mt-4">
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