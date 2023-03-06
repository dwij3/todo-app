const DisplayTaskName = ({display , onActive , item , itemStyle , completedTaskStyle}) => {
    display = 'block';
    return  (
      <div className={`${itemStyle} ${(item.isComplete) ? completedTaskStyle : ""}`} onDoubleClick={onActive}>
        {' '}
        {item.name}{' '}
      </div>
    );
  };

  export default DisplayTaskName;