export const EXAMPLE_CREATE_TRACK_BODY = {
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
};

export const EXAMPLE_CREATE_TRACK_RESPONSE = {
  name: 'TrackNAme',
  slug: 'track-slug',
  artist: 'ArtistName',
  image: 'default.svg',
  text: '',
  audioSrc: '',
  listens: 0,
  _id: '64e5cef4b5454da8d11d7201',
};
export const EXAMPLE_GET_TRACKS_RESPONSE = [EXAMPLE_CREATE_TRACK_RESPONSE];
