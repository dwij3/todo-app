import styles from './EditableTodoName.module.css'
const EditableTodoName = ({ todoName , onChange ,onEdit ,todoStyle}) => { 
      return(  <input className={`${todoStyle} ${styles.itemStyle}`} value={todoName} onChange={onChange} onKeyDown={onEdit} />);
  }

  export default EditableTodoName;