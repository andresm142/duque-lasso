import ListaPredios from "./components/ListaPredios";
import "./components/EstilosPaginas.css";
import { Modal } from "react-bootstrap";
import { Fragment, useState } from 'react';
import Paginator from "./components/Paginator";

function Predios() {
    const [paramModal, setParamModal] = useState({
        titulo: "Detalles de los predios",
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
    return (
        <Fragment>
            <div className="container container_header">
                <div className="row">
                    <div className="col-md-10 titulo">
                        Predios
                    </div>
                    <div className="col-md-2 btn_anadir">
                        <button className="btn btn-primary" onClick={() =>{
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
            <ListaPredios onMostrarModal={onMostrarModal} />
            <ListaPredios onMostrarModal={onMostrarModal} />
            <ListaPredios onMostrarModal={onMostrarModal} />
            <ListaPredios onMostrarModal={onMostrarModal} />
            <div className="d-flex justify-content-center">
                <Paginator />
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
export default Predios;