'use client'

import {
  ArrowRight,
  Check,
  ChevronRight,
  DollarSign,
  LayoutTemplate,
  Rocket,
  Star,
  Trophy,
  User,
  Users,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Step = 'welcome' | 'role' | 'goals' | 'done'

const ROLES = [
  {
    id: 'creator',
    title: 'Creator',
    description: 'You create content for YouTube, TikTok, or Instagram.',
    icon: User,
  },
  {
    id: 'influencer',
    title: 'Influencer',
    description: 'You have an audience and work with brands.',
    icon: Star,
  },
  {
    id: 'founder',
    title: 'Founder',
    description: 'You are building a company or a product.',
    icon: Rocket,
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Something else entirely.',
    icon: LayoutTemplate,
  },
]

const GOALS = [
  {
    id: 'followers',
    title: 'Increase followers 2x',
    icon: Users,
  },
  {
    id: 'product',
    title: 'Launch product',
    icon: Rocket,
  },
  {
    id: 'community',
    title: 'Build community',
    icon: User,
  },
  {
    id: 'sponsor',
    title: 'Get first sponsor deal',
    icon: DollarSign,
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<Step>('welcome')
  const [role, setRole] = React.useState<string | null>(null)
  const [goals, setGoals] = React.useState<string[]>([])

  const handleGoalToggle = (goalId: string) => {
    setGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    )
  }

  const nextStep = () => {
    if (step === 'welcome') setStep('role')
    else if (step === 'role') setStep('goals')
    else if (step === 'goals') setStep('done')
    else if (step === 'done') router.push('/dashboard')
  }

  return (
    <div className='bg-background flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-3xl animate__animated animate__fadeIn'>
        {step === 'welcome' && (
          <div className='flex flex-col items-center text-center space-y-6'>
            <div className='bg-primary/10 rounded-full p-4 mb-4'>
              <Trophy className='text-primary size-12' />
            </div>
            <h1 className='font-sans text-4xl font-semibold tracking-tight sm:text-5xl'>
              Welcome to Personal Brand OS
            </h1>
            <p className='text-muted-foreground max-w-lg text-lg'>
              Your single source of truth for tracking growth, revenue, and
              content across all platforms.
            </p>
            <Button
              size='lg'
              onClick={nextStep}
              className='mt-8 text-base px-8 h-12'
            >
              Get Started <ArrowRight className='ml-2 size-4' />
            </Button>
          </div>
        )}

        {step === 'role' && (
          <div className='space-y-6'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-semibold tracking-tight'>
                What describes you best?
              </h2>
              <p className='text-muted-foreground mt-2'>
                Select the role that fits your journey.
              </p>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              {ROLES.map((item) => (
                <Card
                  key={item.id}
                  className={cn(
                    'cursor-pointer transition-all hover:border-primary/50 hover:bg-accent/50',
                    role === item.id
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                      : ''
                  )}
                  onClick={() => setRole(item.id)}
                >
                  <CardHeader className='flex flex-row items-center gap-4 space-y-0 pb-2'>
                    <div
                      className={cn(
                        'p-2 rounded-lg',
                        role === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      )}
                    >
                      <item.icon className='size-5' />
                    </div>
                    <CardTitle className='text-base'>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className='flex justify-end pt-6'>
              <Button onClick={nextStep} disabled={!role} size='lg'>
                Continue <ChevronRight className='ml-2 size-4' />
              </Button>
            </div>
          </div>
        )}

        {step === 'goals' && (
          <div className='space-y-6'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-semibold tracking-tight'>
                What do you want to achieve?
              </h2>
              <p className='text-muted-foreground mt-2'>
                Pick your main goals for the next 90 days.
              </p>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              {GOALS.map((item) => {
                const isSelected = goals.includes(item.id)
                return (
                  <Card
                    key={item.id}
                    className={cn(
                      'cursor-pointer transition-all hover:border-primary/50 hover:bg-accent/50',
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : ''
                    )}
                    onClick={() => handleGoalToggle(item.id)}
                  >
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <div className='flex items-center gap-3'>
                        <div
                          className={cn(
                            'p-2 rounded-lg',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          )}
                        >
                          <item.icon className='size-5' />
                        </div>
                        <CardTitle className='text-base'>
                          {item.title}
                        </CardTitle>
                      </div>
                      {isSelected && <Check className='text-primary size-5' />}
                    </CardHeader>
                  </Card>
                )
              })}
            </div>

            <div className='flex justify-end pt-6'>
              <Button
                onClick={nextStep}
                disabled={goals.length === 0}
                size='lg'
              >
                Continue <ChevronRight className='ml-2 size-4' />
              </Button>
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className='flex flex-col items-center text-center space-y-6 animate__animated animate__fadeIn animate__zoomIn'>
            <div className='bg-primary/10 rounded-full p-6 mb-4'>
              <Rocket className='text-primary size-16' />
            </div>
            <h2 className='text-3xl font-semibold tracking-tight'>
              You&apos;re all set!
            </h2>
            <p className='text-muted-foreground max-w-md text-lg'>
              We&apos;ve customized your dashboard based on your goals.
              Let&apos;s start building your empire.
            </p>
            <Button
              size='lg'
              onClick={nextStep}
              className='mt-8 text-base px-8 h-12 w-full sm:w-auto'
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
