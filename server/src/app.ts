import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'

const app: Application = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

// Routes
import indexRoute from './routes/indexRoute'
app.use('/', indexRoute)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
