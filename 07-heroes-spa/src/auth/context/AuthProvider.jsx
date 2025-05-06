import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer";
import { types } from "../types/types";

const init = () => {
    const user = JSON.parse ( localStorage.getItem ( 'user' ) );
    return { logged: !!user, user }
}

export const AuthProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer ( authReducer, {}, init );

    const onLogin = ( name = '' ) => {
        const user = { id: 'ABC123', name };
        localStorage.setItem ( 'user', JSON.stringify ( user ) );

        dispatch ( {
            type: types.login,
            payload: user
        } );
    }

    const onLogout = () => {
        localStorage.removeItem ( 'user' );
        dispatch ( { type: types.logout } );
    }

    return (
        <AuthContext.Provider value={{ login: onLogin, logout: onLogout, ...state }}>
            {children}
        </AuthContext.Provider>
    )
}