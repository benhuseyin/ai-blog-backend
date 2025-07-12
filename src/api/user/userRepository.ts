import { User } from "@/models/user";

export class UserRepository {
  async findAllAsync(): Promise<User[]> {
    const users = await User.findAll();
    return users;
  }

  async findByIdAsync(id: number): Promise<User | null> {
    const user = await User.findByPk(id);
    return user || null;
  }

  async create(user: User): Promise<User> {
    const newUser = await User.create(user);
    return newUser;
  }
}
