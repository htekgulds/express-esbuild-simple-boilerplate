import { Router } from 'express'
import { handle } from '../common/middlewares/handle'
const router = Router()

/* GET users listing. */
router.get('/', handle(() => {
  return [
    { name: 'Hasan', age: 35 },
    { name: 'Ahmed', age: 7 }
  ]
}))

export default router
