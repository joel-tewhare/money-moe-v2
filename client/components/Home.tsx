import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getProductCategories } from '@/client/apis/product-categories'
import { createParticipant } from '@/client/apis/participants'
import { createStore } from '@/client/apis/stores'

export default function Home() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ['productCategories'],
    queryFn: getProductCategories,
  })

  const startStoreMutation = useMutation({
    mutationFn: async () => {
      const participant = await createParticipant({
        displayName: name.trim(),
      })
      const store = await createStore({
        categoryId: categoryId!,
        participantId: participant.id,
      })
      return store
    },
    onSuccess: (store) => {
      navigate(`/store/${store.id}/stock`)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
  }

  const handleCategory = (categoryId: number) => {
    setCategoryId(categoryId)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name.trim() === '' || categoryId == null) return
    startStoreMutation.mutate()
  }

  return (
    <TooltipProvider>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex flex-col items-center justify-center md:min-w-0 md:flex-row md:gap-12"
      >
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
              className="text-xl font-semibold text-moe-cream"
            >
              What&apos;s your name?
            </Label>
            <Input
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="rounded-md p-2 text-lg"
            />
          </div>
          <div className="grid w-full max-w-xs gap-5">
            <Label
              htmlFor="category"
              className="text-xl font-semibold text-moe-cream"
            >
              What do you want to sell?
            </Label>
            {isCategoriesPending && (
              <p className="text-sm text-moe-cream">Loading categories...</p>
            )}
            {isCategoriesError && (
              <p className="text-sm text-moe-cream">
                Failed to load categories.
              </p>
            )}
            {categories && (
              <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                  <Tooltip key={category.id}>
                    <TooltipTrigger asChild>
                      <Button
                        id={`category-${category.id}`}
                        type="button"
                        onClick={() => handleCategory(category.id)}
                        className={`flex h-24 w-24 items-center justify-center rounded-2xl ${
                          categoryId === category.id
                            ? 'ring-2 ring-moe-slate ring-offset-2'
                            : ''
                        } bg-moe-cream`}
                      >
                        <img
                          src={`/assets/products/${category.slug}.png`}
                          alt={category.name}
                          className="h-16 w-16"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      className="mt-2 text-sm text-moe-cream"
                      side="bottom"
                    >
                      <p>{category.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            )}
            {startStoreMutation.isError && (
              <p className="text-sm text-red-200">
                Something went wrong. Please try again.
              </p>
            )}
            <Button
              type="submit"
              disabled={
                startStoreMutation.isPending ||
                isCategoriesPending ||
                !categoryId ||
                !name.trim()
              }
              className="mt-8 w-fit rounded-md bg-moe-slate px-4 py-3 text-lg text-moe-cream shadow-sm transition-colors hover:bg-moe-slate/90 disabled:opacity-50"
            >
              {startStoreMutation.isPending ? 'Starting...' : 'Get Started'}
            </Button>
          </div>
        </div>
      </form>
    </TooltipProvider>
  )
}
