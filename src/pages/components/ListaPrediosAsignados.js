import Logo from "../logo.png";
import { Fragment, useState } from 'react';
import axios from 'axios';

import BASE_URL from "../../services/.config";

function ListaPrediosAsignados(props) {
    const token = JSON.parse(localStorage.getItem('token'));

    // Desasignar predio
    const onDesasignar = () => {
        if (window.confirm("¿Esta seguro de desasignar este predio?")) {
            axios.put(`${BASE_URL}predios/desasignar/${props.predio._id}`, props.predio,{
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
                .then(res => {
                    alert(res.data.message);
                    window.location.reload();
                })
                .catch(err => {
                    if (err.response) {

                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                });
        }

    }
    return (
        <Fragment>
            <div className="container lista_cultivos">
                <div className="row" style={{ alignItems: "center" }}>
                    <div className="col-md-3 logo ">
                        <div className="header_img">
                            <img src={`${BASE_URL}uploads/${props.predio.imagen}`} alt="logo" className="img-fluid" />
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
                                <input type="tet" className="form-control" name="latitud" id="lactitud"
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

                    <div className="col-md-2 btn_acciones justify-content-center">

                        <button className="btn btn-danger" onClick={onDesasignar}>Desasignar</button>

                    </div>
                </div>


                <div className="row">

                    <div className="col-md-10">
                        <hr />
                        <div className="cont_asignado">
                            <div className="nombre">
                                USUARIO ASIGNADO:
                            </div>
                            <div className="m-2 asignado">
                                {props.predio.usuario_asignado.nombre} {props.predio.usuario_asignado.apellido}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>
    );
}
export default ListaPrediosAsignados;