import { useState, useCallback } from 'react';
import styles from './AddTodo.module.css';
import { ACTION } from '../../constants';

const AddTodo = ({ onAction, totalCount, activeTodoCount }) => {
  const [text, setText] = useState('');

  const handleInputChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleAddInput = useCallback(
    (e) => {
      if (e.key === 'Enter' && text) {
          onAction({
            type: ACTION.ADD_TODO,
            text: text,
          });
        setText('');
      }
    },
    [onAction, text]
  );

  const toggleCompletedTodos = useCallback(() => {
    onAction({
      type: ACTION.EDIT_TODOS,
      editType: ACTION.TOGGLE
    });
  }, [onAction]);

  const selectToggleClass = totalCount ? styles.showElement : styles.hideElement;
  const toggleColor = styles.toggleColor;
  return (
    <div className={styles.inputContainer}>
      <div
        className={`${styles.selectToggle} ${selectToggleClass} ${activeTodoCount !== 0 ? toggleColor : ''}`}
        onClick={toggleCompletedTodos}
      >
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
};

export default AddTodo;
