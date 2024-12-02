export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  professionalTitle?: string;
  city?: string;
  about?: string;
  socialmedia?: {
    twitter?: string;
    linkedIn?: string;
    github?: string;
  };
  coverImage?: string;
};
