export const now = new Date('2022-07-21T18:41:37.000Z');

export const createdPost = {
  id: 1,
  title: 'Titulo do Post 01',
  content: 'Conteúdo do Post 01',
  author: 1,
  createdAt: now,
  updatedAt: now,
  authorData: {
    id: 1,
    name: 'User 01',
  },
};

export const createdPostJson = {
  id: 1,
  title: 'Titulo do Post 01',
  content: 'Conteúdo do Post 01',
  author: 1,
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
  authorData: {
    id: 1,
    name: 'User 01',
  },
};
