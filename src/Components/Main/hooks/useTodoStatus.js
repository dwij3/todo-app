import { useState, useEffect, useCallback } from 'react';
import { FILTER_STATUS } from '../constants';

const useTodoFilter = () => {
    const [todoStatus, setTodoStatus] = useState(() => {
        const savedTodoStatus = localStorage.getItem('status');
        if(savedTodoStatus){
          return JSON.parse(savedTodoStatus);
        }
          return FILTER_STATUS.ALL;
      });

      useEffect(() => {
        localStorage.setItem('status' ,JSON.stringify(todoStatus) );
      }, [ todoStatus]);


      const changeTodoStatus = useCallback((status) => {
        setTodoStatus(status);
      }, []);

      

      return {todoStatus , changeTodoStatus};
}

export default useTodoFilter;