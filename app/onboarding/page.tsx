'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)

  const roles = [
    {
      id: 'creator',
      label: 'Creator',
      description: 'I create content for social media.',
    },
    {
      id: 'influencer',
      label: 'Influencer',
      description: 'I have a following and partner with brands.',
    },
    { id: 'coach', label: 'Coach', description: 'I teach and mentor others.' },
    {
      id: 'founder',
      label: 'Founder',
      description: 'I am building a business or product.',
    },
    { id: 'other', label: 'Other', description: 'None of the above.' },
  ]

  const handleContinue = () => {
    if (role) {
      // TODO: Save role to user metadata or database
      console.log('Selected role:', role)
      router.push('/dashboard')
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-neutral-50 p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl'>
            Welcome, {user?.firstName || 'Creator'}!
          </CardTitle>
          <CardDescription className='text-lg'>
            Let&apos;s get you set up. What best describes your role?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {roles.map((r) => (
              <div
                key={r.id}
                className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-primary hover:bg-primary/5 ${
                  role === r.id
                    ? 'border-primary bg-primary/10 ring-2 ring-primary'
                    : 'bg-white'
                }`}
                onClick={() => setRole(r.id)}
              >
                <h3 className='font-semibold'>{r.label}</h3>
                <p className='text-sm text-muted-foreground'>{r.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className='flex justify-end'>
          <Button size='lg' onClick={handleContinue} disabled={!role}>
            Continue to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
