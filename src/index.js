import { Router } from 'express'
import { logger } from './common/logging'
import { handle } from './common/middlewares/handle'
const router = Router()

/* GET home page. */
router.get('/', handle(() => {
  logger.info('info')
  logger.warn('warn')
  logger.error('error')
  logger.debug('debug')
  logger.trace('debug')

  return 'Hello ExpressJS'
}))

export default router
