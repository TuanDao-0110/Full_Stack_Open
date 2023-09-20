const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
// import express: 
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const User = require('./demoModel/User')
const typeDefs = require('./schema')
const resolvers = require('./resolver')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })
// setup is now within a function
const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)
    // set up server configuration
    const server = new ApolloServer({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })
    // run graphQL server
    await server.start()
    // assign express router 
    app.use('/', cors(), express.json(), expressMiddleware(server, {
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.startsWith('Bearer ')) {
                const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
                const currentUser = await User.findById(decodedToken.id).populate(
                    'friends'
                )
                return { currentUser }
            }
        }
    }))
    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log(`server is now running on http://localhost:${PORT}`))
}

start()


// const { ApolloServer } = require('@apollo/server')

// const { expressMiddleware } = require('@apollo/server/express4')
// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
// const { makeExecutableSchema } = require('@graphql-tools/schema')
// const express = require('express')
// const cors = require('cors')
// const http = require('http')

// const jwt = require('jsonwebtoken')

// const mongoose = require('mongoose')

// const User = require('./demoModel/User')

// const typeDefs = require('./schema')
// const resolvers = require('./resolver')

// const MONGODB_URI = 'mongodb+srv://databaseurlhere'

// console.log('connecting to', MONGODB_URI)

// mongoose
//     .connect(MONGODB_URI)
//     .then(() => {
//         console.log('connected to MongoDB')
//     })
//     .catch((error) => {
//         console.log('error connection to MongoDB:', error.message)
//     })

// // setup is now within a function
// const start = async () => {
//     const app = express()
//     const httpServer = http.createServer(app)

//     const server = new ApolloServer({
//         schema: makeExecutableSchema({ typeDefs, resolvers }),
//         plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//     })

//     await server.start()

//     app.use(
//         '/',
//         cors(),
//         express.json(),
//         expressMiddleware(server, {
//             context: async ({ req }) => {
//                 const auth = req ? req.headers.authorization : null
//                 if (auth && auth.startsWith('Bearer ')) {
//                     const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
//                     const currentUser = await User.findById(decodedToken.id).populate(
//                         'friends'
//                     )
//                     return { currentUser }
//                 }
//             },
//         }),
//     )

//     const PORT = 4000

//     httpServer.listen(PORT, () =>
//         console.log(`Server is now running on http://localhost:${PORT}`)
//     )
// }

// start()