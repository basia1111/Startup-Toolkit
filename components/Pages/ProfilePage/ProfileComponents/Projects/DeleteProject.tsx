import React, { useState } from 'react';
import { Project } from '@types';
import { FaRegCircleXmark } from 'react-icons/fa6';

type DeleteProjectProps = {
  setProjectsList: React.Dispatch<React.SetStateAction<Project[] | null>>;
  id: string;
  closeModal: () => void;
};

const DeleteProject = ({ id, setProjectsList, closeModal }: DeleteProjectProps) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setMessage(null);

    try {
      const response = await fetch(`/api/project/delete/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      console.error(setProjectsList);
      if (response.ok) {
        setProjectsList((prev) => {
          if (!prev) return null;
          return prev.filter((project) => project._id != id);
        });
        closeModal();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(`Project could not be deleted: ${error}`);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md">
      <FaRegCircleXmark size={50} className="text-red-600" />
      {message && <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">{message}</div>}
      <h2 className="text-gray-800 text-xl font-bold">Confirm Deletion</h2>
      <p className="text-gray-600 text-center">
        Are you sure you want to delete this project? This action cannot be undone.
      </p>
      <div className="flex w-full justify-center gap-3">
        <button
          onClick={handleClick}
          className="rounded-md bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={() => closeModal()}
          className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md border bg-white px-6 py-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteProject;
