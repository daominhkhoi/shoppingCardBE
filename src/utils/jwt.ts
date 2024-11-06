//file này lưu hàm dùng để tạo ra 1 token
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' //import vào
import { TokenPayload } from '~/models/requests/users.requests'
dotenv.config()

export const signToken = ({
  payLoad,
  privateKey,
  options = { algorithm: 'HS256' }
  // khúc phân rã
}: {
  payLoad: string | Buffer | object
  privateKey: string
  options?: jwt.SignOptions
  // định nghĩa object truyền vào
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payLoad, privateKey, options, (error, token) => {
      if (error) throw reject(error)
      else return resolve(token as string)
    })
  })
}

//làm hàm giúp kiểm tra 1 token có đúng với chữ ký hay không
//nếu đúng thì trả ra payload đang có trong token đó
export const verifyToken = ({ token, privateKey }: { token: string; privateKey: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decode) => {
      if (error) throw reject(error)
      else return resolve(decode as TokenPayload)
    })
  })
}
