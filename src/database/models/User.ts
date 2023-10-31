import { Model, DataTypes } from 'sequelize';
import sequelize from '.';
import Post from './Post';

class User extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  public createdAt!: Date;

  public updatedAt!: Date;
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'users',
    underscored: true,
  },
);

User.hasMany(Post, { foreignKey: 'authorId' as 'author' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

export default User;
