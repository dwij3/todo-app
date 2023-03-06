import { useCallback, useState } from 'react';
import styles from './ShowTaskItem.module.css';
import { ACTION } from '../../../../constants';
import EditableTaskName  from './components/EditableTask';
import DisplayTaskName  from './components/DisplayTask';
const  ShowTaskItem = ({ item, onAction }) => {

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(item.name);
  const [displayDeleteButton, setDisplayDeleteButton] = useState();

  const activateEditMode = useCallback(() =>{
    setEdit(true);
  },[]);

  const handleChangeTaskName = useCallback((e)=> {
    setText(e.target.value);
  },[]);

  const handleEditTaskName = useCallback((e) => {
    if (e.key === 'Enter') {
      setEdit(false);
      onAction({
        type: ACTION.EDIT_TASK,
        changedTask: { ...item, name: text },
      });
    }
  },[item, onAction, text]);

  const handleToggleCompleteTask = useCallback(() => {
    onAction({
      type: ACTION.EDIT_TASK,
      changedTask: { ...item, isComplete: !item.isComplete },
    });
  },[item, onAction]);

  const handleDeleteTask = useCallback(() => {
    onAction({
      type: ACTION.DELETE_TASK,
      id: item.id,
    });
  },[item.id, onAction]);

  const handleMouseEnter = () => {
    setDisplayDeleteButton(true);
  }

  const handleMouseLeave = () => {
    setDisplayDeleteButton(false);
  }


  let editableTaskItem,
    display = 'none';
  const toggleClass = edit ? styles.hideElement : styles.showElement;
  return (
    <div className={styles.showList} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

      <div className={styles.toggleCheck}>
      <input
        type="checkbox"
        id="checkbox"
        onChange={handleToggleCompleteTask}
        className={`${toggleClass} ${styles.checkboxRound}`}
        checked={item.isComplete}
        style={{ display: { display } }}
      />
      </div>
      
      

      {editableTaskItem}
      {
        edit ? 
        <EditableTaskName display={display} text={text} onChange={handleChangeTaskName} onEdit={handleEditTaskName} itemStyle={styles.item}/> 
        : <DisplayTaskName display={display} onActive={activateEditMode} item={item} itemStyle={styles.item} completedTaskStyle={styles.completedTask}/>
      }

       <button className={`${styles.deleteButton} ${toggleClass} ${(displayDeleteButton) ? styles.showElement : styles.hideElement}`} onClick={handleDeleteTask}>
        X
      </button>
    </div>
  );
}

export default ShowTaskItem;



