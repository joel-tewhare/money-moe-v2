import express from 'express'
import * as saleItemsService from '../services/sale-items.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { saleId, productId, quantity } = req.body
    if (saleId == null || productId == null || quantity == null) {
      return res.status(400).json({
        error: 'saleId, productId, and quantity are required',
      })
    }
    const saleItem = await saleItemsService.createSaleItemWithStockDecrement(
      Number(saleId),
      Number(productId),
      Number(quantity)
    )
    res.status(201).json(saleItem)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create sale item'
    if (message === 'Quantity must be greater than 0') {
      return res.status(400).json({ error: message })
    }
    if (message === 'Insufficient stock') {
      return res.status(400).json({ error: message })
    }
    if (message === 'Sale not found' || message === 'Product not found') {
      return res.status(404).json({ error: message })
    }
    res.status(500).json({ error: message })
  }
})

export default router
