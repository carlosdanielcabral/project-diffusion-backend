import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

class Post extends Model {
  public id: number;
  public title: string;
  public content: string;
  public author: number;
  public createdAt: Date;
  public updatedAt: Date;
}
  
Post.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  author: DataTypes.INTEGER,
  content: DataTypes.TEXT,
  createdAt: DataTypes.DATE,
  title: DataTypes.STRING,
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'posts',
});

export default Post;
