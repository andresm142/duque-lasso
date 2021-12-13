import { Modal } from "react-bootstrap";
import Userlogo from './user.png';
import './components/perfil.css';
import { Fragment, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [paramModal, setParamModal] = useState({
        titulo: "Cambiar contraseña",
        mostrar: false,
        modo: "nuevo",
        onGuardar: null,
        onCancelar: null,
        proyecto: null

    });

    const [pass, setPass] = useState({
        passActual: "",
        passNuevo: "",
        passConfirmar: ""

    });

    const [datosPerfil, setDatosPeril] = useState(JSON.parse(localStorage.getItem('datosUser')));

    const onMostrarModal = () => {
        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = true;
        setParamModal(paramNuevos);
    };

    const onCancelarModal = () => {
        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = false;
        setParamModal(paramNuevos);
    };
    const onCancelar = () => {
        window.location.href = "/";
    };

    const onInputChange = function (evt) {
        const p = { ...pass };
        p[evt.target.name] = evt.target.value;
        setPass(p);

    }

    const submitCambiarPass = async function (evt) {
        evt.preventDefault();
        const datos = { ...datosPerfil };
        const token = JSON.parse(localStorage.getItem('token'));
        const body= {
            username: datos.email,
            password: pass.passActual,
            newPassword: pass.passNuevo,
            
        };
        if (pass.passNuevo === pass.passConfirmar) {
            const url = 'http://localhost:9000/users/cambiarPass';
            
            await axios.post(url, body,{
                headers: {
                  Authorization: 'Bearer ' + token.token
                }})
                .then(response => {
                    
                    if (response.status === 200) {
                            alert("Contraseña cambiada con exito");
                            onCancelarModal();
                        } else {
                            alert("Error al cambiar contraseña");
                        }
                    return response.data;

                })
                .catch(error => {
                    if (error.response) {
                        
                        alert(error.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }

                    
                });

        } else {
            alert("Las contraseñas no coinciden");
        }
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
                        <form>
                            <div className="form-group1">
                                <div className="form-group2">
                                    <label htmlFor="nombre_usuario">Nombre</label>
                                    <input type="text" className="form-control" id="nombre_usuario"
                                        name="nombre" value={datosPerfil.nombre} />

                                </div>
                                <div className="form-group2">
                                    <label htmlFor="apellido_usuario">Apellido</label>
                                    <input type="text" className="form-control" id="apellido_usuario"
                                        name="apellido" value={datosPerfil.apellido} />

                                </div>
                            </div>
                            <div className="form-group1">
                                <div className="form-group2">
                                    <label htmlFor="correo_usuario">Correo</label>
                                    <input type="email" className="form-control" id="correo_usuario"
                                        name="email" value={datosPerfil.email} />

                                </div>
                                <div className="form-group2">
                                    <label htmlFor="telefono_usuario">Telefono</label>
                                    <input type="number" className="form-control" id="telefono_usuario"
                                        name="telefono" value={datosPerfil.telefono} />
                                </div>

                            </div>
                            <div className="form-group1">

                                <button type="button" className="btn btn-success" onClick={onMostrarModal}>Cambiar Contraseña</button>

                            </div>
                            <div className="form-group-botones">
                                <input type="submit" className="btn btn-primary" value="Guardar" />
                                <button type="button" className="btn btn-danger" onClick={onCancelar} >Cancelar</button>


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
                    <form onSubmit={submitCambiarPass}>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="txtPassActual">Contraseña actual</label>
                                        <input type="text" className="form-control" id="txtPassActual" placeholder="Contraseña actual"
                                            name="passActual" onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="txtPassNuevo">Contraseña nueva</label>
                                        <input type="text" className="form-control" id="txtPassNuevo" placeholder="Contraseña nueva"
                                            name="passNuevo" onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="txtPassNuevoConfirm">Confirmar contraseña</label>
                                        <input type="text" className="form-control" id="txtPassNuevoConfirm" placeholder="Confirmar contraseña"
                                            name="passConfirmar" onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group-botones">
                                        <input type="submit" className="btn btn-primary" value="Guardar" />
                                        <button type="button" className="btn btn-danger" onClick={onCancelarModal}>Cancelar</button>
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