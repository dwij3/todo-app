import { useState } from 'react';
import styles from './ShowListItem.module.css';

export default function ShowListItem({ item, onDeleteTask, onChangeTask }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(item.name);
  function handleDoubleClick() {
    console.log('IN function handleDoubleClick');
    setEdit(true);
  }

  let editableTaskItem,
    display = 'none';

  function handleChangeTaskName(e) {
    setText(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setEdit(false);
      console.log(text);
      onChangeTask({ ...item, name: text });
    }
  }

  if (edit) {
    display = 'none';
    editableTaskItem = (
      <input className={styles.item} value={text} onChange={handleChangeTaskName} onKeyDown={handleKeyDown} />
    );
  } else {
    display = 'block';
    editableTaskItem = (
      <div className={styles.item} onDoubleClick={handleDoubleClick}>
        {' '}
        {item.name}{' '}
      </div>
    );
  }

  // console.log(editableTaskItem);

  const toggleClass = edit ? styles.hideElement : styles.showElement;

  function showDeleteButton() {}

  function hideDeleteButton() {}
  return (
    <div className={styles.showList}>
      <input
        type="checkbox"
        onChange={() => onChangeTask({ ...item, isComplete: !item.isComplete })}
        className={`${styles.toggleCheck} ${toggleClass} `}
        checked={item.isComplete}
        style={{ display: { display } }}
      />

      {editableTaskItem}

      <button
        className={`${styles.deleteButton} ${toggleClass} `}
        onClick={() => onDeleteTask(item.id)}
        onMouseEnter={() => showDeleteButton()}
        omMouseOver={() => hideDeleteButton()}
      >
        ✗
      </button>
    </div>
  );
}
