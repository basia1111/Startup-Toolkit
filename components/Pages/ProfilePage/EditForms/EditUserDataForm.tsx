'use client';

import React, { useContext, useState } from 'react';
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

  const inputClass = `w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-gray-700
  transition-all duration-300 placeholder:text-gray-400
  hover:border-purple-200 hover:bg-purple-50/50
  focus:border-purple-400 focus:bg-white focus:outline-none
  focus:ring-2 focus:ring-purple-400/20`;

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black text-transparent">Update Profile</h2>
      </div>

      {message && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <span className="mr-2">⚠️</span>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-600 to-pink-600" />
            <h3 className="text-gray-800 text-lg font-medium">Personal Information</h3>
          </div>

          <div className="grid gap-4">
            <input
              name="name"
              placeholder="Full Name"
              defaultValue={user?.name || ''}
              className={inputClass}
            />
            <input
              name="professionalTitle"
              placeholder="Professional Title"
              defaultValue={user?.professionalTitle || ''}
              className={inputClass}
            />
            <input
              name="city"
              placeholder="Warsaw, Poland"
              defaultValue={user?.city || ''}
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-600 to-pink-600" />
            <h3 className="text-gray-800 text-lg font-medium">Social Media</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: FaTwitter, name: 'twitter', placeholder: 'Twitter URL' },
              { icon: FaLinkedin, name: 'linkedIn', placeholder: 'LinkedIn URL' },
              { icon: FaGithub, name: 'github', placeholder: 'GitHub URL' },
            ].map(({ icon: Icon, name, placeholder }) => (
              <div key={name} className="group space-y-2">
                <Icon className="text-gray-400 text-2xl transition-colors duration-300 group-focus-within:text-purple-600" />
                <input
                  defaultValue={user?.socialmedia?.[name as keyof typeof user.socialmedia] || ''}
                  name={name}
                  placeholder={placeholder}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
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
      </form>
    </div>
  );
};

export default EditUserDataForm;
