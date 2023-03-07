import { useCallback, useState } from 'react';
import styles from './TodoItem.module.css';
import { ACTION } from '../../../../constants';
import EditableTodoName from './components/editableTodoName';
import DisplayTodoName from './components/displayTodoName';

const TodoItem = ({ item, onAction }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(item.name);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);

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
          type: ACTION.EDIT_TODOS,
          editType:ACTION.EDIT_TODO_ITEM,
          changedTodo: { ...item, name: text },
        });
      }
    },
    [item, onAction, text]
  );

  const toggleCompleteTodos = useCallback(() => {
    onAction({
      type: ACTION.EDIT_TODOS,
      editType:ACTION.EDIT_TODO_ITEM,
      changedTodo: { ...item, isComplete: !item.isComplete },
    });
  }, [item, onAction]);

  const handleDeleteTodo = useCallback(() => {
    onAction({
      type: ACTION.DELETE_TODOS,
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
          onChange={toggleCompleteTodos}
          className={`${toggleClass} ${styles.checkboxRound}`}
          checked={item.isComplete}
        />
      </div>
      {edit ? (
        <EditableTodoName
          todoName={text}
          onChange={handleChangeTodoName}
          onEdit={handleEditTodoName}
          todoStyle={styles.item}
        />
      ) : (
        <DisplayTodoName
          onActive={handleEditMode}
          todo={item}
          todoStyle={styles.item}
          completedTodoStyle={styles.completedTodo}
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
