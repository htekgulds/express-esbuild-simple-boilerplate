import Boom from 'boom'
import { logger } from '../logging'

function isNil (value) {
  return value === null || value === undefined
}

function formatBoomPayload (error) {
  return {
    ...error.output.payload,
    ...(isNil(error.data) ? {} : { data: error.data })
  }
}

export function handle (fn) {
  return async (req, res, next) => {
    try {
      logger.debug('inside handle middleware')
      const result = await fn(req, res)
      logger.silly(result, { label: 'Result' })

      if (result instanceof Error && Boom.isBoom(result)) {
        logger.error(result)
        res.status(result.output.statusCode).send(formatBoomPayload(result))
      }

      return res.send(result)
    } catch (error) {
      logger.debug('inside handle catch')
      logger.error(error)
      if (
        process.env.NODE_ENV !== 'production' &&
        (error.stack || error.message)
      ) {
        res.status(500).send(error.stack || error.message)
      } else {
        res.status(500).send(Boom.internal().output.payload)
      }
    }
    next()
  }
}
