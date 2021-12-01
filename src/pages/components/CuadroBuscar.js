// import "./Search.js";
import "./styleSearch.css";
function CuadroBuscar() {
    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");
    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
    });

    optionsList.forEach(o => {
        o.addEventListener("click", () => {
            selected.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active");
            var nombre = document.querySelector(".selected").textContent;
            document.getElementById("inputSelectedSearch").value = nombre;

        });
    });
    
    return (
        <div className="buscar">
            <div className="container-tipo-de-busqueda">
                <div className="select-box">
                    <div className="options-container">
                        <div className="option">
                            <input type="radio" className="radio" id="search-proveedores" name="category" value="auto" />
                            <label for="search-proveedores">Proveedores</label>
                        </div>
                        <div className="option">
                            <input type="radio" className="radio" id="search-productos" name="category" />
                            <label for="search-productos">Productos</label>
                        </div>
                    </div>
                    <div className="selected">
                        Proveedores
                    </div>
                </div>
                <input type="hidden" id="inputSelectedSearch" name="selectedSearch" value="Proveedores" />
            </div>
            <input className="search" type="search" id="search" placeholder="Buscar" name="txtsearch" />
            <i className="fa fa-search" id="lupa"></i>
        </div>
    );
}
export default CuadroBuscar;