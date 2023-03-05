import Filters from './components/Filters';
import AddTask from './components/AddTask';
import ShowTaskList from './components/ShowTaskList'
import styles from './Main.module.css';
import useDisplayTodoList from './hooks/useDisplayTodoList';

/*
1. arrow function 
2. named exports 
3. custom hook returns object 
4. camelcase 
5. name refactor 
6. remove comments 
7. activeTaskLength ==> activetaskCount 
8. uuid 
9. typescript 

*/



const Main = () => {
  const { displaytodo:todoList , onAction , activeTaskCount} = useDisplayTodoList(); 

  return (
    <div className={styles.container}>
      <AddTask onAction={onAction} />
      <ShowTaskList taskList={todoList} onAction={onAction}/>
        <Filters
         activeTaskCount = {activeTaskCount}
         onAction={onAction}  
        />
    </div>
  );
}

export default Main;
