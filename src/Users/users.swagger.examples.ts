export const EXAMPLE_CREATE_USER_BODY = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

export const EXAMPLE_CREATE_USER_RESPONSE = {
  name: 'string',
  role: 'USER',
  email: 'string1',
  password: '$2b$05$1lQCMFPyRELn.lmxzEESP.1y00LwUe27NvSTqurpeuHfl0J5wUO4W',
  _id: '64e5b3aa891c36189875fa1b',
};

export const EXAMPLE_AUTH_USER_RESPONSE = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZyIsInBhc3N3b3JkIjoic3RyaW5nIiwiaWF0IjoxNjkyODcwMTgxfQ.at6G1N5Ud0q2aXRc0ieBh_UH0nwMEmlYu2J4cjNNlYw',
  role: 'USER',
  email: 'test@mail.com',
};

export const EXAMPLE_AUTH_USER_BODY = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};
