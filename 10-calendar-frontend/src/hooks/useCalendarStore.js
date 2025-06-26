import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector ( state => state.calendar );
    const { user } = useSelector ( state => state.auth );
    const setActiveEvent = ( calendar_event ) => dispatch ( onSetActiveEvent ( calendar_event ) );

    const startSavingEvent = async ( calendar_event ) => {
        try {
            if ( calendar_event.id ) {
                // Actualizando
                await calendarApi.put ( `/events/${ calendar_event.id }`, calendar_event );
                dispatch ( onUpdateEvent ( { ...calendar_event, user } ) );
                return;
            }

            // Creando
            const { data } = await calendarApi.post ( '/events', calendar_event );
            dispatch ( onAddNewEvent ( { ...calendar_event, id: data.evento.id, user } ) );
        } catch (error) {
            console.error ( error );
            Swal.fire ( 'Error al guardar el evento', error.response.data?.msg, 'error' );
        }        
    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete ( `/events/${ activeEvent.id }` );
            dispatch ( onDeleteEvent() );
        } catch (error) {
            console.error ( error );
            Swal.fire ( 'Error al eliminar el evento', error.response.data?.msg, 'error' );
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get ( '/events' );
            const events = convertEventsToDateEvents ( data.eventos );
            dispatch ( onLoadEvents ( events ) );
        } catch (error) {
            console.error ( 'Error cargando eventos: ', error );
        }
    }

    return { 
        events, 
        activeEvent, 
        setActiveEvent, 
        startSavingEvent, 
        startDeletingEvent, 
        hasEventBeenSelected: !!activeEvent,
        startLoadingEvents
    };
}