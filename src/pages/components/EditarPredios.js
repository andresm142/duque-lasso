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
        imagen: "https://lh3.googleusercontent.com/pw/AM-JKLUhM-b5l3b0_y1fLl6SCel-vfZ2Sd1o4XwvkkMxTIvMModGVvOUV175JkZJzWGbxrpj_1BwGUt8AKvw6DRbg21cBUEeP9Ty2T3RaD15AqHVRv3xT5uWZFSNYGluanDg45fJdarKNuCMNH9-E_d7Bv4=w516-h405-no?authuser=0",     //Default
        area: 0,
        latitud: 0,
        longitud: 0

    });

    const [showLoading, setShowLoading] = useState(false);
    const [imagen, setImagen] = useState(null);
    const [filename, setFilename] = useState(predios.imagen);

    const onCancelar = () => {
        window.history.back();
    };

    const modo = window.location.pathname.split("/")[2];

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
                    setPredios({
                        ...predios,
                        imagen: res.data.filename
                    });
                    if (modo === "edit") {
                        editarPredio(res.data.filename);
                    } else if (modo === "agregar") {
                        agregarPredio(res.data.filename);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setShowLoading(false);
                });
        }else{
            if (modo === "edit") {
                editarPredio(null);
            } else if (modo === "agregar") {
                agregarPredio(null);
            }
        }

    };

    const editarPredio = (e) => {
        let data = { ...predios };
        if (e) {
            data = {
                ...predios,
                imagen: e
            }
        }

        console.log(data);
        // Se actualiza el predio
        axios.put(BASE_URL + `predios/edit/${predios._id}`, data, {
            headers: {
                Authorization: `Bearer ${token.token}`,

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
    }

    const agregarPredio = (e) => {
        let data = { ...predios };
        if (e) {
            data = {
                ...predios,
                imagen: e
            }
        }

        try {

            axios.post(BASE_URL + "predios/new", data, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
                .then(res => {
                    console.log(res);
                    alert(res.data.message);
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
    
    const onInputChange = (e) => {
        console.log(filename);
        console.log(imagen)
        if (e.target.name === "imagen") {

            // validar que sea una imagen
            if (e.target.files[0].type.indexOf("image") === -1) {
                alert("El archivo no es una imagen");
                return;
            }
            setImagen(e.target.files[0]);
            setFilename(window.URL.createObjectURL(e.target.files[0]))

        } else {
            setPredios({
                ...predios,
                [e.target.name]: e.target.value
            });

        }
    };

    useEffect(() => {
        if (modo === "edit") {
            const id = window.location.pathname.split("/")[3];
            setShowLoading(true);
            // axios.get(BASE_URL + "predios/edit?id=" + window.location.href.split("id=")[1], {
            axios.get(BASE_URL + "predios/" + id, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
                .then(res => {

                    setPredios(res.data.predios);
                   
                    setFilename(BASE_URL+'uploads/'+res.data.predios.imagen);
                    console.log(res.data.predios.imagen);
                    if (res.data.message) {

                        alert(res.data.message);
                    }
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
                        <div className="row m-2 detalles_cultivo" >
                            <div className="col-2">
                                <div className="header_img">
                                    <img src={filename} alt="Logo" className="img-fluid" />
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