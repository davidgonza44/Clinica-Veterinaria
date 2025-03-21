import { gql } from 'graphql-tag';
export const productoMutations = gql`
    type Mutation {
        crearProducto(input : ProductoInput!) : Producto
        actualizarProducto(id : ID!, input : ProductoInput!) : Producto
        eliminarProducto(id : ID!) : Producto
    }

`