'use client';

import { Project } from '@types';
import React, { useState } from 'react';
import { FaCloudUploadAlt, FaImage, FaCheck } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

type CreateProjectFormType = {
  closeModal: () => void;
  updateProjects: (project: Project) => void;
};

const CreateProjectForm = ({ closeModal, updateProjects }: CreateProjectFormType) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setMessage('');
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
        const newProject = data.newProject;
        updateProjects(newProject);
        setLoading(false);
        setMessage('');
        closeModal();
      } else {
        setMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setMessage(`Upload failed: ${error}`);
      setLoading(false);
    }
  };

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black/90">Create Project</h2>
      </div>

      {message && (
        <div className="mb-6 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Project Title"
            className="w-full rounded-lg border border-zinc-200 bg-white/50 p-3 text-zinc-800 transition-all duration-300 focus:border-[#8B5CF6]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
          />

          <textarea
            name="description"
            rows={6}
            placeholder="Write something about project..."
            className="w-full rounded-lg border border-zinc-200 bg-white/50 p-3 text-zinc-800 transition-all duration-300 focus:border-[#8B5CF6]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
          />

          <input
            name="email"
            type="email"
            placeholder="Contact Email"
            className="w-full rounded-lg border border-zinc-200 bg-white/50 p-3 text-zinc-800 transition-all duration-300 focus:border-[#8B5CF6]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
          />

          <div className="relative">
            {preview && (
              <div className="mb-4 h-40 w-full overflow-hidden rounded-lg border-4 border-[#8B5CF6]/20 bg-white">
                <img
                  src={preview}
                  alt="Project cover"
                  className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                />
                <div className="absolute -right-2 -top-2 rounded-full bg-[#8B5CF6] p-2 text-white shadow-lg">
                  <FaCheck size={12} />
                </div>
              </div>
            )}

            <label
              htmlFor="cover"
              className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-zinc-200 bg-white/50 p-8 text-center transition-all duration-300 hover:border-[#8B5CF6]/50 hover:bg-white/70"
            >
              <div className="rounded-full bg-[#8B5CF6]/10 p-3 transition-all duration-300 group-hover:bg-[#8B5CF6]/20">
                <FaImage className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-800">
                  {selectedFile ? selectedFile.name : 'Click to upload project cover'}
                </p>
                <p className="text-xs text-zinc-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
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
            className="group relative w-full overflow-hidden rounded-lg bg-[#8B5CF6] px-8 py-3 text-white transition-all duration-200 hover:bg-[#9B6CF7] hover:shadow-lg hover:shadow-[#8B5CF6]/25 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            {loading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              <span className="relative flex items-center justify-center gap-2 font-medium">
                <FaCloudUploadAlt className="text-lg" />
                Create Project
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
