import express from 'express'
import * as db from '../db/product-categories.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const categories = await db.getProductCategories()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get product categories' })
  }
})

export default router
