'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
      name: 'Esportes'
    },{
      name: 'Estilo de vida'
    }, {
      name: 'Gastronomia'
    }, {
      name: 'Informática'
    }, {
      name: 'Música'
    }, {
      name: 'Programação'
    }, {
      name: 'Tecnologia'
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
