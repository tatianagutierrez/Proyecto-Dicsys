import express from 'express'
import pool from '../../utils/mysql.js'
import upload from '../../middleware/multer.js'
import cloudinary from '../../utils/cloudinary.js'

const router = express.Router()

router.get('/', async (_, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM productos')
    res.send(result)
  } catch (error) {
    console.log('Error al listar: ', error)
    res.status(404).send('Error al listar productos')
  }
})

router.get('/categoria/:id', async (req, res) => {
  const idCategoria = req.params.id

  try {
    const [result] = await pool.query('SELECT * FROM productos WHERE id_categoria = ?', [idCategoria])
    res.send(result)
  } catch (error) {
    console.log('Error al listar: ', error)
    res.status(404).send('Error al listar productos')
  }
})

router.post('/', upload.single('image'), async (req, res) => {
  const { nombre, descripcion, fecha_vencimiento: fechaVencimiento, precio, stock, id_categoria: idCategoria } = req.body
  const body = req.body

  let imageUrl = null

  const producto = await buscarProductoByNombre(nombre)
  if (producto) {
    return res.status(400).json({ mensaje: 'El producto ya existe' })
  }

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path)
      imageUrl = result.secure_url
    }

    await pool.query(
      'INSERT INTO productos (nombre, descripcion, fecha_vencimiento, precio, stock, id_categoria, ruta_imagen) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, fechaVencimiento, precio, stock, idCategoria, imageUrl]
    )

    res.status(201).json({
      mensaje: `Se creó el producto ${nombre} con exito`,
      data: body
    })
  } catch (error) {
    console.log('Error al crear producto: ', error)
    res.status(505).send('Error al crear productos')
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { nombre, descripcion, fecha_vencimiento: fechaVencimiento, precio, stock, id_categoria: idCategoria } = req.body
  const body = req.body
  const updates = []

  const producto = await buscarProductoById(id)
  if (!producto) {
    return res.status(400).json({ mensaje: 'El producto no existe' })
  }

  if (nombre) updates.push(`nombre = '${nombre}'`)
  if (descripcion) updates.push(`descripcion = '${descripcion}'`)
  if (fechaVencimiento) updates.push(`fecha_vencimiento = '${fechaVencimiento}'`)
  if (precio) updates.push(`precio = '${precio}'`)
  if (stock) updates.push(`stock = '${stock}'`)
  if (idCategoria) updates.push(`id_categoria = '${idCategoria}'`)

  try {
    await pool.query(`UPDATE productos SET ${updates.join(', ')} WHERE id = ${id}`)
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
