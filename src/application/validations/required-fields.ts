import { Validation } from "../contracts/validation";

export class RequiredFieldsValidation implements Validation {
  constructor(private readonly requiredFields: string[]) {}

  validate(input: any): Error | void {
    if (!input) return new Error('Input inválido')
    let error 
    for (const requiredField of this.requiredFields) {
      if (!input[requiredField]) {
        error = new Error(`Campo ${requiredField} vazio.`)
        break;
      }
    }
    if (error) return error
  }
}