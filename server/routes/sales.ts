import express from 'express'
import * as db from '../db/sales.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { storeId } = req.body
    if (storeId == null) {
      return res.status(400).json({ error: 'storeId is required' })
    }
    const sale = await db.createSale(Number(storeId))
    res.status(201).json(sale)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sale' })
  }
})

export default router
