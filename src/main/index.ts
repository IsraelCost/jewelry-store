import express from 'express'
import dotenv from 'dotenv'
import { routes } from './routes'

dotenv.config()

const app = express()

app.use(express.json())

app.use(routes)

app.use('*', (req, res) => {
  res.json({ body: 'NOT_FOUND', code: 404 })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`)
})