import styles from './Filters.module.css';
import React from 'react';
import { FILTER_STATUS } from '../constants';
export default function Filters({ activeTaskLength, handleDisplayType, onClearComplete, showClearComplete }) {
  const classOfClearComplete = showClearComplete ? styles.showElement : styles.hideElement;
  return (
    <div className={styles.filterList}>
      <span className={styles.activeTask}>{activeTaskLength} items left</span>

      <span className={styles.filterButton}>
        <button className={styles.filterAllTask} onClick={() => handleDisplayType({type:FILTER_STATUS.ALL})}>
          All
        </button>
        <button className={styles.filterActiveTask} onClick={() => handleDisplayType({type:FILTER_STATUS.ACTIVE})}>
          Active
        </button>
        <button className={styles.filterCompletedTask} onClick={() => handleDisplayType({type:FILTER_STATUS.COMPLETE})}>
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
