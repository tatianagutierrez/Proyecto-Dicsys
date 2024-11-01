import express from 'express'
import pool from '../../config.js'

const router = express.Router()

router.get('/', async (_, res) => {
  try {
    const [result] = await pool.query('select * from categorias')
    res.send(result)
  } catch (error) {
    console.log('Error al listar: ', error)
    res.status(404).send('Error al listar categorias')
  }
})

router.post('/', async (req, res) => {
  const { nombre } = req.body

  const categoria = await buscarCategoria(nombre)
  if (categoria) {
    return res.status(400).json({ mensaje: 'La categoría ya existe' })
  }

  try {
    await pool.query('INSERT INTO categorias (nombre) VALUES (?)', nombre)
    res.status(201).json({ mensaje: `Se creó la categoría ${nombre} con exito` })
  } catch (error) {
    console.log('Error al crear categoría: ', error)
    res.status(505).send('Error al listar categorias')
  }
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body

  res.json({
    mensaje: 'Se actualizó la categoría con éxito',
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    mensaje: 'Se eliminó la categoría con éxito',
    id
  })
})

async function buscarCategoria (nombre) {
  try {
    const [result] = await pool.query('SELECT * FROM categorias WHERE nombre = ?', nombre)
    return result.length > 0
  } catch (error) {
    console.log('Error al buscar categoría: ', error)
  }
}

export default router
