import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
}
  
User.init({
  name: DataTypes.STRING
  },{
  sequelize,
  modelName: 'users',
  timestamps: false,
});

export default User;
