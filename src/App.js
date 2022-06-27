import './Assets/Scss/App.css';
import {Routes, Route, Navigate } from 'react-router-dom';
import {Header, Footer, Sidebar} from "./Components";
import {Home, Login, Register, Account, Tasks, Goals, CreateGoal} from "./Pages";
import {useStateContext} from "./Contexts/ContextProvider";
import {useAuthContext} from "./Contexts/AuthContext";

function App() {
    const {isLogged} = useAuthContext();
    const {activeMenu} = useStateContext();
    return (
        <>
            <div className={'flex relative dark:bg-main-dark-bg'}>

                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                        <Sidebar/>
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar/>
                    </div>
                )}
                <div className={`dark:bg-main-bg  bg-main-bg min-h-screen w-full
                                    ${activeMenu ? 'md:ml-72' : 'flex-2'}`}>

                    <div className={'fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'}>

                        <Header/>

                    </div>

                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/login'} element={isLogged ? <Account/> : <Login/>}/>
                        <Route path={'/register'} element={isLogged ? <Account/> : <Register/>}/>
                        <Route path={'/account'} element={isLogged ? <Account/> : <Navigate to={'/login'}/> }/>
                        <Route path={'/create-goal'} element={isLogged ? <CreateGoal/> : <Navigate to={'/login'}/>}/>
                        <Route path={'/goals'} element={isLogged ? <Goals/> : <Navigate to={'/login'}/>}/>
                        <Route path={'/tasks'} element={isLogged ? <Tasks/> : <Navigate to={'/login'}/>}/>
                    </Routes>
                </div>

            </div>

            <Footer/>


        </>
    );
}

export default App;
