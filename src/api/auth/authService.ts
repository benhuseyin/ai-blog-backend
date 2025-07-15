import { StatusCodes } from "http-status-codes";

import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import { userService } from "../user/userService";

export type RegisterParams = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  email: string;
};

export class AuthService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  // Retrieves all users from the database
  async register(
    registerParams: RegisterParams
  ): Promise<ServiceResponse<null>> {
    try {
      const protectedPassword = await bcrypt.hash(registerParams.password, 10);

      const userToCheck = await userService.findByEmail(registerParams.email);

      if (userToCheck) {
        return ServiceResponse.failure(
          "Email already exists",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      const user = {
        fullName: registerParams.fullName,
        email: registerParams.email,
        password: protectedPassword,
        role: "user",
        status: "active",
        profileImage: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log("User", user);
      const newUser = await this.userRepository.create(user as User);
      console.log("New User", newUser);
      return ServiceResponse.success<null>("User registered", null);
    } catch (ex) {
      const errorMessage = `Error registering user: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while registering user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(
    LoginParams: LoginParams
  ): Promise<ServiceResponse<LoginResponse | null>> {
    try {
      const user = await userService.findByEmail(LoginParams.email);
      if (!user) {
        return ServiceResponse.failure(
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      const isPasswordValid = await bcrypt.compare(
        LoginParams.password,
        user.password
      );

      if (!isPasswordValid) {
        return ServiceResponse.failure(
          "Invalid password",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      return ServiceResponse.success<LoginResponse>("User found", {
        id: user.id,
        email: user.email,
      });
    } catch (ex) {
      const errorMessage = `Error logging in: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while logging in.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Retrieves a single user by their ID
  async findById(id: number): Promise<ServiceResponse<User | null>> {
    try {
      const user = await this.userRepository.findByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure(
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<User>("User found", user);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const authService = new AuthService();
