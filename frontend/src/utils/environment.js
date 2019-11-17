export const LOCAL = 'LOCAL';
export const PRODUCTION = 'PRODUCTION';

export const ENVIRONMENT = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return LOCAL;
  } else {
    return PRODUCTION;
  }
};

export const API_URL = ENVIRONMENT === PRODUCTION ?
  'https://api.fahrplan.yanick.dickbauer.at' : 'http://localhost:8000';