import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { LoginPage } from "../../../src/auth";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store";
import { MemoryRouter } from "react-router-dom";
import { not_authenticated_state } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock ( '../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,

    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword ({ email, password });
    }
}));

jest.mock ( 'react-redux', () => ({
    ...jest.requireActual ( 'react-redux' ),
    useDispatch: () => ( fn ) => fn()
}));

const store = configureStore ({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: not_authenticated_state
    }
});

describe ( 'Pruebas en el <LoginPage/>', () => {

    beforeEach ( () => jest.clearAllMocks() );

    test ( 'debe de mostrar el componente correctamente', () => {
        render (
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        expect ( screen.getAllByText ( 'Login' ).length ).toBeGreaterThanOrEqual ( 1 );
    } );

    test ( 'boton de google debe de llamar el startGoogleSignIn', () => {
        render (
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const google_btn = screen.getByLabelText ( 'google-btn' );
        fireEvent.click ( google_btn );
        expect ( mockStartGoogleSignIn ).toHaveBeenCalled();
    } );

    test ( 'submit debe de llamar startLoginWithEmailAndPassword', () => {
        
        const email = 'humberto@google.com';
        const password = '123456';
        
        render (
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const email_field = screen.getByRole ( 'textbox', { name: 'Correo' } );
        fireEvent.change ( email_field, { target: { name: 'email', value: email } } );
        const password_field = screen.getByTestId ( 'password' );
        fireEvent.change ( password_field, { target: { name: 'password', value: password } } );
        const form = screen.getByLabelText ( 'submit-form' );
        fireEvent.submit ( form );
        expect ( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith ( { email, password } );
    } );
} );