import pgp from 'pg-promise'
import { Connection } from "./connection";

export class PgAdapter implements Connection {
  pgp: pgp.IDatabase<any, any>
  
  constructor() {
    this.pgp = pgp()('postgres://postgres:root@localhost:4000/jewelry-store')
  }

  query(query: string, params: any[]): Promise<any> {
    return this.pgp.query(query, params)
  }

  async close() {
    await this.pgp.$pool.end()
  }
}