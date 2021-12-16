import "./PredioDetalles.css";
import { useEffect, useState, Fragment } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../../services/.config";
import Logo from "../logo.png";

function EditarPredios(props) {
    const token = JSON.parse(localStorage.getItem('token'));

    const [predios, setPredios] = useState({
        nombre: "",
        descripcion: "",
        imagen_scr: "",     //Pendiente
        area: 0,
        latitud: 0,
        longitud: 0

    });

    const [showLoading, setShowLoading] = useState(false);

    const onCancelar = () => {
        window.history.back();
    };

    const modo = window.location.pathname.split("/")[2];

    const onGuardar = (e) => {
        if (modo === "edit") {
            axios.put(BASE_URL + `predios/edit/${predios._id}`, predios, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
                .then(res => {
                    console.log(res);
                    alert("Predio editado correctamente");
                    window.location.href = "/predios";
                })
                .catch(err => {
                    if (err.response) {

                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                    console.log(err);
                });
        } if (modo === "agregar") {
            try {

                axios.post(BASE_URL + "predios/new", predios, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                })
                    .then(res => {
                        console.log(res);
                        alert("Cultivo guardado");
                        window.location.href = "/predios";
                    })
                    .catch(err => {
                        if (err.response) {

                            alert(err.response.data.message);
                        } else {
                            alert("Error, contacte con el administrador");
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        const predio = { ...predios };
        predio[name] = value;
        setPredios(predio);
    };

    useEffect(() => {
        if (modo === "edit") {
            setShowLoading(true);
            axios.get(BASE_URL + "predios/edit?id=" + window.location.href.split("id=")[1], {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
                .then(res => {
                    
                    setPredios(res.data.predios);
                    setShowLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [modo, token.token]);

    return (
        <Fragment>
            {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> :
                <div className="container">
                    <div className="titulo_predio text-center">
                        PREDIO
                    </div>
                    <div className="grupo">
                        <div className="row m-2 detalles_cultivo">
                            <div className="col-2">
                                <div className="header_img">
                                    <img src={Logo} alt="Logo" className="avatar" />
                                </div>

                                <div className="d-flex justify-content-center m-3">
                                    <button className="btn btn-primary">Cambiar</button>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="header_text d-flex row">
                                    <label htmlFor="nombre_predio" className="header_text_label">NOMBRE DEL PREDIO</label>
                                    <input type="text" id="nombre_predio" name="nombre" className="header_text_input" placeholder="Nombre del predio" style={{ width: "100%" }}
                                        value={predios.nombre}
                                        onChange={onInputChange}
                                    />

                                </div>
                                <div className="header_text d-flex row">
                                    <label htmlFor="descripcion_predio" className="header_text_label">DESCRIPCIÓN</label>
                                    <textarea id="descripcion_predio" name="descripcion" className="header_text_input " placeholder="Descripción del predio" style={{ width: "100%", marginBottom: "10px" }}
                                        value={predios.descripcion}
                                        onChange={onInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="detalle_predio m-2 ">
                            <div className="row fila_detalles">
                                <div className="col-1 circulo text-center">

                                    <i className="fas fa-circle"></i>

                                </div>
                                <div className="col-8 descripcion">
                                    Área
                                </div>
                                <div className="col-3 valor text-end">
                                    <input type="number" className="valor_input text-end" name="area" placeholder="0" id="area" style={{ width: "95%" }}
                                        value={predios.area}
                                        onChange={onInputChange}
                                    />
                                </div>
                            </div>
                            <div className="row fila_detalles">
                                <div className="col-1 circulo text-center">

                                    <i className="fas fa-circle"></i>

                                </div>
                                <div className="col-8 descripcion">

                                    <div className="">
                                        <div className="fw-bold">
                                            Ubicacion
                                        </div>
                                        <div className="mt-2">
                                            Latitud
                                        </div>
                                        <div className="mt-2">
                                            Longitud
                                        </div>
                                    </div>

                                </div>
                                <div className="col-3 valor text-end">
                                    <br />
                                    <input type="text" className="valor_input text-end mt-2" name="latitud" placeholder="0" id="lactitud" style={{ width: "95%" }}
                                        value={predios.latitud}
                                        onChange={onInputChange}
                                    />

                                    <input type="text" className="valor_input text-end mt-2" name="longitud" placeholder="0" id="longitud" style={{ width: "95%" }}
                                        value={predios.longitud}
                                        onChange={onInputChange}
                                    />

                                </div>
                            </div>
                            {/* <div className="row fila_detalles">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Valor metro cubico de agua
                        </div>
                        <div className="col-3 valor text-end">
                            <input type="text" className="valor_input text-end" placeholder="20" id="valor_agua" style={{ width: "95%" }} />

                        </div>
                    </div>
                    <div className="row fila_detalles">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Valor del kilogramo de fertilizante
                        </div>
                        <div className="col-3 valor text-end">
                            <input type="text" className="valor_input text-end" placeholder="$2000" id="valor_kg_fertilizante" style={{ width: "95%" }} />

                        </div>
                    </div> */}
                        </div>
                        {/* <label htmlFor="nombre_cultivo" className="header_text_label m-2 mt-2">Cultivo</label>
                <div className="row m-2">
                    <div className="col-md-8">
                        <AutocompletarCultivos />
                   
                    </div>
                    <div className="col-md-4">
                        
                        <div className="btn_asignar">
                            <button className="btn btn-primary btn-block">
                                ASIGNAR
                            </button>
                        </div>
                    </div>
                </div> */}

                        {/* botones de accion */}
                        <div className="row m-2">
                            <div className="col-md-12 mt-2 d-flex gap-3 justify-content-end">
                                <div className="btn_guardar">
                                    <button className="btn btn-primary" onClick={onGuardar}>
                                        GUARDAR
                                    </button>

                                </div>
                                <div className="btn_cancelar">
                                    <button className="btn btn-danger" onClick={onCancelar}>
                                        CANCELAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
}
export default EditarPredios;