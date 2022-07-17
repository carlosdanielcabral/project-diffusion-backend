import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
}
  
User.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
  },{
  sequelize,
  modelName: 'users',
  timestamps: false,
});

export default User;
