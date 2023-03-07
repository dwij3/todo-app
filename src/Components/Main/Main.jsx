import Filters from './components/Filters';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import styles from './Main.module.css';
import useTodo from './hooks/useTodos';

const Main = () => {
  const { onAction, filteredtodo:todo, todosCount, activeTodoCount, todoStatus } = useTodo();

  return (
    <div className={styles.container}>
      <AddTodo onAction={onAction} todosCount={todosCount} activeTodoCount={activeTodoCount} />
      <TodoList todos={todo} onAction={onAction} />
      {todosCount > 0 ? (
        <Filters
          activeTodoCount={activeTodoCount}
          onAction={onAction}
          todoStatus={todoStatus}
          todosCount={todosCount}
        />
      ) : null}
    </div>
  );
};

export default Main;
