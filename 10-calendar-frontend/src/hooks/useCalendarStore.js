import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector ( state => state.calendar );
    const setActiveEvent = ( calendar_event ) => dispatch ( onSetActiveEvent ( calendar_event ) );

    const startSavingEvent = async ( calendar_event ) => {
        if ( calendar_event._id ) {
            dispatch ( onUpdateEvent ( { ...calendar_event } ) );
        } else {
            dispatch ( onAddNewEvent ( { ...calendar_event, _id: new Date().getTime() } ) );
        }
    }

    const startDeletingEvent = () => dispatch ( onDeleteEvent() );

    return { events, activeEvent, setActiveEvent, startSavingEvent, startDeletingEvent, hasEventBeenSelected: !!activeEvent };
}