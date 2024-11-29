'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ProfilePictureUpload() {
  const [message, setMessage] = useState('');
  const { data: session, update } = useSession();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem('image') as HTMLInputElement;

    if (!fileInput.files?.[0]) {
      setMessage('Please select an image');
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
      setMessage(data.message);
    } catch {
      setMessage('Upload failed');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" name="image" accept="image/*" />
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
}
