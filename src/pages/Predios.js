import ListaPredios from "./components/ListaPredios";
import "./components/EstilosPaginas.css";
import { Spinner } from "react-bootstrap";
import { Fragment, useState, useEffect } from 'react';
import Paginacion from "./components/Pagination";
import EditarPredios from "./components/EditarPredios";
import axios from "axios";
import BASE_URL from "../services/.config";

function Predios() {

    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [showLoading, setShowLoading] = useState(true);
    const [predios, setPredios] = useState([]);
    const limit = 10;
    
    sessionStorage.setItem("paginaActiva", JSON.stringify({
        home: "nav_link text-white",
        cultivos: "nav_link text-white",
        predios: "nav_link active text-white",
        users: "nav_link text-white",
        gestion: "nav_link text-white",
        profile: "nav_link nav-link dropdown-toggle ml-1 d-flex text-white",
        coniguracion: "nav_link text-white",
        accessDenied: "nav_link text-white",
        pageNotFound: "nav_link text-white"
    }))

    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        setShowLoading(true);
        axios.get(BASE_URL + "predios/all?page=" + page + "&limit=" + limit, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
            .then(res => {
                setTotalElements(res.data.totalElements);
                setPredios(res.data.predios);
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

    const onEditarPredio = (predio) => {
        EditarPredios(predio);
    }
    const listaPredios = predios.map((predio) => {
        return (
            <ListaPredios
            key={predio._id}
            predio={predio}
            onEditarCultivo={onEditarPredio}
            {...predio}
        />
        )
    });

    const handlePageClick = (e) => {
        setPage(e);
      }

    return (
        <Fragment>
            <div className="container container_header">
                <div className="row">
                    <div className="col-md-10 titulo">
                        Predios
                    </div>
                    <div className="col-md-2 btn_anadir">
                        <button className="btn btn-primary" onClick={() => {
                            window.location.href = "/predios/agregar";
                        }}>
                            Añadir
                        </button>
                        {/* <button className="btn btn-primary" onClick={() => {
                            this.props.history.push('/predios/nuevo')
                        }}>Añadir</button> */}

                    </div>
                </div>
            </div>
            {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> :
                    listaPredios?.length > 0 ? listaPredios : <div className="col-sm-12 text-center">No hay predios registrados</div>}
            
            <div className="d-flex justify-content-center mt-2 ">
                <Paginacion itemsPerPage={limit} totalItems={totalElements} onChange={handlePageClick} />
            </div>

            
        </Fragment>
    );
}
export default Predios;