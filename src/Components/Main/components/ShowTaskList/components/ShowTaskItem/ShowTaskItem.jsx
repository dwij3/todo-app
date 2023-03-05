import { useCallback, useState } from 'react';
import styles from './ShowTaskItem.module.css';
import { ACTION } from '../../../../constants';

const  ShowTaskItem = ({ item, onAction }) => {

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(item.name);

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

  let editableTaskItem,
    display = 'none';
  const toggleClass = edit ? styles.hideElement : styles.showElement;
  return (
    <div className={styles.showList}>
      <input
        type="checkbox"
        onChange={handleToggleCompleteTask}
        className={`${styles.toggleCheck} ${toggleClass} `}
        checked={item.isComplete}
        style={{ display: { display } }}
      />

      {editableTaskItem}
      {
        edit ? 
        <EditableTaskName display={display} text={text} onChange={handleChangeTaskName} onEdit={handleEditTaskName} /> 
        : <DisplayTaskName display={display} onActive={activateEditMode} item={item}/>
      }

      <button className={`${styles.deleteButton} ${toggleClass} `} onClick={handleDeleteTask}>
        ✗
      </button>
    </div>
  );
}

export default ShowTaskItem;

const EditableTaskName = ({display , text , onChange ,onEdit}) => {
  display = 'none'; 
    return(  <input className={styles.item} value={text} onChange={onChange} onKeyDown={onEdit} />);
}

const DisplayTaskName = ({display , onActive , item}) => {
  display = 'block';
  return  (
    <div className={styles.item} onDoubleClick={onActive}>
      {' '}
      {item.name}{' '}
    </div>
  );
}