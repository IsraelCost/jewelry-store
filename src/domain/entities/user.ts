export enum Profiles {
  ADMIN = 0,
  ACCESS = 10
}

export class User {
  readonly profileId: Profiles

  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    profileId: Profiles = Profiles.ACCESS
  ) {
    this.profileId = profileId
  }
}