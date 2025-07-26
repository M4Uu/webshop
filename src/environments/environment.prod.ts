const APIURL = 'https://webshop-backend-i8ee.onrender.com/api'

export const environment = {
  production: true,
  api: {
    apiUrl: APIURL,
    users: {
      login: APIURL + '/users/login',
      register: APIURL + '/users/register',
      update: APIURL + '/users/update',
      protected: APIURL + '/users/protected',
      logout: APIURL + '/users/logout',
      getmovil: APIURL + '/users/getmovil',
      updatemovil: APIURL + '/users/updatemovil',
      getRolesUsuario: APIURL + '/users/getroles',
      getUsuarios: APIURL + '/users/getusers',
      toggleAdmin: APIURL + '/users/toggleadmin',
      toggleStatus: APIURL + '/users/togglstatus',
      isActive: APIURL + '/users/isactive',
    },
    toolkit: {
      banklist: APIURL + '/toolkit/listbanks',
      uploadimg: APIURL + '/toolkit/upload_img',
    },
    ventas: {
      getVentas: APIURL + '/ventas',
      getVentasByCedula: APIURL + '/ventas/get'
    },
    productos: {
      getProductos: APIURL + '/productos',
      getProductosById: APIURL + '/productos/get',
      createProducto: APIURL + '/productos/create',
      updateProducto: APIURL + '/productos/update',
    },
    categoria: {
      getCategorias: APIURL + '/categoria'
    }
  }
};
