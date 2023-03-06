import styles from "./Filters.module.css";
import { ACTION , FILTER_STATUS } from "../../constants";
import { useCallback } from "react";

const Filters = ({ activeTaskCount,onAction , todoStatus , todosLength})=>{

    const changeTodoStatus = useCallback(
      (status) => {
        onAction({
          type:ACTION.CHANGE_TODO_STATUS,
          status
        })
      }
      ,[onAction]);


    const handleDeleteCompletedtask = useCallback(() =>{
      onAction({
        type:ACTION.DELETE_COMPLETED_TASKS
      });
    },[onAction]);  

     const clearCompleteClass = (activeTaskCount===todosLength) ? styles.hideElement : styles.showElement;
     const highlightStatus = styles.highlightStatus;
    return(
    <div className={styles.filterList}>
      <span className={styles.activeTask}>{activeTaskCount} items left</span>

      <span className={styles.filterButton}>
        <button className={`${styles.filterAllTask} ${(todoStatus===FILTER_STATUS.ALL) ? highlightStatus : ""}`} onClick={() =>  changeTodoStatus(FILTER_STATUS.ALL)}>
          All
        </button>
        <button className={`${styles.filterActiveTask} ${(todoStatus===FILTER_STATUS.ACTIVE)? highlightStatus : ""}`} onClick={() => changeTodoStatus(FILTER_STATUS.ACTIVE)}>
          Active
        </button>
        <button
          className={`${styles.filterCompletedTask} ${(todoStatus===FILTER_STATUS.COMPLETE) ? highlightStatus : ""}`}
          onClick={() => changeTodoStatus(FILTER_STATUS.COMPLETE)}
        >
          Completed
        </button>
      </span>

      {<button onClick={handleDeleteCompletedtask} className={`${styles.clearComplete} ${clearCompleteClass}`}>Clear Complete</button>}
    </div>
    );
}

export default Filters;