import {Link, NavLink} from 'react-router-dom';
import {CgGoogleTasks, CgClose} from 'react-icons/cg';
import {GiStairsGoal} from 'react-icons/gi';
import {GoPlus} from 'react-icons/go';
import {FaMoneyBillWave} from 'react-icons/fa';
import {useStateContext} from "../../Contexts/ContextProvider";

function Sidebar() {
    const {activeMenu, setActiveMenu, screenSize} = useStateContext();


    const handleCloseSideBar = () => {
        if (activeMenu && screenSize <= 900){
            setActiveMenu(false);
        }
    }
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white bg-blue-bg text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    return (

        <div className="ml-3 h-screen md:overflow-hidden
                    overflow-auto md:hover:overflow-auto pb-10">
            {
                activeMenu && (
                    <>
                        <div className={'flex justify-between items-center'}>
                            <Link to={'/'}
                                  className={'items-center gap-3 ml-3 mt-4 flex text-xl ' +
                                  'font-bold tracking-tight dark:text-white text-slate-900'}
                                onClick={handleCloseSideBar} >
                                <CgGoogleTasks size={'38px'}/><span>LOGO</span>
                            </Link>

                            <button className={'text-xl rounded-full p-3 hover:bg-light-gray mt-4 block'}
                                    onClick={() => setActiveMenu(false)}>
                                <CgClose/>
                            </button>
                        </div>
                        <nav className={'mt-10'}>

                            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">Goals</p>

                            <NavLink to={'/create-goal'}
                                     className={({isActive}) => isActive ? activeLink : normalLink}
                                     onClick={handleCloseSideBar} >
                                <GoPlus/>
                                <span className={'capitalize'}>New Goal</span>
                            </NavLink>

                            <NavLink to={'/goals'}
                                     className={({isActive}) => isActive ? activeLink : normalLink}
                                     onClick={handleCloseSideBar} >
                                <GiStairsGoal/>
                                <span className={'capitalize'}>All Goals</span>
                            </NavLink>

                            <NavLink to={'/financial-goals'}
                                     className={({isActive}) => isActive ? activeLink : normalLink}
                                     onClick={handleCloseSideBar} >
                                <FaMoneyBillWave/>
                                <span className={'capitalize'}>Financial goals</span>
                            </NavLink>


                            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">Tasks</p>
                            <NavLink to={'/tasks'}
                                     className={({isActive}) => isActive ? activeLink : normalLink}
                                     onClick={handleCloseSideBar} >
                                <GiStairsGoal/>
                                <span className={'capitalize'}>Tasks</span>
                            </NavLink>

                        </nav>
                    </>
                )
            }
        </div>
    )
}

export default Sidebar;