import "./CultivosDetalles.css";
import Logo from "../logo.png";
import axios from 'axios';
import { useState, useEffect, Fragment } from "react";
import { Spinner } from "react-bootstrap";
import BASE_URL from "../../services/.config";


const token = JSON.parse(localStorage.getItem('token'));

function CultivosDetalles() {

    const [cultivo, setCultivo] = useState({
        nombre: "",
        descripcion: "",
        imagen_scr: "",
        precio: 0,
        area_destinada: 0,
        cantidad_semillas_hectarea: 0,
        cantidad_agua_semana: 0,
        cantidad_fertilizante_semana: 0,
        tiempo_recoleccion_hectarea: 0,
        tiempo_cosecha_semana: 0,
        kilogramos_hectareas: 0,
        tiempos_espera: 0,
        createdAt: "",
        updatedAt: ""
    });

    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {
        setShowLoading(true);
        axios.get(BASE_URL + "cultivos/detalles?id=" + window.location.href.split("id=")[1], {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
            .then(res => {
                console.log(res.data.cultivos);
                setCultivo(res.data.cultivos);
                setShowLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const onVolver = () => {
        window.history.back();
    }


    return (
        <Fragment>
            {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> :
                <div className="container container_detalles">
                    <div className="header_principal">
                        <div className="row">

                            <div className="col-2">
                                <div className="header_img">
                                    <img src={cultivo.imagen} alt="Logo" className="avatar" />
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="header_text">
                                    {cultivo.nombre}
                                </div>
                                <div className="header_descripcion">
                                    {cultivo.descripcion}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detalles_cultivo">
                        <div className="row fila_detalles">
                            <div className="col-1 circulo text-center">

                                <i className="fas fa-circle"></i>

                            </div>
                            <div className="col-8 descripcion">
                                Área destinada para el cultivo
                            </div>
                            <div className="col-3 valor text-end">
                                {cultivo.area_destinada}ha
                            </div>
                        </div>
                        <div className="row fila_detalles">
                            <div className="col-1 circulo text-center">

                                <i className="fas fa-circle"></i>

                            </div>
                            <div className="col-8 descripcion">
                                Cantidad de semillas por hectárea
                            </div>
                            <div className="col-3 valor text-end">
                                {cultivo.cantidad_semillas_hectarea}
                            </div>
                        </div>
                        <div className="row fila_detalles">
                            <div className="col-1 circulo text-center">

                                <i className="fas fa-circle"></i>

                            </div>
                            <div className="col-8 descripcion">
                                Cantidad de agua para el riego por semana
                            </div>
                            <div className="col-3 valor text-end">
                                {cultivo.cantidad_agua_semana}m2
                            </div>
                        </div>
                        <div className="row fila_detalles">
                            <div className="col-1 circulo text-center">

                                <i className="fas fa-circle"></i>

                            </div>
                            <div className="col-8 descripcion">
                                Cantidad de fertilizante por hectárea por semana
                            </div>
                            <div className="col-3 valor text-end">
                                {cultivo.cantidad_fertilizante_semana}kg
                            </div>
                        </div>
                        <div className="row fila_detalles">
                            <div className="col-1 circulo text-center">

                                <i className="fas fa-circle"></i>

                            </div>
                            <div className="col-8 descripcion">
                                Tiempo para realizar la recolección por hectárea
                            </div>
                            <div className="col-3 valor text-end">
                                {cultivo.tiempo_recoleccion_hectarea}h
                            </div>
                        </div>
                        <div className="row fila_detalles">
                            <div className="col-1 circulo text-center">

                                <i className="fas fa-circle"></i>

                            </div>
                            <div className="col-8 descripcion">
                                Tiempo del cultivo en semanas
                            </div>
                            <div className="col-3 valor text-end">
                                {cultivo.tiempo_cosecha_semana} Semanas
                            </div>
                        </div>
                        <div className="row fila_detalles">
                            <div className="col-1 circulo text-center">

                                <i className="fas fa-circle"></i>

                            </div>
                            <div className="col-8 descripcion">
                                Kilogramos recolectados del producto por hectárea
                            </div>
                            <div className="col-3 valor text-end">
                                {cultivo.kilogramos_hectareas}kg
                            </div>
                        </div>
                        <div className="row fila_detalles">
                            <div className="col-1 circulo text-center">

                                <i className="fas fa-circle"></i>

                            </div>
                            <div className="col-8 descripcion">
                                Tiempo de espera en dias para la proxima siembra
                            </div>
                            <div className="col-3 valor text-end">
                                {cultivo.tiempos_espera} días
                            </div>
                        </div>
                    </div>
                    <div className="footer_principal precio">
                        <div className="row">
                            <div className="col-8">
                                COSTO TOTAL DEL CULTIVO
                            </div>
                            <div className="col-4 text-end">
                                ${(cultivo.precio).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="row">

                            <div className="col-12">
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-danger" onClick={onVolver}>Volver</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
}
export default CultivosDetalles;