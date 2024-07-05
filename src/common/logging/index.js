import winston from 'winston'
import util from 'util'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  trace: 5
}

const levelColors = {
  error: 'bgRed',
  warn: 'bgYellow',
  info: 'bgGreen',
  http: 'bgMagenta',
  debug: 'bgBlue',
  trace: 'bgGray'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
  trace: 'gray',
  timestamp: 'gray',
  metadata: 'gray'
}

function getMetadata (info) {
  if (!info.metadata) return ''
  if (!Object.keys(info.metadata).length) return ''

  return util.inspect(info.metadata, { colors: true })
}

function getCustomFormat (info) {
  const timestamp = winston.format.colorize({ colors }).colorize('timestamp', info.timestamp)
  const level = winston.format.colorize({ colors: levelColors }).colorize(info.level, info.level.toUpperCase())
  const message = typeof info.message === 'object'
    ? util.inspect(info.message, { colors: true })
    : winston.format.colorize({ colors }).colorize(info.level, info.message)

  return `${timestamp} ${level}: ${message}
${getMetadata(info)}`
}

const format = winston.format.combine(
  winston.format.metadata(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(getCustomFormat)
)

export const logger = winston.createLogger({
  levels,
  level: process.env.LOG_LEVEL || 'http',
  format,
  transports: [new winston.transports.Console()]
})
