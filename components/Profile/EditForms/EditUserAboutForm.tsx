'use client';

import React, { useContext, useState } from 'react';
import { UserContext } from '@contexts/UserContext';
import { ClipLoader } from 'react-spinners';

type UserDetailsProps = {
  closeModal: () => void;
};

const EditUserAboutForm = ({ closeModal }: UserDetailsProps) => {
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
      const response = await fetch('/api/user/edit/about', {
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
      <h2 className="mb-6 text-2xl font-bold text-zinc-900">Update About</h2>

      {message && (
        <div className="border-red text-red mb-4 w-full rounded-md border-[1px] bg-[#f0d8d8] px-2 py-1 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full gap-8">
        <div>
          <h3 className="text-gray text-lg font-semibold">Personal Information</h3>
          <textarea
            name="about"
            id="about"
            rows="10"
            placeholder="Write something about yourself..."
            defaultValue={user?.about || ''}
            className="max-h-[70vh] w-full overflow-y-scroll"
          />
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

export default EditUserAboutForm;
