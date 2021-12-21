import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../services/.config';
import Logo from './logo.png'
import LogoUser from './user.png'
import AutocompletarPredios from './components/AutocompletePredio';
import ListaPrediosAsignados from './components/ListaPrediosAsignados';
import ListaPrediosNoAsignados from './components/ListaPrediosNoAsignados';
import AutocompletarUserGestion from './components/AutocompleteUserGestion';
import Paginacion from "./components/Pagination";
import { Spinner } from "react-bootstrap";
import Permisos from '../services/Permisos';

const pagina = "configuracion";
let permitir = false;

function Configuracion() {

    // Obterner permisos para cargar esta pagina

    useEffect(() => {
        const temp = async () => {
            const permiso = await Permisos(pagina);
            
            permitir = permiso;
        }
        temp();
        
    }, []);

    const limit = 10;
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [showLoading, setShowLoading] = useState(true);

    const [predio, setPredio] = useState([]);       // Predio seleccionado
    const [detallePredio, setDetallePredio] = useState({
        latitud: "",
        longitud: "",
        asignado: false
    });   // Detalle del predio seleccionado
    const [usuarioGestion, setUsuarioGestion] = useState([]);   // Usuario gestion seleccionado
    const [detalleUsuario, setDetalleUsuario] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        rol: ""
    });   // Detalle del usuario gestion seleccionado
    const [filtrarPredio, setFiltrarPredio] = useState("asignado");
    const [prediosAsignados, setPrediosAsignados] = useState([]);
    const [prediosNoAsignados, setPrediosNoAsignados] = useState([]);





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

    // Obtener parametros
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

    // Al cambiar los parametros
    const handleChange = (e) => {
        setParametros({
            ...parametros,
            [e.target.name]: e.target.value
        });
    }

    // Actualizar parametros
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

    // crear parametros
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

    // Al hacer click en Guardar parametros
    const handleSubmit = (e) => {
        e.preventDefault();
        if (parametros._id) {
            updateParametros();
        } else {
            createParametros();
        }

    }

    // Al escoger un predio de la lista
    const handlePredio = (e) => {
        setPredio(e);
    }

    // obtener los detalles del predio seleccionado
    useEffect(() => {
        
        if (predio.length > 0) {

            const token = JSON.parse(localStorage.getItem('token'));
            try {
                axios.get(`${BASE_URL}predios/${predio}/asignado`, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                }).then(res => {
                    console.log(res.data.predios.latitud);
                    setDetallePredio(res.data.predios);
                });
            } catch (err) {
                if (err.response) {
                    alert(err.response.data.message);
                } else {
                    alert("Error, contacte con el administrador");
                }
                console.log(err);
            }

        }
    }, [predio]);


    // Al escoger un usuario de la lista
    const handleUsuarioGestion = (e) => {
        setUsuarioGestion(e);
    }

    // Obtener los detalles del usuario seleccionado
    useEffect(() => {
        if (usuarioGestion.length > 0) {
            const token = JSON.parse(localStorage.getItem('token'));
            try {
                axios.get(`${BASE_URL}users/${usuarioGestion}`, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                }).then(res => {
                    console.log(res.data.usuarios);
                    setDetalleUsuario(res.data.usuarios);
                });
            } catch (err) {
                if (err.response) {
                    alert(err.response.data.message);
                } else {
                    alert("Error, contacte con el administrador");
                }
                console.log(err);
            }
        }
    }, [usuarioGestion]);



    // Guardar asignacion de predio a usuario
    const handleAsignarPredio = (e) => {
        // e.preventDefault();
        if (!detallePredio.asignado) {
            const token = JSON.parse(localStorage.getItem('token'));
            console.log(predio, "--- ", usuarioGestion);
            try {
                axios.put(`${BASE_URL}predios/asignar/${predio}`, {
                    usuario: usuarioGestion
                }, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                }).then(res => {
                    alert(res.data.message);
                });
            } catch (err) {
                if (err.response) {
                    alert(err.response.data.message);
                } else {
                    alert("Error, contacte con el administrador");
                }
                console.log(err);
            }
        } else {
            alert("El predio ya esta asignado a otro usuario");
        }
    }


    // Cuando se cambia la pagina de predios asignados
    const handlePageClick = (e) => {
        setPage(e);
    }

    // Obtener los predios asignados
    useEffect(() => {
        
        const token = JSON.parse(localStorage.getItem('token'));
        const getPredios = async () => {

            if (filtrarPredio === "asignado") {

                setShowLoading(true);

                try {
                    await axios.get(`${BASE_URL}predios/all/asignados`, {
                        headers: {
                            Authorization: `Bearer ${token.token}`
                        },
                        params: {
                            page: page,
                            limit: limit
                        }
                    })
                        .then(res => {
                            setPrediosAsignados(res.data.predios);
                            setTotalElements(res.data.totalElements);
                            setShowLoading(false);
                        });
                } catch (err) {
                    if (err.response) {
                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                    console.log(err);
                }

            } else if (filtrarPredio === "noAsignado") {

                setShowLoading(true);

                try {
                    await axios.get(`${BASE_URL}predios/all/noasignados`, {
                        headers: {
                            Authorization: `Bearer ${token.token}`
                        },
                        params: {
                            page: page,
                            limit: limit
                        }
                    })
                        .then(res => {
                            setPrediosNoAsignados(res.data.predios);
                            setTotalElements(res.data.totalElements);
                            setShowLoading(false);
                        });
                } catch (err) {
                    if (err.response) {
                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                    console.log(err);
                }
            }
        }
        getPredios();

    }, [filtrarPredio, page]);

    const onSeleccionarChange = (e) => {
        setFiltrarPredio(e.target.value);
    }



    const listarPrediosasignados = prediosAsignados.map((predio,) =>
        <ListaPrediosAsignados
            key={predio._id}
            predio={predio} />
    );

    const listarPrediosNoAsignados = prediosNoAsignados.map((predio,) =>
        <ListaPrediosNoAsignados
            key={predio._id}
            predio={predio} />
    );

    return (
        <Fragment>
            {permitir ?
                <Fragment>
                    {/* ---------------------   CONIGURACIÓN DE PARAMETROS ---------------  */}

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


                    {/* ---------------------   ASIGNACION DE PREDIOS ---------------  */}
                    <form onSubmit={handleAsignarPredio} className="container container_detalles mt-2">
                        <div className="text-center header_principal">
                            <h2 style={{ color: "var(--color-usuario)", fontWeight: "bold" }}>ASIGNACIÓN DE PREDIOS</h2>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="" className="header_text_label m-2 mt-2">Predio</label>
                                    <AutocompletarPredios handlePredio={handlePredio}
                                    />

                                    <div className="container">
                                        <div className="row" style={{ alignItems: "center" }}>
                                            <label htmlFor="" className="header_text_label m-2 mt-2">Detalles del predio</label>
                                            <div className="col-4">
                                                <img src={detallePredio.imagen? `${BASE_URL}uploads/${detallePredio.imagen}`:Logo} alt="" className="img-fluid" />
                                            </div>
                                            <div className="col-8">
                                                <div className="row">
                                                    <label htmlFor="" className="header_text_label text-center m-2 mt-2">Ubicación</label>
                                                    <div className="col-6">
                                                        <label htmlFor="" className="">Lactitud</label>
                                                        <input type="text" className="form-control" name="lactitud" id="lactitud"
                                                            value={detallePredio.latitud}
                                                            readOnly
                                                        />

                                                    </div>
                                                    <div className="col-6">
                                                        <label htmlFor="" className="">Longitud</label>
                                                        <input type="text" className="form-control" name="longitud" id="longitud"
                                                            value={detallePredio.longitud}
                                                            readOnly
                                                        />
                                                    </div>

                                                    {detallePredio.asignado ?
                                                        <div className="text-center mt-2 text-danger font-weight-bold">
                                                            Predio asignado</div> : null
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-6">
                                    <label htmlFor="" className="header_text_label m-2 mt-2">Usuario de gestión</label>
                                    <AutocompletarUserGestion handleUsuarioGestion={handleUsuarioGestion} />

                                    <div className="container">
                                        <div className="row" style={{ alignItems: "center" }}>
                                            <label htmlFor="" className="header_text_label m-2 mt-2">Detalles del usuario</label>
                                            <div className="col-4">
                                                <img src={detalleUsuario.imagen? `${BASE_URL}uploads/${detallePredio.imagen}`:LogoUser} alt="" className="img-fluid" />
                                            </div>
                                            <div className="col-8">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <label htmlFor="correo" className="header_text_label text-center m-2 mt-2">Correo</label>

                                                    </div>
                                                    <div className="col-8">
                                                        <input type="text" className="form-control" name="correo" id="correo"
                                                            value={detalleUsuario.email}
                                                            readOnly
                                                        />

                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-4">
                                                        <label htmlFor="telefono" className="header_text_label text-center m-2 mt-2">Telefono</label>

                                                    </div>
                                                    <div className="col-8">
                                                        <input type="text" className="form-control" name="telefono" id="telefono"
                                                            value={detalleUsuario.telefono}
                                                            readOnly

                                                        />

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


                    {/* ---------------------   LISTA DE PREDIOS ASIGNADOS    ---------------  */}
                    <div className="container container_detalles mt-2">
                        <div className="text-center header_principal">
                            <div className='row' style={{ alignItems: "center" }}>
                                <div className='col-2'></div>
                                <div className='col-8'>
                                    <h2 style={{ color: "var(--color-usuario)", fontWeight: "bold" }}>PREDIOS ASIGNADOS</h2>
                                </div>
                                <div className='col-2'>
                                    <label htmlFor="asignado" className="header_text_label ">Filtrar por</label>
                                    <select className='form-select' name='asignado' id='selectOtion' value={filtrarPredio}
                                        onChange={onSeleccionarChange}>

                                        <option value='asignado'>Asignados</option>
                                        <option value='noAsignado'>No Asignados</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="container">
                            {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> :
                                filtrarPredio === 'asignado' ? listarPrediosasignados : listarPrediosNoAsignados


                            }
                            <div className="d-flex justify-content-center mt-2 ">
                                <Paginacion itemsPerPage={limit} totalItems={totalElements} onChange={handlePageClick} />
                            </div>
                        </div>
                    </div>

                </Fragment>
                : null}
        </Fragment>
    );
}
export default Configuracion;