import express from 'express'
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
