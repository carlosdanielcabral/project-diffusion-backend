module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'User 01',
      email: 'user01@email.com',
      password: 'user01'
    }, {
      name: 'User 02',
      email: 'user02@email.com',
      password: 'user02'
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
