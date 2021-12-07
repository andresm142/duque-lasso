import { useState } from 'react';
import { Modal } from "react-bootstrap";

function ModalCambiarPass(props) {
    const [paramModal, setParamModal] = useState({
        titulo: "Modal de prueba",
        mostrar: false,
        modo: "nuevo",
        onGuardar: null,
        onCancelar: null,
        proyecto: null

    });

    // Funcion para motrar modal con parametros desde props
    if (props.show === "mostrar") {
        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = true;
        setParamModal(paramNuevos);
    };


    const onCancelarModal = () => {
        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = false;
        setParamModal(paramNuevos);
    }
    const onGuardarModal = () => {
        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = false;
        setParamModal(paramNuevos);
    }

    return (
        <Modal show={paramModal.mostrar} onHide={onCancelarModal}>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>{paramModal.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>Modal</h1>
            </Modal.Body>

        </Modal>
    );
}
export default ModalCambiarPass;
