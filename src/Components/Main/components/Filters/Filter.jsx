import styles from './Filters.module.css';
import { ACTION, FILTER_STATUS } from '../../constants';
import { useCallback } from 'react';
import Button  from './Button.jsx/Button';

const Filters = ({ activeTodoCount, onAction, todoStatus, todosLength }) => {
  const changeTodoStatus = useCallback(
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

  const clearCompleteClass = activeTodoCount === todosLength ? styles.hideElement : styles.showElement;
  const highlightStatus = styles.highlightStatus;


  return (
    <div className={styles.filterList}>
      <span className={styles.activeTodos}>{activeTodoCount} items left</span>

      <span className={styles.filterButton}>
        <Button
          className={`${styles.filter} ${todoStatus === FILTER_STATUS.ALL ? highlightStatus : ''}`}
          onClick={() => changeTodoStatus(FILTER_STATUS.ALL)}
        >
          All
        </Button>
        <Button
          className={`${styles.filter} ${todoStatus === FILTER_STATUS.ACTIVE ? highlightStatus : ''}`}
          onClick={() => changeTodoStatus(FILTER_STATUS.ACTIVE)}
        >
          Active
        </Button>
        <Button
          className={`${styles.filter} ${todoStatus === FILTER_STATUS.COMPLETE ? highlightStatus : ''}`}
          onClick={() => changeTodoStatus(FILTER_STATUS.COMPLETE)}
        >
          Completed
        </Button>
      </span>

      {
        <Button onClick={handleDeleteCompletedtask} className={`${styles.clearCompleted} ${clearCompleteClass}`}>
          Clear Completed
        </Button>
      }
    </div>
  );
};

export default Filters;
