import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background text-foreground'>
      <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
        <div className='space-y-2'>
          <h1 className='text-9xl font-black tracking-tighter text-transparent bg-gradient-to-b from-foreground to-muted-foreground/50 bg-clip-text select-none'>
            404
          </h1>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            Page not found
          </h2>
          <p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been removed, renamed, or doesn&apos;t exist.
          </p>
        </div>
        <div className='flex gap-2'>
          <Button asChild variant='default' size='lg'>
            <Link href='/'>
              <MoveLeft className='mr-2 h-4 w-4' />
              Go back home
            </Link>
          </Button>
          <Button asChild variant='ghost' size='lg'>
            <Link href='/contact'>Contact support</Link>
          </Button>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className='fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'></div>
      <div className='fixed left-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]'></div>
      <div className='fixed right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]'></div>
    </div>
  )
}
