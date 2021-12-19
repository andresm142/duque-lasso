import Logo from "../logo.png";
import { Fragment } from 'react';
import axios from 'axios';
import BASE_URL from "../../services/.config";

function ListaPredios(props) {
    const token = JSON.parse(localStorage.getItem('token'));

    const onDetalles = () => {

        window.location.href = "/predios/detalles?id=" + props._id;

    }
    const onEditar = () => {
        window.location.href = "/predios/edit/" + props._id;
    }

    const onEliminar = () => {
        if (window.confirm("¿Esta seguro de eliminar este cultivo?")) {
            axios.delete(BASE_URL + 'predios/delete/' + props._id,
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                })
                .then(res => {
                    alert("Eliminado");
                    window.location.reload();
                })
                .catch(err => {
                    if (err.response) {

                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                }
                );
        }
    }

    return (
        <Fragment>
            <div className="container lista_cultivos">
                <div className="row">
                    <div className="col-md-3 logo">
                        <div className="header_img">
                            <img src={Logo} alt="logo" className="img-fluid" />
                        </div>
                    </div>

                    <div className="col-md-7 nombre_descripcion">
                        <div className="nombre">
                            {props.nombre}
                        </div>
                        <div className="descripcion">
                            {props.descripcion}
                        </div>
                        <div className="row mt-2">
                            <label className="label_lista" >Area: {props.area} hectareas</label>
                            <label className="label_lista" >Ubicación: {props.latitud}, {props.longitud}</label>
                        </div>
                    </div>

                    <div className="col-md-2 btn_acciones">
                        <button className="btn btn-primary" onClick={onEditar}>Editar</button>
                        <button className="btn btn-danger" onClick={onEliminar}>Eliminar</button>
                        {/* <button className="btn btn-primary" onClick={onDetalles}>Ver más</button> */}

                    </div>
                </div>

                {/* <div className="row">

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
                <div className="col-md-2 btn_asignar">
                    <button className="btn btn-primary b_asignar" onClick={onMostrarModalAsignar}>Asignar</button>
                </div>
            </div> */}
            </div>

        </Fragment>
    );
}
export default ListaPredios;