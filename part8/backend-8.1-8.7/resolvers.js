const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const pubsub = new PubSub()
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    allBooks: async (root, args) => {
      if (args.genre) {
        const filteredByGenre = await Book.find({ genres: { $in: [args.genre] }}).populate('author')
        if (filteredByGenre.length > 0) {
          return filteredByGenre
        }
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => {
      const books = await Book.find({})
      const authors = await Author.find({})
      const authorWithBookCount = authors.map(author => {
        const bookCount = books.filter(book => book.author.equals(author._id)).length
        return { 
          _id: author._id,
          name: author._doc.name,
          born: author._doc.born,
          bookCount
        }
      })

      return authorWithBookCount
    },
    allGenres: async () => {
      const books = await Book.find({})
      const genres = books.reduce((acc, { genres }) => acc.concat(genres), [])
      const genresWithNoDuplicates = Array.from(new Set(genres))

      return genresWithNoDuplicates
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    getRecommendations: async (root, args, context) => {
      const userRecommendations = {
         User: context.currentUser,
         Books: await Book.find({ genres: { $in: [context.currentUser.favoriteGenre] }})
      }
      return userRecommendations
    }
  },
  // Author: {
  //   bookCount: async (root) => {
      

  //     return bookCount
  //   }
  // },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      const author = new Author({ name: args.author, born: 1958 })
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id
      })
      
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      try {
        await author.save()
        await book.save()
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })

      return await book.populate('author')
    },
    editAuthor: async (root, args, context) => {
      const authorToEdit = await Author.findOne({ name: args.name })
      
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
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
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers