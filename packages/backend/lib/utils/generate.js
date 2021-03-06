import { faker } from "@faker-js/faker";

export const buildReq = (overrides) => {
  const req = {
    body: {},
    query: {},
    cookies: {},
    ...overrides,
  };

  return req;
};

export const buildRes = (overrides) => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    ...overrides,
  };

  return res;
};

export const buildLoginReq = () => {
  return buildReq({
    method: "POST",
    body: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  });
};

/**
 * Models Factories
 */

export const buildUser = (overrides, options = { timestamps: true }) => {
  let user = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  if (options.timestamps) {
    user.created_at = faker.date.past();
    user.updated_at = faker.date.recent();
  }

  user = { ...user, ...overrides };

  return user;
};

export const buildWebsite = (overrides) => {
  const website = {
    name: faker.company.companyName(),
    url: faker.internet.url(),
    is_public: faker.datatype.boolean(),
    user_id: faker.datatype.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    ...overrides,
  };

  return website;
};
