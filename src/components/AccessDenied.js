import {Link} from 'react-router-dom';

function AccessDenied() {
    return (
        <div>
            <h1>Access Denied</h1>
            <p>You do not have permission to access this page.</p>
            {/* Boton para regresar */}
            <Link to="/">
                <input type="button" className="btn btn-primary" value="Back" />
                    
                
            </Link>

        </div>
    );
}
export default AccessDenied;