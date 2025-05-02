import { render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";

describe ( 'Pruebas en <TodoItem/>', () => {

    const todo = {
        id: 1,
        description: 'Piedra del Alma',
        done: false,
    };

    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    beforeEach ( () => jest.clearAllMocks() );

    test ( 'debe de mostrar el Todo pendiente de completar', () => {
        render ( 
            <TodoItem 
                todo={todo} 
                onToggleTodo={onToggleTodoMock} 
                onDeleteTodo={onDeleteTodoMock}
            />
        );

        const liElement = screen.getByRole('listitem');
        expect ( liElement.className ).toContain('list-group-item d-flex justify-content-between');

        const spanElement = screen.getByLabelText('span');
        expect ( spanElement.className ).toContain('align-self-center');
        expect ( spanElement.className ).not.toContain('text-decoration-line-through');
    } );

    test ( 'debe de mostrar el Todo completado', () => {
        todo.done = true;

        render ( 
            <TodoItem 
                todo={todo} 
                onToggleTodo={onToggleTodoMock} 
                onDeleteTodo={onDeleteTodoMock}
            />
        );

        const spanElement = screen.getByLabelText('span');
        expect ( spanElement.className ).toContain('text-decoration-line-through');
    } );

    test ( 'span debe de llamar el toggleTodo cuando se hace click', () => {
        render ( 
            <TodoItem 
                todo={todo} 
                onToggleTodo={onToggleTodoMock} 
                onDeleteTodo={onDeleteTodoMock}
            />
        );

        const spanElement = screen.getByLabelText('span');
        spanElement.click();

        expect ( onToggleTodoMock ).toHaveBeenCalledWith ( todo.id );
    } );

    test ( 'button debe de llamar el onDeleteTodo', () => {
        render ( 
            <TodoItem 
                todo={todo} 
                onToggleTodo={onToggleTodoMock} 
                onDeleteTodo={onDeleteTodoMock}
            />
        );

        const buttonElement = screen.getByRole('button');
        buttonElement.click();

        expect ( onDeleteTodoMock ).toHaveBeenCalledWith ( todo.id );
    } );
} );