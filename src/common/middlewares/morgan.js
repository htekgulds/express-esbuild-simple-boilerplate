import morgan from 'morgan'
import { logger } from '../logging'

const stream = {
  // Use the http severity
  write: message => logger.http(message)
}

const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  'remote_address=:remote-addr method=:method url=:url status=:status content_length=:res[content-length] - response_time=:response-time ms',
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream }
)

export default morganMiddleware
