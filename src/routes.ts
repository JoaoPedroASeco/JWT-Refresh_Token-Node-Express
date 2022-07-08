import { Router } from 'express'
import { ensureAuthenticated } from './middleware/ensureAuthenticated'
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from './useCases/createUser/CreateUserController'
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController'

const router = Router()

const createUserController = new CreateUserController()
const authenticateController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()

router.post('/users', createUserController.handle)
router.post('/login', authenticateController.handle)
router.post('/refresh-token', refreshTokenUserController.handle)

router.get("/courses", ensureAuthenticated, (request, response) => {
  return response.json([
    { id: 1, name: "NodeJs" },
    { id: 2, name: "React" },
    { id: 3, name: "React Native" },
    { id: 4, name: "Flutter" },
    { id: 5, name: "Elixir" },
  ])
})

export { router }