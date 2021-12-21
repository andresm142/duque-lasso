import { Modal } from "react-bootstrap";
import Userlogo from './user.png';
import './components/perfil.css';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from "../services/.config";

function Profile() {
    const [paramModal, setParamModal] = useState({
        titulo: "Cambiar contraseña",
        mostrar: false,
        modo: "nuevo",
        onGuardar: null,
        onCancelar: null,
        proyecto: null

    });

    const [imagen, setImagen] = useState(null);
    const [filename, setFilename] = useState("");

    const [pass, setPass] = useState({
        passActual: "",
        passNuevo: "",
        passConfirmar: ""

    });

    const [datosPerfil, setDatosPeril] = useState(JSON.parse(localStorage.getItem('datosUser')));

    useEffect(() => {
        sessionStorage.setItem("paginaActiva", JSON.stringify({
            home: "nav_link text-white",
            cultivos: "nav_link text-white",
            predios: "nav_link text-white",
            users: "nav_link text-white",
            gestion: "nav_link text-white",
            profile: "nav_link active nav-link dropdown-toggle ml-1 d-flex text-white",
            coniguracion: "nav_link text-white",
            accessDenied: "nav_link text-white",
            pageNotFound: "nav_link text-white"
        }))
    }, []);

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
        if (evt.target.name === "imagen") {
              // validar que sea una imagen
              if (evt.target.files[0].type.indexOf("image") === -1) {
                alert("El archivo no es una imagen");
                return;
            }
            setImagen(evt.target.files[0]);
            setFilename(window.URL.createObjectURL(evt.target.files[0]))
        } else {
            const p = { ...pass };
            p[evt.target.name] = evt.target.value;
            setPass(p);
        }

    }

    const submitCambiarPass = async function (evt) {
        evt.preventDefault();
        const datos = { ...datosPerfil };
        const token = JSON.parse(localStorage.getItem('token'));

        const body = {
            username: datos.email,
            password: pass.passActual,
            newPassword: pass.passNuevo,

        };
        if (pass.passNuevo === pass.passConfirmar) {
            const url = BASE_URL + 'users/cambiarPass';

            await axios.post(url, body, {
                headers: {
                    Authorization: 'Bearer ' + token.token
                }
            })
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
                        <img src={filename} alt="" style={{ maxWidth: "20%" }} />
                    </div>
                    <div className="col-md-12 d-flex justify-content-center">
                        <div className="custom-input-file btn btn-primary d-flex justify-content-center m-3" style={{ maxWidth: "10%" }}>
                            <input type="file" id="fichero-tarifas" className="input-file" name="imagen"
                                onChange={onInputChange} />

                            Cambiar
                        </div>
                    </div>
                    <div className="perfil-container-form">
                        <form>
                            <div className="form-group1">
                                <div className="form-group2">
                                    <label htmlFor="nombre_usuario">Nombre</label>
                                    <input type="text" className="form-control" id="nombre_usuario"
                                        name="nombre" readOnly value={datosPerfil.nombre} />

                                </div>
                                <div className="form-group2">
                                    <label htmlFor="apellido_usuario">Apellido</label>
                                    <input type="text" className="form-control" id="apellido_usuario"
                                        name="apellido" readOnly value={datosPerfil.apellido} />

                                </div>
                            </div>
                            <div className="form-group1">
                                <div className="form-group2">
                                    <label htmlFor="correo_usuario">Correo</label>
                                    <input type="email" className="form-control" id="correo_usuario"
                                        name="email" readOnly value={datosPerfil.email} />

                                </div>
                                <div className="form-group2">
                                    <label htmlFor="telefono_usuario">Telefono</label>
                                    <input type="number" className="form-control" id="telefono_usuario"
                                        name="telefono" readOnly value={datosPerfil.telefono} />
                                </div>

                            </div>
                            <div className="form-group1">
                                Rol de usuario: {datosPerfil.rol === "Admin" ? "Administrador" :
                                    datosPerfil.rol === "userConfig" ? "Usuario Coniguración" : "Usuario de gestión"}
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
                                        <input type="password" className="form-control" id="txtPassActual" placeholder="Contraseña actual"
                                            name="passActual" onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="txtPassNuevo">Contraseña nueva</label>
                                        <input type="password" className="form-control" id="txtPassNuevo" placeholder="Contraseña nueva"
                                            name="passNuevo" onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="txtPassNuevoConfirm">Confirmar contraseña</label>
                                        <input type="password" className="form-control" id="txtPassNuevoConfirm" placeholder="Confirmar contraseña"
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