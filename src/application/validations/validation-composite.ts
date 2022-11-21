import { ApplicationError } from "../../domain/entities/error";
import { Validation } from "../contracts/validation";

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: any): ApplicationError | void {
    let error
    for (const validation of this.validations) {
      const errorByValidation = validation.validate(input)
      if (errorByValidation) {
        error = errorByValidation
        break
      }
    }
    if (error) return error
  }
}