import { expect } from 'chai';
import Sinon from 'sinon';
import User from '../../database/models/User';
import UserService from '../../api/services/UserService';
import { allUsers, createdUser } from '../mocks/user';

describe('Testa o service User', () => {
  it('01) Verifica se é possível salvar uma pessoa usuária', async () => {
    const service = new UserService(User);

    const { password, ...savedUser } = createdUser;

    Sinon.stub(User, 'findOne').resolves();
    Sinon.stub(User, 'create').resolves(createdUser as User);

    const { id, ...user } = createdUser;

    user.password = 'user01';
    const response = await service.save(user);

    expect(response).to.be.deep.equals(savedUser);

    (User.findOne as Sinon.SinonStub).restore();
    (User.create as Sinon.SinonStub).restore();
  });

  it('02) Verifica se não é possível salvar uma pessoa usuária se o email já existe no banco', async () => {
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

  it('03) Verifica se o método login retorna os dados corretos ao receber dados válidos', async () => {
    const service = new UserService(User);

    Sinon.stub(User, 'findOne').resolves(createdUser as User);

    const { id, name, ...user } = createdUser;

    user.password = 'user01';
    const response = await service.login(user);

    const { password, ...expectedUser } = createdUser;

    expect(response).to.be.deep.equal(expectedUser);

    (User.findOne as Sinon.SinonStub).restore();
  });

  it('04) Verifica se o método login retorna um erro quando recebe um email inválido', async () => {
    const service = new UserService(User);

    Sinon.stub(User, 'findOne').resolves();

    const { id, name, ...user } = createdUser;

    try {
      await service.login(user);
    } catch (error) {
      expect(error.message).to.be.equal('User not found');
    }

    (User.findOne as Sinon.SinonStub).restore();
  });

  it('05) Verifica se o método login retorna um erro quando recebe uma senha inválida', async () => {
    const service = new UserService(User);

    Sinon.stub(User, 'findOne').resolves(createdUser as User);

    const { id, name, ...user } = createdUser;
    user.password = '123456';

    try {
      await service.login(user);
    } catch (error) {
      expect(error.message).to.be.equal('Invalid email or password');
    }

    (User.findOne as Sinon.SinonStub).restore();
  });

  it('06) Verifica se o método  findAll retorna todos as pessoas usuárias', async () => {
    const service = new UserService(User);

    Sinon.stub(User, 'findAll').resolves(allUsers as User[]);

    const response = await service.findAll();
    expect(response).to.be.deep.equal(allUsers);

    (User.findAll as Sinon.SinonStub).restore();
  });

  it('07) Verifica se o método findAllByFilter retorna as pessoas usuárias filtradas', async () => {
    const service = new UserService(User);
    const mock = allUsers.filter(user => user.name.includes('Ra'));

    Sinon.stub(User, 'findAll').resolves(mock as User[]);

    const response = await service.findAllByFilter('name', 'Ra');
    expect(response).to.be.deep.equal(mock);

    (User.findAll as Sinon.SinonStub).restore();
  });

  it('08) Verifica se é possível atualizar os dados da pessoa usuária', async () => {
    const service = new UserService(User);

    Sinon.stub(User, 'findOne').resolves(createdUser as User);

    Sinon.stub(User, 'update').resolves();
    const { id, password, ...user } = createdUser;
    user.name = 'User 001';

    const updatedUserMock = { id, ...user };

    Sinon.stub(User, 'findByPk').resolves(updatedUserMock as User);

    const response = await service.update(user);
    expect(response).to.be.deep.equal(updatedUserMock);

    (User.findOne as Sinon.SinonStub).restore();
    (User.update as Sinon.SinonStub).restore();
    (User.findByPk as Sinon.SinonStub).restore();
  });

  it('09) Verifica se não é possível atualizar os dados de pessoa usuária não cadastrada', async () => {
    const service = new UserService(User);

    Sinon.stub(User, 'findOne').resolves();
    const { password, ...user } = createdUser;

    try {
      await service.update(user);
    } catch (error) {
      expect(error.message).to.be.equal('User not found');
    }

    (User.findOne as Sinon.SinonStub).restore();
  });
});
