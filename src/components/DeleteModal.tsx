import { X } from 'lucide-react';
import React from 'react'

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 px-8 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6  text-sm rounded max-w-md w-full flex flex-col justify-center gap-7">
        <div className='flex justify-between items-center'>
        <p className='text-[19px] w-80 flex-wrap'>Are you sure you that you wish to delete this task?</p>
        <X 
        onClick={onClose}
        className='w-4 h-4' />
        </div>
        <div className='flex items-center gap-2'>
        <button 
        className=' border-[#941B0F] border text-[#941B0F] font-bold py-1.5 px-10 w-full rounded text-center text-sm gap-2'
        onClick={onClose}>Cancel</button>

        <button className=' bg-[#941B0F] hover:bg-[#671b14] text-white font-bold py-1.5 px-10 w-full rounded text-center  text-sm gap-2' onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
