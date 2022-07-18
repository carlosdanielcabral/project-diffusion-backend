import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

class Category extends Model {
  public id: number;
  public name: string;
}

Category.init({
  id: DataTypes.NUMBER,
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'categories',
});

export default Category;
