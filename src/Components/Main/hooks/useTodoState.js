import { useState, useEffect, useMemo, useCallback } from 'react';
import { ACTION, FILTER_STATUS } from '../constants';

const useTodoState = () => {
  const [todoState, setTodoState] = useState(() => {
    const savedTodoState = localStorage.getItem('todoState');

    if (savedTodoState) {
      return JSON.parse(savedTodoState);
    } else {
      return {
        todoState: [],
        todoStatus: FILTER_STATUS.ALL,
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('todoState', JSON.stringify(todoState));
  }, [todoState]);

  const activeTodoCount = useMemo(
    () => todoState.todos.filter((todo) => todo.isComplete === false).length,
    [todoState.todos]
  );

  const totalCount = useMemo(() => todoState.todos.length, [todoState.todos.length]);

  const handleAddTodo = useCallback((todoName) => {
    setTodoState((todoState) => {
      const nextTodoState = {
        ...todoState,
        todos: [
          ...todoState.todos,
          {
            id: crypto.randomUUID(),
            name: todoName,
            isComplete: false,
          },
        ],
        todoStatus: FILTER_STATUS.ALL,
      };
      return nextTodoState;
    });
  }, []);

  const handleDeleteTodos = useCallback((todoIds) => {
    setTodoState((todoState) => {
      return {
        ...todoState,
        todos: todoState.todos.filter((todo) => {
          return !todoIds.includes(todo.id);
        }),
      };
    });
  }, []);

  const handleEditTodos = useCallback(
    (editType, updatedTodo) => {
      setTodoState((todoState) => {
        return {
          ...todoState,
          todos: todoState.todos.map((todo) => {
            if (editType === ACTION.EDIT_TODO_ITEM) {
              if (todo.id === updatedTodo.id) {
                return updatedTodo;
              } else {
                return todo;
              }
            } else {
              return {
                ...todo,
                isComplete: !(activeTodoCount === 0),
              };
            }
          }),
        };
      });
    },
    [activeTodoCount]
  );

  const filteredtodo = todoState.todos.filter((todo) => {
    if (todoState.todoStatus === FILTER_STATUS.ALL) return true;
    else if (todoState.todoStatus === FILTER_STATUS.ACTIVE) return !todo.isComplete;
    else return todo.isComplete;
  });

  const updateTodoStatus = useCallback((status) => {
    setTodoState((todoState) => {
      return {
        ...todoState,
        todoStatus: status,
      };
    });
  }, []);

  const onAction = (action) => {
    switch (action.type) {
      case ACTION.ADD_TODO:
        handleAddTodo(action.text);
        break;

      case ACTION.DELETE_TODOS:
        handleDeleteTodos([action.id]);
        break;

      case ACTION.EDIT_TODOS:
        handleEditTodos(action.editType, action.changedTodo);
        break;

      case ACTION.DELETE_COMPLETED_TODOS:
        const completedTodos = todoState.todos
          .filter((todo) => todo.isComplete === true)
          .map((todo) => {
            return todo.id;
          });
        handleDeleteTodos(completedTodos);
        break;

      case ACTION.UPDATE_FILTER:
        updateTodoStatus(action.status);
        break;

      default:
        throw new Error('Action Not Supported');
    }
  };
  return { onAction, todos: filteredtodo, totalCount, activeTodoCount, todoStatus: todoState.todoStatus };
};

export default useTodoState;
