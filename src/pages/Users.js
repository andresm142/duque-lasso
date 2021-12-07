import "./components/EstilosPaginas.css";
import ListaUsuarios from "./components/ListaUsuarios";

function Users() {
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
      <ListaUsuarios />
      <ListaUsuarios />
      <ListaUsuarios />
      <ListaUsuarios />
      <ListaUsuarios />
      <ListaUsuarios />
      <ListaUsuarios />
      <ListaUsuarios />
      <ListaUsuarios />
      <ListaUsuarios />
      <ListaUsuarios />
      <ListaUsuarios />
    </div>

  );
}
export default Users;