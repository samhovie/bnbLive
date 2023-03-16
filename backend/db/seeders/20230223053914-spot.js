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
        address: "701 N 1st Ave",
        city: "Minneapolis",
        state: "Minnesota",
        country: "United States of America",
        lat: 44.97919935228044,
        lng: -93.27591196995665,
        name: "First Avenue",
        description: "Has for decades been at the center of the Twin Cities vibrant music scene",
        price: 735
      },
      {
        ownerId: 1,
        address: "815 V St NW",
        city: "Washington",
        state: "District of Columbia",
        country: "United States of America",
        lat: 38.91816501507045,
        lng: -77.02373343062273,
        name: "9:30 Club",
        description: "Long been recognized as one of the country's greatest indie rock venues",
        price: 675
      },
      {
        ownerId: 1,
        address: "S 69th St &, Ludlow St",
        city: "Philadelphia",
        state: "Pennsylvania",
        country: "United States of America",
        lat: 40.03721784337353,
        lng:  -75.24063538431095,
        name: "Tower Theater",
        description: "Stands as one of the city's best-sounding auditoriums",
        price: 825
      },
      {
        ownerId: 1,
        address: "2301 N Highland Ave",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.11239275437954,
        lng: -118.33908498655093,
        name: "Hollywood Bowl",
        description: "The country's most famous band shell",
        price: 445
      },
      {
        ownerId: 1,
        address: "4114 W, 4114 Vernor Hwy",
        city: "Detroit",
        state: "Michigan",
        country: "United States of America",
        lat: 42.32156349800722,
        lng: -83.09345017102427,
        name: "El Club",
        description: "Go-to spot for music lovers of all ages to congregate safely to enjoy a wide range of music",
        price: 725
      },
      {
        ownerId: 1,
        address: "303-319 CO-8",
        city: "Morrison",
        state: "Colorado",
        country: "United States of America",
        lat: 39.66560411885066,
        lng:  -105.20588457142846,
        name: "Red Rocks",
        description: "The stage is situated between two ginormous sandstone boulders, making for top-notch acoustics",
        price: 635
      },
      {
        ownerId: 1,
        address: "319 Frost St",
        city: "Brooklyn",
        state: "New York",
        country: "United States of America",
        lat: 40.719455257675534,
        lng:  -73.93867588455726,
        name: "Brooklyn Steel",
        description: "Located in the Bushwick neighborhood of Brooklyn, the venue is becoming one of New York's best sites for live music",
        price: 635
      },
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
