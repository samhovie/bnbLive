'use strict';

// /** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
      userId: 3,
      spotId: 1,
      review: "This was an awesome spot!",
      stars: 5,
      },
      {
        userId: 4,
        spotId: 1,
        review: "This was an ok spot!",
        stars: 4,
      },

      {
        userId: 3,
        spotId: 2,
        review: "This was an awesome spot!",
        stars: 4,
      },
      {
        userId: 4,
        spotId: 2,
        review: "This was an ok spot!",
        stars: 3,
      },

      {
        userId: 3,
        spotId: 3,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        userId: 4,
        spotId: 3,
        review: "This was an ok spot!",
        stars: 2,
      },

      {
        userId: 3,
        spotId: 5,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        userId: 4,
        spotId: 5,
        review: "This was a bad spot!",
        stars: 1,
      },

      {
        userId: 3,
        spotId: 6,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        userId: 4,
        spotId: 6,
        review: "This was an ok spot!",
        stars: 2,
      },


      {
        userId: 1,
        spotId: 5,
        review: "This was an awesome spot!",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 1,
        review: "This was an ok spot!",
        stars: 3,
      },


      {
        userId: 3,
        spotId: 7,
        review: "This was not good!",
        stars: 2,
      },
      {
        userId: 4,
        spotId: 7,
        review: "This was bad",
        stars: 1,
      },


    ], {});






  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
