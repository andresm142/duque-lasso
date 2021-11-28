import Sidebars from './Sidebars';
function Cultivos() {

    return (
        <div className="row">
            
            <div className="col-md-3">
                <Sidebars clase={"cultivos"} />
            </div>
            <div className="col-md-9">
                <h1>Cultivos</h1>
            </div>
        </div>
    );
}
export default Cultivos;