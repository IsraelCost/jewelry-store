import { User } from "../../domain/entities/user";
import { GetUserRepository, SaveUserRepository } from "../../domain/repositories/user";
import { Connection } from "../db/connection";

type IUserRepository = GetUserRepository & SaveUserRepository

export class UserRepository implements IUserRepository {
  constructor(private readonly connection: Connection) {}

  private toModel(data: any) {
    return new User(data.id, data.name, data.email, data.password, data.profile_id)
  }

  async get(params: Partial<User>): Promise<User[]> {
    let query = 'select * from users'
    if (params.id || params.email || params.name || params.profileId) query += ' where '
    if (params.id) query += 'id=$1 '
    if (params.email) query += 'email=$2 '
    if (params.name) query += 'name=$3 '
    if (params.profileId) query += 'profile_id=$4 '
    const data = await this.connection.query(query, [params.id, params.email, params.name, params.profileId])
    return data.map(this.toModel)
  }

  async save(user: User): Promise<User> {
    const data = await this.connection.query('insert into users (id, email, password, name, profile_id) values ($1, $2, $3, $4, $5) returning *', [user.id, user.email, user.password, user.name, user.profileId])
    return this.toModel(data[0])
  }
}