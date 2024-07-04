import winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'http',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()]
})
