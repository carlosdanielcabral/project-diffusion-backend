import { expect } from 'chai';
import Sinon from 'sinon';
import User from '../../database/models/User';
import UserService from '../../services/UserService';
import { createdUser } from '../mocks/user';

describe('Testa o service User', () => {
  it('01) Verifica se é possível salvar um usuário', async () => {
    const service = new UserService(User);
    Sinon.stub(User, 'findOne').resolves();
    Sinon.stub(User, 'create').resolves(createdUser as User);
    const { id, ...user } = createdUser;
    const response = await service.save(user);
    expect(response).to.be.equals(createdUser);
    (User.findOne as Sinon.SinonStub).restore();
    (User.create as Sinon.SinonStub).restore();
  });

  it('02) Verifica se não é possível salvar um usuário se o email já existe no banco', async () => {
    const service = new UserService(User);
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    const { id, ...user } = createdUser;
    try {
      await service.save(user);
    } catch (err) {
      expect(err.message).to.be.equal('Email already exists');
    }
    (User.findOne as Sinon.SinonStub).restore();
  });
});
