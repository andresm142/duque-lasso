import UserLogo from "../user.png"
import { useState, useEffect } from "react";
function ListaUsuarios({ editarUsuario, eliminarUsuario, ...props }) {

    const onEliminarUsuario = () => {
        eliminarUsuario(props._id)
    }
    const onEditarUsuario = () => {
        editarUsuario(props)
    }

    const [rol, setRol] = useState(props.rol);

    useEffect(() => {
        if (props.rol === "Admin") {
            setRol("Administrador")
        } else if (props.rol === "userConfig") {
            setRol("Usuario de configuración")
        } else if (props.rol === "userGestion") {
            setRol("Usuario de gestión")
        }
    }, [props.rol])

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
                            {rol}
                        </div>
                    </div>
                    <div className="col-md-4 detalles">
                        <div className="titulo_nombre_detalles">
                            {props.email}
                        </div>
                    </div>
                    <div className="col-md-2 btns_acciones">
                        <div>
                            <button className="btn btn-primary m-2" onClick={onEditarUsuario}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger" onClick={onEliminarUsuario}>
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