import express from 'express'
import userRouter from './routes/users.routers'
import databaseServices from './services/database.services'
import HTTP_STATUS from './constants/httpStatus'
import { defaultErrorHandler } from './middlewares/error.middleware'

//dùng express tạo server(app)
const app = express()
const PORT = 3000
databaseServices.connect() //kết nối với mongoDB

app.use(express.json()) //server dùng middleware biến đổi các chuỗi json được gửi lên
// handler
// app dùng userRouter
app.use('/users', userRouter)
// server mở ở port 3000
//http://localhost:3000/users/login
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log('SERVER BE đang mở ở port: ' + PORT)
})
