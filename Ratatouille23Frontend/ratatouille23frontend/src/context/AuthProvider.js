import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        if(localStorage.getItem('token') && JSON.parse(localStorage.getItem('dipendente')))
            setAuth({dipendente: JSON.parse(localStorage.getItem('dipendente')), token: localStorage.getItem('token')});
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;