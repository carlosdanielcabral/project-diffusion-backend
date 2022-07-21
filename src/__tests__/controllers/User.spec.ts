import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import User from '../../database/models/User';

import App from '../../app';

import UserService from '../../services/UserService';
import { createdUser } from '../mocks/user';

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
    expect(response.body).to.be.deep.equal(createdUser);
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

  it('03) Verifica se não é possível salvar uma pessoa usuária com nome inválido', async () => {
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

  it('05) Verifica se não é possível salvar uma pessoa usuária com email inválido', async () => {
    const { id, ...userData } = createdUser;
    userData.email = 'user01email.com';
    const response = await chai.request(app.app).post('/user').send(userData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"email" must be a valid email',
    });
  });
});
