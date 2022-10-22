import { Profiles, User } from "../../../src/domain/entities/user"

describe('User entity', () => {
  test('Should create an user', () => {
    const sut = new User('ID', 'NAME', 'EMAIL', 'PASSWORD')
    expect(sut.id).toEqual('ID')
    expect(sut.name).toEqual('NAME')
    expect(sut.email).toEqual('EMAIL')
    expect(sut.password).toEqual('PASSWORD')
    expect(sut.profileId).toEqual(Profiles.ACCESS)
  })
})
