import UserLogo from "../user.png"
function ListaUsuarios(props) {
    return (
        <div>
            <div className="container header_detalles">
                <div className="row">
                    <div className="col-md-2 logo_user">
                        <img src={UserLogo} alt="User" className="img-fluid" />
                    </div>
                    <div className="col-md-2 detalles">
                        <div className="titulo_nombre_detalles">
                        {props.nombre} {props.apellido}
                        </div>
                    </div>
                    <div className="col-md-2 detalles">
                        <div className="titulo_nombre_detalles">
                            {props.rol}
                        </div>
                    </div>
                    <div className="col-md-4 detalles">
                        <div className="titulo_nombre_detalles">
                            {props.email}
                        </div>
                    </div>
                    <div className="col-md-2 btns_acciones">
                        <div>
                            <button className="btn btn-primary m-2">
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger">
                                <i className="fas fa-trash-alt"></i>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ListaUsuarios;