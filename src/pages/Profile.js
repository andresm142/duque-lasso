import Sidebars from './Sidebars';
function Profile() {
    return (
        <div className="row">
            
            <div className="col-md-3">
                <Sidebars clase={"profile"}/>
            </div>
            <div className="col-md-9">
                <h1>Profile</h1>
            </div>
        </div>
    );

}
export default Profile;