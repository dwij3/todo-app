const EditableTaskName = ({display , text , onChange ,onEdit ,itemStyle}) => {
    display = 'none'; 
      return(  <input className={itemStyle} value={text} onChange={onChange} onKeyDown={onEdit} />);
  }

  export default EditableTaskName;