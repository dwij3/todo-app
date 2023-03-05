import { useState, useEffect, useMemo, useCallback } from 'react';
import { FILTER_STATUS, ACTION } from '../constants';

const useDisplayTodoList = () => {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
      return [];
  });

  const [todoStatus, setTodoStatus] = useState(() => {
    const savedTodoStatus = localStorage.getItem('status');
    if(savedTodoStatus){
      return JSON.parse(savedTodoStatus);
    }
      return FILTER_STATUS.ALL;
  });

  const activeTaskCount = useMemo(() => todoList.filter((task) => task.isComplete === false).length, [todoList]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
    localStorage.setItem('status' ,JSON.stringify(todoStatus) );
  }, [todoList, todoStatus]);

  

  const changeTodoStatus = useCallback((status) => {
    setTodoStatus(status);
  }, []);

  const displaytodo = todoList.filter((task) => {
    if (todoStatus === FILTER_STATUS.ALL) return true;
    else if (todoStatus === FILTER_STATUS.ACTIVE) return !task.isComplete;
    else return task.isComplete;
  });

  const handleAddTask = useCallback(
    (text) => {
      setTodoList((todoList) => {
        return [
        ...todoList,
        {
          id: crypto.randomUUID(),
          name: text,
          isComplete: false,
        },
      ]
    }
      
      );
      changeTodoStatus(FILTER_STATUS.ALL);
    },
    [changeTodoStatus]
  );

  const handleDeleteTask = useCallback(
    (taskId) => {
      setTodoList((todoList) => todoList.filter((task) => task.id !== taskId));
    },
    []
  );

  const handleChangeTask = useCallback(
    (changedTask) => {
      setTodoList( (todoList) => {
        const updatedTodoList = todoList.map((task) => {
          if (task.id === changedTask.id) {
            return changedTask;
          } else {
            return task;
          }
        });

        return updatedTodoList;
      });
    },
    []
  );

  //If any one of the task is inComplete then toggleTaskSelection will complete all task
  //Otherwise all task will be inComplete or active
  const toggleTaskSelection = useCallback(
    () => {
      setTodoList((todoList) => {
        const updatedTodoList = todoList.map((task) => {
          return {
            ...task,
            isComplete: !(activeTaskCount === 0),
          };
        });

        return updatedTodoList;
      });
    },
    [activeTaskCount]
  );

  const deleteCompletedTask = useCallback(() => {
    setTodoList((todoList) =>  todoList.filter((task) => task.isComplete === false));
  }, []);

  const onAction = (action) => {
    switch (action.type) {
      case ACTION.ADD_TASK:
        handleAddTask(action.text);
        break;

      case ACTION.DELETE_TASK:
        handleDeleteTask(action.id);
        break;

      case ACTION.EDIT_TASK:
        handleChangeTask(action.changedTask);
        break;

      case ACTION.TOGGLE:
        toggleTaskSelection();
        break;

      case ACTION.DELETE_COMPLETED_TASKS:
        deleteCompletedTask();
        break;

      case ACTION.CHANGE_TODO_STATUS:
        changeTodoStatus(action.status)
        break

      default:
        throw new Error('Action Not Supported');
    }
  };

  return { displaytodo, onAction, activeTaskCount};
};

export default useDisplayTodoList;
