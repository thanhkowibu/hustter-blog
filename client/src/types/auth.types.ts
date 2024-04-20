export interface input {
  username: string;
  password: string;
}

export interface AuthUserProps {
  id: number;
  username: string;
  email: string;
}

export interface AuthContextProps {
  user: AuthUserProps | null;
  login: (inputs: any) => Promise<void>;
  logout: () => Promise<void>;
  scrollToTop: () => void;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export interface PostProps {
  id: number;
  post_id: string;
  title: string;
  description: string;
  img: string;
  posts_img: string;
  date: string;
  category: string;
  uid: number;
  username: string;
  users_img: string;
}

export interface PostsArrayProps {
  posts: PostProps[];
}
