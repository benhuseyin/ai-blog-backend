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
}
