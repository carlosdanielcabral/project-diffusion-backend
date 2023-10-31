module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'User 01',
        email: 'user01@email.com',
        /** Admin321 */
        password: '$2b$10$EaZfh6Ro1EiP.v91ycSP4.Wd3mf69pDRDe9pc1y//sNdh9Ma4yxOS',
        'created_at': new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
