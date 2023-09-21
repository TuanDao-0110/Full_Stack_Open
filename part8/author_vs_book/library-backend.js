// const { ApolloServer } = require('@apollo/server')
// const { startStandaloneServer } = require('@apollo/server/standalone')
// const { v1: uuid } = require('uuid')
// const jwt = require('jsonwebtoken')
// // import express
// const { expressMiddleware } = require('@apollo/server/express4')
// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
// const { makeExecutableSchema } = require('@graphql-tools/schema')
// const express = require('express')
// const cors = require('cors')
// const http = require('http')
// // 
// // import resolver vs schema
// const resolvers = require('./resolvers')
// const typeDefs = require("./schema")
// const mongoose = require('mongoose')

// mongoose.set('strictQuery', false)
// require('dotenv').config()
// const User = require('./models/User')
// const MONGODB_URI = process.env.MONGODB_URI

// mongoose.connect(MONGODB_URI)
//     .then(() => {
//         console.log('connected to MongoDB')
//     })
//     .catch((error) => {
//         console.log('error connection to MongoDB:', error.message)
//     })
// // let authors = [
// //     {
// //         name: 'Robert Martin',
// //         id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
// //         born: 1952,
// //     },
// //     {
// //         name: 'Martin Fowler',
// //         id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
// //         born: 1963
// //     },
// //     {
// //         name: 'Fyodor Dostoevsky',
// //         id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
// //         born: 1821
// //     },
// //     {
// //         name: 'Joshua Kerievsky', // birthyear not known
// //         id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
// //     },
// //     {
// //         name: 'Sandi Metz', // birthyear not known
// //         id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
// //     },
// // ]



// // const resolvers = {
// //     Query: {
// //         bookCount: async (root, args) => {
// //             // if (!args.name) return books.length
// //             // const listAuthor = books.filter(e => e.author === args.name)
// //             // return listAuthor.length
// //             try {
// //                 if (!args.name) return Book.collection.countDocuments()
// //                 const authorId = await Author.findOne({ name: args.name })
// //                 const allBooks = await Book.find({ author: authorId._id })
// //                 return allBooks.length
// //             } catch (error) {
// //                 throw new GraphQLError('book count fail', {
// //                     extensions: {
// //                         code: 'BOOK_CANNOT_COUNT',
// //                         invalidArgs: args.name,
// //                         error: error.message,
// //                     },
// //                 });
// //             }
// //         },
// //         authorCount: (root, args) => {
// //             return authors.length
// //         },
// //         allBooks: async (root, args) => {
// //             let books
// //             try {
// //                 if (args.author) {
// //                     const author = await Author.findOne({ name: args.author })
// //                     if (author) {
// //                         books = await Book.find({ author: author._id }).populate('author');
// //                         if (!args.genre) {
// //                             return books
// //                         }
// //                         const sortedArr = books.filter(book => book.genres.includes(args.genre))
// //                         return sortedArr
// //                     }
// //                     else {
// //                         return []
// //                     }
// //                 } else {
// //                     books = await Book.find().populate('author');
// //                     if (!args.genre) {
// //                         return books
// //                     }
// //                     const sortedArr = books.filter(book => book.genres.includes(args.genre))
// //                     return sortedArr

// //                 }
// //             } catch (error) {
// //                 throw new GraphQLError('Error fetching books', {
// //                     extensions: {
// //                         code: 'INTERNAL_SERVER_ERROR',
// //                         error: error.message,
// //                     },
// //                 });
// //             }
// //         },

// //         allAuthors: async (_, args, { currentUser }) => {
// //             if (!currentUser) {
// //                 throw new GraphQLError('wrong credentials', {
// //                     extensions: { code: 'BAD_USER_INPUT' }
// //                 })
// //             }
// //             try {
// //                 const authors = await Author.find()
// //                 const books = await Book.find()
// //                 return authors.map(author => ({
// //                     name: author.name,
// //                     bookCount: books.filter(book => book.author.toString() === author._id.toString()).length,
// //                     born: author.born
// //                 }));
// //             } catch (error) {
// //                 throw new GraphQLError('Error fetchin author', {
// //                     extensions: {
// //                         code: 'AUTHOR_NOT_FOUND',
// //                         error: error.message,
// //                     },
// //                 });
// //             }
// //         },
// //         me: (root, args, context) => {
// //             return context.currentUser
// //         }
// //     },
// //     Mutation: {
// //         addBook: async (root, args, { currentUser }) => {
// //             if (!currentUser) {
// //                 throw new GraphQLError('wrong credentials', {
// //                     extensions: { code: 'BAD_USER_INPUT' }
// //                 })
// //             }
// //             // Check if the author already exists
// //             let author = await Author.findOne({ name: args.author });

// //             // If the author doesn't exist, create a new one
// //             if (!author) {
// //                 try {
// //                     author = new Author({ name: args.author });
// //                     await author.save();
// //                 } catch (error) {
// //                     throw new GraphQLError(error.message, {
// //                         extensions: {
// //                             code: 'BAD_USER_INPUT',
// //                             invalidArgs: args.author,
// //                             error: error.message,
// //                         },
// //                     });
// //                 }
// //             }

// //             // Create a new book with the author's ObjectId
// //             const newBook = new Book({
// //                 title: args.title,
// //                 published: args.published,
// //                 author: author._id, // Assign the author's ObjectId
// //                 genres: args.genres,
// //             });
// //             try {
// //                 const savedBook = await newBook.save();
// //                 return savedBook.populate('author')
// //             } catch (error) {
// //                 throw new GraphQLError('Adding book failed', {
// //                     extensions: {
// //                         code: 'BAD_USER_INPUT',
// //                         invalidArgs: args.title,
// //                         error: error.message,
// //                     },
// //                 });
// //             }
// //         },
// //         editAuthor: async (root, args, { currentUser }) => {
// //             if (!currentUser) {
// //                 throw new GraphQLError('wrong credentials', {
// //                     extensions: { code: 'BAD_USER_INPUT' }
// //                 })
// //             }
// //             // let editAuthor = authors.find(e => e.name === args.name)
// //             // if (!editAuthor) return editAuthor
// //             // editAuthor.born = args.setBornTo
// //             // return editAuthor
// //             try {
// //                 let author = await Author.findOne({ name: args.name })
// //                 if (author) {
// //                     author.born = args.setBornTo
// //                     author.save()
// //                     return author
// //                 }

// //             } catch (error) {
// //                 throw new GraphQLError('edit user fail', {
// //                     extensions: {
// //                         code: 'BAD_USER_INPUT',
// //                         invalidArgs: args.title,
// //                         error: error.message,
// //                     },
// //                 });
// //             }
// //         },
// //         login: async (root, args) => {
// //             const user = await User.findOne({ username: args.username })
// //             if (!user || args.password !== 'secret') {
// //                 throw new GraphQLError('wrong credentials', {
// //                     extensions: { code: 'BAD_USER_INPUT' }
// //                 })
// //             }
// //             const userForToken = {
// //                 username: user.username,
// //                 id: user._id,
// //             }
// //             return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
// //         },
// //         createUser: async (root, args) => {
// //             const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
// //             return user.save()
// //                 .catch(error => {
// //                     throw new GraphQLError('Creating the user failed', {
// //                         extensions: {
// //                             code: 'BAD_USER_INPUT',
// //                             invalidArgs: args.name,
// //                             error
// //                         }
// //                     })
// //                 })
// //         },
// //     }
// // }

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
// })

// startStandaloneServer(server, {
//     listen: { port: 4000 },
//     context: async ({
//         req, res
//     }) => {
//         const auth = req ? req.headers.authorization : null
//         if (auth && auth.startsWith('Bearer ')) {
//             const decodedToken = jwt.verify(
//                 auth.substring(7), process.env.JWT_SECRET
//             )
//             const currentUser = await User.findById(decodedToken.id)
//             return { currentUser }
//         }
//     }
// }).then(({ url }) => {
//     console.log(`Server ready at ${url}`)
// })



const { ApolloServer } = require('@apollo/server')
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
const User = require('./models/User')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')


// add websocket 
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

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
// if need to debug 
// mongoose.set('debug', true);

// setup is now within a function
const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)
    // add websocket server
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
    })
    // schema vs server cleanup:
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer)
    // set up server configuration
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose()
                    }
                }
            }
        }],
    })
    // run graphQL server
    await server.start()
    // assign express router 
    app.use('/', cors(), express.json(), expressMiddleware(server, {
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.startsWith('Bearer ')) {
                const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
                const currentUser = await User.findById(decodedToken.id)
                return { currentUser }
            }
        }
    }))
    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log(`server is now running on http://localhost:${PORT}`))
}

start()

