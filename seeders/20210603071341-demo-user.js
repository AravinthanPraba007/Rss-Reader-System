'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('user', [{
       uuid: '5ce9d5ae-de7d-485c-9997-347b25bed186',
       name: 'John',
       email: 'john@gmail.com',
       password: '$2b$10$.EyZix4Q1mLyPFYNNJLE1ecKQlzR8UrvVFPwRPVnUzatsBgUxY0Iu',
       createdAt: '2021-06-02 23:22:28.405+05:30',
       updatedAt: '2021-06-02 23:22:28.405+05:30'
     },
     {
      uuid: '35aef859-f93f-4914-b5e0-3ab4cabf42d4',
      name: 'Ramu',
      email: 'ramu@gmail.com',
      password: '$2b$10$.EyZix4Q1mLyPFYNNJLE1ecKQlzR8UrvVFPwRPVnUzatsBgUxY0Iu',
      createdAt: '2021-06-02 23:22:28.405+05:30',
      updatedAt: '2021-06-02 23:22:28.405+05:30'
     }
    ], {});
      
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
