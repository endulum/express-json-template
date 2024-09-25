export {};

declare global {
  namespace Express {
    export interface Request {
      formErrors?: Record<string, string>,
      user: User
    }
    export interface User {
      id: number,
      username: string,
      password: string,
      role: string
    }
  }
}
