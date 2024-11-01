import express from 'express'
import pool from '../../config.js'

const router = express.Router()

router.get('/', async (_, res) => {
  try {
    const [result] = await pool.query('select * from productos')
    res.send(result)
  } catch (error) {
    console.log('Error al listar: ', error)
    res.status(404).send('Error al listar productos')
  }
})

export default router
