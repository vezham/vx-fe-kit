// components/common/text-content-skeleton.tsx
import { Skeleton } from '@heroui/react'

interface SkeletonProps {
  className?: string
  lines?: number
}

export function TextContentSkeleton({ className, lines = 5 }: SkeletonProps) {
  return (
    <div className={`w-full max-w-md space-y-3 ${className ?? ''}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={`h-4 rounded ${
            index === lines - 1
              ? 'w-3/6'
              : index === lines - 2
                ? 'w-4/6'
                : index === 1
                  ? 'w-5/6'
                  : 'w-full'
          }`}
        />
      ))}
    </div>
  )
}
