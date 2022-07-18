module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post_categories', {
      postId: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'post_id',
        primaryKey: true,
        references: {
          model: 'posts',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'category_id',
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id'
        },
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('post_categories');
  }
};