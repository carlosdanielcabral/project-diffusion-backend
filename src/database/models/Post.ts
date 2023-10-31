import { Model, DataTypes } from 'sequelize';
import sequelize from '.';
import Category from './Category';
import PostCategory from './PostCategory';

class Post extends Model {
  public id: number;

  public title: string;

  public content: string;

  public authorId: number;

  public createdAt: Date;

  public updatedAt: Date;
}

Post.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    authorId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    title: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'posts',
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


export default Post;
