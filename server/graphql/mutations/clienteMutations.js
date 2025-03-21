import { gql } from 'graphql-tag';

export const clienteMutations = gql`
    type Mutation{
        createCliente(input : ClienteInput!) : Cliente
        updateCliente(id : ID!, input : ClienteInput!) : Cliente
        deleteCliente(id : ID!) : Cliente
        desactivarCliente(id : ID!) : Boolean
    }


`


