import Logo from "../logo.png";
import { Fragment} from 'react';
import axios from 'axios';
import BASE_URL from "../../services/.config";

const url=BASE_URL+'cultivos/';


function ListaCultivos(props) {
    console.log(props);
    const token = JSON.parse(localStorage.getItem('token'));
    const onDetalles =()=>{
        
        window.location.href = "/cultivos/detalles?id="+props._id;
        
    }
    
    const onEditar =()=>{
        window.location.href = "/cultivos/edit/"+props._id;
    }

    const onEliminar =()=>{
        if (window.confirm("¿Esta seguro de eliminar este cultivo?")) {
            axios.delete(url+'delete/'+props._id,
            {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
            .then(res => {
                alert("Eliminado");
                window.location.reload();
            })
            .catch(err => {
                if (err.response) {

                    alert(err.response.data.message);
                  } else {
                    alert("Error, contacte con el administrador");
                  }
            });
        }
                
    }

    return (
        <Fragment>
            <div className="container lista_cultivos">
                <div className="row">
                    <div className="col-md-3 logo">
                        <div className="header_img">
                            <img src={Logo} alt="logo" />
                        </div>
                    </div>

                    <div className="col-md-7 nombre_descripcion">
                        <div className="nombre">
                            {props.nombre}
                        </div>
                        <div className="descripcion">
                            {props.descripcion}
                            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. */}
                        </div>

                    </div>

                    <div className="col-md-2 btn_acciones">
                        <button className="btn btn-primary"onClick={onEditar}>Editar</button>
                        <button className="btn btn-danger" onClick={onEliminar}>Eliminar</button>
                        <button className="btn btn-primary" onClick={onDetalles}>Ver más</button>
                        {/* Boton para ir a la pagina cultivosDetalles */}
                        
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
export default ListaCultivos;