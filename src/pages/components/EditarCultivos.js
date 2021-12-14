import "./CultivosDetalles.css";
import Logo from "../logo.png";
import { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:9000/";
const token = JSON.parse(localStorage.getItem('token'));

function EditarCultivos() {

    const [cultivos, setCultivos] = useState({
        nombre: "",
        descripcion: "",
        imagen_scr: "",
        precio: 0,
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

    const onCancelar = () => {
        window.history.back();
    };
    const onGuardar = (e) => {
        
        try {
            axios.post(url + "cultivos/new", cultivos, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
                .then(res => {
                    console.log(res);
                    alert("Cultivo guardado");
                    window.location.href = "/cultivos";
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }

        
        
    };

    const modo = window.location.pathname.split("/")[2];
    console.log(modo);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        const cultivo = { ...cultivos };
        cultivo[name] = value;
        setCultivos(cultivo);
    };
    useEffect(() => {

        if (modo === "edit") {

            axios.get(url + "cultivos/edit?id=" + window.location.href.split("id=")[1], {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setCultivos(res.data.cultivos);

                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [modo]);

    // const valorEstado = (props.modo !== "nuevo" ? { ...props.usuario } : userLimpio);
    // const valorEstado = (modo !== "agregar" ? { ...cultivos } : cultivos);

    return (
        <div className="container container_detalles">
            <div className="header_principal">
                <div className="row">

                    <div className="col-2">
                        <div className="header_img">
                            <img src={Logo} alt="Logo" className="avatar" />
                        </div>

                        <div className="d-flex justify-content-center m-3">
                            <button className="btn btn-primary">Cambiar</button>
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="header_text d-flex row">
                            <label htmlFor="nombre_cultivo" className="header_text_label">NOMBRE DEL CULTIVO</label>
                            <input type="text" id="nombre_cultivo" name="nombre" className="header_text_input" placeholder="Nombre del cultivo" style={{ width: "95%" }}
                                value={cultivos.nombre}
                                onChange={onInputChange}
                            />

                        </div>
                        <div className="header_text d-flex row">
                            <label htmlFor="descripcion_cultivo" className="header_text_label" >DESCRIPCIÓN</label>
                            <textarea id="descripcion_cultivo" className="header_text_input" name="descripcion" placeholder="Descripción del cultivo" style={{ width: "95%" }}
                                value={cultivos.descripcion}
                                onChange={onInputChange}
                            />

                        </div>
                    </div>
                </div>
            </div>
            <div className="container detalles_cultivo">
                <div className="row ">
                    <div className="col-1 circulo text-center">

                        <i className="fas fa-circle"></i>

                    </div>
                    <div className="col-8 descripcion">
                        Cantidad de semillas por hectárea
                    </div>
                    <div className="col-3 valor text-end">
                        <input type="number" className="valor_input text-end" name="cantidad_semillas_hectarea" placeholder="20" id="cantidad_semilla" style={{ width: "95%" }}
                            value={cultivos.cantidad_semillas_hectarea}
                            onChange={onInputChange}
                        />

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
                        <input type="number" className="valor_input text-end" name="cantidad_agua_semana" placeholder="50m3" id="cantidad_agua" style={{ width: "95%" }}
                            value={cultivos.cantidad_agua_semana}
                            onChange={onInputChange}
                        />

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
                        <input type="number" className="valor_input text-end" name="cantidad_fertilizante_semana" placeholder="25" id="cantidad_fertilizante" style={{ width: "95%" }}
                            value={cultivos.cantidad_fertilizante_semana}
                            onChange={onInputChange}
                        />

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
                        <input type="number" className="valor_input text-end" name="tiempo_recoleccion_hectarea" placeholder="50min" id="tiempo_recolecion" style={{ width: "95%" }}
                            value={cultivos.tiempo_recoleccion_hectarea}
                            onChange={onInputChange}
                        />

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
                        <input type="number" className="valor_input text-end" name="tiempo_cosecha_semana" placeholder="20" id="tiempo_semana_cultivo" style={{ width: "95%" }}
                            value={cultivos.tiempo_cosecha_semana}
                            onChange={onInputChange}
                        />
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
                        <input type="number" className="valor_input text-end" name="kilogramos_hectareas" placeholder="2000 kg" id="kilogramos_recolectados" style={{ width: "95%" }}
                            value={cultivos.kilogramos_hectareas}
                            onChange={onInputChange}
                        />

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
                        <input type="number" className="valor_input text-end" name="tiempos_espera" placeholder="26" id="dias_espera" style={{ width: "95%" }}
                            value={cultivos.tiempos_espera}
                            onChange={onInputChange}
                        />

                    </div>
                </div>
            </div>
            <div className="footer_principal precio">
                <div className="row">

                    <div className="col-12">
                        <div className="d-flex justify-content-end gap-3">
                            <button className="btn btn-primary" onClick={onGuardar}>Guardar</button>
                            <button className="btn btn-danger" onClick={onCancelar}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditarCultivos;
