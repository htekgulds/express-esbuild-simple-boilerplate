import envSchema from 'env-schema'

const schema = {
  type: 'object',
  required: ['LOG_LEVEL', 'PORT', 'API_KEY'],
  properties: {
    LOG_LEVEL: { type: 'string', enum: ['trace', 'debug', 'info', 'warn', 'error'], default: 'http' },
    PORT: { type: 'number', default: 3000 },
    API_KEY: { type: 'string' }
  }
}

export const config = envSchema({ schema })
