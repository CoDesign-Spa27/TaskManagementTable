'use client'
import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/Task';
import {  X } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task }) => {
  const { addTask, updateTask } = useTaskContext();
  const [formData, setFormData] = useState<Task>({
    id: '',
    name: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'InProgress',
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        id: Date.now().toString(),
        name: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        status: 'InProgress',
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      updateTask(formData);
    } else {
      addTask(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 px-8 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6  text-sm rounded max-w-lg w-full">
        <div className='flex items-center justify-between mb-2 '>

        <h2 className="text-xl font-bold">{task ? 'Edit Task' : 'Add Task'}</h2>
        <X 
        onClick={onClose}
        className='w-4 h-4' />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 ">Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='Title'
              className="w-full border-2 rounded px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder='Description'
              className="w-full border-2 rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Choose Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border-2 rounded px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border-2 rounded px-2 py-1"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border-2 rounded px-2 py-1"
            >
              <option value="InProgress">InProgress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="border border-[#941B0F]  text-[#941B0F] font-bold py-2 px-4 rounded mr-2">
                Cancel
              </button>
            <button
              type="submit"
              className="bg-[#941B0F] hover:bg-[#682923] text-white font-bold py-2 px-4 rounded"
            >
              {task ? 'Update' : 'Add'} Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;