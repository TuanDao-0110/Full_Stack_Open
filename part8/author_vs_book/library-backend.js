const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { GraphQLError } = require('graphql')
mongoose.set('strictQuery', false)
require('dotenv').config()
const Author = require('./models/Author')
const Book = require("./models/Books")
const User = require('./models/User')
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })
let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

// let books = [
//     {
//         title: 'Clean Code',
//         published: 2008,
//         author: 'Robert Martin',
//         id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring']
//     },
//     {
//         title: 'Agile software development',
//         published: 2002,
//         author: 'Robert Martin',
//         id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//         genres: ['agile', 'patterns', 'design']
//     },
//     {
//         title: 'Refactoring, edition 2',
//         published: 2018,
//         author: 'Martin Fowler',
//         id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring']
//     },
//     {
//         title: 'Refactoring to patterns',
//         published: 2008,
//         author: 'Joshua Kerievsky',
//         id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring', 'patterns']
//     },
//     {
//         title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//         published: 2012,
//         author: 'Sandi Metz',
//         id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring', 'design']
//     },
//     {
//         title: 'Crime and punishment',
//         published: 1866,
//         author: 'Fyodor Dostoevsky',
//         id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//         genres: ['classic', 'crime']
//     },
//     {
//         title: 'The Demon ',
//         published: 1872,
//         author: 'Fyodor Dostoevsky',
//         id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//         genres: ['classic', 'revolution']
//     },
// ]


const typeDefs = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}
type Token {
  value: String!
}
type Book {
    title: String!
    published: Int!
    author: Author!
    id:ID!
    genres: [String]!
}
type Author { 
    name: String!
    id: ID!
    born: Int
}
type listAuthor {
    name: String!
    bookCount:Int!
    born:Int
}
  type Query {
    bookCount(name: String): Int!
    authorCount: Int!
    allBooks(author: String,genre: String): [Book!]!
    allAuthors: [listAuthor!]!
    me: User
  }
  type editAuthor { 
    name:String 
    born: String
  }
type Mutation {
  addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
  editAuthor(name: String!, setBornTo: Int!): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
 login(
    username: String!
    password: String!
  ): Token
}

`

const resolvers = {
    Query: {
        bookCount: async (root, args) => {
            // if (!args.name) return books.length
            // const listAuthor = books.filter(e => e.author === args.name)
            // return listAuthor.length
            try {
                if (!args.name) return Book.collection.countDocuments()
                const authorId = await Author.findOne({ name: args.name })
                const allBooks = await Book.find({ author: authorId._id })
                return allBooks.length
            } catch (error) {
                throw new GraphQLError('book count fail', {
                    extensions: {
                        code: 'BOOK_CANNOT_COUNT',
                        invalidArgs: args.name,
                        error: error.message,
                    },
                });
            }
        },
        authorCount: (root, args) => {
            return authors.length
        },
        allBooks: async (root, args) => {
            let books
            try {
                if (args.author) {
                    const author = await Author.findOne({ name: args.author })
                    if (author) {
                        books = await Book.find({ author: author._id }).populate('author');
                        if (!args.genre) {
                            return books
                        }
                        const sortedArr = books.filter(book => book.genres.includes(args.genre))
                        return sortedArr
                    }
                    else {
                        return []
                    }
                } else {
                    books = await Book.find().populate('author');
                    if (!args.genre) {
                        return books
                    }
                    const sortedArr = books.filter(book => book.genres.includes(args.genre))
                    return sortedArr

                }
            } catch (error) {
                throw new GraphQLError('Error fetching books', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        error: error.message,
                    },
                });
            }
        },

        allAuthors: async (_, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('wrong credentials', {
                    extensions: { code: 'BAD_USER_INPUT' }
                })
            }
            try {
                const authors = await Author.find()
                const books = await Book.find()
                return authors.map(author => ({
                    name: author.name,
                    bookCount: books.filter(book => book.author.toString() === author._id.toString()).length,
                    born: author.born
                }));
            } catch (error) {
                throw new GraphQLError('Error fetchin author', {
                    extensions: {
                        code: 'AUTHOR_NOT_FOUND',
                        error: error.message,
                    },
                });
            }
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('wrong credentials', {
                    extensions: { code: 'BAD_USER_INPUT' }
                })
            }
            // Check if the author already exists
            let author = await Author.findOne({ name: args.author });

            // If the author doesn't exist, create a new one
            if (!author) {
                try {
                    author = new Author({ name: args.author });
                    await author.save();
                } catch (error) {
                    throw new GraphQLError(error.message, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                            error: error.message,
                        },
                    });
                }
            }

            // Create a new book with the author's ObjectId
            const newBook = new Book({
                title: args.title,
                published: args.published,
                author: author._id, // Assign the author's ObjectId
                genres: args.genres,
            });
            try {
                const savedBook = await newBook.save();
                return savedBook.populate('author')
            } catch (error) {
                throw new GraphQLError('Adding book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error: error.message,
                    },
                });
            }
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('wrong credentials', {
                    extensions: { code: 'BAD_USER_INPUT' }
                })
            }
            // let editAuthor = authors.find(e => e.name === args.name)
            // if (!editAuthor) return editAuthor
            // editAuthor.born = args.setBornTo
            // return editAuthor
            try {
                let author = await Author.findOne({ name: args.name })
                if (author) {
                    author.born = args.setBornTo
                    author.save()
                    return author
                }

            } catch (error) {
                throw new GraphQLError('edit user fail', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error: error.message,
                    },
                });
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: { code: 'BAD_USER_INPUT' }
                })
            }
            const userForToken = {
                username: user.username,
                id: user._id,
            }
            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    })
                })
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({
        req, res
    }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})