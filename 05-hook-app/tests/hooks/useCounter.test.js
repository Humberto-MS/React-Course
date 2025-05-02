import { act, renderHook } from "@testing-library/react";
import { useCounter } from "../../src/hooks/useCounter";

describe ( 'Pruebas en el useCounter', () => {
    test ( 'debe de retornar los valores por defecto', () => {
        const { result } = renderHook ( () => useCounter() );
        const { counter, decrement, increment, reset } = result.current;
        expect ( counter ).toBe ( 10 );
        expect ( decrement ).toEqual ( expect.any ( Function ) );
        expect ( increment ).toEqual ( expect.any ( Function ) );
        expect ( reset ).toEqual ( expect.any ( Function ) );
    } );

    test ( 'debe de generar el counter con el valor de 100', () => {
        const { result } = renderHook ( () => useCounter ( 100 ) );
        const { counter } = result.current;
        expect ( counter ).toBe ( 100 );
    } );

    test ( 'debe de incrementar el counter', () => {
        const { result } = renderHook ( () => useCounter ( 100 ) );
        const { increment } = result.current;
        act ( () => increment () );
        const { counter } = result.current;
        expect ( counter ).toBe ( 101 );
    } );

    test ( 'debe de decrementar el counter', () => {
        const { result } = renderHook ( () => useCounter ( 100 ) );
        const { decrement } = result.current;
        act ( () => decrement () );
        const { counter } = result.current;
        expect ( counter ).toBe ( 99 );
    } );

    test ( 'debe de resetear el counter', () => {
        const { result } = renderHook ( () => useCounter ( 100 ) );
        const { increment, reset } = result.current;
        
        act ( () => {
            increment ();
            reset ();
        } );

        const { counter } = result.current;
        expect ( counter ).toBe ( 100 );
    } );
} );