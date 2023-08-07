import 'dotenv/config'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import educationRoute from './routes/educationRoute'
import userRoute from './routes/userRoute'

const app: Application = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

// Use Clerk's authentication middleware to protect all routes
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('middleware called !')

  ClerkExpressRequireAuth()(req, res, (err) => {
    // Log any potential error
    console.log('ClerkExpressRequireAuth() called:', err)
    // console.log(req.auth)

    if (err) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    next()
  })
})

// Use the educationRoute
app.use('/', educationRoute)
app.use('/user', userRoute)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
