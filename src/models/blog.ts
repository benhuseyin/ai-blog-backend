import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
} from "@sequelize/core/lib/decorators/legacy";

export class Blog extends Model<
  InferAttributes<Blog>,
  InferCreationAttributes<Blog>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare htmlContent: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare status: string;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare createdAt: Date;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare updatedAt: Date;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare cardDescription: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare categoryId: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;
}
