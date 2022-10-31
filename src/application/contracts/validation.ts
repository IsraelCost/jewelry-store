import { ApplicationError } from "../../domain/entities/error";

export interface Validation {
  validate: (input: any) => ApplicationError | void
}