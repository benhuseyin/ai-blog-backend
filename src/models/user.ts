import { UserStatus, UserRole } from "@/constants/enums";
import sequelize from "@/infrasturcture/database/postgre";
import {
  CreationOptional,
  DataTypes,
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

  declare profileImage?: string;
}

export const UserInit = () => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },

      password: {
        type: new DataTypes.STRING(256),
        allowNull: false,
      },
      role: {
        type: new DataTypes.ENUM(...Object.keys(UserRole)),
        allowNull: false,
      },
      status: {
        type: new DataTypes.ENUM(...Object.keys(UserStatus)),
        allowNull: false,
      },
      profileImage: {
        type: new DataTypes.STRING(1000),
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "users",
      sequelize, // passing the `sequelize` instance is required
    }
  );

  return UserInit;
};
