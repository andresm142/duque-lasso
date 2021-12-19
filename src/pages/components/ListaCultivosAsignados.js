import Logo from "../logo.png";
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Paginacion from "./Pagination";
import BASE_URL from "../../services/.config";
import ListaDetallesCultivosAsignados from "./ListaDetallesCultivosAsignados";
import { Spinner } from "react-bootstrap";

function ListaCultivosAsignados(props) {
    const limit = 1;
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(props.predio.cultivos.length);
    const [showLoading, setShowLoading] = useState(true);
    const [cultivos, setCultivos] = useState([]);

    // Cuando se cambia la pagina de predios asignados
    const handlePageClick = (e) => {
        setPage(e);
    }

    // Obtener cultivos por id
    const getCultivos = (id) => {
        setShowLoading(true);
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            axios.get(BASE_URL + 'cultivos/' + id,
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                })
                .then(res => {
                    console.log(res.data.cultivos);
                    setCultivos(res.data.cultivos);
                    setShowLoading(false);
                })
                .catch(err => {
                    if (err.response) {
                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                });
        } catch (err) {
            alert("Error, contacte con el administrador");
        }
    }
    useEffect(() => {
        getCultivos(props.predio.cultivos[page - 1]);
    }, [page, props.predio.cultivos, props.fecha]);


    return (
        <Fragment>

            <div className="container lista_cultivos">
                <div className="row" style={{ alignItems: "center" }}>
                    <div className="col-md-3 logo ">
                        <div className="header_img">
                            <img src={Logo} alt="logo" className="img-fluid" />
                        </div>
                    </div>

                    <div className="col-md-7 nombre_descripcion">
                        <div className="nombre">

                            {props.predio.nombre}
                        </div>
                        <div className="descripcion">
                            {props.predio.descripcion}
                        </div>
                        <div className="row">
                            <label htmlFor="" className="header_text_label text-center m-2 mt-2">Ubicación</label>
                            <div className="col-6">
                                <label htmlFor="" className="">Lactitud</label>
                                <input type="text" className="form-control" name="latitud" id="lactitud"
                                    value={props.predio.latitud}
                                    readOnly
                                />

                            </div>
                            <div className="col-6">
                                <label htmlFor="" className="">Longitud</label>
                                <input type="text" className="form-control" name="longitud" id="longitud"
                                    value={props.predio.longitud}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    {/* 
                    <div className="col-md-2 btn_acciones justify-content-center">

                        <button className="btn btn-danger" >Desasignar</button>

                    </div> */}
                </div>


                <div className="row">

                    <div className="col-md-10">

                        <div className="cont_asignado">
                            <div className="nombre">
                                CULTIVOS ASIGNADOS:
                            </div>
                            <hr />
                            <div className="m-2 asignado">
                                {/* {props.predio.usuario_asignado.nombre} {props.predio.usuario_asignado.apellido} */}
                            </div>
                        </div>

                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr />
                    </div>
                </div>

                <div className="container">
                    {/* {filtrarPredio === 'asignado' ? listarPrediosasignados : listarPrediosNoAsignados
                         
                    } */}
                    {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> :
                        <ListaDetallesCultivosAsignados cultivo={cultivos} predio_id={props.predio._id} />
                    }
                    <div className="d-flex justify-content-end mt-2 mb-2">
                        <Paginacion itemsPerPage={limit} totalItems={totalElements} onChange={handlePageClick} />

                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default ListaCultivosAsignados;