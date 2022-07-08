import { client } from '../../prisma/client'
import { hash } from 'bcryptjs'

interface IUserRequest {
  name: string
  password: string
  username: string
}

class CreateUserUseCase {

  async execute({ name, username, password }: IUserRequest) {
    // Verificar se usuario existe
    const userAlredyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if (userAlredyExists) {
      throw new Error('User already exists')
    }

    // Cadastrar o usuario
    const passwordHash = await hash(password, 8)

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      }
    })

    return user
  }
}

export { CreateUserUseCase }