import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../components"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from "../../helpers"
import { useEffect, useState } from "react"
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks"

export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUiStore();
    const [ lastView, setLastView ] = useState ( localStorage.getItem ( 'lastView' ) || 'month' );

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const is_my_event = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );
        
        const style = {
            backgroundColor: is_my_event ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
        }

        return { style }
    }

    const onViewChanged = ( event ) => {
        localStorage.setItem ( 'lastView', event );
        setLastView ( event );
    }

    useEffect ( () => { startLoadingEvents() }, [] );

    return (
        <>
            <NavBar/>

            <Calendar
                culture="es"
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessagesES() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ () => openDateModal() }
                onSelectEvent={ setActiveEvent }
                onView={ onViewChanged }
            />

            <CalendarModal/>
            <FabAddNew/>
            <FabDelete/>
        </>
    )
}