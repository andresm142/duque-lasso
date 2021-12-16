import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../services/.config';
import Logo from './logo.png'
import LogoUser from './user.png'
import AutocompletarPredios from './components/AutocompletePredio';
import AutocompletarUsuarioGestion from './components/AutocompleteUsuarioGestion';
import ListaPrediosAsignados from './components/ListaPrediosAsignados';
import Paginacion from "./components/Pagination";


function Configuracion() {

    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [showLoading, setShowLoading] = useState(true);

    const limit = 10;

    sessionStorage.setItem("paginaActiva", JSON.stringify({
        home: "nav_link text-white",
        cultivos: "nav_link text-white",
        predios: "nav_link text-white",
        users: "nav_link text-white",
        gestion: "nav_link text-white",
        profile: "nav_link nav-link dropdown-toggle ml-1 d-flex text-white",
        coniguracion: "nav_link active text-white",
        accessDenied: "nav_link text-white",
        pageNotFound: "nav_link text-white"
    }))

    const [parametros, setParametros] = useState({
        valor_agua: 0,
        valor_fertilizante: 0,
        valor_semilla: 0
    });

    useEffect(() => {

        const getParametros = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            try {
                const res = await axios.get(`${BASE_URL}parametros/`, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                });

                // Verificar que hallan datos 
                if (res.data.parametros.length > 0) {
                    setParametros(res.data.parametros[0]);
                }
                // setParametros(res.data);
            } catch (err) {
                if (err.response) {
                    alert(err.response.data.message);
                } else {
                    alert("Error, contacte con el administrador");
                }
                console.log(err);
            }

        }
        getParametros();
    }, []);

    const handleChange = (e) => {
        setParametros({
            ...parametros,
            [e.target.name]: e.target.value
        });
    }

    const updateParametros = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const res = await axios.put(`${BASE_URL}parametros/edit/${parametros._id}`, parametros, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            });

            alert(res.data.message);
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Error, contacte con el administrador");
            }
            console.log(err);
        }
    }

    const createParametros = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const res = await axios.post(`${BASE_URL}parametros/new`, parametros, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            });

            alert(res.data.message);
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Error, contacte con el administrador");
            }
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parametros._id) {
            updateParametros();
        } else {
            createParametros();
        }

    }

    const handlePageClick = (e) => {
        setPage(e);
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit} className="container container_detalles">

                <div className="text-center header_principal">
                    <h2 style={{ color: "var(--color-usuario)", fontWeight: "bold" }}>CONIGURACIÓN DE PARAMETROS</h2>
                </div>
                <div className="container detalles_cultivo">

                    <div className="row fila_detalles">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Valor metro cúbico de agua
                        </div>
                        <div className="col-3 valor text-end">
                            <input type="number" className="valor_input text-end" name="valor_agua" placeholder="20" id="cantidad_semilla" style={{ width: "95%" }}
                                value={parametros.valor_agua}
                                onChange={handleChange}
                            />

                        </div>
                    </div>
                    <div className="row fila_detalles">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Valor de cada semilla
                        </div>
                        <div className="col-3 valor text-end">
                            <input type="number" className="valor_input text-end" name="valor_semilla" placeholder="20" id="cantidad_semilla" style={{ width: "95%" }}
                                value={parametros.valor_semilla}
                                onChange={handleChange}
                            />

                        </div>
                    </div>
                    <div className="row fila_detalles">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Valor del kilogramo de fertilizante.
                        </div>
                        <div className="col-3 valor text-end">
                            <input type="number" className="valor_input text-end" name="valor_fertilizante" placeholder="20" id="cantidad_semilla" style={{ width: "95%" }}
                                value={parametros.valor_fertilizante}
                                onChange={handleChange}
                            />

                        </div>
                    </div>
                </div>
                <div className="footer_principal precio">
                    <div className="row">

                        <div className="col-12">
                            <div className="d-flex justify-content-end gap-3">
                                <button className="btn btn-primary" >Guardar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <form className="container container_detalles mt-2">
                <div className="text-center header_principal">
                    <h2 style={{ color: "var(--color-usuario)", fontWeight: "bold" }}>ASIGNACIÓN DE PREDIOS</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="" className="header_text_label m-2 mt-2">Predio</label>
                            <AutocompletarPredios />

                            <div className="container">
                                <div className="row">
                                    <label htmlFor="" className="header_text_label m-2 mt-2">Detalles del predio</label>
                                    <div className="col-4">
                                        <img src={Logo} alt="" className="img-fluid" />
                                    </div>
                                    <div className="col-8">
                                        <div className="row">
                                            <label htmlFor="" className="header_text_label text-center m-2 mt-2">Ubicación</label>
                                            <div className="col-6">
                                                <label htmlFor="" className="">Lactitud</label>
                                                <input type="number" className="form-control" name="lactitud" id="lactitud" />

                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="" className="">Longitud</label>
                                                <input type="number" className="form-control" name="longitud" id="longitud" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-6">
                            <label htmlFor="" className="header_text_label m-2 mt-2">Usuario de gestión</label>
                            <AutocompletarUsuarioGestion />

                            <div className="container">
                                <div className="row">
                                    <label htmlFor="" className="header_text_label m-2 mt-2">Detalles del usuario</label>
                                    <div className="col-4">
                                        <img src={LogoUser} alt="" className="img-fluid" />
                                    </div>
                                    <div className="col-8">
                                        <div className="row">
                                            <div className="col-4">
                                                <label htmlFor="correo" className="header_text_label text-center m-2 mt-2">Correo</label>

                                            </div>
                                            <div className="col-8">
                                                <input type="text" className="form-control" name="correo" id="correo" />

                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-4">
                                                <label htmlFor="telefono" className="header_text_label text-center m-2 mt-2">Telefono</label>

                                            </div>
                                            <div className="col-8">
                                                <input type="text" className="form-control" name="telefono" id="telefono" />

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_principal">
                    <div className="row">

                        <div className="col-12">
                            <div className="d-flex justify-content-end gap-3">
                                <button className="btn btn-primary" >Guardar</button>

                            </div>
                        </div>
                    </div>
                </div>

            </form>
            <div className="container container_detalles mt-2">
                <div className="text-center header_principal">
                    <h2 style={{ color: "var(--color-usuario)", fontWeight: "bold" }}>PREDIOS ASIGNADOS</h2>
                </div>
                <div className="container">
                    <ListaPrediosAsignados />
                    
                    <div className="d-flex justify-content-center mt-2 ">
                        <Paginacion itemsPerPage={limit} totalItems={totalElements} onChange={handlePageClick} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Configuracion;