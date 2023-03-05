import { useState} from 'react';
import { FILTER_STATUS } from './constants';
export default function useDisplayTodoList(todo){
    
    const [todoStatus, setTodoStatus] =  useState(() => {
        return FILTER_STATUS.ALL;
    });

    const displaytodo = todo.filter((task) => {
        if(todoStatus === FILTER_STATUS.ALL) return true;
        else if(todoStatus === FILTER_STATUS.ACTIVE) return !task.isComplete;
        else return task.isComplete;
    });

    const onAction = (action) => {
        switch(action.type){
            case FILTER_STATUS.ALL:
                setTodoStatus(FILTER_STATUS.ALL);
                break;
        

            case FILTER_STATUS.ACTIVE:
                setTodoStatus(FILTER_STATUS.ACTIVE);
                break;
            

            case FILTER_STATUS.COMPLETE:
                setTodoStatus(FILTER_STATUS.COMPLETE);
                break;
            

            default:
                setTodoStatus(FILTER_STATUS.ALL);
            
        }
    }

    return [displaytodo,onAction];
}