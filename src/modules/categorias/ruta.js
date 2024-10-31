import express from 'express'
import pool from '../../config.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const [result] = await pool.query('select * from categorias')
    res.send(result)
  } catch (error) {
    console.log('Error al listar: ', error)
    res.status(404).send('Error al listar categorias')
  }
})

router.post('/', (req, res) => {
  const body = req.body
  res.json({
    mensaje: 'Se creó la categotia con exito',
    data: body
  })
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

export default router
