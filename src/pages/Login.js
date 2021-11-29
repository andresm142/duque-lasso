import './style.css'

import Logo from './logo.jpeg';

import { Link } from "react-router-dom";
function Login() {
  return (
    <section className="row form-02-main p-3">


      <div className="col-md-6">
        <div className="p-3">
          <img src={Logo} alt="logo" style={{ width: "150px"}} className="img-rounded"/>
        </div>
      </div>


      <div className="col-md-6 container" >
        <div className="row">
          <div className="col-md-12">
            <div className="_lk_de">
              <div className="form-03-main">

                <h2>Bienvenido</h2>
                <div className="form-group">
                  <input type="email" name="email" className="form-control _ge_de_ol" placeholder="Enter Email" required="" aria-required="true" />
                </div>

                <div className="form-group">
                  <input type="password" name="password" className="form-control _ge_de_ol" placeholder="Enter Password" required="" aria-required="true" />
                </div>

                <div className="checkbox form-group">

                  <a href="none">¿Olvidaste tu contraseña?</a>
                </div>

                <div className="form-group">

                  <Link to="/home" className="_btn_04">
                    Login
                  </Link>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
export default Login;