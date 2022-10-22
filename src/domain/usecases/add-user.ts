export interface IAddUser {
  add: (input: AddUserDTO.Input) => Promise<AddUserDTO.Output>
}

export namespace AddUserDTO {
  export type Input = {
    name: string
    email: string
    password: string
  }

  export type Output = {
    id: string
    name: string
    email: string
  }
}