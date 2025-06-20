import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase";
import { checkingAutentication, checkingCredentials, clearNotesLogout, login, logout, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store";
import { demo_user } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe ( 'Pruebas en Auth Thunks', () => {
    
    const dispatch = jest.fn();
    beforeEach ( () => jest.clearAllMocks() );

    test ( 'debe de invocar el checkingCredentials', async () => {
        await checkingAutentication()( dispatch );
        expect ( dispatch ).toHaveBeenCalledWith ( checkingCredentials() );
    } );

    test ( 'startGoogleSignIn debe de llamar checkingCredentials y login', async () => {
        const login_data = { ok: true, ...demo_user };
        await signInWithGoogle.mockResolvedValue ( login_data );
        await startGoogleSignIn()( dispatch );
        expect ( dispatch ).toHaveBeenCalledWith ( checkingCredentials() );
        expect ( dispatch ).toHaveBeenCalledWith ( login ( login_data ) );
    } );

    test ( 'startGoogleSignIn debe de llamar checkingCredentials y logout con error', async () => {
        const login_data = { ok: false, errorMessage: "Error en la autenticación" };
        await signInWithGoogle.mockResolvedValue ( login_data );
        await startGoogleSignIn()( dispatch );
        expect ( dispatch ).toHaveBeenCalledWith ( checkingCredentials() );
        expect ( dispatch ).toHaveBeenCalledWith ( logout ( login_data ) );
    } );

    test ( 'startLoginWithEmailPassword debe de llamar checkingCredentials y login', async () => {
        const login_data = { ok: true, ...demo_user };
        const form_data = { email: demo_user.email, password: "123456" };
        await loginWithEmailPassword.mockResolvedValue ( login_data );
        await startLoginWithEmailPassword ( form_data )( dispatch );
        expect ( dispatch ).toHaveBeenCalledWith ( checkingCredentials() );
        expect ( dispatch ).toHaveBeenCalledWith ( login ( login_data ) );
    } );

    test ( 'startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {
        await startLogout()( dispatch );
        expect ( logoutFirebase ).toHaveBeenCalled();
        expect ( dispatch ).toHaveBeenCalledWith ( clearNotesLogout() );
        expect ( dispatch ).toHaveBeenCalledWith ( logout() );
    } );
} );