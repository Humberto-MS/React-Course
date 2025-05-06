import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";
import { MemoryRouter, useNavigate } from "react-router-dom";

const mockedUseNavigate = jest.fn ();

jest.mock ( 'react-router-dom', () => ({
    ...jest.requireActual ( 'react-router-dom' ),
    useNavigate: () => mockedUseNavigate,
}));

describe ( 'Pruebas en <NavBar/>', () => {
    
    const contextValue = {
        logged: true,
        user: {
            name: 'Humberto Medina'
        },
        logout: jest.fn ()
    };

    beforeEach ( () => jest.clearAllMocks () );

    test ( 'debe de mostrar el nombre del usuario', () => {
        render (
            <AuthContext.Provider value={{ contextValue }}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect ( screen.getByText ( 'Humberto Medina' ) ).toBeTruthy ();
    } );

    test ( 'debe de llamar el logout y navigate cuando se hace click en el boton', () => {
        render (
            <AuthContext.Provider value={{ contextValue }}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutButton = screen.getByRole ( 'button' );
        logoutButton.click ();
        expect ( contextValue.logout ).toHaveBeenCalled ();
        expect ( mockedUseNavigate ).toHaveBeenCalledWith ( '/login', { replace: true } );
    } );
} );