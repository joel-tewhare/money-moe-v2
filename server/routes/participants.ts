import express from 'express'
import * as db from '../db/participants.js'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const participant = await db.getParticipantById(Number(req.params.id))
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' })
    }
    res.json(participant)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get participant' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { displayName, classCode } = req.body
    if (!displayName) {
      return res.status(400).json({ error: 'displayName is required' })
    }
    let classId: number | null = null
    if (classCode) {
      classId = await db.getClassIdByCode(classCode)
    }
    const participant = await db.createParticipant(displayName, classId)
    res.status(201).json(participant)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create participant' })
  }
})

export default router
