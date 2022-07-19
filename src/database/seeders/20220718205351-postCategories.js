module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('post_categories', [{
      post_id: 1,
      category_id: 1
    }, {
      post_id: 1,
      category_id: 2
    }, {
      post_id: 2,
      category_id: 4
    }, {
      post_id: 2,
      category_id: 6
    }, {
      post_id: 2,
      category_id: 7
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('post_categories', null, {});
  }
};
