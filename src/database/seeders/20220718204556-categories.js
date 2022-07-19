'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
      id: 1,
      name: 'Esportes'
    },{
      id: 2,
      name: 'Estilo de vida'
    }, {
      id: 3,
      name: 'Gastronomia'
    }, {
      id: 4,
      name: 'Informática'
    }, {
      id: 5,
      name: 'Música'
    }, {
      id: 6,
      name: 'Programação'
    }, {
      id: 7,
      name: 'Tecnologia'
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
