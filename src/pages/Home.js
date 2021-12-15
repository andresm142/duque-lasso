
import { Fragment, useState, useEffect } from "react";
import BASE_URL from "../services/.config";

function Home() {

    sessionStorage.setItem("paginaActiva", JSON.stringify({
        home: "nav_link active text-white",
        cultivos: "nav_link text-white",
        predios: "nav_link text-white",
        users: "nav_link text-white",
        profile: "nav_link nav-link dropdown-toggle ml-1 d-flex text-white",
        coniguracion: "nav_link text-white",
        accessDenied: "nav_link text-white",
        pageNotFound: "nav_link text-white"
    }))



    return (
        <Fragment>
           
            <div >

                <h1>Home</h1>

            </div>
        </Fragment>
    );
}
export default Home;