import { useState , useCallback} from 'react';
import styles from './AddTask.module.css';
import { ACTION } from '../../constants';

const AddTask = ({ onAction }) => {
  const [text, setText] = useState('');

  const handleInputChange = useCallback((e) => {
    setText(e.target.value);
  },[]);

  const handleAddInput = useCallback((e) => {
    if (e.key === 'Enter') {
      if(text !== ''){
        onAction({
          type: ACTION.ADD_TASK,
          text:text
        });
      }
      setText('');
    }
  },[onAction, text]);

  const handleToggleCompletedTasks = useCallback(() => {
    onAction({
      type:ACTION.TOGGLE
    })
  },[onAction]);

 //const classOfSelectToggle = isTaskEmpty ? styles.hideElement : styles.showElement;
 const classOfSelectToggle  = styles.showElement;
  return (
    <div className={styles.inputContainer}>
      <div className={`${styles.selectToggle} ${classOfSelectToggle}`} onClick={handleToggleCompletedTasks}>
        ❯
      </div>
      <input
        type="text"
        value={text}
        className={`${styles.inputField}`}
        placeholder="What needs to be done?"
        onKeyDown={handleAddInput}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default AddTask;
