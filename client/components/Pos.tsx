import { useParams } from 'react-router-dom'

export default function Pos() {
  const { storeId } = useParams<{ storeId: string }>()
  return <p>Pos {storeId}</p>
}
