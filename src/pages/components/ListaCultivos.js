import Logo from "../logo.png";
import { Modal } from "react-bootstrap";
import { Fragment, useState } from 'react';
function ListaCultivos(props) {

    return (
        <Fragment>
            <div className="container lista_cultivos">
                <div className="row">
                    <div className="col-md-3 logo">
                        <div className="header_img">
                            <img src={Logo} alt="logo" />
                        </div>
                    </div>

                    <div className="col-md-7 nombre_descripcion">
                        <div className="nombre">
                            Nombre del cutivo
                        </div>
                        <div className="descripcion">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>

                    </div>

                    <div className="col-md-2 btn_acciones">
                        <button className="btn btn-primary" onClick={props.onMostrarModal}>Editar</button>
                        <button className="btn btn-danger">Eliminar</button>
                        <button className="btn btn-primary" onClick={props.onMostrarModal}>Ver más</button>

                    </div>
                </div>
            </div>

        </Fragment>
    );
}
export default ListaCultivos;