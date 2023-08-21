export const createTrackBodyConfig = {
  description: 'Create track',
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      slug: {
        type: 'string',
      },
      artist: {
        type: 'string',
      },
      image: {
        type: 'string',
      },
      text: {
        type: 'string',
      },
      audioSrc: {
        type: 'string',
      },
      listens: {
        type: 'number',
      },
    },
  },
};
