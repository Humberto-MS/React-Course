import { authSlice, checkingCredentials, login, logout } from "../../../src/store";
import { authenticated_state, demo_user, initial_state, not_authenticated_state } from "../../fixtures/authFixtures";

describe ( 'Pruebas en el authSlice', () => {
    test ( 'debe de regresar el estado inicial y llamarse auth', () => {
        const state = authSlice.reducer ( initial_state, {} );
        expect ( authSlice.name ).toBe ( 'auth' );
        expect ( state ).toEqual ( initial_state );
    } );

    test ( 'debe de cambiar el estado a authenticated', () => {
        const state = authSlice.reducer ( initial_state, login ( demo_user ) );
        expect ( state ).toEqual ( authenticated_state );
    } );

    test ( 'debe de reaizar el logout', () => {
        const state = authSlice.reducer ( authenticated_state, logout() );
        expect ( state ).toEqual ( not_authenticated_state );
    } );

    test ( 'debe de realizar el logout y mostrar un mensaje de error', () => {
        const errorMessage = 'Credenciales no válidas';
        const state = authSlice.reducer ( authenticated_state, logout ( {errorMessage} ) );

        expect ( state ).toEqual ( {
            ...not_authenticated_state,
            errorMessage
        } );
    } );

    test ( 'debe de cambiar el estado a checking', () => {
        const state = authSlice.reducer ( authenticated_state, checkingCredentials() );
        expect ( state.status ).toBe ( 'checking' );
    } );
} );