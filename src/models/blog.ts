import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: CreationOptional<number>;

  declare title: string;

  declare htmlContent: string;

  declare status: string;

  declare createdAt: Date;

  declare updatedAt: Date;

  declare cardDescription: string;

  declare categoryId: number;

  declare userId: number;
}
