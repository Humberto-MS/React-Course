import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe ( 'Pruebas en el authReducer', () => {

    const initialState = {
        logged: false,
    };

    test ( 'debe de retornar el estado por defecto', () => {
        const new_state = authReducer ( initialState, {} );
        expect ( new_state ).toEqual ( initialState );
    } );

    test ( 'debe de (login) llamar el login, autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                id: 123,
                name: 'Humberto',
            },
        };

        const new_state = authReducer ( initialState, action );

        expect ( new_state ).toEqual ( {
            logged: true,
            user: action.payload,
        } );
    } );

    test ( 'debe de (logout) borrar el name del usuario y logged en false', () => {
        const state = {
            logged: true,
            user: {
                id: 123,
                name: 'Humberto',
            },
        };
        
        const action = {
            type: types.logout,
        };

        const new_state = authReducer ( state, action );

        expect ( new_state ).toEqual ( {
            logged: false,
        } );
    } );
} );