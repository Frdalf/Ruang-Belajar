// Interface = "cetakan" bentuk data. Response JSON dari server
// dimasukkan ke object yang bentuknya mengikuti interface ini.

// Bentuk response standar (sama seperti codelab Modul 3).
// <T> = generic: tipe isi "data" ditentukan saat dipakai,
// contoh ApiResponse<User[]> berarti data berisi array User.
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Response DummyJSON GET /users?limit=5 (Admin)
// Hanya properti yang dipakai yang ditulis.
export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
export interface ApiUsersResponse {
  users: ApiUser[];
  total: number;
}

// Response DummyJSON GET /todos?limit=5 (Mahasiswa)
export interface ApiTodo {
  id: number;
  todo: string;
  completed: boolean;
}
export interface ApiTodosResponse {
  todos: ApiTodo[];
  total: number;
}

// Response DummyJSON GET /posts?limit=5 (Dosen)
export interface ApiPost {
  id: number;
  title: string;
  body: string;
}
export interface ApiPostsResponse {
  posts: ApiPost[];
  total: number;
}
