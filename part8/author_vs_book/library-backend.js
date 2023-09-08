const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const { GraphQLError } = require('graphql')
mongoose.set('strictQuery', false)
require('dotenv').config()
const Author = require('./models/Author')
const Book = require("./models/Books")
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

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]


const typeDefs = `
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
  }
  type editAuthor { 
    name:String 
    born: String
  }
type Mutation {
  addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
  editAuthor(name: String!, setBornTo: Int!): Author
}

`

const resolvers = {
    Query: {
        bookCount: async (root, args) => {
            if (!args.name) return books.length
            const listAuthor = books.filter(e => e.author === args.name)
            return listAuthor.length
        },
        authorCount: (root, args) => {
            return authors.length
        },
        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                return await Book.find({ author: args.author, genres: args.genre });
            } else if (args.author) {
                return await Book.find({ author: args.author });
            } else if (args.genre) {
                return await Book.find({ genres: args.genre });
            } else {
                return await Book.find({});
            }
        },

        allAuthors: () => {
            return authors.map(author => ({
                name: author.name,
                bookCount: books.filter(book => book.author === author.name).length,
                born: author.born
            }));
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            // Check if the author already exists
            let author = await Author.findOne({ name: args.author });

            // If the author doesn't exist, create a new one
            if (!author) {
                author = new Author({ name: args.author });
                try {
                    await author.save();
                } catch (error) {
                    throw new GraphQLError('Adding author failed', {
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

        editAuthor: (root, args) => {
            let editAuthor = authors.find(e => e.name === args.name)
            if (!editAuthor) return editAuthor
            editAuthor.born = args.setBornTo
            return editAuthor

        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})