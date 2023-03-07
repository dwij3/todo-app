import TodoItem from "./components/todoItem";

const TodoList = ({todos,onAction}) => {
    return(
        <>
        {
            todos.map((todo) => {
                return <TodoItem key={todo.id} item={todo} onAction={onAction}/>
            })
        }
        </>
    );
}

export default TodoList;