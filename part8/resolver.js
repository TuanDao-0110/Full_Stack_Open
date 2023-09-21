const User = require('./demoModel/User')
const Person = require('./demoModel/Person')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
// in case of subscription, the communication between client and server happens with WebSockets
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const resolvers = {
    Query: {
        personCount: async () => Person.collection.countDocuments(),
        allPersons: async (root, args, context) => {
            console.log('Person.find')
            if (!args.phone) {
                return Person.find({})
                .populate('friendOf')
            }
            return Person.find({ phone: { $exists: args.phone === 'YES' } })
            .populate('friendOf')
        },
        findPerson: async (root, args) => Person.findOne({ name: args.name }),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Person: {
        address: ({ street, city }) => {
            return {
                street,
                city,
            }
        },
        friendOf:async (root) => {
            const friends = await User.find({ friends: { $in: [root._id] } })
            return friends
        }
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const person = new Person({ ...args })
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            try {
                await person.save()
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
            } catch (error) {
                throw new GraphQLError(`Saving user failed ${error.message} `, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            pubsub.publish('PERSON_ADDED', { personAdded: person })
            return person
        },
        editNumber: async (root, args) => {
            const person = await Person.findOne({ name: args.name })
            person.phone = args.phone
            try {
                await person.save()
            } catch (error) {
                throw new GraphQLError(`Editing number failed ${error.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            return person
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username })

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
        addAsFriend: async (root, args, { currentUser }) => {
            // check that do we have current user or not
            if (!currentUser) {
                throw new GraphQLError('wrong credentials', {
                    extensions: { code: 'BAD_USER_INPUT' }
                })
            }
            // check user that have person is friend already or not
            const nonFriendAlready = (person) =>
                !currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())
            // now we find a person need to be added as friend,
            const person = await Person.findOne({ name: args.name })
            // check that person belong to list friend already or not
            if (nonFriendAlready(person)) {
                currentUser.friends = currentUser.friends.concat(person)
            }

            await currentUser.save()
            return currentUser
        },
    },
    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterator('PERSON_ADDED')
        },
    },
}


module.exports = resolvers