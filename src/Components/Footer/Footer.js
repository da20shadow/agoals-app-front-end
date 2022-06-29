import {Link} from "react-router-dom";

function Footer(){
    const date = new Date();

    return(
        <footer className={'bg-secondary-dark-bg mx-auto h-16'}>
            <p className={'text-center text-light-gray'}>
                copyright &copy;
                <a href='https://github.com/da20shadow' target="_blank"> da20shadow </a>
                {date.getFullYear()}
            </p>
        </footer>
    )
}
export default Footer;