import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import educationRoute from './routes/educationRoute'

const app: Application = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

// Use the educationRoute
app.use('/', educationRoute)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
