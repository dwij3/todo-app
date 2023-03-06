import TodoItem from "./components/TodoItem";

const TodoList = ({taskList,onAction}) => {
    return(
        <>
        {
            taskList.map((task) => {
                return <TodoItem key={task.id} item={task} onAction={onAction}/>
            })
        }
        </>
    );
}

export default TodoList;