import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/infrasturcture/database/postgre";
import { BlogStatus } from "@/constants/enums";

class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: CreationOptional<number>;

  declare title: string;

  declare htmlContent: string;

  declare cardDescription: string;

  declare status: string;

  declare createdAt: Date;

  declare updatedAt: Date;

  declare categoryId: number;

  declare userId: number;
}

export const BlogInit = () => {
  Blog.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      htmlContent: { type: DataTypes.TEXT, allowNull: false },
      cardDescription: { type: DataTypes.STRING, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM(...Object.keys(BlogStatus)),
        allowNull: false,
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
      tableName: "blogs",
      sequelize, // passing the `sequelize` instance is required
    }
  );

  return;
};
