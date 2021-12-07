import UserLogo from "../user.png"
function ListaUsuarios() {
    return (
        <div>
            <div className="container header_detalles">
                <div className="row">
                    <div className="col-md-2 logo_user">
                        <img src={UserLogo} alt="User" className="img-fluid" />
                    </div>
                    <div className="col-md-2 detalles">
                        <div className="titulo_nombre_detalles">
                        Lorem ipsum
                        </div>
                    </div>
                    <div className="col-md-2 detalles">
                        <div className="titulo_nombre_detalles">
                            Usuario final
                        </div>
                    </div>
                    <div className="col-md-4 detalles">
                        <div className="titulo_nombre_detalles">
                            Correo@loremipsum.com
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