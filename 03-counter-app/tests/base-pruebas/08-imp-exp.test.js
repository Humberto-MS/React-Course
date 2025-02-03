import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas/08-imp-exp";

describe ( 'Pruebas en 08-imp-exp', () => {
    test ( 'getHeroesById debe de retornar un heroe por ID', () => {
        const id = 1;
        const hero = getHeroeById ( id );

        expect ( hero ).toEqual ( { 
            id: 1, 
            name: 'Batman', 
            owner: 'DC' 
        } );
    } );

    test ( 'getHeroesById debe de retornar undefined si no existe el ID', () => {
        const id = 100;
        const hero = getHeroeById ( id );
        expect ( hero ).toBeFalsy();
    } );

    test ( 'getHeroesByOwner debe de retornar un arreglo de 3 elementos cuando owner es "DC"', () => {
        const owner = 'DC';
        const heroes = getHeroesByOwner ( owner );
        expect ( heroes.length ).toBe ( 3 );
    } );

    test ( 'getHeroesByOwner debe de retornar un arreglo de 2 elementos cuando owner es "Marvel"', () => {
        const owner = 'Marvel';
        const heroes = getHeroesByOwner ( owner );
        expect ( heroes.length ).toBe ( 2 );
    } );
} );