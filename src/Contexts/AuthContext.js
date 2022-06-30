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

    const login = (authData) => {
        setUser(authData);
    }

    const logout = () => {
        setUser(initialAuthState);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLogged: !!user.email }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
}