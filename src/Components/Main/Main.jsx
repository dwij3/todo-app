import Filters from './Filters/Filters';
import InputField from './InputField/InputField';
import ShowListItem from './ShowListItem/ShowListItem';
import styles from './Main.module.css';
import { useMemo, useState, useEffect } from 'react';

// const dummyArray = [
//     {
//         id:1,
//         name:"breakfast",
//         isComplete:true
//     },{
//         id:2,
//         name:"lunch",
//         isComplete:false
//     },{
//         id:3,
//         name:"play cricket",
//         isComplete:true
//     }
// ];

const TYPE = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETE: 'Complete',
};

export default function Main() {
  //getting todo list from localstorage
  //used arrow function initialization for lazy loading
  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  //if filter Button All is clicked then displayTodoList="All"
  //else if filter Button Active is clicked then displayTodoList = "Active"
  //else displayTododList="Completed"

  const [displayTodoList, setDisplayTodoList] = useState({ type: 'All' });

  //getting next-available id from local storage
  let nextId = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : 0;

  //if todo-list  changes then update the localstorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo]);

  //Adding Task to TODO list
  function handleAddTask(text) {
    setTodo([
      ...todo,
      {
        id: nextId++,
        name: text,
        isComplete: false,
      },
    ]);
    localStorage.setItem('id', JSON.stringify(nextId));
    setDisplayTodoList({ type: TYPE.ALL });
  }

  //Deleting task from todo list
  function handleDeleteTask(id) {
    const nextTodoList = todo.filter((task) => task.id !== id);
    setTodo(nextTodoList);
  }

  //change isComplete or Task name from TODO list
  function handleChangeTask(changedTask) {
    const nextTodoList = todo.map((task) => {
      if (task.id === changedTask.id) {
        return changedTask;
      } else {
        return task;
      }
    });
    setTodo(nextTodoList);
  }

  //activeTaskLength is number of tasks that are not completed.
  const activeTaskLength = useMemo(() => todo.filter((task) => task.isComplete === false).length, [todo]);

  //if all the task are completed then toggleComplete function makes all task incomplete
  //otherwise Complete all Task:
  function setCompleteToggle(boolValue) {
    const nextTodo = todo.map((task) => {
      return {
        ...task,
        isComplete: boolValue,
      };
    });

    setTodo(nextTodo);
  }
  function toggleComplete() {
    const boolValue = activeTaskLength === 0 ? false : true;
    console.log(boolValue);
    setCompleteToggle(boolValue);
  }

  //Delete the completed task:
  function deleteCompletedTask() {
    const nextTodo = todo.filter((task) => task.isComplete === false);
    setTodo(nextTodo);
  }

  function displayAllTaks() {
    const allTask = todo.map((task) => {
      return <ShowListItem key={task.id} item={task} onDeleteTask={handleDeleteTask} onChangeTask={handleChangeTask} />;
    });

    return allTask;
  }

  function displayActiveTask() {
    let activeTask = todo.filter((task) => task.isComplete === false);

    activeTask = activeTask.map((task) => {
      return <ShowListItem key={task.id} item={task} onDeleteTask={handleDeleteTask} onChangeTask={handleChangeTask} />;
    });

    return activeTask;
  }

  function displayCompletedtask() {
    let completedTask = todo.filter((task) => task.isComplete === true);

    completedTask = completedTask.map((task) => {
      return <ShowListItem key={task.id} item={task} onDeleteTask={handleDeleteTask} onChangeTask={handleChangeTask} />;
    });

    return completedTask;
  }

  //Task Items which will be displayed in screen
  let filterType = displayTodoList.type;
  let listItem;
  switch (filterType) {
    case TYPE.ALL: {
      listItem = displayAllTaks();
      break;
    }

    case TYPE.ACTIVE: {
      listItem = displayActiveTask();
      break;
    }

    case TYPE.COMPLETE: {
      listItem = displayCompletedtask();
      break;
    }

    default: {
      listItem = <div>OOPS!</div>;
    }
  }

  function handleDisplayType(displayType) {
    if (displayType === 'ALL') {
      setDisplayTodoList({ type: TYPE.ALL });
    } else if (displayType === 'ACTIVE') {
      setDisplayTodoList({ type: TYPE.ACTIVE });
    } else {
      setDisplayTodoList({ type: TYPE.COMPLETE });
    }
  }

  //   if(listItem === displayTodoList.)

  return (
    <div className={styles.container}>
      <InputField onAddTask={handleAddTask} onToggleComplete={toggleComplete} isTaskEmpty={todo.length === 0} />
      {listItem}
      {todo.length > 0 && (
        <Filters
          activeTaskLength={activeTaskLength}
          onClearComplete={deleteCompletedTask}
          handleDisplayType={handleDisplayType}
          showClearComplete={activeTaskLength === todo.length ? false : true}
        />
      )}
    </div>
  );
}
