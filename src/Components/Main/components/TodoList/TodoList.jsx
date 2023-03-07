import TodoItem from "./components/TodoItem";

const TodoList = ({todos,onAction}) => {
    return(
        <>
        {
            todos.map((task) => {
                return <TodoItem key={task.id} item={task} onAction={onAction}/>
            })
        }
        </>
    );
}

export default TodoList;