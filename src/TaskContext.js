import React, {createContext,useReducer} from "react";

export const TaskContext = createContext();

const initalState = {
    tasks: [],
};

const taskReducer = (state,action) =>{
    switch(action.type){
        case'ADD_TASK':
        return{
            ...state,
            tasks: [...state.tasks, action.payload],
        };
        case 'UPDATE_TASK':
            return{
                ...state,
                tasks: state.tasks.map((task) =>
                task.id === action.payload.id ? action.payload : task
                ),
            };
        case 'DELETE_TASK':
            return{
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        case'SET_TASKS':
          return{
            ...state,
            tasks: action.payload,
          };
          default:
            return state;
    }
};

export const TaskProvider = ({children}) => {
    const [state, dispatch] = useReducer(taskReducer, initalState);

    return(

        <TaskContext.Provider value ={{state,dispatch}}>
            {children}
        </TaskContext.Provider>
    );
};
