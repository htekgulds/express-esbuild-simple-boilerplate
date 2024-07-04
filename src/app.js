import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import indexRouter from './index'
import usersRouter from './users/route'
import morganMiddleware from './common/middlewares/morgan'

const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morganMiddleware)

app.use('/', indexRouter)
app.use('/users', usersRouter)

export default app
