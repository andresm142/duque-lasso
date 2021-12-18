import Logo from "../logo.png";
import { Fragment, useState } from 'react';

function ListaDetallesCultivosAsignados(props) {
    return (
        <Fragment>
            <div className="container lista_cultivos mb-2">
                <div className="row" style={{ alignItems: "center" }}>
                    <div className="col-md-3 logo ">
                        <div className="header_img">
                            <img src={Logo} alt="logo" className="img-fluid" />
                        </div>
                    </div>

                    <div className="col-md-9 nombre_descripcion">
                        <div className="nombre">
                            {props.cultivo.nombre}
                        </div>
                        <div className="descripcion">
                            {props.cultivo.descripcion}
                        </div>
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
                            0
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
                            0
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
                            
                            ${(props.cultivo.precio)?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </div>
                    </div>


                </div>

            </div>


        </Fragment>
    );
}

export default ListaDetallesCultivosAsignados;