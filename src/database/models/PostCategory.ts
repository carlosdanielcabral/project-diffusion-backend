import { Model, DataTypes } from 'sequelize';
import sequelize from '.';
import Category from './Category';
import Post from './Post';

class PostCategory extends Model {
  public postId: number;

  public categoryId: number;
}

PostCategory.init(
  {
    postId: DataTypes.NUMBER,
    categoryId: DataTypes.NUMBER,
  },
  {
    sequelize,
    modelName: 'post_categories',
    timestamps: false,
    underscored: true,
  },
);

export default PostCategory;
