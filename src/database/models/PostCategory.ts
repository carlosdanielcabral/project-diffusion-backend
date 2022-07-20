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

Post.belongsToMany(Category, {
  as: 'categories',
  through: PostCategory,
  foreignKey: 'post_id',
  otherKey: 'category_id',
});

Category.belongsToMany(Post, {
  as: 'posts',
  through: PostCategory,
  foreignKey: 'category_id',
  otherKey: 'post_id',
});
