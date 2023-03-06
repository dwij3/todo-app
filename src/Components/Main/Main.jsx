import Filters from './components/Filters';
import AddTask from './components/AddTask';
import ShowTaskList from './components/ShowTaskList';
import styles from './Main.module.css';
import useDisplayTodoList from './hooks/useDisplayTodoList';



const Main = () => {
  const { displaytodo: todoList, onAction, activeTaskCount, todoStatus, todosLength } = useDisplayTodoList();

  return (
    <div className={styles.container}>
      <AddTask onAction={onAction} todosLength={todosLength} activeTaskCount={activeTaskCount}/>
      <ShowTaskList taskList={todoList} onAction={onAction} />
      {todosLength > 0 && <Filters activeTaskCount={activeTaskCount} onAction={onAction} todoStatus={todoStatus} todosLength={todosLength} />}
    </div>
  );
};

export default Main;
