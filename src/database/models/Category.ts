import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

class Category extends Model {
  public id: number;

  public name: string;
}

Category.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'categories',
    timestamps: false,
  },
);

export default Category;
