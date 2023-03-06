import Filters from './components/Filters';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import styles from './Main.module.css';
import useTodo from './hooks/useTodos';

const Main = () => {
  const { onAction, filteredtodo, todosLength, activeTodoCount, todoStatus } = useTodo();

  return (
    <div className={styles.container}>
      <AddTodo onAction={onAction} todosLength={todosLength} activeTodoCount={activeTodoCount} />
      <TodoList taskList={filteredtodo} onAction={onAction} />
      {todosLength > 0 ? (
        <Filters
          activeTodoCount={activeTodoCount}
          onAction={onAction}
          todoStatus={todoStatus}
          todosLength={todosLength}
        />
      ) : null}
    </div>
  );
};

export default Main;
