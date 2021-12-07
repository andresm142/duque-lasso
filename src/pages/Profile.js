import { Modal } from "react-bootstrap";
import Userlogo from './user.png';
import './components/perfil.css';
import { Fragment, useState } from 'react';

function Profile() {
    const [paramModal, setParamModal] = useState({
        titulo: "Cambiar contraseña",
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
        <Fragment >

            <div className="container-fluid container_perfil">
                <div className="perfil-container">
                    <div className="titulo-imagen">
                        <p>CONIGURACION DEL PERFIL</p>
                        <img src={Userlogo} alt="" style={{ width: "150px" }} />
                    </div>
                    <div className="perfil-container-form">
                        <form action="">
                            <div className="form-group1">
                                <div className="form-group2">
                                    <label htmlFor="nombre_usuario">Nombre</label>
                                    <input type="text" className="form-control" id="nombre_usuario"
                                        placeholder="Nombre" />
                                </div>
                                <div className="form-group2">
                                    <label htmlFor="apellido_usuario">Apellido</label>
                                    <input type="text" className="form-control" id="apellido_usuario"
                                        placeholder="Apellido" />
                                </div>
                            </div>
                            <div className="form-group1">
                                <div className="form-group2">
                                    <label htmlFor="correo_usuario">Correo</label>
                                    <input type="email" className="form-control" id="correo_usuario"
                                        placeholder="Correo" />
                                </div>
                                <div className="form-group2">
                                    <label htmlFor="telefono_usuario">Telefono</label>
                                    <input type="number" className="form-control" id="telefono_usuario"
                                        placeholder="Telefono" />
                                </div>

                            </div>
                            <div className="form-group1">

                                <button type="button" className="btn btn-success" onClick={onMostrarModal}>Cambiar Contraseña</button>

                            </div>
                            <div className="form-group-botones">
                                <input type="submit" className="btn btn-primary" value="Guardar" />
                                <button type="submit" className="btn btn-danger">Cancelar</button>


                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal show={paramModal.mostrar} onHide={onCancelarModal}>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>{paramModal.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="txtPassActual">Contraseña actual</label>
                                        <input type="text" className="form-control" id="txtPassActual" placeholder="Contraseña actual" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="txtPassNuevo">Contraseña nueva</label>
                                        <input type="text" className="form-control" id="txtPassNuevo" placeholder="Contraseña nueva" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="txtPassNuevoConfirm">Confirmar contraseña</label>
                                        <input type="text" className="form-control" id="txtPassNuevoConfirm" placeholder="Confirmar contraseña" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group-botones">
                                        <input type="submit" className="btn btn-primary" value="Guardar" />
                                        <button type="submit" className="btn btn-danger" onClick={onCancelarModal}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>

        </Fragment>

    );
}
export default Profile;