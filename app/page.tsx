import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button'
import { IntroButton } from "@/components/auth/intro-button";

const font = Montserrat({
    subsets: ['latin'],
    weight: ['600']
});

export default async function Home() {
  return (
      <main className="h-full flex flex-col items-center justify-center bg-emerald-600">
          <div className='space-y-6 text-center'>
              <h1 className={cn(
                  "text-5xl font-semibold text-white drop-shadow-md",
                  font.className,
              )}>Everyday blog that matters!</h1>
              <p className={cn("text-xl text-white", font.className)}>Share. Read. Care.</p>
              <IntroButton>
                  <Button size='lg'>Go to blog</Button>
              </IntroButton>
          </div>
      </main>
  )
}
