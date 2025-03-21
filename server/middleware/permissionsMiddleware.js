import asyncHandler from "../utils/asyncHandler"
const hasRole = (roles) => {
    return asyncHandler(async(req,res,next) => {
        if (!req.user){
            res.status(401).json({ message: "No autorizado" })
            throw new Error('No autorizado, inicia sesion')
        }

        const userRoles = Array.isArray(roles) ? roles : [roles]

        if (req.user.userType === 'empleado'){
            if (userRoles.includes(req.user.rol)){
                return next()
            }
        }

        res.status(403);
        throw new Error(`Acceso denegado: se require uno de estos roles: ${userRoles.join(', ')}`)
    })
}


const hasPermission = (modulo, accion) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user){
            res.status(401).json({ message: "No autorizado" })
            throw new Error('No autorizado, inicia sesion')
        }

        if (req.user.userType === 'empleado'){
            if (req.user.rol === 'admin'){
                return next()
            }

            if (req.user.permisos[modulo] && req.user.permisos[modulo].includes(accion)){
                return next()
            }
        }

        res.status(403);
        throw new Error(`Acceso denegado: no tienes permiso para acceder a este recurso`)
    })
}


const hasAnyPermission = (permisos) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user){
            res.status(401).json({ message: "No autorizado" })
            throw new Error('No autorizado, inicia sesion')
        }

        if (req.user.userType === 'cliente'){
            res.status(403);
            throw new Error(`Acceso denegado: no tienes permiso para acceder a este recurso`)
        }

        if (req.user.userType === 'empleado'){
            if (req.user.rol === 'admin'){
                return next()
            }

            const tienePermiso = permisos.some(permiso => {
                return req.user.permisos[permiso.modulo] && req.user.permisos[permiso.modulo].includes(permiso.accion)
            })

            if (tienePermiso){
                return next()
            }
        }

        res.status(403);
        throw new Error(`Acceso denegado: no tienes permiso para acceder a este recurso`)
    })
}

const admin = hasRole('admin')
const recepcionista = hasRole('recepcionista')
const veterinario = hasRole('veterinario')

export { hasRole, hasPermission, hasAnyPermission, admin, recepcionista, veterinario }