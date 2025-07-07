import { User } from "@/models/user";

export const users: User[] = [
  User.build({
    id: 1,
    fullName: "Alice",
    email: "alice@example.com",
    password: "password",
    role: "admin",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
    profileImage: "https://example.com/alice.jpg",
  }),
  User.build({
    id: 2,
    fullName: "Robert",
    email: "Robert@example.com",
    password: "password",
    role: "admin",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
    profileImage: "https://example.com/robert.jpg",
  }),
];

export class UserRepository {
  async findAllAsync(): Promise<User[]> {
    return users;
  }

  async findByIdAsync(id: number): Promise<User | null> {
    return users.find((user) => user.id === id) || null;
  }
}
