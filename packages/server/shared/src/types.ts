// packages/shared/src/types.ts
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  name: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  authorId: number;
}

export interface UpdatePostInput {
  id: number;
  title?: string;
  content?: string;
}
