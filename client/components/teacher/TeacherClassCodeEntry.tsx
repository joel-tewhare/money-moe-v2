import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function TeacherClassCodeEntry() {
  const navigate = useNavigate()
  const [classCode, setClassCode] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanedClassCode = classCode.trim()
    if (!cleanedClassCode) return
    navigate(
      `/teacher/dashboard?classCode=${encodeURIComponent(cleanedClassCode)}`,
    )
  }

  return (
    <div className="mx-auto mt-8 max-w-md px-4">
      <h1 className="mb-8 text-center text-2xl font-bold text-moe-cream">
        Teacher dashboard
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label
            htmlFor="class-code"
            className="text-lg font-semibold text-moe-cream"
          >
            Class code
          </Label>
          <Input
            id="class-code"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            placeholder="Enter class code"
            className="rounded-md p-2 text-lg"
            autoComplete="off"
          />
        </div>
        <Button
          type="submit"
          disabled={!classCode.trim()}
          className="w-fit rounded-md bg-moe-slate px-4 py-3 text-lg text-moe-cream shadow-sm transition-colors hover:bg-moe-slate/90 disabled:opacity-50"
        >
          View class
        </Button>
      </form>
    </div>
  )
}
