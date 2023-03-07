import Filters from './components/filters';
import AddTodo from './components/addTodo';
import TodoList from './components/todoList';
import styles from './Main.module.css';
import useTodo from './hooks/useTodos';

const Main = () => {
  const { onAction, todos, totalCount, activeTodoCount, todoStatus } = useTodo();

  return (
    <div className={styles.container}>
      <AddTodo onAction={onAction} totalCount={totalCount} activeTodoCount={activeTodoCount} />
      <TodoList todos={todos} onAction={onAction} />
      {totalCount ? (
        <Filters
          activeTodoCount={activeTodoCount}
          onAction={onAction}
          todoStatus={todoStatus}
          totalCount={totalCount}
        />
      ) : null}
    </div>
  );
};

export default Main;
