import { Router } from 'express'
import {
  getAllEducationByUserId,
  createEducation,
  deleteEducation,
  updateEducation
} from '../controllers/educationController'

const router: Router = Router()

router.get('/education', getAllEducationByUserId)
router.post('/education', createEducation)
router.delete('/education/:educationId', deleteEducation)
router.put('/education/:educationId', updateEducation)

export default router
