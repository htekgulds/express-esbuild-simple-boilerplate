import { logger } from '../logging'

export function logRequest () {
  logger.debug('logRequest middleware registered')
  return (req, res, next) => {
    if (req.path !== '/' && !req.path.startsWith('/api')) return next()

    logger.trace('inside logRequest middleware', {
      path: req.path,
      headers: req.headers,
      query: req.query,
      body: req.body,
      auth: req.auth
    })
    next()
  }
}
