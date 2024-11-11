import express from 'express'
import pool from '../../utils/mysql.js'
import upload from '../../middleware/multer.js'
import cloudinary from '../../utils/cloudinary.js'

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

router.post('/', upload.single('image'), async (req, res) => {
  const { nombre } = req.body

  const categoria = await buscarCategoriaByNombre(nombre)
  if (categoria) {
    return res.status(400).json({ mensaje: 'La categoría ya existe' })
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    const imageUrl = result.secure_url

    await pool.query('INSERT INTO categorias (nombre) VALUES (?, ?)', [nombre, imageUrl])
    res.status(201).json({ mensaje: `Se creó la categoría ${nombre} con exito` })
  } catch (error) {
    console.log('Error al crear categoría: ', error)
    res.status(505).send('Error al listar categorias')
  }
})

router.patch('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params
  const body = req.body
  // TODO: falta validar si el nombre de la nueva categoria existe

  const categoria = await buscarCategoriaById(id)
  console.log(categoria)
  if (!categoria) {
    return res.status(400).json({ mensaje: 'La categoría no existe' })
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    const imageUrl = result.secure_url

    await pool.query('UPDATE categorias SET nombre = ?, ruta_imagen = ? WHERE id = ?', [body.nombre, imageUrl, id])
    res.status(201).json({
      mensaje: 'Se actualizó la categoría con éxito',
      data: body
    })
  } catch (error) {
    console.log('Error al actualizar categoría: ', error)
    res.status(505).send('Error al actualizar categorias')
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const categoria = await buscarCategoriaById(id)
  console.log(categoria)
  if (!categoria) {
    return res.status(400).json({ mensaje: 'La categoría no existe' })
  }

  try {
    await pool.query('DELETE FROM categorias WHERE id = ?', id)
    res.status(200).json({
      mensaje: 'Se eliminó la categoría con éxito'
    })
  } catch (error) {
    console.log('Error al eliminar categoría: ', error)
    res.status(505).send('Error al eliminar categorias')
  }
})

async function buscarCategoriaByNombre (nombre) {
  try {
    const [result] = await pool.query('SELECT * FROM categorias WHERE nombre = ?', nombre)
    return result.length > 0
  } catch (error) {
    console.log('Error al buscar categoría: ', error)
  }
}

async function buscarCategoriaById (id) {
  try {
    const [result] = await pool.query('SELECT * FROM categorias WHERE id = ?', id)
    return result.length > 0
  } catch (error) {
    console.log('Error al buscar categoría: ', error)
  }
}

export default router
