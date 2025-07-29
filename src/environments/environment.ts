const APIURL = 'http://localhost:3312/api'

export const environment = {
  production: false,
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
      getVentasByCedula: APIURL + '/ventas/get',
      insertar: APIURL + '/ventas/insertar'
    },
    productos: {
      getProductos: APIURL + '/productos',
      getCatalogo: APIURL + '/productos/catalogo',
      getProductosById: APIURL + '/productos/get',
      createProducto: APIURL + '/productos/create',
      updateProducto: APIURL + '/productos/update',
      calificacion: APIURL + '/productos/calificacion',
      inhabilitar: APIURL + '/productos/inhabilitar',
    },
    categoria: {
      getCategorias: APIURL + '/categoria'
    },
    carrito: {
      getCarrito: APIURL + '/carrito',
      insertar: APIURL + '/carrito/insertar',
      eliminar: APIURL + '/carrito/eliminar',
      aumentarCantidad: APIURL + '/carrito/mascantidad',
      disminuirCantidad: APIURL + '/carrito/menoscantidad',
      vendido: APIURL + '/carrito/vendido',
    },
    guardados: {
      getGuardados: APIURL + '/guardados',
      insertar: APIURL + '/guardados/insertar',
      eliminar: APIURL + '/guardados/eliminar'
    }
  }
};
