import styles from "./Filters.module.css";
import { ACTION , FILTER_STATUS } from "../../constants";
import { useCallback } from "react";

const Filters = ({ activeTaskCount,onAction})=>{

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

    const classOfClearComplete = styles.showElement;
    
    return(
    <div className={styles.filterList}>
      <span>{activeTaskCount} items left</span>

      <span className={styles.filterButton}>
        <button className={styles.filterAllTask} onClick={() =>  changeTodoStatus(FILTER_STATUS.ALL)}>
          All
        </button>
        <button className={styles.filterActiveTask} onClick={() => changeTodoStatus(FILTER_STATUS.ACTIVE)}>
          Active
        </button>
        <button
          className={styles.filterCompletedTask}
          onClick={() => changeTodoStatus(FILTER_STATUS.COMPLETE)}
        >
          Completed
        </button>
      </span>

      {<button onClick={handleDeleteCompletedtask} className={`${styles.clearComplete} ${classOfClearComplete}`}>Clear Complete</button>}
    </div>
    );
}

export default Filters;