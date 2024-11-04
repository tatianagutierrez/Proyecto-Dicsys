import express from 'express'
import pool from '../../config.js'

const router = express.Router()

router.get('/', async (_, res) => {
  // FIXME: fecha de vencimiento: 2024-12-01 => 2024-12-01T03:00:00.000Z
  try {
    const [result] = await pool.query('SELECT * FROM productos')
    res.send(result)
  } catch (error) {
    console.log('Error al listar: ', error)
    res.status(404).send('Error al listar productos')
  }
})

router.post('/', async (req, res) => {
  const { nombre, fecha_vencimiento: fechaVencimiento, id_categoria: idCategoria } = req.body
  const body = req.body

  const producto = await buscarProductoByNombre(nombre)
  if (producto) {
    return res.status(400).json({ mensaje: 'El producto ya existe' })
  }

  try {
    await pool.query('INSERT INTO productos (nombre, fecha_vencimiento, id_categoria) VALUES (?, ?, ?)', [nombre, fechaVencimiento, idCategoria])
    res.status(201).json({
      mensaje: `Se creó la categoría ${nombre} con exito`,
      data: body
    })
  } catch (error) {
    console.log('Error al crear producto: ', error)
    res.status(505).send('Error al listar productos')
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body
  // TODO: falta validar si el nombre de la nueva producto existe

  const producto = await buscarProductoById(id)
  console.log(producto)
  if (!producto) {
    return res.status(400).json({ mensaje: 'El producto no existe' })
  }

  try {
    await pool.query('UPDATE productos SET nombre = ?, fecha_vencimiento = ?, id_categoria = ? WHERE id = ?', [body.nombre, body.fecha_vencimiento, body.id_categoria, id])
    res.status(201).json({
      mensaje: 'Se actualizó el producto  con éxito',
      data: body
    })
  } catch (error) {
    console.log('Error al actualizar el producto: ', error)
    res.status(505).send('Error al actualizar el productos')
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const producto = await buscarProductoById(id)
  if (!producto) {
    return res.status(400).json({ mensaje: 'El producto no existe' })
  }

  try {
    await pool.query('DELETE FROM productos WHERE id = ?', id)
    res.status(200).json({
      mensaje: 'Se eliminó el producto con éxito'
    })
  } catch (error) {
    console.log('Error al eliminar prducto: ', error)
    res.status(505).send('Error al eliminar prducto')
  }
})

async function buscarProductoByNombre (nombre) {
  try {
    const [result] = await pool.query('SELECT * FROM productos WHERE nombre = ?', nombre)
    return result.length > 0
  } catch (error) {
    console.log('Error al buscar productos: ', error)
  }
}

async function buscarProductoById (id) {
  try {
    const [result] = await pool.query('SELECT * FROM productos WHERE id = ?', id)
    return result.length > 0
  } catch (error) {
    console.log('Error al buscar productos: ', error)
  }
}

export default router
