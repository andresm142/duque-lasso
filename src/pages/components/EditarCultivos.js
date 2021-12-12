import "./CultivosDetalles.css";
import Logo from "../logo.png";
function EditarCultivos() {
    const onCancelar = () => {
        window.history.back();
    };
    const onGuardar = () => {
        window.history.back();
        alert("Cultivo guardado");
    };
    const modo = window.location.pathname.split("/")[2];
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
                            <input type="text" id="nombre_cultivo" className="header_text_input" placeholder="Nombre del cultivo" style={{width:"95%"}}/>

                        </div>
                        <div className="header_text d-flex row">
                            <label htmlFor="descripcion_cultivo" className="header_text_label">DESCRIPCIÓN</label>
                            <textarea id="descripcion_cultivo" className="header_text_input " placeholder="Descripción del cultivo" style={{width:"95%"}}>
                            
                                
                            
                            </textarea>
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
                        <input type="text" className="valor_input text-end" placeholder="20" id="cantidad_semilla" style={{width:"95%"}}/>
                    
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
                    <input type="text" className="valor_input text-end" placeholder="50m3" id="cantidad_agua" style={{width:"95%"}}/>
                        
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
                    <input type="text" className="valor_input text-end" placeholder="25" id="cantidad_fertilizante" style={{width:"95%"}}/>
                        
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
                    <input type="text" className="valor_input text-end" placeholder="50min" id="tiempo_recolecion" style={{width:"95%"}} />
                        
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
                    <input type="text" className="valor_input text-end" placeholder="20" id="tiempo_semana_cultivo" style={{width:"95%"}} />
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
                    <input type="text" className="valor_input text-end" placeholder="2000 kg" id="kilogramos_recolectados" style={{width:"95%"}} />
                        
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
                    <input type="text" className="valor_input text-end" placeholder="26" id="dias_espera" style={{width:"95%"}} />
                        
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