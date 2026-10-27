'use strict';
const {randomUUID}= require('crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Students', [
      {
        id: randomUUID(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        dateOfBirth: new Date('1999-04-19'),
        gender: 'Male',
        matricNumber: '2021/104488/Regular',
        department: 'Computer Science',
        level:200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Students', null, {})
  }
};
