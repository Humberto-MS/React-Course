import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { uiSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = ( initial_state ) => {
    return configureStore ({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initial_state }
        }
    });
}

describe ( 'Pruebas en el useUiStore', () => {
    test ( 'debe de regresar los valores por defecto', () => {
        const mock_store = getMockStore ({ isDateModalOpen: false });

        const { result } = renderHook ( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        expect ( result.current ).toEqual ({
            isDateModalOpen: false,
            closeDateModal: expect.any ( Function ),
            openDateModal: expect.any ( Function ),
            toggleDateModal: expect.any ( Function )
        });
    } );

    test ( 'openDateModal debe de colocar true en el isDateModalOpen', () => {
        const mock_store = getMockStore ({ isDateModalOpen: false });

        const { result } = renderHook ( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        const { openDateModal } = result.current;
        act ( () => openDateModal() );
        expect ( result.current.isDateModalOpen ).toBeTruthy();
    } );

    test ( 'closeDateModal debe de colocar false en isDateModalOpen', () => {
        const mock_store = getMockStore ({ isDateModalOpen: true });

        const { result } = renderHook ( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        act ( () => result.current.closeDateModal() );
        expect ( result.current.isDateModalOpen ).toBeFalsy();
    } );

    test ( 'toggleDateModal debe de cambiar el estado respectivamente', () => {
        const mock_store = getMockStore ({ isDateModalOpen: true });

        const { result } = renderHook ( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mock_store }>{ children }</Provider>
        } );

        act ( () => result.current.toggleDateModal() );
        expect ( result.current.isDateModalOpen ).toBeFalsy();
        act ( () => result.current.toggleDateModal() );
        expect ( result.current.isDateModalOpen ).toBeTruthy();
    } );
} );