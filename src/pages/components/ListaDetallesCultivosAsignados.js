import Logo from "../logo.png";
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from "../../services/.config";

function ListaDetallesCultivosAsignados(props) {
    
    const totalSemillas = props.cultivo.cantidad_semillas_hectarea * props.cultivo.area_destinada;
    const totalFertilizantes = props.cultivo.cantidad_fertilizante_semana * props.cultivo.tiempo_cosecha_semana;
    
    const costoTotal = totalSemillas * props.parametros.valor_semilla +
        totalFertilizantes * props.parametros.valor_fertilizante+
        props.cultivo.cantidad_agua_semana * props.parametros.valor_agua * props.cultivo.tiempo_cosecha_semana;
    const onDesasignar = () => {
        const id_predio = props.predio_id;
        const id_cultivo = props.cultivo._id;
        const token = JSON.parse(localStorage.getItem('token'));
        if (window.confirm("¿Esta seguro de desasignar este cultivo?")) {

            axios.delete(BASE_URL + `predios/${id_predio}/cultivos/${id_cultivo}/desasignar`,
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                })
                .then(res => {
                    alert("Desasignado");
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
            <div className="container lista_cultivos mb-2">
                <div className="row" style={{ alignItems: "center" }}>
                    <div className="col-md-3 logo ">
                        <div className="header_img">
                            <img src={props.cultivo.imagen? `${BASE_URL}uploads/${props.cultivo.imagen}`:Logo} alt="logo" className="img-fluid" />
                        </div>
                    </div>

                    <div className="col-md-7 nombre_descripcion">
                        <div className="nombre">
                            {props.cultivo.nombre}
                        </div>
                        <div className="descripcion">
                            {props.cultivo.descripcion}
                        </div>
                    </div>

                    <div className="col-md-2 btn_acciones justify-content-center">

                        <button className="btn btn-danger" onClick={onDesasignar}>Desasignar</button>

                    </div>

                </div>
                <hr />
                <div className="row mb-2">
                    <div className="row ">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Área destinada para el cultivo:
                        </div>
                        <div className="col-3 valor text-end">
                            {props.cultivo.area_destinada}ha
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Cantidad total de semillas necesarias:
                        </div>
                        <div className="col-3 valor text-end">
                            {totalSemillas} semillas
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Tiempo del cultivo en semanas:
                        </div>
                        <div className="col-3 valor text-end">
                            {props.cultivo.tiempo_cosecha_semana} semanas
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Cantidad de metros cúbicos de agua necesarias para el riego por semana:
                        </div>
                        <div className="col-3 valor text-end">
                            {props.cultivo.cantidad_agua_semana} m3
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Cantidad total de fertilizantes necesarios:
                        </div>
                        <div className="col-3 valor text-end">
                            {totalFertilizantes}
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Fecha de siembra del cultivo:
                        </div>
                        <div className="col-3 valor text-end">
                            {props.cultivo.fecha_siembra}
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Fecha de cosecha del cultivo:
                        </div>
                        <div className="col-3 valor text-end">
                            {props.cultivo.fecha_recoleccion}
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Costo total del cultivo:
                        </div>
                        <div className="col-3 valor text-end">

                            ${(costoTotal)?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </div>
                    </div>


                </div>

            </div>


        </Fragment>
    );
}

export default ListaDetallesCultivosAsignados;