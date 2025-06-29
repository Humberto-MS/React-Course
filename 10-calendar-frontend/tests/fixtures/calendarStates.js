export const events = [
    {
        id: '1',
        start: new Date ( '2022-10-21 13:00:00' ),
        end: new Date ( '2022-10-21 15:00:00' ),
        title: 'Cumpleaños de Fernando',
        notes: 'Alguna nota'
    },
    {
        id: '2',
        start: new Date ( '2022-11-09 13:00:00' ),
        end: new Date ( '2022-11-09 15:00:00' ),
        title: 'Cumpleaños de Melissa',
        notes: 'Alguna nota de Melissa'
    }
];

export const calendar_initial_state = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
};

export const calendar_with_events_state = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null
};

export const calendar_with_active_event_state = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] }
}