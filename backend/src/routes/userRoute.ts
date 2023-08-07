import { Router } from 'express'
import { getUserById, createUser } from '../controllers/userController'

const router: Router = Router()

router.get('/', getUserById)
router.post('/', createUser)

export default router
