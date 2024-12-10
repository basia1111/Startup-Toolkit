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
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black text-transparent">Update About</h2>
      </div>

      {message && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <span className="mr-2">⚠️</span>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-600 to-pink-600" />
            <h3 className="text-gray-800 text-lg font-medium">About You</h3>
          </div>

          <div className="group relative">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 blur-sm transition-all duration-300 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-purple-500/20" />
            <textarea
              name="about"
              id="about"
              rows={8}
              placeholder="Write something about yourself..."
              defaultValue={user?.about || ''}
              className="text-gray-700 placeholder:text-gray-400 scrollbar-thin scrollbar-track-purple-50 scrollbar-thumb-purple-200 relative w-full rounded-xl border border-purple-100 bg-white px-4 py-3 transition-all duration-300 hover:border-purple-200 focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-3.5 text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400/20 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {loading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              <span className="relative font-medium">Save Changes</span>
            )}
          </button>
        </div>
      </form>

      <div className="pointer-events-none fixed inset-0 hidden md:block">
        <div className="absolute -right-40 top-0 h-72 w-72 rounded-full bg-purple-600/5 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-pink-600/5 blur-3xl" />
      </div>
    </div>
  );
};

export default EditUserAboutForm;
