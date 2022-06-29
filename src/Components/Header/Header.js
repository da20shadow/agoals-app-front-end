import {Link, NavLink} from "react-router-dom";
import {useStateContext} from "../../Contexts/ContextProvider";
import {AiOutlineMenu} from 'react-icons/ai';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';
import avatar from '../../Assets/img/avatar.jpg'
import UserProfile from "../UserProfile";
import {useEffect} from "react";
import {useAuthContext} from "../../Contexts/AuthContext";

function Header() {
    const {isLogged,user,logout} = useAuthContext();
    const {
        activeMenu, setActiveMenu, activeUserProfileMenu, setUserProfileMenu,
        screenSize, setScreenSize
    } = useStateContext();

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (screenSize <= 900 && isLogged) {
            setActiveMenu(false);
        } else if (isLogged) {
            setActiveMenu(true);
        }
    }, [screenSize]);

    const activeLink = 'items-center gap-2 px-3 py-2 rounded-lg  text-white bg-blue-bg text-md m-3';
    const normalLink = 'items-center gap-2 px-3 py-2 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-3';

    const processLogout = () => {
        setActiveMenu(false);
        logout();
    }

    const userNavigation = (
        <>
            <NavLink to={'/account'}
                     className={({isActive}) => isActive ? activeLink : normalLink}>
                <span className={'capitalize'}>Account</span>
            </NavLink>
            <Link to={'/login'} onClick={processLogout} >Logout</Link>
        </>
    );

    const guestNavigation = (
        <>
            <NavLink to={'/login'}
                     className={({isActive}) => isActive ? activeLink : normalLink}>
                <span className={'capitalize'}>Login</span>
            </NavLink>
            <NavLink to={'/register'}
                     className={({isActive}) => isActive ? activeLink : normalLink}>
                <span className={'capitalize'}>Register</span>
            </NavLink>
        </>
    );

    return (
        <>
            <nav className={'flex justify-between items-center p-2 md:mx-6 relative mt-1'}>

                {
                    isLogged
                        ? (<div>
                            <button onClick={() => setActiveMenu(!activeMenu)}>
                                <AiOutlineMenu size={'28px'}/>
                            </button>
                        </div>)
                        : (
                            <div> </div>
                        )
                }

                <div>
                    <NavLink to={'/'}
                             className={({isActive}) => isActive ? activeLink : normalLink}>
                        <span className={'capitalize'}>Home</span>
                    </NavLink>
                    {isLogged ? userNavigation : guestNavigation}
                </div>

                {isLogged
                    ? (<div className={'flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'}
                            onClick={() => setUserProfileMenu(!activeUserProfileMenu)}>
                        <img className={'rounded-full w-8 h-8'} src={avatar} alt="avatar"/>
                        <p>
                            <span className={'text-gray-400 text-14'}>Hi,</span>{' '}
                            <span className={'text-gray-400 font-bold ml-1 text-14'}>{user.username}</span>
                        </p>
                        <MdOutlineKeyboardArrowDown/>
                    </div>)
                    : (<div> </div>)
                }
            </nav>
            <hr/>
            {activeUserProfileMenu && <UserProfile/>}
        </>
    );
}

export default Header;