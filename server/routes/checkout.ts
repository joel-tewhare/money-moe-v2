import express from 'express'
import * as checkoutService from '../services/checkout.js'

const router = express.Router()

function isValidItem(
  x: unknown,
): x is { productId: number; quantity: number } {
  return (
    x != null &&
    typeof x === 'object' &&
    typeof (x as { productId?: unknown }).productId === 'number' &&
    typeof (x as { quantity?: unknown }).quantity === 'number'
  )
}

router.post('/', async (req, res) => {
  try {
    const { storeId, items } = req.body

    if (storeId == null) {
      return res.status(400).json({ error: 'storeId is required' })
    }

    if (items == null) {
      return res.status(400).json({ error: 'items is required' })
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'items must be an array' })
    }

    if (items.length === 0) {
      return res.status(400).json({ error: 'items must not be empty' })
    }

    const validItems = items.filter(isValidItem)
    if (validItems.length !== items.length) {
      return res.status(400).json({
        error: 'Each item must include productId and quantity',
      })
    }

    const result = await checkoutService.processCheckout(
      Number(storeId),
      validItems.map((x) => ({
        productId: x.productId,
        quantity: Math.max(0, Math.floor(x.quantity)),
      })),
    )

    res.status(201).json(result)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Checkout failed'
    if (
      message === 'Store not found' ||
      message === 'Product not found'
    ) {
      return res.status(404).json({ error: message })
    }
    if (
      message === 'Quantity must be greater than 0' ||
      message === 'Insufficient stock' ||
      message === 'Retail price not set for product' ||
      message === 'Checkout requires at least one item'
    ) {
      return res.status(400).json({ error: message })
    }
    res.status(500).json({ error: message })
  }
})

export default router
