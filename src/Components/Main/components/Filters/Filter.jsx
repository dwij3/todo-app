import styles from './Filters.module.css';
import { ACTION, FILTER_STATUS } from '../../constants';
import { useCallback } from 'react';
import Button from './Button.jsx/Button';

const Filters = ({ activeTodoCount, onAction, todoStatus, todosCount }) => {
  const config = [
    {
      id: 1,
      status: FILTER_STATUS.ALL,
    },
    {
      id: 2,
      status: FILTER_STATUS.ACTIVE,
    },
    {
      id: 3,
      status: FILTER_STATUS.COMPLETE,
    },
  ];

  const handleTodoStatus = useCallback(
    (status) => {
      onAction({
        type: ACTION.CHANGE_TODO_STATUS,
        status,
      });
    },
    [onAction]
  );

  const handleDeleteCompletedtask = useCallback(() => {
    onAction({
      type: ACTION.DELETE_COMPLETED_TODOS,
    });
  }, [onAction]);

  const clearCompleteClass = activeTodoCount === todosCount ? styles.hideElement : styles.showElement;
  const highlightStatus = styles.highlightStatus;

  return (
    <div className={styles.filterList}>
      <span className={styles.activeTodos}>{activeTodoCount} items left</span>

      <span className={styles.filterButton}>
        {config.map((btn) => {
          console.log(btn);
          return (
            <div key={btn.id}>
              <Button
                className={`${styles.filter} ${todoStatus === btn.status ? highlightStatus : ''}`}
                onClick={() => handleTodoStatus(btn.status)}
              >
                {btn.status}
              </Button>
            </div>
          );
        })}
      </span>

      <Button onClick={handleDeleteCompletedtask} className={`${styles.clearCompleted} ${clearCompleteClass}`}>
        Clear Completed
      </Button>
    </div>
  );
};

export default Filters;
