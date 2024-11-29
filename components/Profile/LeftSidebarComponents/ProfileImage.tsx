'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { ClipLoader } from 'react-spinners';

type ProfileImage = {
  session: Session;
};

const ProfileImage = ({ session: backendSession }: ProfileImage) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const { data: session, update, status } = useSession();
  const currentSession = status === 'loading' ? backendSession : session;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem('image') as HTMLInputElement;
    setLoading(true);

    if (!fileInput.files?.[0]) {
      setMessage('Please select an image');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      await update({ image: data.image });
      setLoading(false);
      setIsEditing(false);
      setMessage('');
      setPreviewImage(null);

      setMessage(data.message);
    } catch {
      setMessage('Upload failed');
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {!isEditing ? (
        <>
          <div className="border-softWhite relative mb-6 h-48 w-48 overflow-hidden rounded-full border-8 shadow-lg">
            <Image
              src={currentSession?.user?.image || '/images/avatar-placeholder.png'}
              alt="profile picture"
              width={192}
              height={192}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div
            onClick={() => {
              setIsEditing(true);
              console.log('click');
            }}
            className="bg-softWhite absolute bottom-6 right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-800 p-2 shadow-md hover:bg-zinc-200"
          >
            <FaCamera className="text-gray" size={12} />
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => {
              setIsEditing(false);
              setPreviewImage(null);
            }}
            className="bg-softWhite absolute right-2 top-2 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-800 p-2 shadow-md hover:bg-zinc-200"
          >
            <IoMdClose
              className="text-gray absolute cursor-pointer rounded-full bg-gray-800 p-1 hover:bg-gray-700"
              size={28}
            />
          </div>
          <div className="border-softWhite relative z-40 mb-6 h-48 w-48 overflow-hidden rounded-full border-8 shadow-lg">
            {loading ? (
              <div className="flex h-full items-center justify-center text-gray-500">
                <ClipLoader color="#fa9e00" size={40} />
              </div>
            ) : (
              <Image
                src={
                  previewImage || currentSession?.user?.image || '/images/avatar-placeholder.png'
                }
                alt="profile picture"
                width={192}
                height={192}
                className="h-full w-full object-cover"
                priority
              />
            )}
          </div>
          <form onSubmit={handleUpload} className="flex flex-col items-center space-y-2 pb-4">
            <label
              htmlFor="image"
              className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
            >
              Select Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="submit"
              className="hover:bg-lightOrange disabled:bg-lightOrange rounded-lg bg-black px-6 py-2 text-sm text-white"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
            {message && <p className="text-sm text-gray-600">{message}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default ProfileImage;
