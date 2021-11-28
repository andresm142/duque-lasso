import './login.css'

function Login() {
    return (
        <div className="box">

            <div className="login">
                <h2>Bienvenido</h2>
                <p>Por favor ingrese sus credenciales para ingresar a su cuenta</p>
                <form >
                    <div className="inputBox">
                        <input type="email" name="email" value="" rfequired />
                        <label>Email</label>
                    </div>
                    <br />
                    <div className="inputBox">
                        <input type="password" name="password" value="" required />
                        <label>Contraseña</label>
                    </div>

                    <div className="recordar-pass">

                        <button type="button" className="show-modal">
                            ¿Olvidó su contraseña?
                        </button>

                    </div>
                    <input type="submit" name="sign-in" value="Ingresar" />
                </form>

                {/* <!--MODAL--> */}
                <div className="modal hidden">
                    {/* <!--botón para cerrar el modal--> */}
                    <button className="close-modal">&times; </button>

                    <h2>Recuperar contraseña</h2>
                    <p>Ingrese su correo para restablecer su contraseña</p>
                    <form action="" method="POST" className="form-modal">
                        <div className="inputBox">
                            <input type="email" name="recuperarEmail" value="" required
                                onkeyup="this.setAttribute('value', this.value);" />
                            <label className="lblrecuperar">Correo</label>
                        </div>
                        <input type="submit" className="enviar" value="Recuperar" />

                    </form>
                </div>
                <div className="overlay hidden"></div>

            </div>
        </div>

    );
}
export default Login;