import Hash from '../../lib/Hash';

export const createdUser = {
  id: 1,
  name: 'User 01',
  email: 'user01@email.com',
  password: Hash.hash('user01'),
};

export const allUsers = [
  {
    id: 1,
    name: 'User 01',
    email: 'user01@email.com',
    password: 'user01',
  },
  {
    id: 2,
    name: 'Rafael',
    email: 'rafael@email.com',
    password: 'rafaelpassword',
  },
  {
    id: 3,
    name: 'Raquel',
    email: 'raquel@email.com',
    password: 'raquelpassword',
  },
];

export const test = 'test';
