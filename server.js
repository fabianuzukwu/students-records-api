const express = require('express')
const app = express()
const { sequelize } = require('./database/database')
const studentRoutes = require('./router/students')
const PORT = process.env.PORT 

app.use(express.json())

app.use('/students',studentRoutes)

const databaseConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('unable to connect to the database:', error.message)
    }
}

databaseConnection();



app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})