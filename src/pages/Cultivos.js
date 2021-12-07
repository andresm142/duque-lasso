import "./components/EstilosPaginas.css";

import ListaCultivos from "./components/ListaCultivos";
function Cultivos() {

    return (
        <div >
            <div className="container container_header">
                <div className="row">
                    <div className="col-md-10 titulo">
                        Cultivos
                    </div>
                    <div className="col-md-2 btn_anadir">
                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push('/cultivos/nuevo')
                        }}>Añadir</button>

                    </div>
                </div>    
            </div>
            <ListaCultivos />
            <ListaCultivos />
            <ListaCultivos />
            <ListaCultivos />
            <ListaCultivos />
            <ListaCultivos />

        </div>

    );
}
export default Cultivos;