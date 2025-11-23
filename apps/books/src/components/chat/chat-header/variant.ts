import { cn } from '@vezham/react/v2'

export const headerBaseClass =
  'flex w-full items-center justify-between  sm:px-4 py-3'

export const menuButtonClass = (page?: number) =>
  cn('text-default-500 flex', {
    'sm:hidden': page === 0
  })

export const backButtonClass = 'flex text-default-500 lg:hidden'

export const titleWrapperClass = (page?: number) =>
  cn(
    'text-large flex w-full items-center justify-center font-bold lg:justify-start',
    {
      'sm:justify-start': page === 0
    }
  )

export const chipClassNames = {
  base: 'h-[18px] ml-2 bg-default-100',
  content: 'text-default-600 text-[10px] font-medium'
}

export const composeButtonClass =
  'ml-auto h-[28px] w-[28px] min-w-[28px] rounded-[6px] border-1 border-default-200 p-0 text-default-400'

export const composeIconClass = 'text-default-400 [&>g]:stroke-[2px]'
