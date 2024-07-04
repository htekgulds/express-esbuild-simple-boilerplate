import { Router } from 'express'
import { logger } from './common/logging'
import { handle } from './common/middlewares/handle'
import Boom from 'boom'
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

router.get('/400', handle(() => {
  return Boom.badRequest('bad request error message')
}))

router.get('/404', handle(() => {
  return Boom.notFound('not found error message')
}))

router.get('/502', handle(() => {
  return Boom.badGateway('bad gateway error message')
}))

export default router
