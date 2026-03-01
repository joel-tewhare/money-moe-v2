import request from 'superagent'
import type { Participant } from '@/models/participants'
import type { CreateParticipantRequest } from '@/models/participants'

const rootURL = new URL('/api/v1', document.baseURI)

export async function createParticipant(
  data: CreateParticipantRequest
): Promise<Participant> {
  const response = await request
    .post(`${rootURL}/participants`)
    .send(data)
  return response.body
}
