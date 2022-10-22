import { Profiles } from "../entities/user"

export interface IAuthenticate {
  authenticate: (input: AuthenticateDTO.Input) => Promise<AuthenticateDTO.Output>
}

export namespace AuthenticateDTO {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    user: {
      id: string
      name: string
      email: string
      profileId: Profiles
    }
    token: string
  }
}