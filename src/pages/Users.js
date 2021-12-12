import axios from "axios";
import "./components/EstilosPaginas.css";
import ListaUsuarios from "./components/ListaUsuarios";
import { Fragment, useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import Paginator from "./components/Paginator";
import FormNewUser from "./components/FormNewUser";


function Users() {
  
  const [paramModal, setParamModal] = useState({
    titulo: "",
    mostrar: false,
    modo: "",
    onGuardar: null,
    onCancelar: null,
    usuario: null

  });

  const onGuardarUsusario = (usuario,modo) => {
    console.log(modo);
    console.log(usuario);
    if (modo === "nuevo") {
      axios.post("http://localhost:9000/users/new", usuario)

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
      axios.put(`http://localhost:9000/users/edit/${usuario._id}`, usuario,
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
    const usuarioActual = JSON.parse(localStorage.getItem("datosUser"));
    if (usuario === usuarioActual.id) {
      alert("No puede eliminar su propio usuario");
      return;
    }
    // Pedir confirmacion y eliminar
    if (window.confirm("¿Está seguro de eliminar el usuario?")) {
      axios.delete(`http://localhost:9000/users/delete/${usuario}`,
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

  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  const limit = 1;

  const token = JSON.parse(localStorage.getItem('token'));
  const api_url = "http://localhost:9000/users/all?page=" +
    page +
    "&limit=" +
    limit;

  const headers = {
    headers: {
      Authorization: `Bearer ${token.token}`
    }
  };

  const obtenerUsuarios = async () => {
    try {
      await axios.get(api_url, headers)

        .then(res => {

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
      key={user._id}
      editarUsuario={onEditarUsuario}
      eliminarUsuario={onEliminarUsuario}
      {...user}

    />
  )
  );

  return (
    <Fragment>
      <div className="container container_header">
        <div className="row">
          <div className="col-md-10 titulo">
            Usuarios
          </div>
          <div className="col-md-2 btn_anadir">
            <button className="btn btn-primary" onClick={onAnadirUsuario}>Añadir</button>

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
      <div className="d-flex justify-content-center">
        <Paginator />
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