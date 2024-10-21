const express = require('express')
const bodyParser = require('body-parser')
const { sequelize } = require('./db')
const userRoutes = require('./routes/user-routes')
const errorHandler = require('./middleware/errorMiddleware')

;(async () => {
  await sequlize.sync({ alter: true })
  console.log('The table for the User model was just (re)created!')
  const app = express()
  const PORT = process.env.PORT || 3000

  app.use(bodyParser.json())
  app.use('/users', userRoutes)
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})()
