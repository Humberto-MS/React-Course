import { act, renderHook } from "@testing-library/react";
import { useForm } from "../../src/hooks/useForm";

describe ( 'Pruebas en el useForm', () => {

    const initial_form = {
        name: 'Humberto',
        email: 'humberto@google.com'
    }

    test ( 'debe de regresar los valores por defecto', () => {
        const { result } = renderHook ( () => useForm ( initial_form ) );

        expect ( result.current ).toEqual ( {
            name: initial_form.name,
            email: initial_form.email,            
            formState: initial_form,
            onInputChange: expect.any( Function ),
            onResetForm: expect.any( Function )
        } );
    } );

    test ( 'debe de cambiar el nombre del formulario', () => {
        const { result } = renderHook ( () => useForm ( initial_form ) );
        const { onInputChange } = result.current;

        act ( () => {
            onInputChange ( { target: { name: 'name', value: 'Fernando' } } );
        } );

        expect ( result.current.name ).toBe ( 'Fernando' );
        expect ( result.current.formState.name ).toBe ( 'Fernando' );
    } );

    test ( 'debe de resetear el formulario', () => {
        const { result } = renderHook ( () => useForm ( initial_form ) );
        const { onInputChange, onResetForm } = result.current;

        act ( () => {
            onInputChange ( { target: { name: 'name', value: 'Fernando' } } );
            onResetForm ();
        } );

        expect ( result.current.name ).toBe ( initial_form.name );
        expect ( result.current.formState.name ).toBe ( initial_form.name );
    } );
} );