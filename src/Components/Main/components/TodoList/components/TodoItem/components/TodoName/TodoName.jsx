const DisplayTodoName = ({ onActive , item , itemStyle , completedTaskStyle}) => {
    return  (
      <div className={`${itemStyle} ${(item.isComplete) ? completedTaskStyle : ""}`} onDoubleClick={onActive}>
        {' '}
        {item.name}{' '}
      </div>
    );
  };

  export default DisplayTodoName;