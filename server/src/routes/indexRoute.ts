import { Router } from 'express'
import IndexController from '../controllers/indexController'

const router: Router = Router()

router.get('/', IndexController.getIndex)

export default router
