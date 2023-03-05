import ShowTaskItem from "./components/ShowTaskItem";

const ShowTaskList = ({taskList,onAction}) => {
    return(
        <>
        {
            taskList.map((task) => {
                return <ShowTaskItem key={task.id} item={task} onAction={onAction}/>
            })
        }
        </>
    );
}

export default ShowTaskList;