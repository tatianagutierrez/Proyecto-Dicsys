import express from 'express'
import categorias from './modules/categorias/ruta.js'
import productos from './modules/productos/ruta.js'

const app = express()

app.use(express.json())

app.set('port', process.env.PORT)

app.use('/api/categorias', categorias)
app.use('/api/productos', productos)

export default app
