import Sidebars from './Sidebars';
import { useState } from "react";

function Home() {

    const [sizeBar, setSizeBar] = useState({
        width: 280
    });

    const reSizeBar = function () {
        const resize = {sizeBar};
        if (sizeBar.width === 280) {
            resize.width = 200;
        }else{
            resize.width = 280;
        }
        setSizeBar(resize);
    }

    return (
        <div className="row">
            
            <button onClick={reSizeBar} > cambiar</button>

            <div className="col-md-3">
                <Sidebars clase={"home"} sizeBar={sizeBar}/>
            </div>
            <div className="col-md-9">
                <h1>Home</h1>
                
            </div>
        </div>

    );
}
export default Home;