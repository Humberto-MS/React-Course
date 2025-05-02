export const todoReducer = ( initial_state = [], action ) => {
    switch ( action.type ) {
        case '[TODO] Add Todo':
            return [ ...initial_state, action.payload ];
        case '[TODO] Remove Todo':
            return initial_state.filter( todo => todo.id !== action.payload );
        case '[TODO] Toggle Todo':
            return initial_state.map( todo => {
                if ( todo.id === action.payload ) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo;
            });
        default:
            return initial_state;
    }
}