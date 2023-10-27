const { default: Hash } = require("../../lib/Hash");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'User 01',
        email: 'user01@email.com',
        password: Hash.hash('user01'),
      },
      {
        id: 2,
        name: 'User 02',
        email: 'user02@email.com',
        password: Hash.hash('user02'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
