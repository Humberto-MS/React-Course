import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store";
import { authenticated_state, initial_state, not_authenticated_state, test_user_credentials } from "../../fixtures";

describe ( 'Pruebas en el authSlice', () => {
    test ( 'debe de regresar el estado inicial', () => {
        expect ( authSlice.getInitialState() ).toEqual ( initial_state );
    } );

    test ( 'debe de realizar un login', () => {
        const state = authSlice.reducer ( initial_state, onLogin ( test_user_credentials ) );
        expect ( state ).toEqual ( authenticated_state );
    } );

    test ( 'debe de realizar el logout', () => {
        const state = authSlice.reducer ( authenticated_state, onLogout() );
        expect ( state ).toEqual ( not_authenticated_state );
    } );

    test ( 'debe de realizar el logout con un mensaje de error', () => {
        const errorMessage = 'Credenciales no válidas';
        const state = authSlice.reducer ( authenticated_state, onLogout ( errorMessage ) );
        expect ( state ).toEqual ({ ...not_authenticated_state, errorMessage });
    } );
    
    test ( 'debe de limpiar el mensaje de error', () => {
        const errorMessage = 'Credenciales no válidas';
        const state = authSlice.reducer ( authenticated_state, onLogout ( errorMessage ) );
        const new_state = authSlice.reducer ( state, clearErrorMessage() );
        expect ( new_state.errorMessage ).toBe ( undefined );
    } );
} );