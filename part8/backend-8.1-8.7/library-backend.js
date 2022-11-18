const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Author = require('./models/Author')
const Book = require('./models/Book')
const { aggregate } = require('./models/Book')
const MONGODB_URI = 'mongodb+srv://fullstack:open@cluster0.9qk3o.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    allBooks: async (root, args) => {
      if (args.genre) {
        const filteredByGenre = Book.find({ genres: { $in: [args.genre] }})
        if (filteredByGenre.length > 0) {
          return filteredByGenre
        }
      }
      return Book.find({})
    },
    allAuthors: async () => {
      return Author.find({})
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = new Author({name: args.author, born: 1958 })
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id
      })

      try {
        await author.save()
        await book.save()
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book.populate('author')
    },
    editAuthor: async (root, args) => {
      const authorToEdit = await Author.findOne({ name: args.name })

      if (!authorToEdit) { return }
      
      authorToEdit.born = args.setBornTo

      try {
        await authorToEdit.save()
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
      return authorToEdit
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})