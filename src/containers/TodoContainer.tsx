import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo } from '../modules/todos';
import { ApplicationState } from '../modules';

import Todo from '../components/Todo';

const todoSelector = (state: ApplicationState) => state.todo.todos;

const TodoContainer = () => {
  const [value, setValue] = useState('');

  const todos = useSelector(todoSelector);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo(value));
    setValue('');
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Todo
      addTodo={handleAddTodo}
      todos={todos}
      value={value}
      handleChange={handleChange}
      deleteTodo={handleDeleteTodo}
    />
  );
};

export default TodoContainer;
