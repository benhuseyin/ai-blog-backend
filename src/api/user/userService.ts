import { UserRepository } from "@/api/user/userRepository";
import { User } from "@/models/user";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  // Retrieves a single user by their ID
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findByEmailAsync(email);
      if (!user) return null;

      return user;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  }
}

export const userService = new UserService();
