import axios from "axios";
import "./components/EstilosPaginas.css";
import ListaUsuarios from "./components/ListaUsuarios";
import { Fragment, useEffect, useState } from 'react';
import { Modal, Spinner } from "react-bootstrap";
import FormNewUser from "./components/FormNewUser";
import Paginacion from "./components/Pagination";
import BASE_URL from "../services/.config";

const usuarioActual = JSON.parse(localStorage.getItem("datosUser"));

function Users() {

  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const limit = 10;

  const token = JSON.parse(localStorage.getItem('token'));
  const api_url = BASE_URL + "users/all?page=" +
    page +
    "&limit=" +
    limit;

  const [paramModal, setParamModal] = useState({
    titulo: "",
    mostrar: false,
    modo: "",
    onGuardar: null,
    onCancelar: null,
    usuario: null

  });

  const onGuardarUsusario = (usuario, modo) => {
    console.log(modo);
    console.log(usuario);
    if (modo === "nuevo") {
      axios.post(BASE_URL + "users/new", usuario,
        {
          headers: {
            Authorization: 'Bearer ' + token.token
          }
        })

        .then(res => {
          console.log(res);
          alert("Usuario creado");
          // obtener el id del usuario creado
          const id = res.data.id;
          // rerenderizar la lista de usuarios con el nuevo usuario
          const nuevoUsuario = {
            _id: id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            rol: usuario.rol
          };
          setUsuarios([...usuarios, nuevoUsuario]);

        })
        .catch(err => {
          if (err.response) {

            alert(err.response.data.message);
          } else {
            alert("Error, contacte con el administrador");
          }
          console.log(err);

        });


    };
    if (modo === "editar") {

      if (usuario._id === usuarioActual.id) {
        alert("No puede editar su propio usuario");
        return;
      }

      axios.put(`${BASE_URL}users/edit/${usuario._id}`, usuario,
        {
          headers: {
            Authorization: 'Bearer ' + token.token
          }
        })
        .then(res => {

          alert("Usuario editado");
          // rerenderizar la lista de usuarios
          setUsuarios(usuarios.map(u => u._id === usuario._id ? usuario : u));

        })
        .catch(err => {
          if (err.response) {

            alert(err.response.data.message);
          } else {
            alert("Error, contacte con el administrador");
          }
          console.log(err);

        });

    };
  };

  const onAnadirUsuario = () => {
    const paramNuevos = { ...paramModal };
    paramNuevos.mostrar = true;
    paramNuevos.modo = "nuevo";
    paramNuevos.titulo = "Agregar Usuario";
    paramNuevos.onGuardar = onGuardarUsusario;
    setParamModal(paramNuevos);

  }

  const onEditarUsuario = (usuario) => {
    const paramNuevos = { ...paramModal };
    paramNuevos.mostrar = true;
    paramNuevos.modo = "editar";
    paramNuevos.titulo = "Editar Usuario";
    paramNuevos.onGuardar = onGuardarUsusario;
    paramNuevos.usuario = usuario;
    setParamModal(paramNuevos);

  }


  const onEliminarUsuario = (usuario) => {
    // comprobar si el usuario es el mismo que esta logueado

    if (usuario === usuarioActual.id) {
      alert("No puede eliminar su propio usuario");
      return;
    }
    // Pedir confirmacion y eliminar
    if (window.confirm("¿Está seguro de eliminar el usuario?")) {
      axios.delete(`${BASE_URL}users/delete/${usuario}`,
        {
          headers: {
            Authorization: 'Bearer ' + token.token
          }
        })
        .then(res => {
          alert("Usuario eliminado");
          // rerenderizar la lista de usuarios
          setUsuarios(usuarios.filter(u => u._id !== usuario));

        })
        .catch(err => {
          if (err.response) {

            alert(err.response.data.message);
          } else {
            alert("Error, contacte con el administrador");
          }
          console.log(err);

        });
    }

  }

  const onCancelarModal = () => {
    const paramNuevos = { ...paramModal };
    paramNuevos.mostrar = false;
    setParamModal(paramNuevos);
  }

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("paginaActiva", JSON.stringify({
      home: "nav_link text-white",
      cultivos: "nav_link text-white",
      predios: "nav_link text-white",
      users: "nav_link active text-white",
      gestion: "nav_link text-white",
      profile: "nav_link nav-link dropdown-toggle ml-1 d-flex text-white",
      coniguracion: "nav_link text-white",
      accessDenied: "nav_link text-white",
      pageNotFound: "nav_link text-white"
    }));

    setShowLoading(true);
    try {
      axios.get(api_url, {
        headers: {
          Authorization: 'Bearer ' + token.token
        }
      })

        .then(res => {

          setUsuarios(res.data.usuarios);
          setTotalElements(res.data.totalElements);
          setShowLoading(false);
        })
        .catch(error => {
          if (error.response) {

            // alert(error.response.data.message);
            if (error.response.status === 401) {
              window.location.href = "/accessDenied";
            }
            setShowLoading(false);
          } else {
            alert("Error, contacte con el administrador");

            setShowLoading(false);
          }

        });
    } catch (error) {
      console.log(error);
    }

  }, [api_url, token.token]);

  //   const paginaActual= sessionStorage.getItem("paginaActiva");
  // console.log(paginaActual);



  const listaUsuarios = usuarios.map(user => (

    <ListaUsuarios
      key={user._id}
      editarUsuario={onEditarUsuario}
      eliminarUsuario={onEliminarUsuario}
      {...user}

    />
  )
  );
  const handlePageClick = (e) => {
    setPage(e);
  }

  return (
    <Fragment>

      <div className="container container_header">
        <div className="row">
          <div className="col-md-10 titulo">
            Usuarios
          </div>
          <div className="col-md-2 btn_anadir">
            {usuarioActual.rol === "admin" ?
              <button className="btn btn-primary" onClick={onAnadirUsuario}>Añadir</button>
              : null}
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
      {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> :
        listaUsuarios
      }

      <div className="d-flex justify-content-center mt-2 ">
        <Paginacion itemsPerPage={limit} totalItems={totalElements} onChange={handlePageClick} />
      </div>
      <Modal show={paramModal.mostrar} onHide={onCancelarModal}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{paramModal.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormNewUser modo={paramModal.modo}
            onGuardar={paramModal.onGuardar}
            onCancelar={onCancelarModal}
            usuario={paramModal.usuario}

          />
        </Modal.Body>

      </Modal>
    </Fragment>

  );
}
export default Users;