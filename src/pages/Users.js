import axios from "axios";
import "./components/EstilosPaginas.css";
import ListaUsuarios from "./components/ListaUsuarios";
import { useEffect, useState } from 'react';



function Users() {
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  const limit = 1;

  const body = {
    page: page,
    limit: limit
  };
  const token = JSON.parse(localStorage.getItem('token'));
  const api_url = "http://localhost:9000/users/all?" +
    limit + "&" +
    "offset=" + ((page-1) * limit);
  const headers = {
    headers: {
      Authorization: `Bearer ${token.token}`
    }
  };
  console.log(headers);
  const obtenerUsuarios = async () => {
    try {
      await axios.get(api_url, headers)

        .then(res => {
          console.log(res.data);
          setUsuarios(res.data);
          setTotalElements(res.data.totalElements);
          setShowLoading(false);
        })
        .catch(error => {
          if (error.response) {

            alert(error.response.data.message);
          } else {
            alert("Error, contacte con el administrador");
          }

        });
    } catch (error) {
      console.log(error);
    }


  };
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    obtenerUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


  const listaUsuarios = usuarios.map(user => (

    <ListaUsuarios
      key={user.id}
      {...user}
    />
  )
  );

  // usuarios1();

  return (
    <div>
      <div className="container container_header">
        <div className="row">
          <div className="col-md-10 titulo">
            Usuarios
          </div>
          <div className="col-md-2 btn_anadir">
            <button className="btn btn-primary" onClick={() => {
              this.props.history.push('/predios/nuevo')
            }}>Añadir</button>

          </div>
        </div>
      </div>
      <div className="container header_titulos">
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-2">
            <div className="titulo_nombre">
              Nombre de usuario
            </div>
          </div>
          <div className="col-md-2">
            <div className="titulo_nombre">
              Tipo de usuario
            </div>
          </div>
          <div className="col-md-4">
            <div className="titulo_nombre">
              Correo
            </div>
          </div>
          <div className="col-md-2">
            <div className="btn_acciones">
            </div>
          </div>
        </div>
      </div>
      {listaUsuarios}

    </div>

  );
}
export default Users;