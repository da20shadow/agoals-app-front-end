import { Link } from "react-router-dom";

function Header(){

    return(
        <nav className={'top-navbar'}>
            <Link to={'/'} >Home</Link>
            <Link to={'/login'} >Login</Link>
            <Link to={'/register'} >Register</Link>
            <Link to={'/tasks'} >Tasks</Link>
        </nav>
    );
}
export default Header;