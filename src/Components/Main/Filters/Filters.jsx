import styles from './Filters.module.css';
import React from 'react';

export default function Filters({ activeTaskLength, handleDisplayType, onClearComplete, showClearComplete }) {
  const classOfClearComplete = showClearComplete ? styles.showElement : styles.hideElement;
  return (
    <div className={styles.filterList}>
      <span className={styles.activeTask}>{activeTaskLength} items left</span>

      <span className={styles.filterButton}>
        <button className={styles.filterAllTask} onClick={() => handleDisplayType('ALL')}>
          All
        </button>
        <button className={styles.filterActiveTask} onClick={() => handleDisplayType('ACTIVE')}>
          Active
        </button>
        <button className={styles.filterCompletedTask} onClick={() => handleDisplayType('COMPLETE')}>
          Completed
        </button>
      </span>

      {
        <button onClick={onClearComplete} className={`${styles.clearComplete} ${classOfClearComplete}`}>
          Clear Complete
        </button>
      }
    </div>
  );
}
