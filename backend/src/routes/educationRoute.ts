// routes/educationRoute.ts
import { Router } from 'express'
import { getAllEducationByUserId, createEducation } from '../controllers/educationController'

const router: Router = Router()

// Define the route for getting all education data by userId
router.get('/education', getAllEducationByUserId)
router.post('/education', createEducation)
export default router
