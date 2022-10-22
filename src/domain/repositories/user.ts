import { User } from "../entities/user";

export interface GetUserRepository {
  get: (query: Partial<User>) => Promise<User[]>
}

export interface SaveUserRepository {
  save: (user: User) => Promise<User>
}