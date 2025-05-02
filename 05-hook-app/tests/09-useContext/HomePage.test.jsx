const { render, screen } = require("@testing-library/react");
const { HomePage } = require("../../src/09-useContext/HomePage");
const { UserContext } = require("../../src/09-useContext/context/UserContext");

describe ( 'Pruebas en <HomePage/>', () => {

    const user = {
        id: 1,
        name: 'Fernando',
        email: 'fernando@google.com'
    }

    test ( 'debe de mostrar el componente sin el usuario', () => {
        render (
            <UserContext.Provider value={{ user: null }}>
                <HomePage/>
            </UserContext.Provider>
        );

        const preTag = screen.getByLabelText ( 'pre' );
        expect ( preTag.innerHTML ).toBe( 'null' );
    } );

    test ( 'debe de mostrar el componente con el usuario', () => {
        render (
            <UserContext.Provider value={{ user }}>
                <HomePage/>
            </UserContext.Provider>
        );

        const preTag = screen.getByLabelText ( 'pre' );
        expect ( preTag.innerHTML ).toContain( user.id.toString() );
        expect ( preTag.innerHTML ).toContain( user.name );
        expect ( preTag.innerHTML ).toContain( user.email );
    } );
} );