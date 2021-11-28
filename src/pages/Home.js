import Sidebars from './Sidebars';
function Home() {
    return (
        <div className="row">
            
            <div className="col-md-3">
                <Sidebars clase={"home"}/>
            </div>
            <div className="col-md-9">
                <h1>Home</h1>
                
            </div>
        </div>

    );
}
export default Home;