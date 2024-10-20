"use client";

import { Task } from "@/types/Task";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, "id">) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    searchTasks: (query: string) => void;
    sortTask: (order: "asc" | "desc") => void;
    filterTasks: (priority?: string, status?: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    const addTask = (newTask: Omit<Task, "id">) => {
        const nextId =
            tasks.length > 0 ? Math.max(...tasks.map((t) => Number(t.id))) + 1 : 1;
        const taskWithId = { ...newTask, id: nextId.toString() };
        const updatedTasks = [...tasks, taskWithId];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const updateTask = (updateTask: Task) => {
        const updatedTasks = tasks.map((t) => (t.id === updateTask.id ? updateTask : t));
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const searchTasks = (query: string) => {
        const lowercaseQuery = query.toLowerCase();
        setFilteredTasks(
            tasks.filter((t) => t.name.toLowerCase().includes(lowercaseQuery))
        );
    };

    const sortTask = (order: "asc" | "desc") => {
        const sorted = [...filteredTasks].sort((a, b) => {
            const aDate = new Date(a.dueDate).getTime();
            const bDate = new Date(b.dueDate).getTime();

            return order === "asc" ? aDate - bDate : bDate - aDate;
        });

        setFilteredTasks(sorted);
    };

    const filterTasks = (priority?: string, status?: string) => {
        setFilteredTasks(
            tasks.filter((t) => {
                const priorityCheck = !priority || t.priority === priority;
                const statusCheck = !status || t.status === status;
                return priorityCheck && statusCheck;
            })
        );
    };

    return (
        <TaskContext.Provider
            value={{
                tasks: filteredTasks,
                addTask,
                updateTask,
                deleteTask,
                searchTasks,
                sortTask,
                filterTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};

export default useTaskContext;
