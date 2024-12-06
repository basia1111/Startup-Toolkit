'use client';

import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Input from '@components/Profile/EditForms/Input';
import { ClipLoader } from 'react-spinners';

type CreateProjectFormType = {
  closeModal: () => void;
};

const CreateProjectForm = ({ closeModal }: CreateProjectFormType) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (selectedFile) {
      formData.append('cover', selectedFile);
    }

    try {
      setLoading(true);
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
        setLoading(false);
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
          <h3 className="text-gray text-lg font-semibold">Project Information</h3>
          <Input name="title" type="textarea" placeholder="Title" />
          <textarea
            name="description"
            id="description"
            rows={8}
            placeholder="Write something about project..."
            className="max-h-[45vh] w-full overflow-y-scroll rounded-md border border-zinc-300 p-3"
          />
          <Input name="email" type="string" placeholder="Contact email" />
          <div className="flex flex-col items-center space-y-4">
            {preview ? (
              <img
                src={preview}
                alt="Selected file preview"
                className="border-lightGray h-20 w-full rounded-md border object-cover"
              />
            ) : (
              <img
                alt="No file selected"
                className="border-lightGray h-20 w-full rounded-md border"
              />
            )}
            <label htmlFor="cover" className="w-full">
              <div className="rounded-xl border-2 border-dashed border-neutral-300 p-4 text-center transition-all duration-300 hover:border-blue-500 dark:border-neutral-600">
                <div className="flex items-center justify-center gap-2 space-y-2 text-neutral-500 dark:text-neutral-400">
                  Click to select profile image
                  <FaCloudUploadAlt className="text-lg" />
                </div>
              </div>
            </label>
            <input
              onChange={handleChange}
              type="file"
              name="cover"
              id="cover"
              className="hidden"
              accept="image/*"
            />
          </div>
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

export default CreateProjectForm;
