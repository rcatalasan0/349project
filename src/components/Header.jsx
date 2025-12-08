import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="main-header">
            <div className="logo">Simulations & Simulacra</div>
            <nav className="main-nav">
                <div className="dropdown">
                    <button className="dropbtn">Menu ▾</button>
                    <div className="dropdown-content">
                        <Link to="/basic">Basic Probabilities</Link>
                        <Link to="/advanced">Advanced Probabilities</Link>
                        <Link to="/combinatorics">Combinatorics</Link>
                    </div>
                </div>
                <Link to="/" className="nav-link">Home</Link>
            </nav>
        </header>
    );
}
export default Header;