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
      <div className="border-softWhite mb-6 h-28 w-28 overflow-hidden rounded-full border-4 md:h-32 md:w-32 md:border-8">
        {loading ? (
          <div className="flex h-full items-center justify-center bg-neutral-100">
            <ClipLoader color="#737373" size={40} />
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
        className="relative mb-4 w-full min-w-80 rounded-2xl border border-neutral-200 bg-white p-2 pt-8 shadow-sm transition-all duration-300 hover:shadow-xl"
      >
        <div
          onClick={() => {
            setIsEditing(false);
            setPreviewImage(null);
          }}
          className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
        >
          <IoMdClose
            className="absolute cursor-pointer rounded-full p-1 text-neutral-300 hover:text-neutral-500"
            size={28}
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <label htmlFor="image" className="w-full">
            <div className="rounded-xl border-2 border-dashed border-neutral-300 p-4 text-center transition-all duration-300 hover:border-blue-500">
              <div className="flex flex-col items-center justify-center space-y-2 text-neutral-500">
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
            className="bg-accent hover:bg-accetHover disabled:bg-accentDisabled flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-white transition-all duration-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              <>
                <span>Upload</span>
                <FaCloudUploadAlt className="text-lg" />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfileImageForm;
