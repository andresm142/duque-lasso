import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css'
import BASE_URL from '../services/.config';
import { Form, Modal, Spinner } from "react-bootstrap";


import Logo from './logo.png';
import axios from 'axios';

function Login(props) {

    const [paramModal, setParamModal] = useState({
        titulo: "",
        mostrar: false,
    });

    const onCancelarModal = () => {
        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = false;
        setParamModal(paramNuevos);
    }


    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [correo, setCorreo] = useState();
    const [mensajeError, setMensajeError] = useState("");
    const handleSubmit = async (event) => {

        event.preventDefault();
        const url = BASE_URL + 'users/login';
        // cifrar la contraseña


        const datos = { username, password }

        await axios.post(url, datos)
            .then(response => {
                localStorage.setItem('datosUser', JSON.stringify(response.data.datosUser));
                // console.log(response.data);
                return response.data;

            })
            .then(data => {
                const token = data;
                props.setToken(token);
                return data;
            })
            .catch(error => {
                if (error.response) {
                    setMensajeError(error.response.data.message);

                } else {
                    alert("Error, contacte con el administrador");
                }

            });

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }else if (name === 'correo') {
            setCorreo(value);
        }

    }

    // Recuperar contraseña
    const handleRecuperar = (event) => {
        event.preventDefault();
        setParamModal({
            titulo: "Recuperar contraseña",
            mostrar: true,

        });
    }


    // Al enviar el formulario de recuperar contraseña
    const onGuardarRecuperar = (e) => {
        console.log(correo);
        e.preventDefault();
        axios.post(BASE_URL + 'users/validarCorreo', {email:correo})
            .then(res => {
                alert("Se ha enviado un correo con las instrucciones para recuperar la contraseña");
            })
            .catch(err => {
                if (err.response) {
                    alert(err.response.data.message);
                } else {
                    alert("Error, contacte con el administrador");
                }
            })

        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = false;
        setParamModal(paramNuevos);
    }


    return (
        <Fragment>
            <section className="row form-02-main p-3">


                <div className="col-md-6">
                    <div className="p-3">
                        <img src={Logo} alt="logo" style={{ width: "150px" }} className="img-rounded" />
                    </div>
                </div>


                <div className="col-md-6 container" >
                    <div className="row">
                        <div className="col-md-12">
                            <div className="_lk_de">
                                <form onSubmit={handleSubmit} className="form-03-main">

                                    <h2>Bienvenido</h2>
                                    <div className="form-group pt-5">
                                        <input type="email" name="email" className="form-control _ge_de_ol"
                                            placeholder="Enter Email" required="" aria-required="true"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group pt-5">
                                        <input type="password" name="password" className="form-control _ge_de_ol"
                                            placeholder="Enter Password" required="" aria-required="true"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {mensajeError ? <h5 className='text-danger'>{mensajeError}</h5> : null}
                                    <div className="checkbox form-group">

                                        <a href='null' onClick={handleRecuperar}>¿Olvidaste tu contraseña?</a>
                                    </div>

                                    <div className="form-group pt-5">
                                        <button type="submit" className="_btn_04 login border-0" >Iniciar Sesión</button>

                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={paramModal.mostrar} onHide={onCancelarModal}>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>{paramModal.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                        <div >
                            <div className="form-group">
                                <label htmlFor="correo">Correo electronico</label>
                                <input type="text" className="form-control" id="correo" name="correo" 
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <button className="_btn_04 login border-0 mt-2 " type="submit" onClick={onGuardarRecuperar}>
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </div>
                    
                </Modal.Body>

            </Modal>
        </Fragment>
    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
export default Login;