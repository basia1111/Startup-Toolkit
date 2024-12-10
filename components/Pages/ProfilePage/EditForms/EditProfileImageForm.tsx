'use client';

import React, { useContext, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { FaCloudUploadAlt, FaImage, FaCheck } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { UserContext } from '@contexts/UserContext';

type UserImageProps = {
  closeModal: () => void;
};

const EditProfileImageForm = ({ closeModal }: UserImageProps) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { update } = useSession();
  const { user, updateUser } = useContext(UserContext)!;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setMessage(null);
    } else {
      setSelectedFile(null);
      setPreviewImage(null);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!selectedFile) {
      setMessage('Please select an image');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/user/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        updateUser(data.user);
        await update({ image: data.image });
        await fetch('/api/auth/session');
        setLoading(false);
        setMessage('');
        setPreviewImage(null);
        closeModal();
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
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black/90">Update Profile Picture</h2>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="relative h-[160px] w-[160px]">
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#8B5CF6]/20 bg-white shadow-lg transition-all duration-300">
            {loading ? (
              <div className="flex h-full items-center justify-center rounded-full bg-black/5 backdrop-blur-sm">
                <ClipLoader color="#8B5CF6" size={40} />
              </div>
            ) : (
              <Image
                src={previewImage || user?.image || '/images/avatar-placeholder.png'}
                alt="profile picture"
                width={160}
                height={160}
                className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                priority
              />
            )}
          </div>

          {selectedFile && (
            <div className="absolute -right-2 -top-2 rounded-full bg-[#8B5CF6] p-2 text-white shadow-lg">
              <FaCheck size={12} />
            </div>
          )}
        </div>

        {message && (
          <div className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {message}
          </div>
        )}

        <form onSubmit={handleUpload} className="w-full space-y-4">
          <div className="group relative">
            <label
              htmlFor="image"
              className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-zinc-200 bg-white/50 p-8 text-center transition-all duration-300 hover:border-[#8B5CF6]/50 hover:bg-white/70"
            >
              <div className="rounded-full bg-[#8B5CF6]/10 p-3 transition-all duration-300 group-hover:bg-[#8B5CF6]/20">
                <FaImage className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-800">
                  {selectedFile ? selectedFile.name : 'Click to upload'}
                </p>
                <p className="text-xs text-zinc-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
              </div>
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedFile || loading}
            className="group relative w-full overflow-hidden rounded-lg bg-[#8B5CF6] px-8 py-3 text-white transition-all duration-200 hover:bg-[#9B6CF7] hover:shadow-lg hover:shadow-[#8B5CF6]/25 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            {loading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              <span className="relative flex items-center justify-center gap-2 font-medium">
                <FaCloudUploadAlt className="text-lg" />
                Upload Image
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileImageForm;
