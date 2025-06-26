import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store";
import { calendar_initial_state, calendar_with_active_event_state, calendar_with_events_state, events } from "../../fixtures";

describe ( 'Pruebas en el calendarSlice', () => {
    test ( 'debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect ( state ).toEqual ( calendar_initial_state );
    } );

    test ( 'onSetActiveEvent debe de activar el evento', () => {
        const state = calendarSlice.reducer ( calendar_with_events_state, onSetActiveEvent ( events[0] ) );
        expect ( state.activeEvent ).toEqual ( events[0] );
    } );

    test ( 'onAddNewEvent debe de agregar el evento', () => {
        const new_event = {
            id: '3',
            start: new Date ( '2020-10-21 13:00:00' ),
            end: new Date ( '2020-10-21 15:00:00' ),
            title: 'Cumpleaños de Fernando!!',
            notes: 'Alguna nota!!'
        }

        const state = calendarSlice.reducer ( calendar_with_events_state, onAddNewEvent ( new_event ) );
        expect ( state.events ).toEqual ( [ ...events, new_event ] );
    } );

    test ( 'onUpdateEvent debe de actualizar el evento', () => {
        const updated_event = {
            id: '1',
            start: new Date ( '2023-10-21 13:00:00' ),
            end: new Date ( '2023-10-21 15:00:00' ),
            title: 'Cumpleaños de Fernando actualizado',
            notes: 'Alguna nota actualizada'
        }

        const state = calendarSlice.reducer ( calendar_with_events_state, onUpdateEvent ( updated_event ) );
        expect ( state.events ).toContain ( updated_event );
    } );

    test ( 'onDeleteEvent debe de borrar el evento activo', () => {
        const state = calendarSlice.reducer ( calendar_with_active_event_state, onDeleteEvent() );
        expect ( state.activeEvent ).toBe ( null );
        expect ( state.events ).not.toContain ( events[0] );
    } );
    
    test ( 'onLoadEvents debe de establecer los eventos', () => {
        const state = calendarSlice.reducer ( calendar_initial_state, onLoadEvents ( events ) );
        expect ( state.isLoadingEvents ).toBeFalsy();
        expect ( state.events ).toEqual ( events );

        const new_state = calendarSlice.reducer ( state, onLoadEvents ( events ) );
        expect ( new_state.events.length ).toBe ( events.length );
    } );
    
    test ( 'onLogoutCalendar debe de limpiar el estado', () => {
        const state = calendarSlice.reducer ( calendar_with_active_event_state, onLogoutCalendar() );
        expect ( state ).toEqual ( calendar_initial_state );
    } );
} );