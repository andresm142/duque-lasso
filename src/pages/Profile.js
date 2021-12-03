
import Userlogo from './user.png';
import './components/perfil.css';
function Profile() {
    return (
        <div >

            <div className="container-fluid">
                <div className="perfil-container">
                    <div className="titulo-imagen">
                        <h1 className="titulo">CONIGURACION DEL PERFIL</h1>
                        <img src={Userlogo} alt="" style={{ width: "150px" }} />
                    </div>
                    <div className="perfil-container-form">
                        <form action="">
                            <div className="form-group1">
                                <div className="form-group">
                                    <label htmlFor="nombre_usuario">Nombre</label>
                                    <input type="text" className="form-control" id="nombre_usuario"
                                         placeholder="Nombre" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellido_usuario">Apellido</label>
                                    <input type="text" className="form-control" id="apellido_usuario"
                                         placeholder="Apellido" />
                                </div>
                            </div>
                            <div className="form-group1">
                                <div className="form-group">
                                    <label htmlFor="correo_usuario">Correo</label>
                                    <input type="email" className="form-control" id="correo_usuario"
                                         placeholder="Correo" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono_usuario">Telefono</label>
                                    <input type="number" className="form-control" id="telefono_usuario"
                                         placeholder="Telefono" />
                                </div>

                            </div>
                            <div className="form-group1">
                                <div className="form-group">
                                    <label htmlFor="contraseña_usuario">Contraseña</label>
                                    <input type="password" className="form-control" id="contraseña_usuario"
                                         placeholder="Contraseña" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmar_contraseña_usuario">Confirmar Contraseña</label>
                                    <input type="password" className="form-control" id="confirmar_contraseña_usuario"
                                         placeholder="Confirmar Contraseña" />
                                </div>
                            </div>
                            <div className="form-group-botones">
                                <input type="submit" className="btn btn-primary" value="Guardar" />
                                <button type="submit" className="btn btn-danger">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
}
export default Profile;