import { gql } from 'graphql-tag';

export const empleadoQueries = gql`
    type Query {
        empleados : [Empleado],
        empleado(id : ID!) : Empleado
        empleadosPorRol(rol : Rol!) : [Empleado]
        empleadosActivos : [Empleado]
    }

`