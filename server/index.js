import express from "express"
import { config } from "dotenv"
import cors from "cors"
import connectDB from "./mongodb/connect.js"
import cookieParser from "cookie-parser"
import { graphqlHTTP } from "express-graphql"
import { OAuth2Client } from "google-auth-library"
import { googleAuthHandler, logoutHandler, checkAuthHandler, getPermissionsHandler, loginHandler } from "./authController.js"
import Cliente from "./mongodb/models/cliente.js"
import Mascota from "./mongodb/models/mascota.js"
import Servicio from "./mongodb/models/servicios.js"
import Producto from "./mongodb/models/productos.js"
import Empleado from "./mongodb/models/empleado.js";
import Factura from "./mongodb/models/facturas.js";
import Veterinario from "./mongodb/models/veterinario.js";
import schema from "./graphql/schema.js"

config()
const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}

app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }))

app.options('*', cors(corsOptions));

app.get("/", (req, res) => { res.send("Server is running") })
app.post("/auth/google", googleAuthHandler)
app.post("/auth/logout", logoutHandler)
app.get("/auth/check", checkAuthHandler)
app.get("/auth/permissions", getPermissionsHandler)
app.get("/auth/login", loginHandler)

app.use('/graphql', graphqlHTTP((req) => ({
  schema: schema,
  graphiql: true,
  context : {
    user : req.user,
    models : {
      Cliente,
      Mascota,
      Servicio,
      Producto,
      Factura,
      Empleado,
      Veterinario
    }
  },
  customFormatErrorFn: (error) => {
    console.error(error);
    return {
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path
    };
  }
})))

const startSever = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(8080, () => { console.log("Server is running on port 8080") })
  } catch (error) {
    console.log(error)
  }
}

await startSever()

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     graphiql: true, // Habilita la interfaz GraphiQL para pruebas en desarrollo
//     customFormatErrorFn: (error) => {
//         console.error(error);
//         return {
//             message: error.message,
//             locations: error.locations,
//             stack: error.stack ? error.stack.split('\n') : [],
//             path: error.path
//         };
//     }
// }));

// import { useTable } from "@refinedev/core";

// const ProductTable = () => {
//   const { tableQuery, sorters, setSorters } = useTable({
//     resource: "products",
//   });

//   const products = tableQuery?.data?.data ?? [];

//   // Función para cambiar la ordenación
//   const toggleSortField = (field) => {
//     const existingSorter = sorters.find((sorter) => sorter.field === field);

//     setSorters([
//       {
//         field,
//         order: existingSorter?.order === "asc" ? "desc" : "asc",
//       },
//     ]);
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th onClick={() => toggleSortField("id")}>ID</th>
//             <th onClick={() => toggleSortField("name")}>Nombre</th>
//             <th onClick={() => toggleSortField("price")}>Precio</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// import { useState } from "react";
// import { useList } from "@refinedev/core";

// const ProductList = () => {
//   // Estado para manejar los sorters dinámicamente
//   const [sorters, setSorters] = useState([
//     {
//       field: "name",
//       order: "asc",
//     },
//   ]);

//   // useList con sorters dinámicos
//   const { data, isLoading } = useList({
//     resource: "products",
//     sorters: sorters, // Pasamos el estado de sorters
//   });

//   const products = data?.data ?? [];

//   // Función para cambiar la ordenación
//   const toggleSortField = (field) => {
//     // Buscar si ya existe un sorter para este campo
//     const existingSorter = sorters.find((sorter) => sorter.field === field);

//     if (existingSorter) {
//       // Si existe, invertimos el orden
//       setSorters([
//         {
//           field,
//           order: existingSorter.order === "asc" ? "desc" : "asc",
//         },
//       ]);
//     } else {
//       // Si no existe, creamos uno nuevo
//       setSorters([
//         {
//           field,
//           order: "asc",
//         },
//       ]);
//     }
//   };

//   if (isLoading) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <div>
//       <div>
//         <button onClick={() => toggleSortField("name")}>
//           Ordenar por nombre
//         </button>
//         <button onClick={() => toggleSortField("price")}>
//           Ordenar por precio
//         </button>
//         <button onClick={() => toggleSortField("createdAt")}>
//           Ordenar por fecha
//         </button>
//       </div>

//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>{product.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// Usando useTable con sorters dinámicos
// Si estás utilizando useTable, puedes aprovechar el setSorters que proporciona el hook:

// import { useTable } from "@refinedev/core";

// const ProductTable = () => {
//   const { tableQuery, sorters, setSorters } = useTable({
//     resource: "products",
//   });

//   const products = tableQuery?.data?.data ?? [];

//   // Función para cambiar la ordenación
//   const toggleSortField = (field) => {
//     const existingSorter = sorters.find((sorter) => sorter.field === field);

//     setSorters([
//       {
//         field,
//         order: existingSorter?.order === "asc" ? "desc" : "asc",
//       },
//     ]);
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th onClick={() => toggleSortField("id")}>ID</th>
//             <th onClick={() => toggleSortField("name")}>Nombre</th>
//             <th onClick={() => toggleSortField("price")}>Precio</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const gqlClient = new Client({
//     url: "https://tu-api-graphql.com/graphql",
//     exchanges: [fetchExchange]
//   });


// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const { makeExecutableSchema } = require('@graphql-tools/schema');
// const cors = require('cors');

// Definir el esquema GraphQL
// const typeDefs = `
//   type Category {
//     id: ID!
//     title: String!
//   }

//   type Post {
//     id: ID!
//     title: String!
//     content: String
//     category: Category
//   }

//   type Query {
//     posts(sort: String, where: String, start: Int, limit: Int): [Post]
//     post(id: ID!): Post
//     categories: [Category]
//   }

//   type Mutation {
//     createPost(title: String!, content: String, categoryId: ID): Post
//     updatePost(id: ID!, title: String, content: String, categoryId: ID): Post
//     deletePost(id: ID!): Boolean
//   }
// `;

// Implementar los resolvers
// const resolvers = {
//   Query: {
//     posts: (_, { sort, where, start, limit }) => {
//       let posts = [...yourPostsData]; // Tu fuente de datos

//       // Implementar ordenación
//       if (sort) {
//         const sortParams = JSON.parse(sort);
//         posts = posts.sort((a, b) => {
//           const [field, order] = Object.entries(sortParams)[0];
//           if (order === 'asc') {
//             return a[field] > b[field] ? 1 : -1;
//           } else {
//             return a[field] < b[field] ? 1 : -1;
//           }
//         });
//       }

//       // Implementar filtrado
//       if (where) {
//         const filters = JSON.parse(where);
//         posts = posts.filter(post => {
//           return Object.entries(filters).every(([field, value]) => {
//             return post[field] === value;
//           });
//         });
//       }

//       // Implementar paginación
//       if (start !== undefined && limit !== undefined) {
//         posts = posts.slice(start, start + limit);
//       }

//       return posts;
//     },
//     post: (_, { id }) => {
//       return yourPostsData.find(post => post.id === id);
//     },
//     categories: () => {
//       return yourCategoriesData;
//     }
//   },
//   Mutation: {
//     createPost: (_, { title, content, categoryId }) => {
//       // Implementar lógica para crear un post
//     },
//     updatePost: (_, { id, title, content, categoryId }) => {
//       // Implementar lógica para actualizar un post
//     },
//     deletePost: (_, { id }) => {
//       // Implementar lógica para eliminar un post
//     }
//   }
// };

// // Crear el esquema ejecutable
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// async function startServer() {
//   const app = express();

//   // Configurar CORS
//   app.use(cors());

//   // Crear el servidor Apollo
//   const server = new ApolloServer({
//     schema,
//     context: ({ req }) => {
//       // Puedes añadir autenticación aquí
//       return { /* contexto */ };
//     }
//   });

//   await server.start();

//   // Aplicar el middleware de Apollo a Express
//   server.applyMiddleware({ app, path: '/graphql' });

//   // Iniciar el servidor
//   const PORT = process.env.PORT || 4000;
//   app.listen(PORT, () => {
//     console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
//   });
// }

// startServer();