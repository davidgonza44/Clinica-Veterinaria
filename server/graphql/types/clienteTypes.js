import { gql } from "graphql-tag";


const clienteTypes = gql`
    type Direccion {
        calle : String!,
        ciudad : String!,
        codigoPostal : String!,
    }

    input DireccionInput {
        calle : String!,
        ciudad : String!,
        codigoPostal : String!,
    }

    type Cliente {
        id : ID!
        nombre : String!
        apellido : String!
        cedula : String!
        email : String!
        mascotas : [Mascota]
        activo : Boolean!
        direccion : Direccion!
    }

`