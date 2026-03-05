import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Home() {
  return (
    <TooltipProvider>
      <div className="mx-auto mt-8 flex flex-col items-center justify-center md:min-w-0 md:flex-row md:gap-12">
        <div className="flex shrink-0">
          <img
            src="/assets/moe/moe-landing.png"
            alt="Moe"
            className="h-auto max-h-96 w-auto object-contain md:max-h-[36rem]"
          />
        </div>
        <div className="flex flex-col gap-10 md:mr-8">
          <div className="grid w-full max-w-xs gap-4">
            <Label
              htmlFor="name"
              className="text-moe-cream text-xl font-semibold"
            >
              What&apos;s your name?
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              className=" rounded-md p-2 text-lg"
            />
          </div>
          <div className="grid w-full max-w-xs gap-5">
            <Label
              htmlFor="category"
              className="text-moe-cream text-xl font-semibold"
            >
              What do you want to sell?
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  id="category"
                  className="bg-moe-cream flex h-24 w-24 items-center justify-center rounded-2xl"
                >
                  <img
                    src="/assets/products/food-drink.png"
                    alt="food and drink category"
                    className="h-16 w-16"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className="text-moe-cream mt-2 text-sm"
                side="bottom"
              >
                <p>Food &amp; Drink</p>
              </TooltipContent>
            </Tooltip>
            <Button
              asChild
              className="bg-moe-slate text-moe-cream hover:bg-moe-slate/90 mt-8 w-fit rounded-md px-4 py-3 text-lg shadow-sm transition-colors"
            >
              <Link to="/placeholder">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
