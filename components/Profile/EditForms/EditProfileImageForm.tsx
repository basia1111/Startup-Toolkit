import React, { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { UserContext } from '@contexts/UserContext';

type EditProfileImageFormType = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProfileImageForm = ({ setIsEditing }: EditProfileImageFormType) => {
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
        const refreshedSession = await fetch('/api/auth/session');
        await refreshedSession.json();
        setLoading(false);
        setIsEditing(false);
        setMessage('');
        setPreviewImage(null);
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage('Upload failed');
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setIsEditing(false);
          setPreviewImage(null);
        }}
        className="bg-softWhite font-Inter absolute right-2 top-2 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-800 p-2 shadow-md hover:bg-zinc-200"
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
            src={previewImage || user?.image || '/images/avatar-placeholder.png'}
            alt="profile picture"
            width={192}
            height={192}
            className="h-full w-full object-cover"
            priority
          />
        )}
      </div>
      {message && (
        <div className="border-red text-red mb-4 w-full rounded-md border-[1px] bg-[#f0d8d8] px-2 py-1 text-sm">
          {message}
        </div>
      )}
      <form
        onSubmit={handleUpload}
        className="border-lightGray mb-4 w-full min-w-80 rounded-2xl border bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="image" className="w-full">
            <div className="rounded-xl border-2 border-dashed border-neutral-300 p-4 text-center transition-all duration-300 hover:border-blue-500 dark:border-neutral-600">
              <div className="flex flex-col items-center justify-center space-y-2 text-neutral-500 dark:text-neutral-400">
                <span className="overflow-clip text-sm">
                  {selectedFile
                    ? `Selected: ${selectedFile.name}`
                    : 'Click to select profile image'}
                </span>
              </div>
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
          <button
            type="submit"
            disabled={!selectedFile || loading}
            className="flex items-center justify-center space-x-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-lg" />
                <span>Upload</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfileImageForm;
