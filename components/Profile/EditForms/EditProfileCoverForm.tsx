import { UserContext } from '@contexts/UserContext';
import React, { useState, useContext } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { ClipLoader } from 'react-spinners';

type EditProfileCoverFormProps = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProfileCoverForm = ({ setIsEditing }: EditProfileCoverFormProps) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { user, updateUser } = useContext(UserContext)!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setMessage(null);
    } else {
      setPreviewImage(null);
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!selectedFile) {
      setMessage('Please select an image');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('cover', selectedFile);

    try {
      const response = await fetch('/api/upload/cover', {
        method: 'POST',
        body: formData,
      });
      console.log(formData);
      const data = await response.json();

      if (response.ok) {
        updateUser(data.user);
        setIsEditing(false);
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage('Internal server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative">
      <div className="relative">
        <img
          src={previewImage || user?.coverImage || '/images/cover-placeholder.png'}
          className="user-profile-cover relative mb-4 h-44 w-full rounded-2xl object-cover transition-all duration-300 group-hover:brightness-75"
          alt="Cover"
        />
        <div
          onClick={() => setIsEditing(false)}
          className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/40 group-hover:opacity-100"
        >
          <IoClose className="text-xl text-white" />
        </div>
      </div>

      {message && (
        <div className="mb-4 flex items-center rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          <span className="mr-2">⚠️</span>
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-md transition-all duration-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex items-center space-x-4">
          <label htmlFor="cover" className="flex-grow cursor-pointer">
            <div className="rounded-xl border-2 border-dashed border-neutral-300 p-4 text-center transition-all duration-300 hover:border-blue-500 dark:border-neutral-600">
              <div className="flex items-center justify-center space-x-2 text-neutral-500 dark:text-neutral-400">
                <FaCloudUploadAlt className="text-2xl" />
                <span className="text-sm">
                  {selectedFile ? `Selected: ${selectedFile.name}` : 'Click to select cover image'}
                </span>
              </div>
            </div>
          </label>
          <input
            type="file"
            name="cover"
            id="cover"
            className="hidden"
            onChange={handleChange}
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
    </div>
  );
};

export default EditProfileCoverForm;
