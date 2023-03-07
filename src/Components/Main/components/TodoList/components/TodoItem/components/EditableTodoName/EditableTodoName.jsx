import styles from './EditableTodoName.module.css'
const EditableTodoName = ({ text , onChange ,onEdit ,itemStyle}) => { 
      return(  <input className={`${itemStyle} ${styles.itemStyle}`} value={text} onChange={onChange} onKeyDown={onEdit} />);
  }

  export default EditableTodoName;