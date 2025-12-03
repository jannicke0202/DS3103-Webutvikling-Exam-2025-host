import { Link } from "react-router-dom";

const PageNavigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="administration-page">Admin</Link></li>
                
            </ul>
        </nav>
    )
}

export default PageNavigation;