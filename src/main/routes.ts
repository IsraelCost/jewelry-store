import { Router, Request, Response } from 'express'
import { makeAuthController } from './factories/presentation'

const authController = makeAuthController()

const routes = Router()

routes.post('/sign-up', async (req: Request, res: Response) => {
  const result = await authController.signUp({ body: req.body, params: req.params })
  return res.json(result)
})

routes.post('/sign-in', async (req: Request, res: Response) => {
  const result = await authController.signIn({ body: req.body, params: req.params })
  return res.json(result)
})

export { routes }