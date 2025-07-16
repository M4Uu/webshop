const APIURL = 'https://webshop-backend-i8ee.onrender.com/api'

export const environment = {
  production: false,
  api: {
    apiUrl: APIURL,
    apiUrlUsers: {
      login: APIURL + '/users/login',
      register: APIURL + '/users/register',
      upload: APIURL + '/users/upload',
      protected: APIURL + '/users/protected',
      logout: APIURL + '/users/logout',
      getmovil: APIURL + '/users/getmovil',
    }
  }
};
