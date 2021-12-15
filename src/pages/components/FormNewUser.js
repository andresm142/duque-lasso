import { useState } from 'react';
function FormNewUser(props) {

    // Nuevo usuario 
    const userLimpio = {
        id: '',
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        rol: "Admin",
        contrasena: ""
    };
    // Funcion para cuando cambia el valor del input
    const onInputChange = function (evt) {
        const p = { ...userState };
        p[evt.target.name] = evt.target.value;
        setUserState(p);
    }



    const valorEstado = (props.modo !== "nuevo" ? { ...props.usuario } : userLimpio);
    const [userState, setUserState] = useState(valorEstado);

    const onFormSubmit = function (evt) {
        evt.preventDefault();
        props.onGuardar(userState, props.modo);
        setUserState(userLimpio);
        props.onCancelar();
    }
    return (
        <form onSubmit={onFormSubmit}>
            
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={userState.nombre} onChange={onInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input type="text" className="form-control" id="apellido" name="apellido" value={userState.apellido} onChange={onInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="correo">Correo</label>
                <input type="text" className="form-control" id="correo" name="email" value={userState.email} onChange={onInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="telefono">Telefono</label>
                <input type="text" className="form-control" id="telefono" name="telefono" value={userState.telefono} onChange={onInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="rol">Rol</label>
                <select className="form-control header_text_input" id="rol" name="rol" value={userState.rol} onChange={onInputChange}>
                    <option value="Admin">Administrador</option>
                    <option value="userConfig">Usuario de configuración</option>
                    <option value="userGestion">Usuario de gestión</option>
                </select>
            </div>

            {/* Si es usuario nuevo se muestra, si no, esta oculto */}
            {props.modo === "nuevo" ?
                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input type="password" className="form-control" id="contrasena" name="contrasena" value={userState.contrasena} onChange={onInputChange} />
                </div>
                : null}

            <div className="form-group text-center">
                <button type="submit" className="btn btn-primary m-2">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={props.onCancelar}>Cancelar</button>
            </div>
        </form>

    );
}
export default FormNewUser;