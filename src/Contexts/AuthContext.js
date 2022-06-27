import {createContext, useContext, useState} from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';

const initialAuthState = {
    id: '',
    email: '',
    username: '',
    token: '',
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', initialAuthState);
    const [isLogged,setIsLogged] = useState(false);

    const login = (authData) => {
        setUser(authData);
        setIsLogged(true);
    }

    const logout = () => {
        setUser(initialAuthState);
        setIsLogged(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
}