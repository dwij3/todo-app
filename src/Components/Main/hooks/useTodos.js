import { useState, useEffect, useMemo, useCallback } from 'react';
import { ACTION, FILTER_STATUS } from '../constants';
import  useTodoFilter  from './useTodoStatus';

const useTodo = () => {
  const [todos, settodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });

  const { todoStatus, changeTodoStatus } = useTodoFilter();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const activeTodoCount = useMemo(() => todos.filter((todo) => todo.isComplete === false).length, [todos]);
  const todosLength = useMemo(() => todos.length, [todos.length]);

  const handleAddTodo = useCallback(
    (todoName) => {
      settodos((todos) => {
        return [
          ...todos,
          {
            id: crypto.randomUUID(),
            name: todoName,
            isComplete: false,
          },
        ];
      });
      changeTodoStatus(FILTER_STATUS.ALL);
    },
    [changeTodoStatus]
  );

  const handleDeleteTodo = useCallback((todoId) => {
    settodos((todos) => todos.filter((todo) => todo.id !== todoId));
  }, []);

  const handleChangeTodo = useCallback((changedTodo) => {
    settodos((todos) => {
      const updatedtodos = todos.map((todo) => {
        if (todo.id === changedTodo.id) {
          return changedTodo;
        } else {
          return todo;
        }
      });
      return updatedtodos;
    });
  }, []);

  const toggleTodoSelection = useCallback(() => {
    settodos((todos) => {
      const updatedtodos = todos.map((task) => {
        return {
          ...task,
          isComplete: !(activeTodoCount === 0),
        };
      });

      return updatedtodos;
    });
  }, [activeTodoCount]);

  const deleteCompletedTodo = useCallback(() => {
    settodos((todos) => todos.filter((todo) => todo.isComplete === false));
  }, []);

  const filteredtodo = todos.filter((task) => {
    if (todoStatus === FILTER_STATUS.ALL) return true;
    else if (todoStatus === FILTER_STATUS.ACTIVE) return !task.isComplete;
    else return task.isComplete;
  });

  const onAction = (action) => {
    switch (action.type) {
      case ACTION.ADD_TODO:
        handleAddTodo(action.text);
        break;

      case ACTION.DELETE_TODO:
        handleDeleteTodo(action.id);
        break;

      case ACTION.EDIT_TODO:
        handleChangeTodo(action.changedTask);
        break;

      case ACTION.TOGGLE:
        toggleTodoSelection();
        break;

      case ACTION.DELETE_COMPLETED_TODOS:
        deleteCompletedTodo();
        break;

      case ACTION.CHANGE_TODO_STATUS:
        changeTodoStatus(action.status);
        break;

      default:
        throw new Error('Action Not Supported');
    }
  };

  return { onAction, filteredtodo, todosLength , activeTodoCount , todoStatus};
};

export default useTodo;
