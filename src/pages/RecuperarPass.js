import React, { Fragment, useEffect, useState } from 'react';
import './style.css'
import BASE_URL from '../services/.config';
import { Spinner } from "react-bootstrap";
import Logo from './logo.png';
import axios from 'axios';

function RecuperarPass(props) {
    const token = window.location.pathname.split('/')[3];
    const [newPassword, setNewPassword] = useState();
    const [confirmarPassword, setConfirmarPassword] = useState();

    const [mensajeError, setMensajeError] = useState("");
    const [valido, setValido] = useState(false);

    // verificar que el token de recuperacion de contraseña sea correcto
    useEffect(() => {
        
        const url = BASE_URL + 'users/validar/' + token;
        axios.get(url)
            .then(response => {
                console.log(response);
                setValido(true);
            }
            )
            .catch(error => {
                if (error.response) {
                    setMensajeError(error.response.data.message);
                    setValido(false);

                } else {
                    alert("Error, contacte con el administrador");
                }
            });

    }, []);

    const onRegresar = () => {
     window.location.href = "/";
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        const url = BASE_URL + 'users/recuperar/'+token;

        const datos = { newPassword, confirmarPassword }
        if (newPassword !== confirmarPassword) {
            setMensajeError("Las contraseñas no coinciden");
            return;
        }

        await axios.post(url, datos)
            .then(response => {
                console.log(response.data.message);
                setMensajeError(response.data.message);
                alert(response.data.message);
                window.location.href = "/";
               

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
        if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmarPassword') {
            setConfirmarPassword(value);
        }
        setMensajeError("");
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

                                    <h2>Recuperar de contraseña</h2>

                                    <div className="form-group pt-5">
                                        <input type="password" name="newPassword" className="form-control _ge_de_ol"
                                            placeholder="Enter Password" required="" aria-required="true"
                                            onChange={handleChange}
                                            readOnly={!valido}

                                        />
                                    </div>
                                    <div className="form-group pt-5">
                                        <input type="password" name="confirmarPassword" className="form-control _ge_de_ol"
                                            placeholder="Enter Password" required="" aria-required="true"
                                            onChange={handleChange}
                                            readOnly={!valido}
                                        />
                                    </div>
                                    {mensajeError ? <h5 className='text-danger'>{mensajeError}</h5> : null}

                                    <div className="form-group pt-5">
                                        {valido ?
                                            <button type="submit" className="_btn_04 login border-0" >Cambiar contraseña</button>
                                            : <button className="_btn_04 login border-0" onClick={onRegresar} >Regresar al login</button>}
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default RecuperarPass;