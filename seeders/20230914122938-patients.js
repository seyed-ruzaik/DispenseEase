const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => {
    const patients = [];
    const NUM_PATIENTS = 50; // Adjust the number of patients you want to seed

    for (let i = 0; i < NUM_PATIENTS; i++) {
      patients.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        mobile_number: faker.phone.number(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('Abc@123'),
        image: faker.image.urlLoremFlickr({ category: 'people' }),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('patients', patients, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('patients', null, {});
  }
};
