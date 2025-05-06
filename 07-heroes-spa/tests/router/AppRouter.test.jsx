import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";

describe ( 'Pruebas en <AppRouter/>', () => {
    test ( 'debe de mostrar el login si no está autenticado', () => {

        const contextValue = {
            logged: false,
        }

        render (
            <AuthContext.Provider value={{ contextValue }}>
                <MemoryRouter initialEntries={["/marvel"]}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect ( screen.getAllByText ( "Login" ).length ).toBe(2);
    } );

    test ( 'debe de mostrar el componente de Marvel si está autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: "ABC",
                name: "Fernando"
            }
        }

        render (
            <MemoryRouter initialEntries={["/login"]}>
                <AuthContext.Provider value={{ contextValue }}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        expect ( screen.getAllByText ( "Marvel" ).length ).toBeGreaterThanOrEqual(1);
    } );
} );