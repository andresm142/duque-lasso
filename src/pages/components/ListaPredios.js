import Logo from "../logo.png";
import { Fragment, useState } from 'react';
import { Modal } from "react-bootstrap";
function ListaPredios(props) {
    const [paramModalAsignar, setParamModalAsignar] = useState({
        titulo: "Asignación de predios",
        mostrar: false,
        modo: "nuevo",
        onGuardar: null,
        onCancelar: null,
        proyecto: null

    });

    const onMostrarModalAsignar = () => {
        const paramNuevos = { ...paramModalAsignar };
        paramNuevos.mostrar = true;
        setParamModalAsignar(paramNuevos);
    }

    const onCancelarModalAsignar = () => {
        const paramNuevos = { ...paramModalAsignar };
        paramNuevos.mostrar = false;
        setParamModalAsignar(paramNuevos);
    }

    const onDetalles =()=>{
        window.location.href = "/predios/detalles?id=1";
    }
    const onEditar =()=>{
        window.location.href = "/predios/editar?id=1";
    }

    return (
        <Fragment>
        <div className="container lista_cultivos">
            <div className="row">
                <div className="col-md-3 logo">
                    <div className="header_img">
                        <img src={Logo} alt="logo" />
                    </div>
                </div>

                <div className="col-md-7 nombre_descripcion">
                    <div className="nombre">
                        Nombre del predio
                    </div>
                    <div className="descripcion">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>

                </div>

                <div className="col-md-2 btn_acciones">
                    <button className="btn btn-primary" onClick={onEditar}>Editar</button>
                    <button className="btn btn-danger" >Eliminar</button>
                    <button className="btn btn-primary" onClick={onDetalles}>Ver más</button>

                </div>
            </div>

            <div className="row">

                <div className="col-md-10">
                    <hr />
                    <div className="cont_asignado">
                        <div className="nombre">
                            CULTIVO ASIGNADO
                        </div>
                        <div className="m-2 asignado">
                            Lorem ipsum dolor sit amet
                        </div>
                    </div>
                </div>
                <div className="col-md-2 btn_asignar">
                    <button className="btn btn-primary b_asignar" onClick={onMostrarModalAsignar}>Asignar</button>
                </div>
            </div>
        </div>
        {/* Modal para la asignacián de predios */}
        <Modal show={paramModalAsignar.mostrar} onHide={onCancelarModalAsignar}>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>{paramModalAsignar.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>

            </Modal>
        </Fragment>
    );
}
export default ListaPredios;