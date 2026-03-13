import express from 'express'
import * as dbStoreStock from '../db/store-stock.js'
import * as storesService from '../services/stores.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { categoryId, participantId } = req.body
    if (categoryId == null || participantId == null) {
      return res.status(400).json({
        error: 'categoryId and participantId are required',
      })
    }
    const store = await storesService.createStoreWithStock(
      Number(categoryId),
      Number(participantId)
    )
    res.status(201).json(store)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create store'
    res.status(500).json({ error: message })
  }
})

router.post('/:id/end', async (req, res) => {
  try {
    const storeId = Number(req.params.id)
    const store = await storesService.endStore(storeId)
    res.json(store)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to end store'
    if (message === 'Store not found') {
      return res.status(404).json({ error: message })
    }
    if (message === 'Store already ended') {
      return res.status(400).json({ error: message })
    }
    res.status(500).json({ error: message })
  }
})

router.patch('/:id/stock', async (req, res) => {
  try {
    const storeId = Number(req.params.id)
    const { quantities } = req.body
    if (quantities == null || typeof quantities !== 'object') {
      return res.status(400).json({
        error: 'quantities object is required',
      })
    }
    await dbStoreStock.updateStoreStockQuantities(
      storeId,
      Object.fromEntries(
        Object.entries(quantities).map(([k, v]) => [
          Number(k),
          Math.max(0, Number(v)),
        ]),
      ),
    )
    res.status(200).json({ ok: true })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update store stock'
    res.status(500).json({ error: message })
  }
})

router.get('/:id/summary', async (req, res) => {
  try {
    const storeId = Number(req.params.id)
    const summary = await storesService.getStoreSummary(storeId)
    res.json(summary)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get store summary'
    if (message === 'Store not found') {
      return res.status(404).json({ error: message })
    }
    res.status(500).json({ error: message })
  }
})

export default router
