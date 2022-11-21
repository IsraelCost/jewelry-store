import { HttpRequest, HttpResponse } from ".";
import { ApplicationError } from "../../domain/entities/error";
import { AddUserDTO, IAddUser } from "../../domain/usecases/add-user";
import { AuthenticateDTO, IAuthenticate } from "../../domain/usecases/authenticate";

export class AuthController {
  constructor(
    private readonly addUserUseCase: IAddUser,
    private readonly authenticateUseCase: IAuthenticate
  ) {}

  async signUp(request: HttpRequest): Promise<HttpResponse<AddUserDTO.Output>> {
    try {
      const createdUser = await this.addUserUseCase.add(request.body)
      return {
        body: createdUser,
        code: 201
      }      
    } catch (error: any) {
      if (!(error instanceof ApplicationError)) {
        console.log(error)
        return {
          body: { message: 'Server error', name: 'ServerError' },
          code: 500
        } as any
      }
      return {
        body: { message: error.message, name: error.name },
        code: error.code
      } as any
    }
  }

  async signIn(request: HttpRequest): Promise<HttpResponse<AuthenticateDTO.Output>> {
    try {
      const authenticatedUser = await this.authenticateUseCase.authenticate(request.body)
      return {
        body: authenticatedUser,
        code: 201
      }      
    } catch (error: any) {
      if (!(error instanceof ApplicationError)) {
        return {
          body: { message: 'Server error', name: 'ServerError' },
          code: 500
        } as any
      }
      return {
        body: { message: error.message, name: error.name },
        code: error.code
      } as any
    }
  }
}