import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import User from '../../database/models/User';

import App from '../../app';

import { createdUser } from '../mocks/user';
import Post from '../../database/models/Post';
import { createdPost, createdPostJson } from '../mocks/post';

chai.use(chaiHttp);

describe('Testa o controller Post', () => {
  const app = new App();

  it('01) Verifica se é possível salvar um post com dados válidos', async () => {
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    Sinon.stub(Post, 'findOne').resolves();
    Sinon.stub(Post, 'create').resolves(createdPost as unknown as Post);
    const { id, authorData, author, ...postData } = createdPost;

    const login = await chai.request(app.app).post('/user/login').send({
      email: createdUser.email,
      password: createdUser.password,
    });

    const response = await chai
      .request(app.app)
      .post('/post')
      .send(postData)
      .set({ authorization: login.body.token });

    expect(response).to.have.status(201);
    expect(response.body).to.be.deep.equal(createdPostJson);

    (User.findOne as Sinon.SinonStub).restore();
    (Post.create as Sinon.SinonStub).restore();
    (Post.findOne as Sinon.SinonStub).restore();
  });

  it('02) Verifica se não é possível salvar um post sem fornecer um title', async () => {
    const { id, authorData, author, title, ...postData } = createdPost;
    const response = await chai.request(app.app).post('/post').send(postData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"title" is required',
    });
  });

  it('03) Verifica se não é possível salvar um post sem fornecer um content', async () => {
    const { id, authorData, author, content, ...postData } = createdPost;
    const response = await chai.request(app.app).post('/post').send(postData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"content" is required',
    });
  });

  it('04) Verifica se é possível obter todos os posts', async () => {
    Sinon.stub(Post, 'findAll').resolves([createdPost] as unknown as Post[]);
    Sinon.stub(User, 'findOne').resolves(createdUser as User);

    const login = await chai.request(app.app).post('/user/login').send({
      email: createdUser.email,
      password: createdUser.password,
    });

    const response = await chai
      .request(app.app)
      .get('/post')
      .set({ authorization: login.body.token });

    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal([createdPostJson]);

    (User.findOne as Sinon.SinonStub).restore();
    (Post.findAll as Sinon.SinonStub).restore();
  });

  it('05) Verifica se é possível atualizar um post', async () => {
    const { id, authorData, author, ...postData } = createdPost;

    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    Sinon.stub(Post, 'findOne').resolves(createdPost as unknown as Post);
    Sinon.stub(Post, 'findByPk').resolves(createdPost as unknown as Post);
    Sinon.stub(Post, 'update').resolves();

    const login = await chai.request(app.app).post('/user/login').send({
      email: createdUser.email,
      password: createdUser.password,
    });

    const response = await chai
      .request(app.app)
      .put('/post/1')
      .send(postData)
      .set({ authorization: login.body.token });

    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal(createdPostJson);

    (User.findOne as Sinon.SinonStub).restore();
    (Post.findOne as Sinon.SinonStub).restore();
    (Post.findByPk as Sinon.SinonStub).restore();
    (Post.update as Sinon.SinonStub).restore();
  });

  it('06) Verifica se somente a pessoa autora consegue atualizar seu post', async () => {
    const { id, authorData, author, ...postData } = createdPost;

    createdUser.id = 2;

    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    Sinon.stub(Post, 'findOne').resolves(createdPost as unknown as Post);
    Sinon.stub(Post, 'findByPk').resolves(createdPost as unknown as Post);
    Sinon.stub(Post, 'update').resolves();

    const login = await chai.request(app.app).post('/user/login').send({
      email: createdUser.email,
      password: createdUser.password,
    });

    try {
      await chai
        .request(app.app)
        .put('/post/1')
        .send(postData)
        .set({ authorization: login.body.token });
    } catch (error) {
      expect(error.message).to.be.equal('Not allowed operation');
    }
    (User.findOne as Sinon.SinonStub).restore();
    (Post.findOne as Sinon.SinonStub).restore();
    (Post.findByPk as Sinon.SinonStub).restore();
    (Post.update as Sinon.SinonStub).restore();
    createdUser.id = 1;
  });

  it('07) Verifica se é possível remover um post', async () => {
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    Sinon.stub(Post, 'findOne').resolves(createdPost as unknown as Post);
    Sinon.stub(Post, 'destroy').resolves();

    const login = await chai.request(app.app).post('/user/login').send({
      email: createdUser.email,
      password: createdUser.password,
    });

    const response = await chai
      .request(app.app)
      .delete('/post/1')
      .set({ authorization: login.body.token });

    expect(response).to.have.status(200);

    (User.findOne as Sinon.SinonStub).restore();
    (Post.findOne as Sinon.SinonStub).restore();
    (Post.destroy as Sinon.SinonStub).restore();
  });

  it('08) Verifica se somente a pessoa autora consegue deletar seu post', async () => {
    createdUser.id = 2;
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    Sinon.stub(Post, 'findOne').resolves(createdPost as unknown as Post);
    Sinon.stub(Post, 'destroy').resolves();

    const login = await chai.request(app.app).post('/user/login').send({
      email: createdUser.email,
      password: createdUser.password,
    });

    try {
      await chai
        .request(app.app)
        .delete('/post/1')
        .set({ authorization: login.body.token });
    } catch (error) {
      expect(error.message).to.be.equal('Not allowed operation');
    }

    (User.findOne as Sinon.SinonStub).restore();
    (Post.findOne as Sinon.SinonStub).restore();
    (Post.destroy as Sinon.SinonStub).restore();

    createdUser.id = 1;
  });
});
