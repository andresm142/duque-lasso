import Logo from "../logo.png";
function ListaPredios(props) {
    return (
        <div className="container lista_cultivos">
            <div className="row">
                <div className="col-md-3 logo">
                    <div className="header_img">
                        <img src={Logo} alt="logo" />
                    </div>
                </div>

                <div className="col-md-7 nombre_descripcion">
                    <did className="nombre">Nombre del predio</did>
                    <did className="descripcion">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </did>

                </div>

                <div className="col-md-2 btn_acciones">
                    <button className="btn btn-primary">Editar</button>
                    <button className="btn btn-danger">Eliminar</button>
                    <button className="btn btn-primary">Ver más</button>

                </div>
            </div>

            <div className="row">

                <div className="col-md-10">
                    <hr />
                    <div className="cont_asignado">
                        <div className="nombre">
                            CULTIVO ASIGNADO
                        </div>
                        <div className="m-2 asignado">
                            Lorem ipsum dolor sit amet
                        </div>
                    </div>
                </div>
                <div className="col-md-2 btn_asignar">
                    <button className="btn btn-primary b_asignar">Asignar</button>
                </div>
            </div>
        </div>
    );
}
export default ListaPredios;