'use client';

import React, { useContext, useState } from 'react';
import Input from './Input';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { UserContext } from '@contexts/UserContext';

type UserDetailsProps = {
  closeModal: () => void;
};

const EditUserDataForm = ({ closeModal }: UserDetailsProps) => {
  const [message, setMessage] = useState('');
  const { user, updateUser } = useContext(UserContext)!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    setMessage('');

    try {
      const response = await fetch('/api/user/edit/bio', {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        updateUser(data.user);
        closeModal();
      } else {
        setMessage(data?.message || '');
      }
    } catch {
      setMessage('Data update failed.');
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900">Update Profile</h2>

      {message && (
        <div className="border-red text-red mb-4 w-full rounded-md border-[1px] bg-[#f0d8d8] px-2 py-1 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-gray text-lg font-semibold">Personal Information</h3>
          <Input name="name" placeholder="Full Name" defaultValue={user?.name || ''} />
          <Input
            name="professionalTitle"
            placeholder="Professional Title"
            defaultValue={user?.professionalTitle || ''}
          />
          <Input name="city" placeholder="Warsaw, Poland" defaultValue={user?.city || ''} />
        </div>

        <div className="space-y-4">
          <h3 className="text-gray text-lg font-semibold">Social Media</h3>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <FaTwitter className="text-mediumGray mb-2 text-3xl" />
              <Input
                name="twitter"
                placeholder="https://twitter.com/..."
                defaultValue={user?.socialmedia?.twitter || ''}
              />
            </div>
            <div className="flex flex-col items-center">
              <FaLinkedin className="text-mediumGray mb-2 text-3xl" />
              <Input
                name="linkedIn"
                placeholder="https://linkedin.com/in/..."
                defaultValue={user?.socialmedia?.linkedIn || ''}
              />
            </div>
            <div className="flex flex-col items-center">
              <FaGithub className="text-mediumGray mb-2 text-3xl" />
              <Input
                name="github"
                placeholder="https://github.com/..."
                defaultValue={user?.socialmedia?.github || ''}
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 mt-6">
          <button
            type="submit"
            className="gradient-bg w-full transform rounded-md px-2 py-3 text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserDataForm;
