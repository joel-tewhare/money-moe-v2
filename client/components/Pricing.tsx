import { Link, useParams } from 'react-router-dom'
import { MoePanel } from './moe/MoePanel'

export default function Pricing() {
  const { storeId } = useParams<{ storeId: string }>()

  return (
    <div className="mt-8 flex flex-col items-center gap-8">
      <MoePanel className="flex max-h-[28rem] max-w-[28rem] flex-col justify-between p-6 text-moe-cream">
        <img
          src="/assets/moe/moe-3.png"
          alt="Moe"
          className="mt-4 h-64 w-2/3 object-contain"
        />
        <p className="text-sm">
          Instructions and educational information goes here in the voice of
          MOE. Arrows slide to more information.
        </p>
      </MoePanel>
      {storeId && (
        <Link
          to={`/store/${storeId}/pos`}
          className="w-fit rounded-md bg-moe-slate px-4 py-3 text-lg font-semibold text-moe-cream shadow-sm transition-colors hover:bg-moe-slate/90"
        >
          Next: POS
        </Link>
      )}
    </div>
  )
}
