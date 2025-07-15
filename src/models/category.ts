import { CategoryStatus } from "@/constants/enums";
import sequelize from "@/infrasturcture/database/postgre";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare status: string;

  declare createdAt: Date;

  declare updatedAt: Date;
}

export const CategoryInit = () => {
  Category.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM(...Object.keys(CategoryStatus)),
        allowNull: false,
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
      tableName: "categories",
      sequelize, // passing the `sequelize` instance is required
    }
  );

  return;
};
