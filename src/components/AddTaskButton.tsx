import { Plus } from 'lucide-react';
import React from 'react';

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#941B0F] hover:bg-[#671b14] text-white font-bold py-2 px-3 rounded flex items-center text-sm gap-2"
    >
      <Plus className='w-4 h-4' />
      Add Task
    </button>
  );
};

export default AddTaskButton;