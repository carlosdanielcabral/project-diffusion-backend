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

  it('01) Verifica se é possível salvar um usuário corretamente', async () => {
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
})
