import { makeExecutableSchema } from "@graphql-tools/schema";
import { empleadoQueries } from "./queries/empleadoQueries.js";
import  empleadoResolvers  from "./resolvers/empleadoResolvers.js";
import empleadoTypes from "./types/empleadoTypes.js";
import { empleadoMutations } from "./mutations/empleadoMutations.js";

const rootTypes = `
    scalar Date

    type Query {
        _empty : String
    }

    type Mutation {
        _empty : String
    }
`;

const typeDefs = [
    rootTypes,
    empleadoTypes,
    empleadoQueries,
    empleadoMutations
]


const resolvers = {
    Query : {
        ...empleadoResolvers.Query
    },
    Mutation : {
        ...empleadoResolvers.Mutation
    }
}


const schema = makeExecutableSchema({
    typeDefs ,
    resolvers
});

export default schema;