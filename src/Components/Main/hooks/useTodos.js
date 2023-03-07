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
  const todosCount = useMemo(() => todos.length, [todos.length]);

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

  const handleDeleteTodo = useCallback((todoIds) => {
    setTodo((todos) =>
      todos.filter((todo) => {
        return !todoIds.includes(todo.id);
      })
    );
  }, []);

  const handleEditTodo = useCallback((editType , todoList) => {
      setTodo( (todos) => todos.map((todo) => {
        if(editType === ACTION.EDIT_TODO){
          if(todo.id === todoList.id){
            return todoList;
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
        handleDeleteTodo([action.id]);
        break;

      case ACTION.EDIT_TODO:
        handleEditTodo(ACTION.EDIT_TODO ,action.changedTask);
        break;

      case ACTION.TOGGLE:
        handleEditTodo(ACTION.TOGGLE);
        break;

      case ACTION.DELETE_COMPLETED_TODOS:
        const completedTodos = todos
          .filter((todo) => todo.isComplete === true)
          .map((todo) => {
            return todo.id;
          });
        handleDeleteTodo(completedTodos);
        break;

      case ACTION.CHANGE_TODO_STATUS:
        changeTodoStatus(action.status);
        break;

      default:
        throw new Error('Action Not Supported');
    }
  };

  return {onAction, filteredtodo, todosCount, activeTodoCount, todoStatus};
};

export default useTodo;
