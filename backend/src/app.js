import express from 'express'
import categorias from './modules/categorias/ruta.js'
import productos from './modules/productos/ruta.js'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: 'http://localhost:4200'
}))

app.use(express.json())

app.set('port', process.env.PORT)

app.use('/api/categorias', categorias)
app.use('/api/productos', productos)

export default app
