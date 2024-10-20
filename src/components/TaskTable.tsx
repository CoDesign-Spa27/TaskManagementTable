'use client'
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/Task';
import { ChevronDown, ChevronUp, SquarePen, Trash2 } from 'lucide-react';

interface TaskTableProps {
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ onEditTask,onDeleteTask }) => {
  const { tasks } = useTaskContext();

  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const toggleTaskDetails = (taskId: string) => {
    setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
  };
  return (<>
    <div className="overflow-hidden sm:block hidden  rounded-[10px] border border-[#941B0F]">
      <table className="min-w-full bg-white">
        <thead className='border-b border-[#941B0F] text-[14px] text-[#941b0f]'>
          <tr className='bg-[#FFF9F8]'>
            <th className="px-4 py-2 text-left">SL No.</th>
            <th className="px-4 py-2 text-left">Task Name</th>
           
            <th className="px-4 py-2 text-left">Due Date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody >
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center">
                No tasks found
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr className={`text-[14px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF9F8]'}`} key={task.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{task.name}</td>
               
                <td className="px-4 py-2">{task.dueDate}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1  rounded-full ${task.status === 'Completed' ? 'bg-[#03A229] text-white' : task.status === 'InProgress' ? 'bg-[#F5D20E] text-white' : ''}`}>
                  {task.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <select
                  value={task.priority}
                  onChange={(e) => onEditTask({ ...task, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                  className="border border-gray-300 rounded-md px-2 py-1"
                  >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  </select>
                </td>
                <td className=" py-2 flex items-center gap-4 justify-center">
                  <button onClick={() => onEditTask(task)}>
                  <SquarePen className='w-5 h-5' />
                  </button>
                  <button onClick={() => onDeleteTask(task.id)}>
                  <Trash2 className='w-5 h-5' />
                  </button>
                </td>
                </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    <div className="overflow-hidden sm:hidden rounded-[10px] border border-[#941B0F]">
      <table className="min-w-full bg-white">
      <tbody>
        {tasks.length === 0 ? (
        <tr>
          <td colSpan={7} className="px-4 py-2 text-center">
          No tasks found
          </td>
        </tr>
        ) : (
        tasks.map((task, index) => (
          <>
          <tr className={`text-[14px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF9F8] '}`} key={task.id}>
            <td className="px-4 py-2 text-left text-[#941B0F]">SL No.</td>
            <td className="px-4 py-2">{index + 1}</td>
            <td
  className="px-4 py-2 cursor-pointer"
  onClick={() => toggleTaskDetails(task.id)}
>
  <div className="flex items-center justify-center">
    <ChevronDown
      className={`w-5 h-5 transition-transform duration-300 transform ${expandedTaskId === task.id && 'rotate-180'}`}
      style={{ transformOrigin: 'center' }}
    />
  </div>
</td>

          </tr>
          <tr className={`text-[14px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF9F8]'}`} key={task.id + '-name'}>
            <td className="px-4 py-2 text-[#941B0F] text-left">Task Name</td>
            <td className="px-4 py-2">{task.name}</td>
            <td></td>
          </tr>
          {expandedTaskId === task.id && (  <>
          <tr className={`text-[14px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF9F8]'}`} key={task.id + '-dueDate'}>
            <td className="px-4 py-2 text-left text-[#941B0F]">Due Date</td>
            <td className="px-4 py-2">{task.dueDate}</td>
            <td></td>

          </tr>
          <tr className={`text-[14px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF9F8]'}`} key={task.id + '-status'}>
            <td className="px-4 py-2 text-left text-[#941B0F]">Status</td>
            <td className="px-4 py-2">
            <span className={`px-2 py-1 rounded-full  ${task.status === 'Completed' ? 'bg-[#03A229] text-white' : task.status === 'InProgress' ? 'bg-[#F5D20E] text-white' : ''}`}>
              {task.status}
            </span>
            </td>
            <td></td>

          </tr>
          <tr className={`text-[14px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF9F8]'}`} key={task.id + '-priority'}>
            <td className="px-4 py-2 text-left text-[#941B0F]">Priority</td>
            <td className="px-4 py-2 flex gap-5">
            <select
              value={task.priority}
              onChange={(e) => onEditTask({ ...task, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
           
            <td className="py-2 flex items-center gap-2 justify-center">
            <button onClick={() => onEditTask(task)}>
              <SquarePen className='w-5 h-5' />
            </button>
            <button onClick={() => onDeleteTask(task.id)}>
              <Trash2 className='w-5 h-5' />
            </button>
            </td>
            </td>
            <td></td>

          </tr>
</> )}
          </>
        ))
        )}
      </tbody>
      </table>
    </div>
          </>
  );
};

export default TaskTable;
