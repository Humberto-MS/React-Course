import { todoReducer } from "../../src/08-useReducer/todoReducer";

describe ( 'pruebas en el todoReducer', () => {

    const initialState = [{
        id: 1,
        description: 'Demo Todo',
        done: false
    }];

    test ( 'debe de regresar el estado inicial', () => {
        const new_state = todoReducer ( initialState, {} );
        expect ( new_state ).toBe ( initialState );
    } );

    test ( 'debe de agregar un todo', () => {
        const action = {
            type: '[TODO] Add Todo',
            payload: {
                id: 2,
                description: 'Demo Todo 2',
                done: false
            }
        };

        const new_state = todoReducer ( initialState, action );
        expect ( new_state.length ).toBe ( 2 );
        expect ( new_state ).toContain ( action.payload );
    } );

    test ( 'debe de eliminar un todo', () => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: 1
        };

        const new_state = todoReducer ( initialState, action );
        expect ( new_state.length ).toBe ( 0 );
    } );

    test ( 'debe de hacer toggle del todo', () => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: 1
        };

        const new_state = todoReducer ( initialState, action );
        expect ( new_state[0].done ).toBe ( true );
    } );
} );