import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks";
import { authSlice } from "../../src/store";
import { initial_state, not_authenticated_state, test_user_credentials } from "../fixtures";
import { act, renderHook, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { calendarApi } from "../../src/api";

const getMockStore = ( initial_state ) => {
    return configureStore ({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initial_state }
        }
    });
}

describe ( 'Pruebas en useAuthStore', () => {

    beforeEach ( () => localStorage.clear() );

    test ( 'debe de regresar los valores por defecto', () => {
        const mock_store = getMockStore ({ ...initial_state });

        const { result } = renderHook ( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        expect ( result.current ).toEqual ({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any ( Function ),
            startRegister: expect.any ( Function ),
            checkAuthToken: expect.any ( Function ),
            startLogout: expect.any ( Function ),
        });
    } );

    test ( 'startLogin debe de realizar el login correctamente', async () => {
        const mock_store = getMockStore ({ ...not_authenticated_state });
        
        const { result } = renderHook ( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        await act ( async () => await result.current.startLogin ({ ...test_user_credentials }) );
        const { errorMessage, status, user } = result.current;

        expect ({ errorMessage, status, user }).toEqual ({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '685c7dbb96fd2271a3b565d5' }
        });

        expect ( localStorage.getItem ( 'token' ) ).toEqual ( expect.any ( String ) );
        expect ( localStorage.getItem ( 'token-init-date' ) ).toEqual ( expect.any ( String ) );
    } );

    test ( 'startLogin debe de fallar la autenticación', async () => {
        const mock_store = getMockStore ({ ...not_authenticated_state });
        
        const { result } = renderHook ( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        await act ( async () => await result.current.startLogin ({ email: 'algo@google.com', password: '123456789' }) );
        const { errorMessage, status, user } = result.current;
        expect ( localStorage.getItem ( 'token' ) ).toBe ( null );

        expect ({ errorMessage, status, user }).toEqual ({
            errorMessage: 'Credenciales incorrectas',
            status: 'not-authenticated',
            user: {}
        });

        await waitFor ( () => expect ( result.current.errorMessage ).toBe ( undefined ) );
    } );

    test ( 'startRegister debe de crear un usuario', async () => {
        const mock_store = getMockStore ({ ...not_authenticated_state });
        
        const { result } = renderHook ( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        const spy = jest.spyOn ( calendarApi, 'post' ).mockReturnValue ({
            data: {
                ok: true,
                uid: "ALGUN-ID",
                name: "ALGUN-NOMBRE",
                token: "ALGUN-TOKEN"
            }
        });

        await act ( async () => await result.current.startRegister ({ 
            email: 'algo@google.com', 
            password: '123456789',
            name: 'Test User 2' 
        }) );

        const { errorMessage, status, user } = result.current;
        
        expect ({ errorMessage, status, user }).toEqual ({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'ALGUN-NOMBRE', uid: 'ALGUN-ID' }
        });

        spy.mockRestore();
    } );

    test ( 'startRegister debe de fallar la creación', async () => {
        const mock_store = getMockStore ({ ...not_authenticated_state });
        
        const { result } = renderHook ( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        await act ( async () => await result.current.startRegister ({ ...test_user_credentials }) );
        const { errorMessage, status, user } = result.current;
        
        expect ({ errorMessage, status, user }).toEqual ({
            errorMessage: 'Ya existe un usuario con ese email',
            status: 'not-authenticated',
            user: {}
        });
    } );

    test ( 'checkAuthToken debe de fallar si no hay un token', async () => {
        const mock_store = getMockStore ({ ...initial_state });
        
        const { result } = renderHook ( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        await act ( async () => await result.current.checkAuthToken() );
        const { errorMessage, status, user } = result.current;
        
        expect ({ errorMessage, status, user }).toEqual ({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });
    } );

    test ( 'checkAuthToken debe de autenticar al usuario si hay un token', async () => {
        const { data } = await calendarApi.post ( '/auth', test_user_credentials );
        localStorage.setItem ( 'token', data.token );
        const mock_store = getMockStore ({ ...initial_state });
        
        const { result } = renderHook ( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        await act ( async () => await result.current.checkAuthToken() );
        const { errorMessage, status, user } = result.current;
        const { name, uid } = test_user_credentials;
        
        expect ({ errorMessage, status, user }).toEqual ({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name, uid }
        });
    } );
} );