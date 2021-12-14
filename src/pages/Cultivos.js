import "./components/EstilosPaginas.css";
import ListaCultivos from "./components/ListaCultivos";
import { Modal, Spinner } from "react-bootstrap";
import { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import Paginacion from "./components/Pagination";
import EditarCultivos from "./components/EditarCultivos";

const url = "http://localhost:9000/";
// const url = process.env.REACT_APP_URL_API;

function Cultivos() {


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
                console.log(res);
                setCultivos(res.data.cultivos);
                setTotalElements(res.data.totalElements);
                setShowLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [page, token.token]);


    const [paramModal, setParamModal] = useState({
        titulo: "Detalles del Cultivo",
        mostrar: false,
        modo: "nuevo",
        onGuardar: null,
        onCancelar: null,
        proyecto: null

    });

    const onMostrarModal = () => {
        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = true;
        setParamModal(paramNuevos);
    }

    const onCancelarModal = () => {
        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = false;
        setParamModal(paramNuevos);
    }
    const onEditarCultivo = (cultivo) => {
        EditarCultivos(cultivo);
    }
    const listaCultivos = cultivos.map((cultivo) => {
        return (
            <ListaCultivos
                key={cultivo._id}
                cultivo={cultivo}
                onMostrarModal={onMostrarModal}
                onEditarCultivo={onEditarCultivo}
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
                            <button className="btn btn-primary" onClick={() => {
                                window.location.href = "/cultivos/agregar";
                            }}>
                                Añadir
                            </button>
                            {/* <button className="btn btn-primary" onClick={() => {
                            this.props.history.push('/cultivos/agregar');
                        }}>Añadir</button> */}

                        </div>
                    </div>
                </div>
                {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> : 
                listaCultivos?.length > 0 ? listaCultivos: <div className="col-sm-12 text-center">No hay cultivos registrados</div>}


                <div className="d-flex justify-content-center mt-2">
                    <Paginacion itemsPerPage={limit} totalItems={totalElements} onChange={handlePageClick} />
                </div>
            </div>
            <Modal show={paramModal.mostrar} onHide={onCancelarModal}>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>{paramModal.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>

            </Modal>
        </Fragment>

    );
}
export default Cultivos;