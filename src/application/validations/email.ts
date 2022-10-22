import { Validation } from "../contracts/validation";

export class EmailValidation implements Validation {
  private readonly REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | void {
    const isValidEmail = this.REGEX.test(input[this.fieldName])
    if (!isValidEmail) return new Error('Email inválido')
  }
}