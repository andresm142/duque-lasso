import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css'


import Logo from './logo.png';
import axios from 'axios';

function Login(props) {
    
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [mensajeError, setMensajeError] = useState("");
     const handleSubmit = async (event) => {

        event.preventDefault();
        const url = 'http://localhost:9000/users/login';
        const datos={username, password}

        await axios.post(url, datos)
            .then(response => {
                localStorage.setItem('datosUser', JSON.stringify(response.data.datosUser));
                // console.log(response.data);
                return response.data;
                
            })
            .then(data => {
                const token=data;
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
        }
    }


    return (
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
                                {mensajeError? <h5 className='text-danger'>{mensajeError}</h5>:null}
                                <div className="checkbox form-group">

                                    <a href="none">¿Olvidaste tu contraseña?</a>
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

    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
export default Login;