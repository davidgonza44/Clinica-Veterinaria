const asyncHandler = (resolverFn) => async (parent, args, context, info) => {
    try {
        return await resolverFn(parent, args, context, info)
    } catch (error) {
        console.error(`Error en resolver ${resolverFn.name || 'desconocido'}: ${error.message}`)
        throw new error (`Error en resolver ${resolverFn.name || 'desconocido'}: ${error.message}`)
    }
}

export default asyncHandler 