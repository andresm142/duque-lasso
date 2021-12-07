import "./Detalles.css";
import Logo from "../logo.png";
function CultivosDetalles() {
    return (
        <div className="container container_detalles">
            <div className="header_principal">
                <div className="row">

                    <div className="col-2">
                        <div className="header_img">
                            <img src={Logo} alt="Logo" className="avatar" />
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="header_text">
                            NOMBRE DEL CULTIVO
                        </div>
                        <div className="header_descripcion">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
            </div>
            <div className="detalles_cultivo">
                <div className="row ">
                    <div className="col-1 circulo text-center">
                        
                        <i className="fas fa-circle"></i>
                        
                    </div>
                    <div className="col-8 descripcion">
                        Cantidad de semillas por hectárea
                    </div>
                    <div className="col-3 valor text-end">
                        20
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
                        50m2
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
                        25
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
                        50 minutos
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
                        20 semanas
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
                        2000 kg
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
                        26 dias
                    </div>
                </div>
            </div>
            <div className="footer_principal precio">
                <div className="row">
                    <div className="col-8">
                        COSTO TOTAL DEL CULTIVO
                    </div>
                    <div className="col-4 text-end">
                        $1,000.00
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CultivosDetalles;