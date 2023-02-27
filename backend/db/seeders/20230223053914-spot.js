'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        // createdAt: "2021-11-19 20:39:36",
        // updatedAt: "2021-11-19 20:39:36",
        // avgRating: 4.5,
        // previewImage: "image url"
      },
      // {
      //   ownerId: 2,
      //   address: "123 Sunset Lane",
      //   city: "Anderson",
      //   state: "Michigan",
      //   country: "United States of America",
      //   lat: 39.7645358,
      //   lng: -123.4730327,
      //   name: "Spot Name 1",
      //   description: "Place where no one is created",
      //   price: 120,
      //   // createdAt: "2021-11-19 20:39:36",
      //   // updatedAt: "2021-11-19 20:39:36",
      //   // avgRating: 4.5,
      //   // previewImage: "image url"
      // },
      // {
      //   ownerId: 2,
      //   address: "123 Sunrise Lane",
      //   city: "Anderson2",
      //   state: "Michigan",
      //   country: "United States of America",
      //   lat: 34.7645358,
      //   lng: -120.4730327,
      //   name: "Spot Name 3",
      //   description: "big ol description",
      //   price: 125,
      //   // createdAt: "2021-11-19 20:39:36",
      //   // updatedAt: "2021-11-19 20:39:36",
      //   // avgRating: 4.5,
      //   // previewImage: "image url"
      // },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      state: { [Op.in]: ['California', 'Michigan', 'Kansas'] }
    }, {});
  }
};
