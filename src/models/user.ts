import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;

  declare fullName: string;

  declare email: string;

  declare password: string;

  declare role: string;

  declare status: string;

  declare createdAt: Date;

  declare updatedAt: Date;

  declare profileImage: string;
}
