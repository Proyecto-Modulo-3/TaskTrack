import { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export function TaskContextProvider({ children }) {
    const [visibleTasks, setVisibleTasks] = useState({});

    function showTasks (listId, tasks) {
        setVisibleTasks((prev) => ({ ...prev, [listId]: tasks }));
    }

    function hideTasks (listId) {
        setVisibleTasks((prev) => {
            const newTasks = { ...prev };
            delete newTasks[listId];
            return newTasks;
        })
    }

    const value = {
        visibleTasks,
        showTasks,
        hideTasks
    }

    return <TaskContext.Provider value={value}>
        {children}
    </TaskContext.Provider>
}

export const useTaskContext = () => useContext(TaskContext)

export default TaskContext;