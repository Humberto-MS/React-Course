import { render, screen } from "@testing-library/react";
import { GifItem } from "../../src/components/GifItem";

describe ( 'pruebas en GifItem', () => {

    const title = 'Un titulo';
    const url = 'https://localhost/algo.jpg';

    test ( 'debe de hacer match con el snapshot', () => {
        const { container } = render ( <GifItem title={title} url={url}/> );
        expect ( container ).toMatchSnapshot();
    } );

    test ( 'debe de mostrar la imagen con el URL y el ALT indicado', () => {
        render ( <GifItem title={title} url={url}/> );
        const { src, alt } = screen.getByRole ( 'img' );
        expect ( src ).toBe ( url );
        expect ( alt ).toBe ( title );
    } );

    test ( 'debe de mostrar el titulo en el componnete', () => {
        render ( <GifItem title={title} url={url}/> );
        expect ( screen.getByText ( title ) ).toBeTruthy();
    } );
    
} );