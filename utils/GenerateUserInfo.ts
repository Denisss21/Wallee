import { faker } from '@faker-js/faker';

export function generateUserInfo() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    postcode: faker.location.zipCode(),
    telephone: faker.phone.number({ style: 'international' }),
    password: faker.internet.password(),
    email: faker.internet.email(),
    state: faker.location.state(),
  };
};