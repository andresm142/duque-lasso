function Paginator() {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href="none">Previous</a></li>
                <li className="page-item"><a className="page-link" href="none">1</a></li>
                <li className="page-item"><a className="page-link" href="none">2</a></li>
                <li className="page-item"><a className="page-link" href="none">3</a></li>
                <li className="page-item"><a className="page-link" href="none">Next</a></li>
            </ul>
        </nav>
    );
}
export default Paginator;