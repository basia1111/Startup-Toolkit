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

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black/90">Update Profile</h2>
      </div>

      {message && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 rounded-full bg-[#8B5CF6]/20" />
            <h3 className="text-lg font-medium text-zinc-800">Personal Information</h3>
          </div>

          <div className="grid gap-4">
            <input
              name="name"
              placeholder="Full Name"
              defaultValue={user?.name || ''}
              className="rounded-lg border border-zinc-200 bg-white/50 px-4 py-2.5 text-zinc-800 transition-all duration-200 placeholder:text-zinc-400 hover:bg-white/70 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
            />
            <input
              name="professionalTitle"
              placeholder="Professional Title"
              defaultValue={user?.professionalTitle || ''}
              className="rounded-lg border border-zinc-200 bg-white/50 px-4 py-2.5 text-zinc-800 transition-all duration-200 placeholder:text-zinc-400 hover:bg-white/70 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
            />
            <input
              name="city"
              placeholder="Warsaw, Poland"
              defaultValue={user?.city || ''}
              className="rounded-lg border border-zinc-200 bg-white/50 px-4 py-2.5 text-zinc-800 transition-all duration-200 placeholder:text-zinc-400 hover:bg-white/70 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 rounded-full bg-[#8B5CF6]/20" />
            <h3 className="text-lg font-medium text-zinc-800">Social Media</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: FaTwitter, name: 'twitter', placeholder: 'Twitter URL' },
              { icon: FaLinkedin, name: 'linkedIn', placeholder: 'LinkedIn URL' },
              { icon: FaGithub, name: 'github', placeholder: 'GitHub URL' },
            ].map(({ icon: Icon, name, placeholder }) => (
              <div key={name} className="group space-y-2">
                <Icon className="text-2xl text-zinc-400 transition-colors duration-200 group-focus-within:text-[#8B5CF6]" />
                <input
                  defaultValue={user?.socialmedia?.[name as keyof typeof user.socialmedia] || ''}
                  name={name}
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-zinc-200 bg-white/50 px-4 py-2.5 text-zinc-800 transition-all duration-200 placeholder:text-zinc-400 hover:bg-white/70 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-lg bg-[#8B5CF6] px-8 py-3 text-white transition-all duration-200 hover:bg-[#9B6CF7] hover:shadow-lg hover:shadow-[#8B5CF6]/25 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 disabled:opacity-70"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

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
