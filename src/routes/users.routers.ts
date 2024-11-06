import { error } from 'console'
import express, { Request, Response } from 'express'
import { register } from 'module'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handler'
// dựng userRouter
const userRouter = express.Router()

/*
desc: Register a new user
path: /register
method: post
body:{
    name: string,
    email: string,
    password: string, 
    confirm_password: string,
    date_of_birth: string có cấu trúc ISO8601
}
*/
userRouter.post('/register', registerValidator, wrapAsync(registerController))

/*
desc: login
path: users/login
method: post
body:{
    email: string,
    password: string
}
*/
userRouter.post('/login', loginValidator, wrapAsync(loginController))

/*
desc: logout
path: users/logout
method: post
headers:{
    Authorization: 'Bearer <access_token>'
}
body: {
    refresh_token: <refresh_token>
}
*/
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))
export default userRouter
