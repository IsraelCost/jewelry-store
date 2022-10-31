import { ApplicationError } from "../../domain/entities/error";
import { Validation } from "../contracts/validation";

export class RequiredFieldsValidation implements Validation {
  constructor(private readonly requiredFields: string[]) {}

  validate(input: any): ApplicationError | void {
    if (!input) return new ApplicationError('Input inválido', 400)
    let error 
    for (const requiredField of this.requiredFields) {
      if (!input[requiredField]) {
        error = new ApplicationError(`Campo ${requiredField} vazio.`, 400)
        break;
      }
    }
    if (error) return error
  }
}