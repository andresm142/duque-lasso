import {Link} from 'react-router-dom';

function AccessDenied() {
    return (
        <div className="p-4">
            <h1>Access Denied</h1>
            <p>You do not have permission to access this page.</p>
            {/* Boton para regresar */}
            <Link to="/">
                <input type="button" className="btn btn-primary m-2" value=" <=  Back  " />
                    
                
            </Link>

        </div>
    );
}
export default AccessDenied;