import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar";
import { useCalendarStore } from "../../../src/hooks";

jest.mock ( '../../../src/hooks/useCalendarStore' );

describe ( 'Pruebas en <FabDelete/>', () => {

    const mockStartDeletingEvent = jest.fn();
    beforeEach ( () => jest.clearAllMocks() );

    test ( 'debe de mostrar el componente correctamente', () => {
        useCalendarStore.mockReturnValue ({
            hasEventBeenSelected: false
        });

        render ( <FabDelete/> );
        const btn = screen.getByLabelText ( 'btn-delete' );
        expect ( btn.classList ).toContain ( 'btn' );
        expect ( btn.classList ).toContain ( 'btn-danger' );
        expect ( btn.classList ).toContain ( 'fab-danger' );
        expect ( btn.style.display ).toBe ( 'none' );
    } );

    test ( 'debe de mostrar el botón si hay un evento activo', () => {
        useCalendarStore.mockReturnValue ({
            hasEventBeenSelected: true
        });

        render ( <FabDelete/> );
        const btn = screen.getByLabelText ( 'btn-delete' );
        expect ( btn.style.display ).toBe ( '' );
    } );

    test ( 'debe de llamar startDeletingEvent si hay un evento activo', () => {
        useCalendarStore.mockReturnValue ({
            hasEventBeenSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        render ( <FabDelete/> );
        const btn = screen.getByLabelText ( 'btn-delete' );
        fireEvent.click ( btn );
        expect ( mockStartDeletingEvent ).toHaveBeenCalled();
    } );
} );