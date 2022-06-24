import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Tasks from "./Pages/Tasks";
import Login from "./Pages/Login";

function App() {

    return (
        <>
            <Header />
            <Routes>
                <Route path={'/'} element={<Home />}/>
                <Route path={'/login'} element={ <Login /> }/>
                <Route path={'/register'} element={<h1>Register PAGE</h1>}/>
                <Route path={'/tasks'} element={ <Tasks /> }/>
            </Routes>

        </>
    );
}

export default App;
