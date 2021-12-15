import { Fragment } from 'react';
import BASE_URL from '../services/.config';

function Configuracion() {

    sessionStorage.setItem("paginaActiva", JSON.stringify({
        home: "nav_link text-white",
        cultivos: "nav_link text-white",
        predios: "nav_link text-white",
        users: "nav_link text-white",
        profile: "nav_link nav-link dropdown-toggle ml-1 d-flex text-white",
        coniguracion: "nav_link active text-white",
        accessDenied: "nav_link text-white",
        pageNotFound: "nav_link text-white"
    }))

    return (
        <Fragment>
            <div className="container container_detalles">

                <div className="text-center header_principal">
                    <h1 style={{ color: "var(--color-usuario)", fontWeight: "bold" }}>CONIGURACIÓN</h1>
                </div>
                <div className="container detalles_cultivo">

                    <div className="row fila_detalles">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Valor metro cúbico de agua
                        </div>
                        <div className="col-3 valor text-end">
                            <input type="number" className="valor_input text-end" name="valor_agua" placeholder="20" id="cantidad_semilla" style={{ width: "95%" }}

                            />

                        </div>
                    </div>
                    <div className="row fila_detalles">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Valor de cada semilla
                        </div>
                        <div className="col-3 valor text-end">
                            <input type="number" className="valor_input text-end" name="valor_semilla" placeholder="20" id="cantidad_semilla" style={{ width: "95%" }}

                            />

                        </div>
                    </div>
                    <div className="row fila_detalles">
                        <div className="col-1 circulo text-center">

                            <i className="fas fa-circle"></i>

                        </div>
                        <div className="col-8 descripcion">
                            Valor del kilogramo de fertilizante.
                        </div>
                        <div className="col-3 valor text-end">
                            <input type="number" className="valor_input text-end" name="valor_fertilizante" placeholder="20" id="cantidad_semilla" style={{ width: "95%" }}

                            />

                        </div>
                    </div>
                </div>
                <div className="footer_principal precio">
                        <div className="row">

                            <div className="col-12">
                                <div className="d-flex justify-content-end gap-3">
                                    <button className="btn btn-primary" >Guardar</button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </Fragment>
    );
}
export default Configuracion;