export const LOCAL = 'LOCAL';
export const PRODUCTION = 'PRODUCTION';

export const ENVIRONMENT = (() => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return LOCAL;
  } else {
    return PRODUCTION;
  }
})();

export const API_URL = !!process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:3000/api';