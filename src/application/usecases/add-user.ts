import { ApplicationError } from "../../domain/entities/error";
import { User } from "../../domain/entities/user";
import { GetUserRepository, SaveUserRepository } from "../../domain/repositories/user";
import { AddUserDTO, IAddUser } from "../../domain/usecases/add-user";
import { Encrypter } from "../contracts/encrypter";
import { IdGenerator } from "../contracts/id-generator";
import { EmailValidation } from "../validations/email";
import { RequiredFieldsValidation } from "../validations/required-fields";
import { ValidationComposite } from "../validations/validation-composite";

type UserRepository = GetUserRepository & SaveUserRepository

export class AddUser implements IAddUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator,
    private readonly encrypter: Encrypter
  ) {}

  private validate(input: any) {
    const validation = new ValidationComposite([
      new RequiredFieldsValidation(['name', 'email', 'password']),
      new EmailValidation('email')
    ])
    const error = validation.validate(input)
    if (error) throw error
  }

  async add(input: AddUserDTO.Input): Promise<AddUserDTO.Output> {
    this.validate(input)
    let [user] = await this.userRepository.get({ email: input.email })
    if (user) throw new ApplicationError('Usuário já cadastrado', 400)
    const userId = this.idGenerator.generate()
    const encryptedPassword = this.encrypter.encrypt(input.password)
    user = new User(userId, input.name, input.email, encryptedPassword)
    const createdUser = await this.userRepository.save(user)
    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name
    }
  }
}