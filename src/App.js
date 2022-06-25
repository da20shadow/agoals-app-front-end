import {Routes, Route} from 'react-router-dom';
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Tasks from "./Pages/Tasks";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {

    return (
        <>
            <Header />
            <Routes>
                <Route path={'/'} element={<Home />}/>
                <Route path={'/login'} element={ <Login /> }/>
                <Route path={'/register'} element={ <Register/> }/>
                <Route path={'/tasks'} element={ <Tasks /> }/>
            </Routes>

        </>
    );
}

export default App;
