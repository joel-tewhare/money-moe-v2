import request from 'superagent'
import type { Participant } from '@/models/participants'
import type { CreateParticipantRequest } from '@/models/participants'

const rootURL = new URL('/api/v1', document.baseURI)

export async function getParticipant(id: number): Promise<Participant> {
  const response = await request.get(`${rootURL}/participants/${id}`)
  return response.body
}

export async function createParticipant(
  data: CreateParticipantRequest
): Promise<Participant> {
  const response = await request
    .post(`${rootURL}/participants`)
    .send(data)
  return response.body
}
