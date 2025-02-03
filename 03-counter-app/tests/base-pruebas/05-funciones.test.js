import { getUser, getUsuarioActivo } from "../../src/base-pruebas/05-funciones";

describe ( 'Pruebas en 05-funciones', () => {
    test ( 'getUser debe de retornar un objeto', () => {
        const test_user = {
            uid: 'ABC123',
            username: 'El_Papi1502'
        };

        const user = getUser();
        expect ( test_user ).toEqual ( user );
        // expect ( test_user ).toStrictEqual ( user );
    } );

    test ( 'getUsuarioActivo debe de retornar un objeto', () => {
        const name = 'Humberto';

        const test_user = {
            uid: 'ABC567',
            username: name
        };

        const user = getUsuarioActivo ( name );
        expect ( test_user ).toEqual ( user );
    } );
} );