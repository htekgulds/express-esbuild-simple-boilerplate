import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import homeRouter from './home/route'
import usersRouter from './users/route'
import morganMiddleware from './common/middlewares/morgan'
import { config } from './common/config'
import { logRequest } from './common/middlewares/log'
import { logger } from './common/logging'

logger.debug('Config', config)

const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morganMiddleware)
app.use(logRequest())

app.use('/', homeRouter)
app.use('/users', usersRouter)

export default app
