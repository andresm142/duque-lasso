import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import AutocompletarPrediosPropios from "./components/AutocompletePredioPropio";
import AutocompletarCultivos from "./components/AutocompleteCultivo";
import Logo from "./logo.png";
import BASE_URL from "../services/.config";

function Gestion() {

    const [predio, setPredio] = useState([]);       // Predio seleccionado
    const [detallePredio, setDetallePredio] = useState({
        latitud: "",
        longitud: "",
        asignado: false
    });   // Detalle del predio seleccionado
    const [cultivo, setCultivo] = useState([]);         // Cultivo seleccionado
    const [detalleCultivo, setDetalleCultivo] = useState({
        nombre: "",
        descripcion: ""
    });   // Detalle del cultivo seleccionado

    const [input, setInput] = useState({
        area_destinada: 0,
        fecha_siembra: 2021 - 12 - 8,
    });

    const [estadoInput, setEstadoInput] = useState(true);
    const [fechaRecoleccion, setFechaRecoleccion] = useState(new Date().toLocaleDateString());
    const [mostrarFecha, setMostrarFecha] = useState(false);

    sessionStorage.setItem("paginaActiva", JSON.stringify({
        home: "nav_link text-white",
        cultivos: "nav_link text-white",
        predios: "nav_link text-white",
        users: "nav_link text-white",
        gestion: "nav_link active text-white",
        profile: "nav_link nav-link dropdown-toggle ml-1 d-flex text-white",
        coniguracion: "nav_link text-white",
        accessDenied: "nav_link text-white",
        pageNotFound: "nav_link text-white"
    }))

    // Al escoger un predio de la lista
    const handlePredio = (id) => {
        console.log(id);
        setPredio(id);
    }

    const handleCultivo = (id) => {
        setEstadoInput(false);
        console.log(id);
        setCultivo(id);
        console.log(input.fecha_siembra);
        establecerFecha(input.fecha_siembra);
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

    // Al cambiar el valor de los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
        if (name === "fecha_siembra") {
            establecerFecha(value);
            setMostrarFecha(true);

        }
    }

    const establecerFecha = (e) => {
        const semanas = detalleCultivo.tiempo_cosecha_semana;

        // sumar semanas a la fecha de siembra
        const fecha = new Date(e);
        console.log(e);
        console.log(fecha);
        fecha.setDate(fecha.getDate() + semanas * 7 + 1);
        setFechaRecoleccion(fecha.toLocaleDateString());

    }

    // Al enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('token'));
        const data = {
            area_destinada: input.area_destinada,
            fecha_siembra: input.fecha_siembra,
            fecha_recoleccion: fechaRecoleccion
        }
        try {
            axios.put(`${BASE_URL}predios/${predio}/cultivos/${cultivo}/recolectar`, data, {

                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            }).then(res => {
                // if (res.data.status === 500) {
                //     alert(res.data.message);
                // } else {
                    alert(res.data.message);
                    setInput({
                        area_destinada: 0,
                        fecha_siembra: 2021 - 12 - 8,
                    });
                    setEstadoInput(true);
                    setPredio([]);
                    setCultivo([]);
                    setMostrarFecha(false);
                // }
            });
        } catch (err) {
            console.log(err.response);
            alert(err.response.data.message);
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Error, contacte con el administrador");
            }
            console.log(err);
        }
    }


    // obtener los detalles del cultivo seleccionado
    useEffect(() => {
        if (cultivo.length > 0) {
            const token = JSON.parse(localStorage.getItem('token'));
            try {
                axios.get(`${BASE_URL}cultivos/${cultivo}`, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                }).then(res => {
                    console.log(res.data.cultivos.nombre);
                    setDetalleCultivo(res.data.cultivos);
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
    }, [cultivo]);


    return (
        <Fragment>

            <div className="container container_header">
                <div className="row">
                    <div className="col-md-12 titulo">
                        GESTIOS DE CULTIVOS
                    </div>
                </div>
            </div>

            {/* ---------------------   ASIGNACION DE CULTIVOS ---------------  */}
            <form onSubmit={handleSubmit} className="container container_detalles mt-2">
                <div className="text-center header_principal">
                    <h2 style={{ color: "var(--color-usuario)", fontWeight: "bold" }}>Asignación de cultivos a los predios propios</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="" className="header_text_label m-2 mt-2">Predio</label>

                            <AutocompletarPrediosPropios handlePredio={handlePredio} />


                            <div className="container">
                                <div className="row" style={{ alignItems: "center" }}>
                                    <label htmlFor="" className="header_text_label m-2 mt-2">Detalles del predio: {detallePredio.nombre}</label>
                                    <div className="col-4">
                                        <img src={Logo} alt="" className="img-fluid" />
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

                                            {/* {detallePredio.asignado ?
                                                <div className="text-center mt-2 text-danger font-weight-bold">
                                                    Predio asignado</div> : null
                                            } */}
                                        </div>
                                        <div className="row mt-2">
                                            Area asignada: {detallePredio.areaAsignada}
                                        </div>
                                        <div className="row">
                                            Area disponible: {detallePredio.areaDisponible}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-6">
                            <label htmlFor="" className="header_text_label m-2 mt-2">Cultivos</label>
                            {/* <AutocompletarUserGestion handleUsuarioGestion={handleUsuarioGestion} /> */}
                            <AutocompletarCultivos
                                handleCultivo={handleCultivo}
                            />
                            <div className="container">
                                <div className="row" style={{ alignItems: "center" }}>
                                    {/* <div className=""> */}
                                    <label htmlFor="" className="header_text_label m-2 mt-2">Configuración del cultivo: {detalleCultivo.nombre} </label>
                                    {/* <span>{detalleCultivo.nombre}</span> */}
                                    {/* </div> */}
                                    <div className="col-4">
                                        <img src={Logo} alt="" className="img-fluid" />
                                    </div>
                                    <div className="col-8">
                                        <div className="row">
                                            <div className="col-4">
                                                <label htmlFor="area_destinada" className="header_text_label text-small text-center m-2 mt-2"><h6>Area destinada</h6></label>

                                            </div>
                                            <div className="col-8">
                                                <input type="number" className="form-control" name="area_destinada" id="area_destinada"
                                                    value={input.area_destinada}
                                                    disabled={estadoInput}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <label htmlFor="fecha_siembra" className="header_text_label text-center m-2 mt-2"><h6>Fecha de siembra</h6></label>

                                            </div>
                                            <div className="col-8">
                                                <input type="date" className="form-control" name="fecha_siembra" id="fecha_siembra"
                                                    value={input.fecha_siembra}
                                                    onChange={handleChange}
                                                    disabled={estadoInput}
                                                />

                                            </div>

                                        </div>

                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            {mostrarFecha ? <h5>Tiempo de cosecha: {detalleCultivo.tiempo_cosecha_semana} semanas</h5> : null}
                                        </div>
                                        <div className="row mt-2">
                                            {mostrarFecha ? <h5>Fecha probable de recolección: {fechaRecoleccion} </h5> : null}

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



        </Fragment>
    );
}
export default Gestion;