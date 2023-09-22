const User = require('./models/User')
const Author = require('./models/Author')
const Book = require("./models/Books")
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
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
                .populate('author')
                return authors.map(author => ({
                    name: author.name,
                    bookCount: books.filter(book => book.author.toString() === author._id.toString()).length,
                    born: author.born
                }));
                // return authors.map(author => ({
                //     name: author.name,
                //     bookCount: books.filter(book => book.author.toString() === author._id.toString()).length,
                //     born: author.born
                // }));
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
                pubsub.publish('BOOK_ADDED', { bookAdded: savedBook.populate('author') })
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}


module.exports = resolvers