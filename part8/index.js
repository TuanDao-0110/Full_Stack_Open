const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
let persons = [
    {
        name: "Arto Hellas",
        phone: "040-123543",
        street: "Tapiolankatu 5 A",
        city: "Espoo",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Matti Luukkainen",
        phone: "040-432342",
        street: "Malminkaari 10 A",
        city: "Helsinki",
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
    {
        name: "Venla Ruuska",
        street: "Nallemäentie 22 C",
        city: "Helsinki",
        id: '3d599471-3436-11e9-bc57-8b80ba54c431'
    },
]
// with 1st: schema, 2nd:query
const typeDefs = `
type Address { 
    street:String!
    city : String!

}
    type Person {
        phone: String
     name: String!
     address: Address!
        id: ID!
    }
type Mutation {
  addPerson(
    name: String!
    phone: String
    street: String!
    city: String!
  ): Person
}
type Query {
  personCount: Int!
  allPersons: [Person!]!
  findPerson(name: String!): Person
} 
`
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) =>
            persons.find(p => p.name === args.name)
    },

    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        },
    },
    // root is from main, args is from parameter
    Mutation: {
        addPerson: (root, args) => {
            if (persons.find(p => p.name === args.name)) {
                throw new GraphQLError('Name must be unique', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name
                    }
                })
            }
            const person = { ...args, id: uuid() }
            persons = persons.concat(person)
            return person
        }
    }

}

// create a sever
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})