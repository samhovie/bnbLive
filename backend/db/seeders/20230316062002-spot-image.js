'use strict';

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        url:'https://livebnbbucket.s3.amazonaws.com/firstave1.jpeg',
        preview:true,
      },
      {
        spotId:1,
        url:'https://livebnbbucket.s3.amazonaws.com/firstave2.jpeg',
      },
      {
        spotId:1,
        url:'https://livebnbbucket.s3.amazonaws.com/firstave3.jpeg',
      },
      {
        spotId:1,
        url:'https://livebnbbucket.s3.amazonaws.com/firstave4.jpeg',
      },
      {
        spotId:1,
        url:'https://livebnbbucket.s3.amazonaws.com/firstave5.jpeg',
      },

      {
        spotId:2,
        url:'https://livebnbbucket.s3.amazonaws.com/930club1.jpeg',
        preview:true,
      },
      {
        spotId:2,
        url:'https://livebnbbucket.s3.amazonaws.com/930club2.jpeg',
      },
      {
        spotId:2,
        url:'https://livebnbbucket.s3.amazonaws.com/930club3.jpeg',
      },
      {
        spotId:2,
        url:'https://livebnbbucket.s3.amazonaws.com/930club4.jpeg',
      },
      {
        spotId:2,
        url:'https://livebnbbucket.s3.amazonaws.com/930club5.jpeg',
      },

      {
        spotId:3,
        url:'https://livebnbbucket.s3.amazonaws.com/tower1.jpeg',
        preview:true,
      },
      {
        spotId:3,
        url:'https://livebnbbucket.s3.amazonaws.com/tower2.jpeg',
      },
      {
        spotId:3,
        url:'https://livebnbbucket.s3.amazonaws.com/tower3.jpeg',
      },
      {
        spotId:3,
        url:'https://livebnbbucket.s3.amazonaws.com/tower4.jpeg',
      },
      {
        spotId:3,
        url:'https://livebnbbucket.s3.amazonaws.com/tower5.jpeg',
      },

      {
        spotId:4,
        url:'https://livebnbbucket.s3.amazonaws.com/hollywood1.jpeg',
        preview:true,
      },
      {
        spotId:4,
        url:'https://livebnbbucket.s3.amazonaws.com/hollywood2.jpeg',
      },
      {
        spotId:4,
        url:'https://livebnbbucket.s3.amazonaws.com/hollywood3.jpeg',
      },
      {
        spotId:4,
        url:'https://livebnbbucket.s3.amazonaws.com/hollywood4.jpeg',
      },
      {
        spotId:4,
        url:'https://livebnbbucket.s3.amazonaws.com/hollywood5.jpeg',
      },

      {
        spotId:5,
        url:'https://livebnbbucket.s3.amazonaws.com/elclub1.jpeg',
        preview:true,
      },
      {
        spotId:5,
        url:'https://livebnbbucket.s3.amazonaws.com/elclub2.jpeg',
      },
      {
        spotId:5,
        url:'https://livebnbbucket.s3.amazonaws.com/elclub3.jpeg',
      },
      {
        spotId:5,
        url:'https://livebnbbucket.s3.amazonaws.com/elclub4.jpeg',
      },
      {
        spotId:5,
        url:'https://livebnbbucket.s3.amazonaws.com/elclub5.jpeg',
      },

      {
        spotId:6,
        url:'https://livebnbbucket.s3.amazonaws.com/redrocks1.jpeg',
        preview:true,
      },
      {
        spotId:6,
        url:'https://livebnbbucket.s3.amazonaws.com/redrocks2.jpeg',
      },
      {
        spotId:6,
        url:'https://livebnbbucket.s3.amazonaws.com/redrocks3.jpeg',
      },
      {
        spotId:6,
        url:'https://livebnbbucket.s3.amazonaws.com/redrocks4.jpeg',
      },
      {
        spotId:6,
        url:'https://livebnbbucket.s3.amazonaws.com/redrocks5.jpeg',
      },

      {
        spotId:7,
        url:'https://livebnbbucket.s3.amazonaws.com/bksteel1.jpeg',
        preview:true,
      },
      {
        spotId:7,
        url:'https://livebnbbucket.s3.amazonaws.com/bksteel2.jpeg',
      },
      {
        spotId:7,
        url:'https://livebnbbucket.s3.amazonaws.com/bksteel3.jpeg',
      },
      {
        spotId:7,
        url:'https://livebnbbucket.s3.amazonaws.com/bksteel4.jpeg',
      },
      {
        spotId:7,
        url:'https://livebnbbucket.s3.amazonaws.com/bksteel5.jpeg',
      }




    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
