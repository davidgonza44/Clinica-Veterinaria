
import Empleado from "../../mongodb/models/empleado.js";
import asyncHandler from "../../utils/asyncHandler.js";


const empleadoResolvers = {
    Query : {
        empleados : async (_ , args , { user }) => {
            if (!user) {
                throw new Error("No estas autenticado");
            }

            if (user.rol === 'admin' || user.permisos?.empleados?.leer){
                return await Empleado.find();
            }

            throw new Error("No tienes permisos para ver los empleados")
        },


        empleado : async (_ , { id }, { user } ) => {
            if (!user){throw new Error("No estas autenticado")}

            if (user.rol === 'admin' || (user.permisos?.empleados?.leer === true)){
                const empleado = await Empleado.findById(id)

                if (!empleado) {throw new Error("Empleado no encontrado")}

                return empleado
            }

            throw new Error("No tienes permisos para ver este empleado")
        },

        empleadosPorRol : async (_ , { rol }, { user }) => {
            if (!user) {throw new Error("No autorizad")};

            if (user.rol === 'admin' || user.permisos?.empleados?.leer){
                return await Empleado.find({ rol : rol.toLowerCase() });
            }

            throw new Error("No tienes permisos para ver los empleados")
        },

        empleadosActivos : async(_, args, { user }) => {
            if (!user) {throw new Error("No esta autorizado")};

            if (user.rol === 'admin' || (user.permisos?.empleados?.leer === true)){
                return await Empleado.find({estado : 'Activo'})
            }
        },

    },
    Mutation : {
        createEmpleado : async (_, { input }, { user }) => {
            if (!user) {throw new Error("No estas autenticado")};

            if (user.rol === 'admin' && user.permisos?.empleados?.crear === true){
                try {
                    const rolMinuscula = input.rol.toLowerCase();
                    const nuevoEmpleado = new Empleado({
                        ...input,
                        rol : rolMinuscula,
                        estado : input.estado || 'Activo',
                    })
                    await nuevoEmpleado.save();
                    return nuevoEmpleado;
                } catch (error) {
                    throw new Error(`Error al crear el empleado ${error.message}`)
                }
            }

            throw new Error("No tienes permisos para crear empleados")
        },

        updateEmpleado : async (_ , { input } , { user}) =>{
            if (!user) {throw new Error("No estas autenticado")};

            if (user.rol === 'admin' || user.permisos?.empleados?.actualizar === true){
                try {
                    const { cedula , ...updateData } = input;

                    if (updateData.rol){
                        updateData.rol = updateData.rol.toLowerCase();
                    }

                    const empleadoActualizado = await Empleado.findOneAndUpdate({cedula : cedula},
                        updateData,
                        {new : true, runValidators : true})

                    if (!empleadoActualizado) {throw new Error("Empleado no encontrado")}
                    return empleadoActualizado;

                } catch (error) {
                    throw new Error(`Error al actualizar el empleado ${error.message}`)
                }
            }

            throw new Error("No tienes permisos para actualizar empleados")
        },

        deleteEmpleado : async (_, { id } , { user } ) => {
            if (!user) {throw new Error("No estas autenticado")};

            if (user.rol === 'admin' || user.permisos?.empleados?.eliminar === true){
                try {
                    const empleadoEliminado = await Empleado.findByIdAndDelete(id);

                    if (!empleadoEliminado) {throw new Error("Empleado no encontrado")}
                    return true;

                } catch (error) {
                    throw new Error(`Error al eliminar el empleado ${error.message}`)
                }
            }

            throw new Error("No tienes permisos para eliminar empleados")
        },

        cambiarEstadoEmpleado : async (_, { id, estado}, { user }) => {
            if (!user) {throw new Error("No estas autenticado")};

            if (user.rol === 'admin' || user.permisos?.empleados?.actualizar === true){
                try {
                    const empleado = await Empleado.findByIdAndUpdate(id, { estado }, { new : true });
                    if (!empleado) {throw new Error("Empleado no encontrado")}

                } catch (error) {
                    throw new Error(`Error al cambiar el estado del empleado ${error.message}`)
                }
            }

            throw new Error("No tienes permisos para cambiar el estado del empleado")
        },


        actualizarPermisosEmpleado : async(_ , { id , permisos}, { user }) => {
            if (!user) {throw new Error("No estas autenticado")};

            if (user.rol === 'admin' || user.permisos?.empleados?.actualizar === true){
                try {
                    const empleado = await Empleado.findById(id);

                    if (!empleado){ throw new Error("Empleado no encontrado")}

                    Object.keys(permisos).forEach(modulo => {
                        if (empleado.permisos[modulo]){
                            empleado.permisos[modulo] =
                            {
                                ...empleado.permisos[modulo],
                                ...permisos[modulo]
                            }
                        }
                    })

                    await empleado.save();
                    return empleado;


                } catch (error) {
                    throw new Error(`Error al actualizar los permisos del empleado ${error.message}`)
                }
            }

            throw new Error("No tienes permisos para actualizar los permisos del empleado")
        }
    }

}

export default empleadoResolvers;