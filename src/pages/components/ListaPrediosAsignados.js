import Logo from "../logo.png";
import { Fragment, useState } from 'react';

import BASE_URL from "../../services/.config";

function ListaPrediosAsignados(props) {

    const onEliminar = () => {
        // window.location.href = "/predios/eliminar?id=1";
        alert("Eliminado");
    }
    return (
        <Fragment>
            <div className="container lista_cultivos">
                <div className="row">
                    <div className="col-md-3 logo ">
                        <div className="header_img ">
                            <img src={Logo} alt="logo" />
                        </div>
                    </div>

                    <div className="col-md-7 nombre_descripcion">
                        <div className="nombre">
                            Nombre del predio
                        </div>
                        <div className="descripcion">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
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

                    <div className="col-md-2 btn_acciones justify-content-center">

                        <button className="btn btn-danger" onClick={onEliminar}>Eliminar</button>

                    </div>
                </div>


                <div className="row">

                    <div className="col-md-10">
                        <hr />
                        <div className="cont_asignado">
                            <div className="nombre">
                                USUARIO ASIGNADO
                            </div>
                            <div className="m-2 asignado">
                                Lorem Ipsum
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>
    );
}
export default ListaPrediosAsignados;