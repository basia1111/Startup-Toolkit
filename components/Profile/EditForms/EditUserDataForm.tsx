'use client';

import React, { useContext, useState } from 'react';
import Input from './Input';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { UserContext } from '@contexts/UserContext';
import { ClipLoader } from 'react-spinners';

type UserDetailsProps = {
  closeModal: () => void;
};

const EditUserDataForm = ({ closeModal }: UserDetailsProps) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useContext(UserContext)!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    setMessage('');

    try {
      setLoading(true);
      const response = await fetch('/api/user/edit/bio', {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();
      setLoading(false);
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

      <form onSubmit={handleSubmit} className="gap-8 md:grid md:grid-cols-2">
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
              <FaTwitter className="mb-2 text-3xl text-neutral-300" />
              <Input
                name="twitter"
                placeholder="https://twitter.com/..."
                defaultValue={user?.socialmedia?.twitter || ''}
              />
            </div>
            <div className="flex flex-col items-center">
              <FaLinkedin className="mb-2 text-3xl text-neutral-300" />
              <Input
                name="linkedIn"
                placeholder="https://linkedin.com/in/..."
                defaultValue={user?.socialmedia?.linkedIn || ''}
              />
            </div>
            <div className="flex flex-col items-center">
              <FaGithub className="mb-2 text-3xl text-neutral-300" />
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
            disabled={loading}
            className="bg-accent hover:bg-accentHover disabled:bg-accentDisabled w-full transform rounded-md px-2 py-3 text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {loading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              <>
                <span>Update Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserDataForm;
