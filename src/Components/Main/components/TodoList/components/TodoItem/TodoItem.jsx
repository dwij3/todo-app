import { useCallback, useState } from 'react';
import styles from './TodoItem.module.css';
import { ACTION } from '../../../../constants';
import EditableTodoName from './components/EditableTodoName/EditableTodoName';
import DisplayTodoName from './components/TodoName/TodoName';

const TodoItem = ({ item, onAction }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(item.name);
  const [displayDeleteButton, setDisplayDeleteButton] = useState();

  const handleEditMode = useCallback(() => {
    setEdit(true);
  }, []);

  const handleChangeTodoName = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleEditTodoName = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        setEdit(false);
        onAction({
          type: ACTION.EDIT_TODO,
          changedTask: { ...item, name: text },
        });
      }
    },
    [item, onAction, text]
  );

  const ToggleCompleteTodos = useCallback(() => {
    onAction({
      type: ACTION.EDIT_TODO,
      changedTask: { ...item, isComplete: !item.isComplete },
    });
  }, [item, onAction]);

  const handleDeleteTodo = useCallback(() => {
    onAction({
      type: ACTION.DELETE_TODO,
      id: item.id,
    });
  }, [item.id, onAction]);

  const handleMouseEnter = () => {
    setDisplayDeleteButton(true);
  };

  const handleMouseLeave = () => {
    setDisplayDeleteButton(false);
  };

  const toggleClass = edit ? styles.hideElement : styles.showElement;
  return (
    <div className={styles.showList} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          id="checkbox"
          onChange={ToggleCompleteTodos}
          className={`${toggleClass} ${styles.checkboxRound}`}
          checked={item.isComplete}
        />
      </div>
      {edit ? (
        <EditableTodoName
          text={text}
          onChange={handleChangeTodoName}
          onEdit={handleEditTodoName}
          itemStyle={styles.item}
        />
      ) : (
        <DisplayTodoName
          onActive={handleEditMode}
          item={item}
          itemStyle={styles.item}
          completedTaskStyle={styles.completedTask}
        />
      )}

      <button
        className={`${styles.deleteButton} ${
          (displayDeleteButton&& !edit) ? styles.showElement : styles.hideElement
        }`}
        onClick={handleDeleteTodo}
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem;
