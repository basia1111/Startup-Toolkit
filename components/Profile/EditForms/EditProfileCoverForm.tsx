import { UserContext } from '@contexts/UserContext';
import React, { useState, useContext } from 'react';
import { FaCloudUploadAlt, FaImage } from 'react-icons/fa';
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
      const response = await fetch('/api/user/upload/cover', {
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
    <div className="group relative pb-[20px]">
      <div className="relative">
        <div className="relative h-44 overflow-hidden rounded-2xl bg-white md:h-60">
          <img
            src={previewImage || user?.coverImage || '/images/cover-placeholder.png'}
            className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-75"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-300/20 to-violet-300/60" />
          <button
            onClick={() => setIsEditing(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-black/40"
          >
            <IoClose className="text-2xl text-white/80" />
          </button>
        </div>
      </div>
      {message && (
        <div className="mb-4 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
          <span className="mr-2">⚠️</span>
          {message}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-black/4 mt-4 space-y-4 rounded-2xl border border-white/10 p-6 backdrop-blur-sm"
      >
        <div className="flex items-center gap-4">
          <label
            htmlFor="cover"
            className="flex flex-grow cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 bg-black/20 p-6 text-center transition-all duration-300 hover:border-white/20"
          >
            <div className="w-12 rounded-full bg-[#8B5CF6]/10 p-3 transition-all duration-300 group-hover:bg-[#8B5CF6]/20">
              <FaImage className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-white/90">
                {selectedFile ? selectedFile.name : 'Click to upload project cover'}
              </p>
              <p className="text-xs text-zinc-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
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
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#8B5BF6] px-6 py-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-50"
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
