import express from 'express'
import clientes from './modules/categorias/ruta.js'

const app = express()

app.use(express.json())

app.set('port', process.env.PORT)

app.use('/api/categorias', clientes)

export default app
