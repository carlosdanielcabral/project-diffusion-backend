import { expect } from 'chai';
import Sinon from 'sinon';
import Post from '../../database/models/Post';
import User from '../../database/models/User';
import PostService from '../../api/services/PostService';
import { createdPost } from '../mocks/post';
import { createdUser } from '../mocks/user';

describe('Testa o service Post', () => {
  it('01) Verifica se é possível salvar um post', async () => {
    const service = new PostService(Post);
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    Sinon.stub(Post, 'findOne').resolves();
    Sinon.stub(Post, 'create').resolves(createdPost as unknown as Post);
    const { id, authorData, author, ...postData } = createdPost;
    const response = await service.save(postData);
    expect(response).to.be.equals(createdPost);
    (User.findOne as Sinon.SinonStub).restore();
    (Post.create as Sinon.SinonStub).restore();
    (Post.findOne as Sinon.SinonStub).restore();
  });

  it('02) Verifica se não é possível salvar um post se o titulo já existe no banco', async () => {
    const service = new PostService(Post);
    Sinon.stub(Post, 'findOne').resolves(createdPost as unknown as Post);
    const { id, authorData, author, ...postData } = createdPost;
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    try {
      await service.save(postData);
    } catch (err) {
      expect(err.message).to.be.equal('Post already exists');
    }
    (User.findOne as Sinon.SinonStub).restore();
    (Post.findOne as Sinon.SinonStub).restore();
  });

  it('03) Verifica se o método  findAll retorna todos os posts', async () => {
    const service = new PostService(Post);
    Sinon.stub(Post, 'findAll').resolves([createdPost] as unknown as Post[]);
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    const response = await service.findAll();
    expect(response).to.be.deep.equal([createdPost]);
    (User.findOne as Sinon.SinonStub).restore();
    (Post.findAll as Sinon.SinonStub).restore();
  });

  it('04) Verifica se o método update atualiza um post', async () => {
    const service = new PostService(Post);
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    Sinon.stub(Post, 'findOne').resolves(createdPost as unknown as Post);
    Sinon.stub(Post, 'findByPk').resolves(createdPost as unknown as Post);
    Sinon.stub(Post, 'update').resolves();
    const { id, createdAt, author, authorData, updatedAt, ...postData } =
      createdPost;
    const response = await service.update(postData, 1);
    expect(response).to.be.deep.equal(createdPost);
    (User.findOne as Sinon.SinonStub).restore();
    (Post.findOne as Sinon.SinonStub).restore();
    (Post.findByPk as Sinon.SinonStub).restore();
    (Post.update as Sinon.SinonStub).restore();
  });

  it('05) Verifica se o método remove deleta um post', async () => {
    const service = new PostService(Post);
    Sinon.stub(User, 'findOne').resolves(createdUser as User);
    Sinon.stub(Post, 'findOne').resolves(createdPost as unknown as Post);
    Sinon.stub(Post, 'destroy').resolves();
    const response = await service.remove(1, 1);
    expect(response).to.be.deep.equal(createdPost);
    (User.findOne as Sinon.SinonStub).restore();
    (Post.findOne as Sinon.SinonStub).restore();
    (Post.destroy as Sinon.SinonStub).restore();
  });
});
