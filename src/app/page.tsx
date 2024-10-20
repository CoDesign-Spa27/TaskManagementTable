"use client"
import { useContext, useState } from 'react';
import { TaskProvider, useTaskContext } from '../context/TaskContext';
import TaskTable from '../components/TaskTable';
import SearchBar from '../components/SearchBar';
import AddTaskButton from '../components/AddTaskButton';
import SortFilterOptions from '../components/SortFilter';
import TaskModal from '../components/TaskModal';
import { Task } from '../types/Task';
import DeleteModal from '@/components/DeleteModal';


const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const {deleteTask}=useTaskContext();


  const openModal = (task?: Task) => {
    setEditingTask(task || null);
    setIsModalOpen(true);
  };

const openDeleteModal = (id: string) => {
  setIsDeleteModalOpen(true);
  setDeletingTaskId(id);
}

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingTaskId(null);
     }
   
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

 
  const handleDelete = () => {
    if (deletingTaskId) {
      deleteTask(deletingTaskId); 
      closeDeleteModal();
    }
  };

  return (
      <div className="w-full mx-auto p-1">
        <div className="flex justify-end pt-3 mb-4">
          <SearchBar />
        </div>
        <div className="flex justify-between items-center mb-4 px-3">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <div className="flex gap-2 items-center">
        <AddTaskButton onClick={() => openModal()} />
        <SortFilterOptions />
          </div>
        </div>
        <div className='sm:px-3 px-0'>

        <TaskTable onEditTask={openModal}  onDeleteTask={openDeleteModal}/>
        </div>
        {isModalOpen && (
          <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        task={editingTask}
          />
        )}

        {
          isDeleteModalOpen && (
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onDelete={handleDelete}
            />
          )
        }
      </div>
 
  );
};

export default Home;