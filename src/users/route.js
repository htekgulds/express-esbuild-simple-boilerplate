import { Router } from 'express'
const router = Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json([{ name: 'Hasan', age: 35 }, { name: 'Ahmed', age: 7 }])
})

export default router
