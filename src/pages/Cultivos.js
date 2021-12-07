import "./components/EstilosPaginas.css";
import Paginator from "./components/Paginator";
import ListaCultivos from "./components/ListaCultivos";
import { Modal } from "react-bootstrap";
import { Fragment, useState } from 'react';

function Cultivos() {
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
    
    return (
        <Fragment>
            <div >
                <div className="container container_header">
                    <div className="row">
                        <div className="col-md-10 titulo">
                            Cultivos
                        </div>
                        <div className="col-md-2 btn_anadir">
                            <button className="btn btn-primary" onClick={onMostrarModal}>
                                Añadir
                            </button>
                            {/* <button className="btn btn-primary" onClick={() => {
                            this.props.history.push('/cultivos/nuevo')
                        }}>Añadir</button> */}

                        </div>
                    </div>
                </div>
                <ListaCultivos onMostrarModal={onMostrarModal} />
                <ListaCultivos onMostrarModal={onMostrarModal} />
                <ListaCultivos onMostrarModal={onMostrarModal} />
                <ListaCultivos onMostrarModal={onMostrarModal} />
                <ListaCultivos onMostrarModal={onMostrarModal} />
                <ListaCultivos onMostrarModal={onMostrarModal} />
                <div className="d-flex justify-content-center">
                    <Paginator />
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