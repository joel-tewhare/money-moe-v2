import { useParams } from 'react-router-dom'

export default function Finalise() {
  const { storeId } = useParams<{ storeId: string }>()
  return <p>Finalise {storeId}</p>
}
