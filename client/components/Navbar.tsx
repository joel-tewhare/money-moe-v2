import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="bg-moe-green flex items-center justify-between border-none px-4 py-3">
      <Link
        to="/"
        className="text-moe-cream hover:text-moe-green text-outline p-10 text-6xl font-black transition-colors"
      >
        MONEY MOE
      </Link>
      <div className="flex items-center gap-2 p-10">
        <Button variant="ghost" asChild>
          <Link
            to="/placeholder1"
            className="text-moe-cream hover:text-moe-mint-light text-2xl font-black transition-colors"
          >
            How It Works
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link
            to="/placeholder2"
            className="text-moe-cream hover:text-moe-mint-light text-2xl font-black transition-colors"
          >
            Sign In
          </Link>
        </Button>
      </div>
    </nav>
  )
}
