import { useParams } from 'react-router-dom'

export default function Summary() {
  const { storeId } = useParams<{ storeId: string }>()
  return <p>Summary {storeId}</p>
}
