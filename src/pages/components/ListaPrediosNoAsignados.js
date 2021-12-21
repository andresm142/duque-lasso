import Logo from "../logo.png";
import { Fragment, useState } from 'react';

import BASE_URL from "../../services/.config";

function ListaPrediosNoAsignados(props) {
        
    // const onSeleccionar = () => {
    //     props.onSeleccionar(props.predio);
    // }

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
                                <label htmlFor="" className="">Latitud</label>
                                <input type="text" className="form-control" name="latitud" id="latitud" 
                                value={props.predio.latitud}
                                readOnly
                                />

                            </div>
                            <div className="col-6 mb-4">
                                <label htmlFor="" className="">Longitud</label>
                                <input type="text" className="form-control" name="longitud" id="longitud" 
                                value={props.predio.longitud}
                                readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 btn_acciones justify-content-center">

                        {/* <button className="btn btn-primary" onClick={onSeleccionar}>Seleccionar</button> */}

                    </div>
                </div>

             
            </div>

        </Fragment>
    );
}
export default ListaPrediosNoAsignados;