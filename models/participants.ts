export interface Participant {
  id: number
  classId: number | null
  displayName: string
  createdAt: string
  updatedAt: string
}

export interface CreateParticipantRequest {
  displayName: string
  classCode?: string
}
