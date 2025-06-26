import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeletingEvent, hasEventBeenSelected } = useCalendarStore();

    return (
        <button
            aria-label="btn-delete"
            style={{ display: hasEventBeenSelected ? '' : 'none' }} 
            className="btn btn-danger fab-danger"
            onClick={ startDeletingEvent }>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}