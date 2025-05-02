import { render, screen } from "@testing-library/react";
import { UserContext } from "../../src/09-useContext/context/UserContext";
import { LoginPage } from "../../src/09-useContext/LoginPage";

describe ( 'Pruebas en <LoginPage/>', () => {
    test ( 'debe de mostrar el componente sin el usuario', () => {
        render ( 
            <UserContext.Provider value={{ user: null }}>
                <LoginPage/> 
            </UserContext.Provider>
        );

        const preTag = screen.getByLabelText ( 'pre' );
        expect ( preTag.innerHTML ).toBe( 'null' );
    } );

    test ( 'debe de llamar el setUser cuando se hace click en el botón', () => {
        const setUser = jest.fn();
        const user = { id: 123, name: 'Juan', email: 'juan@google.com' };

        render ( 
            <UserContext.Provider value={{ user: null, setUser }}>
                <LoginPage/> 
            </UserContext.Provider>
        );

        const button = screen.getByRole ( 'button' );
        button.click();
        expect ( setUser ).toHaveBeenCalledWith ( user );
    } );
} );