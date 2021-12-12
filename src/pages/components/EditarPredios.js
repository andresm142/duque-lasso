import { queries } from "@testing-library/react";
import "./PredioDetalles.css";
function EditarPredios() {
    const onCancelar = () => {
        window.history.back();
    };
    const onGuardar = () => {
        window.history.back();
        alert("Cultivo guardado");
    };
    
    const modo = window.location.pathname.split("/")[2];
    

    return (
        <div className="container">
            <div className="titulo_predio text-center">
                PREDIO
            </div>
            <div className="grupo">
                <div className="row m-2">
                    <div className="col-md-12">
                        <div className="header_text d-flex row">
                            <label htmlFor="nombre_predio" className="header_text_label">NOMBRE DEL PREDIO</label>
                            <input type="text" id="nombre_predio" className="header_text_input" placeholder="Nombre del predio" style={{ width: "100%" }} />

                        </div>
                        <div className="header_text d-flex row">
                            <label htmlFor="descripcion_predio" className="header_text_label">DESCRIPCIÓN</label>
                            <textarea id="descripcion_predio" className="header_text_input " placeholder="Descripción del predio" style={{ width: "100%" }}>

                            </textarea>
                        </div>
                    </div>
                </div>

                <div className="detalle_predio m-2">
                    <div className="row fila_detalles">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Área
                        </div>
                        <div className="col-3 valor text-end">
                            <input type="text" className="valor_input text-end" placeholder="20" id="area" style={{ width: "95%" }} />

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
                                    Lactitud
                                </div>
                                <div className="mt-2">
                                    Longitud
                                </div>
                            </div>

                        </div>
                        <div className="col-3 valor text-end">
                            <br />
                            <input type="text" className="valor_input text-end mt-2" placeholder="50" id="lactitud" style={{ width: "95%" }} />

                            <input type="text" className="valor_input text-end mt-2" placeholder="50" id="longitud" style={{ width: "95%" }} />

                        </div>
                    </div>
                    <div className="row fila_detalles">
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
                    </div>
                </div>
                <label htmlFor="nombre_cultivo" className="header_text_label m-2 mt-2">Cultivo</label>
                <div className="row m-2">
                    <div className="col-md-8">

                        <div className="header_text d-flex row">

                            <select id="nombre_cultivo" className="header_text_input" style={{ width: "100%" }}>
                                <option value="">Seleccione un cultivo</option>
                                <option value="">Cultivo 1</option>
                                <option value="">Cultivo 2</option>
                                <option value="">Cultivo 3</option>
                            </select>

                        </div>
                    </div>
                    <div className="col-md-4">
                        {/* boton asignar */}
                        <div className="btn_asignar">
                            <button className="btn btn-primary btn-block">
                                ASIGNAR
                            </button>
                        </div>
                    </div>
                </div>
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
    );
}
export default EditarPredios;