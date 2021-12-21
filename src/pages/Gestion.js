import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import AutocompletarPrediosPropios from "./components/AutocompletePredioPropio";
import AutocompletarCultivos from "./components/AutocompleteCultivo";
import ListaCultivosAsignados from "./components/ListaCultivosAsignados";
import Paginacion from "./components/Pagination";
import { Spinner } from "react-bootstrap";
import Logo from "./logo.png";
import BASE_URL from "../services/.config";
// import ListaPrediosAsignados from "./components/ListaPrediosAsignados";

function Gestion() {

    const limit = 3;
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [showLoading, setShowLoading] = useState(true);

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
        area_destinada: "",
        fecha_siembra: "",
    });

    // Cuando se cambia la pagina de predios asignados
    const handlePageClick = (e) => {
        setPage(e);
    }

    const [estadoInput, setEstadoInput] = useState(true);
    const [fechaSiembra, setFechaSiembra] = useState();
    const [mostrarFecha, setMostrarFecha] = useState(false);
    // const [cultivos, setCultivos] = useState([]);
    const [predios, setPredios] = useState([]);
    const [fecha, setFecha] = useState(new Date().toLocaleDateString());        // Fecha recoleccion

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

    // Al escoger un cultivo de la lista
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

        //  sumar semanas a la fecha de siembra
        const fecha = new Date(e);
        fecha.setDate(fecha.getDate() + semanas * 7 + 1);
        setFecha(fecha.toLocaleDateString());
        const fecha_siembra = new Date(e);
        fecha_siembra.setDate(fecha_siembra.getDate() + 1);
        setFechaSiembra(fecha_siembra.toLocaleDateString());
        console.log("Fecha siembra", fechaSiembra)
        console.log("Fecha recoleccion", fecha.toLocaleDateString())
    }

    // Al enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('token'));
        if (cultivo.length === 0 || predio.length === 0) {
            alert("Debe seleccionar un predio y un cultivo ");
            return;
        }
        // if (input.area_destinada === "") {
        //     alert("Debe ingresar una cantidad en el area destinada");
        //     return;
        // }
        if (input.fecha_siembra === "") {
            alert("Debe ingresar una fecha de siembra");
            return;
        }
        
        const data = {
            area_destinada: detalleCultivo.area_destinada,
            fecha_siembra: fechaSiembra,
            fecha_recoleccion: fecha
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
                // setInput({
                //     area_destinada: null,
                //     fecha_siembra: null,
                // });
                // setEstadoInput(true);
                // setPredio([]);
                // setCultivo([]);
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
                    if (res.data.totalElements) {
                        setTotalElements(res.data.totalElements);
                    } else {
                        setTotalElements(0);
                    }

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

    // Obtener los cultivos asignados al usuario
    useEffect(() => {
        setShowLoading(true);
        const token = JSON.parse(localStorage.getItem('token'));
        const id_usuario = JSON.parse(localStorage.getItem('datosUser')).id
        try {
            axios.get(`${BASE_URL}predios/cultivos/asignados/${id_usuario}`, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                params: {
                    page: page,
                    limit: limit
                }
            }).then(res => {
                // console.log(res.data);
                setPredios(res.data.predios);
                if (res.data.totalElements) {
                    setTotalElements(res.data.totalElements);
                } else {
                    setTotalElements(0);
                }
                setShowLoading(false);
                // console.log(res.data.cultivos[0].cultivo.nombre);

                // setCultivos(res.data.cultivos);
            });
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Error, contacte con el administrador");
            }
            console.log(err);
        }
    }, [page, mostrarFecha]);

    const listaPrediosAsignados = predios.map((predio) =>
        <ListaCultivosAsignados
            key={predio._id}
            predio={predio}
            fecha={mostrarFecha}
        />
    );


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

                                            {/* {detallePredio.asignado ?
                                                <div className="text-center mt-2 text-danger font-weight-bold">
                                                    Predio asignado</div> : null
                                            } */}
                                        </div>
                                        <div className="row mt-2">
                                            Area total: {detallePredio.area}
                                        </div>
                                        <div className="row">
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
                                        <img src={detalleCultivo.imagen? `${BASE_URL}uploads/${detalleCultivo.imagen}`:Logo} alt="" className="img-fluid" />
                                    </div>
                                    <div className="col-8">
                                        <div className="row">
                                            <div className="col-4">
                                                <label htmlFor="area_destinada" className="header_text_label text-small text-center m-2 mt-2"><h6>Area destinada</h6></label>

                                            </div>
                                            <div className="col-8">
                                                <input type="number" className="form-control" name="area_destinada" id="area_destinada"
                                                    // value={input.area_destinada}
                                                    value={detalleCultivo.area_destinada}
                                                    readOnly
                                                // disabled={estadoInput}
                                                // onChange={handleChange}
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
                                                    readOnly={estadoInput}
                                                    
                                                />

                                            </div>

                                        </div>

                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            {mostrarFecha ? <h5>Tiempo de cosecha: {detalleCultivo.tiempo_cosecha_semana} semanas</h5> : null}
                                        </div>
                                        <div className="row mt-2">
                                            {mostrarFecha ? <h5>Fecha probable de recolección: {fecha} </h5> : null}

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

            {/* ---------------------   LISTA DE PREDIOS CON CULTIVOS ASIGNADOS    ---------------  */}
            <div className="container container_detalles mt-2">
                <div className="text-center header_principal">
                    <div className='row' style={{ alignItems: "center" }}>
                        <div className='col-2'></div>
                        <div className='col-8'>
                            <h2 style={{ color: "var(--color-usuario)", fontWeight: "bold" }}>CULTIVOS</h2>
                        </div>
                        {/* <div className='col-2'>
                            <label htmlFor="asignado" className="header_text_label ">Filtrar por</label>
                            <select className='form-select' name='asignado' id='selectOtion'
                            >

                                <option value='asignado'>Asignados</option>
                                <option value='noAsignado'>No Asignados</option>
                            </select>
                        </div> */}
                    </div>

                </div>
                <div className="container">
                    {/* {filtrarPredio === 'asignado' ? listarPrediosasignados : listarPrediosNoAsignados
                         
                    } */}
                    {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> :
                        listaPrediosAsignados
                    }
                    {/* <ListaCultivosAsignados /> */}
                    <div className="d-flex justify-content-center mt-2 ">
                        <Paginacion itemsPerPage={limit} totalItems={totalElements} onChange={handlePageClick} />
                    </div>
                </div>
            </div>


        </Fragment>
    );
}
export default Gestion;