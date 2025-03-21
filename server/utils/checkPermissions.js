export const checkPermissions = (user , modulo , accion) => {
    if ( !user ) { throw new Error('No se ha proporcionado un usuario') }

    if ( user.rol === 'admin') { return true }

    return user.permisos?.[modulo]?.[accion] === true;
}