import { render } from "@testing-library/react";
import { FirstApp } from "../src/FirstApp";

describe ( 'Pruebas en FirstApp', () => {
    // test ( 'debe de hacer match con el snapshot', () => {
    //     const title = 'Hola, soy Goku';
    //     const { container } = render ( <FirstApp title={title}/> );
    //     expect ( container ).toMatchSnapshot();
    // } );

    test ( 'debe de mostrar el titulo en un h1', () => {
        const title = 'Hola, soy Goku';
        const { container, getByText, getByTestId } = render ( <FirstApp title={title}/> );
        expect ( getByText ( title ) ).toBeTruthy();
        // const h1 = container.querySelector ( 'h1' );
        // expect ( h1.innerHTML ).toContain ( title );
        expect ( getByTestId ( 'test-title' ).innerHTML ).toContain ( title );
    } );

    test ( 'debe de mostrar el subtitulo enviado por props', () => {
        const title = 'Hola, soy Goku';
        const subtitle = 'Soy un subtitulo';
        const { getByText } = render ( <FirstApp title={title} subtitle={subtitle}/> );
        expect ( getByText ( subtitle ) ).toBeTruthy();
    } );
} );