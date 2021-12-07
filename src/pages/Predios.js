import ListaPredios from "./components/ListaPredios";
import "./components/EstilosPaginas.css";

function Predios() {
    return (
        <div>
            <div className="container container_header">
                <div className="row">
                    <div className="col-md-10 titulo">
                        Predios
                    </div>
                    <div className="col-md-2 btn_anadir">
                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push('/predios/nuevo')
                        }}>Añadir</button>

                    </div>
                </div>
            </div>
            <ListaPredios/>
            <ListaPredios/>
            <ListaPredios/>
            <ListaPredios/>
        </div>
    );
}
export default Predios;