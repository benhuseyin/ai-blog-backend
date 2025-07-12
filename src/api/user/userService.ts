import { UserRepository } from "@/api/user/userRepository";

export type User = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }
}

export const userService = new UserService();
