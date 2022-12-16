require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    const notes = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })

    const output = (blog) => {
      return `${blog.author}: '${blog.title}', ${blog.likes} likes`
    }

    console.log(output(notes[0]))
    console.log(output(notes[1]))
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
