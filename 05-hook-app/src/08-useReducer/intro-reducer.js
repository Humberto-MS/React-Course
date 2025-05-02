const initial_state = [{
    id: 1,
    todo: 'Recolectar la piedra del Alma',
    done: false
}];

const todoReducer = ( state = initial_state, action = {} ) => {
    if ( action.type === '[TODO] Add Todo' )
        return [ ...state, action.payload ];
    return state;
}

let todos = todoReducer();

const newTodo = {
    id: 2,
    todo: 'Recolectar la piedra del Poder',
    done: false
}

const addTodoAction = {
    type: '[TODO] Add Todo',
    payload: newTodo
}

todos = todoReducer ( todos, addTodoAction );