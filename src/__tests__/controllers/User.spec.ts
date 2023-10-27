import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import User from '../../database/models/User';

import App from '../../app';

import UserService from '../../api/services/UserService';
import { allUsers, createdUser } from '../mocks/user';

chai.use(chaiHttp);

describe('Testa o controller User', () => {
  const app = new App();
  const service = new UserService(User);

  it('01) Verifica se é possível salvar uma pessoa usuária com dados válidos', async () => {
    Sinon.stub(User, 'findOne').resolves();
    Sinon.stub(User, 'create').resolves(createdUser as User);
    Sinon.stub(service, 'save').resolves(createdUser as User);
    const { id, ...userData } = createdUser;
    const response = await chai.request(app.app).post('/user').send(userData);
    expect(response).to.have.status(201);
    expect(response.body).to.have.property('token');
    (User.findOne as Sinon.SinonStub).restore();
    (User.create as Sinon.SinonStub).restore();
  });

  it('02) Verifica se não é possível salvar uma pessoa usuária sem fornecer um nome', async () => {
    const { id, name, ...userData } = createdUser;
    const response = await chai.request(app.app).post('/user').send(userData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"name" is required',
    });
  });

  it('03) Verifica se não é possível salvar uma pessoa usuária com um nome inválido', async () => {
    const { id, ...userData } = createdUser;
    userData.name = 'ad';
    const response = await chai.request(app.app).post('/user').send(userData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"name" length must be at least 3 characters long',
    });
  });

  it('04) Verifica se não é possível salvar uma pessoa usuária sem fornecer um email', async () => {
    const { id, email, ...userData } = createdUser;
    const response = await chai.request(app.app).post('/user').send(userData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"email" is required',
    });
  });

  it('05) Verifica se não é possível salvar uma pessoa usuária com um email inválido', async () => {
    const { id, ...userData } = createdUser;
    userData.email = 'user01email.com';
    const response = await chai.request(app.app).post('/user').send(userData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"email" must be a valid email',
    });
  });

  it('06) Verifica se não é possível salvar uma pessoa usuária sem fornecer uma senha', async () => {
    const { id, password, ...userData } = createdUser;
    const response = await chai.request(app.app).post('/user').send(userData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"password" is required',
    });
  });

  it('07) Verifica se não é possível salvar uma pessoa usuária com uma senha inválida', async () => {
    const { id, ...userData } = createdUser;
    userData.password = '123';
    const response = await chai.request(app.app).post('/user').send(userData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"password" length must be at least 4 characters long',
    });
  });

  it('08) Verifica se é possível fazer login com dados válidos', async () => {
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    const { id, name, ...userData } = createdUser;
    const response = await chai
      .request(app.app)
      .post('/user/login')
      .send(userData);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');
    (User.findOne as Sinon.SinonStub).restore();
  });

  it('09) Verifica se não é possível fazer login com um email inválido', async () => {
    Sinon.stub(User, 'findOne').resolves();
    const { id, name, ...userData } = createdUser;
    const response = await chai
      .request(app.app)
      .post('/user/login')
      .send(userData);
    expect(response).to.have.status(401);
    expect(response.body).to.be.deep.equal({
      message: 'Invalid email or password',
    });
    (User.findOne as Sinon.SinonStub).restore();
  });

  it('10) Verifica se não é possível fazer login com uma senha inválida', async () => {
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    const { id, name, ...userData } = createdUser;
    userData.password = '12345';
    const response = await chai
      .request(app.app)
      .post('/user/login')
      .send(userData);
    expect(response).to.have.status(401);
    expect(response.body).to.be.deep.equal({
      message: 'Invalid email or password',
    });
    (User.findOne as Sinon.SinonStub).restore();
  });

  it('11) Verifica se é possível obter os dados de todas as pessoas usuárias', async () => {
    Sinon.stub(User, 'findAll').resolves(allUsers as User[]);
    const response = await chai.request(app.app).get('/user');
    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal(allUsers);
    (User.findAll as Sinon.SinonStub).restore();
  });

  it('12) Verifica se é possível obter os dados das pessoas usuárias filtradas', async () => {
    const mock = allUsers.filter(user => user.name.includes('Ra'));
    Sinon.stub(User, 'findAll').resolves(mock as User[]);
    const response = await chai.request(app.app).get('/user?name=Ra');
    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal(mock);
    (User.findAll as Sinon.SinonStub).restore();
  });

  it('13) Verifica se é possível atualizar os dados da pessoa usuária', async () => {
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    Sinon.stub(User, 'update').resolves();
    const { id, password, ...userData } = createdUser;
    userData.name = 'User 001';
    const updatedUserMock = { id, ...userData };
    Sinon.stub(User, 'findByPk').resolves(updatedUserMock as User);

    const loginResponse = await chai.request(app.app).post('/user/login').send({
      email: userData.email,
      password,
    });

    const response = await chai
      .request(app.app)
      .put('/user')
      .send(userData)
      .set({
        authorization: loginResponse.body.token,
      });
    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal(updatedUserMock);
    (User.findOne as Sinon.SinonStub).restore();
    (User.update as Sinon.SinonStub).restore();
    (User.findByPk as Sinon.SinonStub).restore();
  });
});
