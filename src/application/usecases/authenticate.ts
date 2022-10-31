import { ApplicationError } from "../../domain/entities/error";
import { GetUserRepository } from "../../domain/repositories/user";
import { AuthenticateDTO, IAuthenticate } from "../../domain/usecases/authenticate";
import { CryptComparer } from "../contracts/crypt-compare";
import { JwtGenerator } from "../contracts/jwt-generator";
import { EmailValidation } from "../validations/email";
import { RequiredFieldsValidation } from "../validations/required-fields";
import { ValidationComposite } from "../validations/validation-composite";

export class Authenticate implements IAuthenticate {
  constructor(
    private readonly userRepository: GetUserRepository,
    private readonly decryptor: CryptComparer,
    private readonly jwtGenerator: JwtGenerator
  ) {}

  private validate(input: any) {
    const validation = new ValidationComposite([
      new RequiredFieldsValidation(['email', 'password']),
      new EmailValidation('email')
    ])
    const error = validation.validate(input)
    if (error) throw error
  }

  async authenticate(input: AuthenticateDTO.Input): Promise<AuthenticateDTO.Output> {
    this.validate(input)
    const [user] = await this.userRepository.get({ email: input.email })
    if (!user) throw new ApplicationError('Usuário ou senha inválidos', 400)
    const validPassword = this.decryptor.compare(user.password, input.password)
    if (!validPassword) throw new ApplicationError('Usuário ou senha inválidos', 400)
    const jwt = this.jwtGenerator.generate({ name: user.name, email: user.email, profileId: user.profileId })
    const { password, ...dataWithoutPassword } = user
    return {
      user: dataWithoutPassword,
      token: jwt
    }
  }
}