import { gql } from 'graphql-tag'


const empleadoTypes = gql`

    enum Rol{
        ADMIN
        VETERINARIO
        ASISTENTE
        RECEPCIONISTA
        ADMINISTRATIVO
        LECTURA
    }

    enum Estado{
        ACTIVO
        INACTIVO
        BAJA_MEDICA
        VACACIONES
        DESPEDIDO
    }

    type PermisosModulo {
        crear : Boolean,
        leer : Boolean,
        actualizar : Boolean,
        eliminar : Boolean
    }

    type PermisosEmpleado {
        clientes : PermisosModulo,
        mascotas : PermisosModulo,
        citas : PermisosModulo,
        empleados : PermisosModulo,
        servicios : PermisosModulo,
        facturas : PermisosModulo,
        historias : PermisosModulo
    }

    type Empleado {
        id : ID!
        nombre : String!
        apellido : String!
        cedula : String!
        telefono : Int!
        email : String!
        fecha_contratacion : Date
        fecha_nacimiento : Date
        rol : Rol!
        estado : Estado!
        especialidad : String
        createdAt : Date
        updatedAt : Date
        permisos : PermisosEmpleado

    }


    input PermisosModuloInput {
        crear : Boolean,
        leer : Boolean,
        actualizar : Boolean,
        eliminar : Boolean
    }

    input PermisosEmpleadoInput {
        clientes : PermisosModuloInput
        mascotas : PermisosModuloInput
        citas : PermisosModuloInput
        empleados : PermisosModuloInput
        servicios : PermisosModuloInput
        facturas : PermisosModuloInput
        historias : PermisosModuloInput
    }

    input EmpleadoInput{
        nombre : String!
        apellido : String!
        cedula : String!
        telefono : Int!
        email : String!
        fecha_contratacion : Date!
        fecha_nacimiento : Date
        rol : Rol!
        estado : Estado
        especialidad : String
        permisos : PermisosModuloInput
    }

    input ActualizarEmpleadoInput {
        id : ID!
        nombre : String
        apellido : String
        cedula : String
        telefono : Int
        email : String
        fecha_contratacion : Date
        fecha_nacimiento : Date
        rol : Rol
        estado : Estado
        especialidad : String
        permisos : PermisosModuloInput
    }

`

export default empleadoTypes