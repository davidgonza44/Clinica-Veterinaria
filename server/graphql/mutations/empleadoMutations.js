import gql from "graphql-tag";

export const empleadoMutations = gql`
    type Mutation {
        createEmpleado(input : EmpleadoInput!) : Empleado
        updateEmpleado(input : EmpleadoInput!) : Empleado
        deleteEmpleado(id : ID!) : Empleado
        cambiarEstadoEmpleado(id : ID!, esrado : Estado!) : Empleado
        actualizarPermisosEmpleado(id : ID!, permisos : PermisosEmpleadoInput) : Empleado
    }
`