const APIURL = 'http://localhost:3312/api'

export const environment = {
  production: false,
  api: {
    apiUrl: APIURL,
    apiUrlUsers: {
      login: APIURL + '/users/login',
      register: APIURL + '/users/register',
      update: APIURL + '/users/update',
      protected: APIURL + '/users/protected',
      logout: APIURL + '/users/logout',
      getmovil: APIURL + '/users/getmovil',
      updatemovil: APIURL + '/users/updatemovil',
    },
    apiUrlToolkit: {
      banklist: APIURL + '/toolkit/listbanks',
      uploadimg: APIURL + '/toolkit/uploadimg',
    }
  }
};
