import { MoePanel } from './moe/MoePanel'

export default function Pricing() {
  return (
    <MoePanel className="flex max-h-[28rem] max-w-[28rem] flex-col justify-between p-6 text-moe-cream">
      <img
        src="/assets/moe/moe-3.png"
        alt="Moe"
        className="mt-4 h-64 w-2/3 object-contain"
      />
      <p className="text-sm">
        Instructions and educational information goes here in the voice of MOE.
        Arrows slide to more information.
      </p>
    </MoePanel>
  )
}
