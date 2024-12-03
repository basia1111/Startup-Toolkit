'use client';

import React, { useState } from 'react';
import Input from '../Profile/EditForms/Input';

type CreateProjectFormType = {
  closeModal: () => void;
};

const CreateProjectForm = ({ closeModal }: CreateProjectFormType) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/project/create', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        closeModal();
        setLoading(false);
        setMessage('');
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage('Upload failed');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900">Create Project</h2>

      {message && (
        <div className="border-red text-red mb-4 w-full rounded-md border-[1px] bg-[#f0d8d8] px-2 py-1 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="gap-8">
        <div className="space-y-4">
          <h3 className="text-gray text-lg font-semibold">Personal Information</h3>
          <Input name="title" type="textarea" placeholder="Title" />
          <Input
            name="description"
            type="textarea"
            placeholder="Write something about project..."
          />
          <Input name="email" type="string" placeholder="constct email" />
          <div className="flex flex-col items-center space-y-4">
            <label htmlFor="cover" className="w-full">
              <div className="rounded-xl border-2 border-dashed border-neutral-300 p-4 text-center transition-all duration-300 hover:border-blue-500 dark:border-neutral-600">
                <div className="flex flex-col items-center justify-center space-y-2 text-neutral-500 dark:text-neutral-400">
                  Click to select profile image
                </div>
              </div>
            </label>
            <input type="file" name="cover" id="cover" className="hidden" accept="image/*" />
          </div>
          <button
            type="submit"
            className="gradient-bg w-full transform rounded-md px-2 py-3 text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {loading ? 'loading.....' : 'Create project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
