import "./CultivosDetalles.css";
import Logo from "../logo.png";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import BASE_URL from "../../services/.config";



function EditarCultivos() {
    const token = JSON.parse(localStorage.getItem('token'));
    const [cultivos, setCultivos] = useState({
        nombre: "",
        descripcion: "",
        imagen: "https://lh3.googleusercontent.com/pw/AM-JKLUhM-b5l3b0_y1fLl6SCel-vfZ2Sd1o4XwvkkMxTIvMModGVvOUV175JkZJzWGbxrpj_1BwGUt8AKvw6DRbg21cBUEeP9Ty2T3RaD15AqHVRv3xT5uWZFSNYGluanDg45fJdarKNuCMNH9-E_d7Bv4=w516-h405-no?authuser=0",     //Default
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
    const [imagen, setImagen] = useState(null);
    const [filename, setFilename] = useState(cultivos.imagen);

    const modo = window.location.pathname.split("/")[2];
    console.log(modo);

    const onCancelar = () => {
        window.history.back();
    };
    const onGuardar = async (e) => {
        if (imagen) {
            // Se sube la imagen
            const formData = new FormData();
            console.log(imagen);
            formData.append("imagen", imagen);

            await axios.post(`${BASE_URL}images/uploads/`, formData, {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                    'Content-Type': 'multipart/form-data'

                }
            })
                .then(res => {
                    console.log(res);
                    setCultivos({
                        ...cultivos,
                        imagen: res.data.filename
                    });
                    if (modo === "edit") {
                        editarCultivo(res.data.filename);
                    } else if (modo === "agregar") {
                        agregarCultivo(res.data.filename);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setShowLoading(false);
                });
        }else{
            if (modo === "edit") {
                editarCultivo(null);
            } else if (modo === "agregar") {
                agregarCultivo(null);
            }
        }
    };

    const editarCultivo = (e) => {
        let data = { ...cultivos };
        if (e) {
            data = {
                ...cultivos,
                imagen: e
            }
        }

        axios.put(BASE_URL + `cultivos/edit/${cultivos._id}`, data, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
            .then(res => {
                console.log(res);
                alert("Cultivo editado correctamente");
                window.location.href = "/cultivos";
            })
            .catch(err => {
                if (err.response) {

                    alert(err.response.data.message);
                } else {
                    alert("Error, contacte con el administrador");
                }
                console.log(err);
            });

    }
    const agregarCultivo = (e) => {
        let data = { ...cultivos };
        if (e) {
            data = {
                ...cultivos,
                imagen: e
            }
        }

        try {

            axios.post(BASE_URL + "cultivos/new", data, {
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

    const onInputChange = (e) => {
        
        if (e.target.name === "imagen") {

            // validar que sea una imagen
            if (e.target.files[0].type.indexOf("image") === -1) {
                alert("El archivo no es una imagen");
                return;
            }
            setImagen(e.target.files[0]);
            setFilename(window.URL.createObjectURL(e.target.files[0]))
        }
        const cultivo = { ...cultivos };
        cultivo[e.target.name] = e.target.value;
        setCultivos(cultivo);
    };

    useEffect(() => {

        if (modo === "edit") {
            const id = window.location.pathname.split("/")[3];
            setShowLoading(true);
            // axios.get(BASE_URL + "cultivos/edit?id=" + window.location.href.split("id=")[1], {
            axios.get(BASE_URL + "cultivos/" + id, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setCultivos(res.data.cultivos);
                    setFilename(BASE_URL+'uploads/'+res.data.cultivos.imagen);
                    setShowLoading(false);
                })
                .catch((err) => {
                    if (err.response) {

                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                });
        }
    }, [modo, token.token]);

    // const valorEstado = (props.modo !== "nuevo" ? { ...props.usuario } : userLimpio);
    // const valorEstado = (modo !== "agregar" ? { ...cultivos } : cultivos);

    return (
        <Fragment>
            {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> :
                <div className="container container_detalles">
                    <div className="header_principal">
                        <div className="row">

                            <div className="col-2">
                                <div className="header_img">
                                    <img src={filename} alt="Logo" className="avatar" />
                                </div>

                                {/* <div className="d-flex justify-content-center m-3">
                                    <button className="btn btn-primary">Cambiar</button>
                                </div> */}
                                <div className="custom-input-file btn btn-primary d-flex justify-content-center m-3">
                                    <input type="file" id="fichero-tarifas" className="input-file" name="imagen"
                                        onChange={onInputChange} />

                                    Cambiar
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="header_text d-flex row">
                                    <label htmlFor="nombre_cultivo" className="header_text_label">NOMBRE DEL CULTIVO</label>
                                    <input type="text" id="nombre_cultivo" name="nombre" className="header_text_input" placeholder="Nombre del cultivo" style={{ width: "95%" }}
                                        value={cultivos.nombre}
                                        onChange={onInputChange}
                                        required
                                    />

                                </div>
                                <div className="header_text d-flex row">
                                    <label htmlFor="descripcion_cultivo" className="header_text_label" >DESCRIPCI??N</label>
                                    <textarea id="descripcion_cultivo" className="header_text_input" name="descripcion" placeholder="Descripci??n del cultivo" style={{ width: "95%" }}
                                        value={cultivos.descripcion}
                                        onChange={onInputChange}
                                        required
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container detalles_cultivo">

                        <div className="row fila_detalles">
                            <div className="col-1 circulo text-center">

                                <i className="fas fa-circle"></i>

                            </div>
                            <div className="col-8 descripcion">
                                ??rea destinada para el cultivo
                            </div>
                            <div className="col-3 valor text-end">
                                <input type="number" className="valor_input text-end" name="area_destinada" placeholder="20" id="cantidad_semilla" style={{ width: "95%" }}
                                    value={cultivos.area_destinada}
                                    onChange={onInputChange}
                                />

                            </div>
                        </div>
                        <div className="row fila_detalles ">
                            <div className="col-1 circulo text-center">

                                <i className="fas fa-circle"></i>

                            </div>
                            <div className="col-8 descripcion">
                                Cantidad de semillas por hect??rea
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
                                Cantidad de fertilizante por hect??rea por semana
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
                                Tiempo para realizar la recolecci??n por hect??rea
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
                                Kilogramos recolectados del producto por hect??rea
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
            }
        </Fragment>
    );
}
export default EditarCultivos;
