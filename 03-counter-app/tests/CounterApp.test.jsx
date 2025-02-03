import { fireEvent, render, screen } from "@testing-library/react";
import { CounterApp } from "../src/CounterApp";

describe ( 'Pruebas en CounterApp', () => {
    test ( 'debe de hacer match con el snapshot', () => {
        const { container } = render ( <CounterApp value={7}/> );
        expect ( container ).toMatchSnapshot();
    } );

    test ( 'debe de mostrar el valor por defecto de 100', () => {
        render ( <CounterApp value={100}/> );
        expect ( screen.getByText ( '100' ) ).toBeTruthy();
    } );

    test ( 'debe de incrementar con el botón +1', () => {
        render ( <CounterApp value={100}/> );
        fireEvent.click ( screen.getByText ( '+1' ) );
        expect ( screen.getByText ( '101' ) ).toBeTruthy();
    } );

    test ( 'debe de decrementar con el botón -1', () => {
        render ( <CounterApp value={100}/> );
        fireEvent.click ( screen.getByText ( '-1' ) );
        expect ( screen.getByText ( '99' ) ).toBeTruthy();
    } );

    test ( 'debe de colocar el valor por defecto con el btn reset', () => {
        render ( <CounterApp value={100}/> );
        fireEvent.click ( screen.getByText ( '+1' ) );
        fireEvent.click ( screen.getByText ( '+1' ) );
        fireEvent.click ( screen.getByText ( '+1' ) );
        // fireEvent.click ( screen.getByText ( 'Reset' ) );
        fireEvent.click ( screen.getByRole ( 'button', { name: 'btn-reset' } ) );
        expect ( screen.getByText ( '100' ) ).toBeTruthy();
    } );
} );