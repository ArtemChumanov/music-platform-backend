export const EXAMPLE_CREATE_TRACK_BODY = {
  name: 'Default Track',
  slug: 'track-slug',
  artist: 'Kalush',
  image: 'image.png',
  text: 'Music track text text text text text',
  audioSrc: '123/ew',
};

export const EXAMPLE_UPLOAD_BODY = {
  schema: {
    type: 'object',
    properties: {
      audio: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

export const EXAMPLE_UPDATE_TRACK_BODY = {
  name: 'TrackNAme',
  artist: 'ArtistName',
  image: 'default.svg',
  text: '',
  audioSrc: '',
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
