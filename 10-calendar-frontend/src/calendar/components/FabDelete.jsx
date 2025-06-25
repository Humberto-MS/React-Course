import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeletingEvent, hasEventBeenSelected } = useCalendarStore();

    return (
        <button
            style={{ display: hasEventBeenSelected ? '' : 'none' }} 
            className="btn btn-danger fab-danger"
            onClick={ startDeletingEvent }>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}