const TodoName = ({ onActive , todo , todoStyle , completedTodoStyle}) => {
    return  (
      <div className={`${todoStyle} ${(todo.isComplete) ? completedTodoStyle : ""}`} onDoubleClick={onActive}>
        {' '}
        {todo.name}{' '}
      </div>
    );
  };

  export default TodoName;