import React, { useContext } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { ModalContext } from '@contexts/ModalContext';
import CreateProjectForm from './CreateProjectForm';

const CreateProject = () => {
  const { openModal, closeModal } = useContext(ModalContext)!;
  return (
    <div>
      <FaCirclePlus
        onClick={() => openModal(<CreateProjectForm closeModal={closeModal} />)}
        size={30}
        className="tetx-neutral-500"
      />
    </div>
  );
};

export default CreateProject;
