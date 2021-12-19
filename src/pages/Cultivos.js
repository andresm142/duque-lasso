import "./components/EstilosPaginas.css";
import ListaCultivos from "./components/ListaCultivos";
import { Spinner } from "react-bootstrap";
import { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import Paginacion from "./components/Pagination";
import BASE_URL from "../services/.config";

const url = BASE_URL;


function Cultivos() {
    const rolUser = JSON.parse(localStorage.getItem("datosUser")).rol;


    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [showLoading, setShowLoading] = useState(true);
    const [cultivos, setCultivos] = useState([]);

    const limit = 10;

    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        setShowLoading(true);
        axios.get(url + "cultivos/all?page=" + page + "&limit=" + limit, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
            .then(res => {

                setCultivos(res.data.cultivos);
                setTotalElements(res.data.totalElements);
                setShowLoading(false);
            })
            .catch(err => {
                if (err.response) {

                    alert(err.response.data.message);
                } else {
                    alert("Error, contacte con el administrador");
                }
                console.log(err);
            });
    }, [page, token.token]);

    sessionStorage.setItem("paginaActiva", JSON.stringify({
        home: "nav_link text-white",
        cultivos: "nav_link active text-white",
        predios: "nav_link text-white",
        users: "nav_link text-white",
        gestion: "nav_link text-white",
        profile: "nav_link nav-link dropdown-toggle ml-1 d-flex text-white",
        coniguracion: "nav_link text-white",
        accessDenied: "nav_link text-white",
        pageNotFound: "nav_link text-white"
    }))

    const listaCultivos = cultivos.map((cultivo) => {

        return (

            <ListaCultivos
                key={cultivo._id}
                cultivo={cultivo}

                {...cultivo}
            />
        );
    });

    const handlePageClick = (e) => {
        setPage(e);
    }

    return (
        <Fragment>
            <div >
                <div className="container container_header">
                    <div className="row">
                        <div className="col-md-10 titulo">
                            Cultivos
                        </div>
                        <div className="col-md-2 btn_anadir">
                            {rolUser !== "userGestion" ?
                                <button className="btn btn-primary" onClick={() => {
                                    window.location.href = "/cultivos/agregar";
                                }}>
                                    Añadir
                                </button>
                                : null}
                        </div>
                    </div>
                </div>
                {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> :
                    listaCultivos?.length > 0 ? listaCultivos : <div className="col-sm-12 text-center">No hay cultivos registrados</div>}


                <div className="d-flex justify-content-center mt-2">
                    <Paginacion itemsPerPage={limit} totalItems={totalElements} onChange={handlePageClick} />
                </div>
            </div>

        </Fragment>

    );
}
export default Cultivos;