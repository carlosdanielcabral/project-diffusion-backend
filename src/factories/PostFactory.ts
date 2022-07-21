import PostController from '../controllers/PostController';
import Post from '../database/models/Post';
import PostService from '../services/PostService';

const PostFactory = () => {
  const service = new PostService(Post);
  const controller = new PostController(service);
  return controller;
};

export default PostFactory;
