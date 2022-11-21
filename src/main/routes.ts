import { Router, Request, Response } from 'express'
import { makeAuthController } from './factories/presentation'

const createMiddleware = (controller: any, method: string) => {
  return async (req: Request, res: Response) => {
    const result = await controller[method]({ body: req.body, params: req.params, query: req.query })
    return res.status(result.code).json(result)
  }
}

const authController = makeAuthController()

const routes = Router()

routes.post('/sign-up', createMiddleware(authController, 'signUp'))

routes.post('/sign-in', createMiddleware(authController, 'signIn'))

export { routes }