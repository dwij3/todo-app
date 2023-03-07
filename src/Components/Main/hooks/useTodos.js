import { useState, useEffect, useMemo, useCallback } from 'react';
import { ACTION, FILTER_STATUS } from '../constants';
import useTodoFilter from './useTodoFilter';

const useTodo = () => {
  const [todos, setTodo] = useState(() => {
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
  const totalCount = useMemo(() => todos.length, [todos.length]);

  const handleAddTodo = useCallback(
    (todoName) => {
      setTodo((todos) => {
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

  const handleDeleteTodos = useCallback((todoIds) => {
    setTodo((todos) =>
      todos.filter((todo) => {
        return !todoIds.includes(todo.id);
      })
    );
  }, []);

  const handleEditTodos = useCallback((editType , updatedTodo) => {
      setTodo( (todos) => todos.map((todo) => {
        if(editType === ACTION.EDIT_TODO_ITEM){
          if(todo.id === updatedTodo.id){
            return updatedTodo;
          }else{
            return todo;
          }
        }
        else{
            return {
              ...todo,
              isComplete: !(activeTodoCount === 0),
            };
        }
      }));
  }, [activeTodoCount]);

  const filteredtodo = todos.filter((todo) => {
    if (todoStatus === FILTER_STATUS.ALL) return true;
    else if (todoStatus === FILTER_STATUS.ACTIVE) return !todo.isComplete;
    else return todo.isComplete;
  });

  const onAction = (action) => {
    switch (action.type) {
      case ACTION.ADD_TODO:
        handleAddTodo(action.text);
        break;

      case ACTION.DELETE_TODOS:
        handleDeleteTodos([action.id]);
        break;

      case ACTION.EDIT_TODOS:
        handleEditTodos(action.editType ,action.changedTodo);
        break;

      case ACTION.DELETE_COMPLETED_TODOS:
        const completedTodos = todos
          .filter((todo) => todo.isComplete === true)
          .map((todo) => {
            return todo.id;
          });
        handleDeleteTodos(completedTodos);
        break;

      case ACTION.UPDATE_FILTER:
        changeTodoStatus(action.status);
        break;

      default:
        throw new Error('Action Not Supported');
    }
  };

  return {onAction, todos:filteredtodo, totalCount, activeTodoCount, todoStatus};
};

export default useTodo;
