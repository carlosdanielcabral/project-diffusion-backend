import { Model, DataTypes } from 'sequelize';
import sequelize from '.';
import Post from './Post';

class User extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;
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
  },
  {
    sequelize,
    modelName: 'users',
    timestamps: false,
  },
);

User.hasMany(Post, { foreignKey: 'author' as 'authorData' });
Post.belongsTo(User, { foreignKey: 'author', as: 'authorData' });

export default User;
