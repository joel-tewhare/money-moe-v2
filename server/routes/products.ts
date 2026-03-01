import express from 'express'
import * as db from '../db/products.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const categoryId = req.query.categoryId
      ? Number(req.query.categoryId)
      : undefined
    const products = await db.getProducts(categoryId)
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get products' })
  }
})

export default router
