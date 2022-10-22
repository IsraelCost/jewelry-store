import { HttpRequest, HttpResponse } from ".";
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
      return {
        body: { message: error.message, name: error.name },
        code: 400
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
      return {
        body: { message: error.message, name: error.name },
        code: 400
      } as any
    }
  }
}