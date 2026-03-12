// import { cva } from 'class-variance-authority'
// import * as React from 'react'
// import { Surface, VariantProps, cn } from '@vezham/react/v3'
// const widgetVariants = cva(
//   'border-default-200 relative flex flex-col rounded-3xl border border-2 whitespace-nowrap shadow-md',
//   {
//     variants: {
//       size: {
//         sm: 'size-48',
//         md: 'h-48 w-96',
//         lg: 'size-96'
//       },
//       design: {
//         default: 'p-6',
//         mumbai: 'p-4'
//       },
//       variant: {
//         default: 'text-foreground',
//         secondary: 'bg-secondary text-secondary-foreground'
//       }
//     },
//     defaultVariants: {
//       size: 'sm',
//       design: 'default',
//       variant: 'default'
//     }
//   }
// )
// export interface WidgetProps
//   extends
//     React.HTMLAttributes<HTMLDivElement>,
//     VariantProps<typeof widgetVariants> {
//   asChild?: boolean
// }
// const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
//   ({ className, size, design, variant, ...props }, ref) => (
//     <Surface
//       variant="transparent"
//       ref={ref}
//       className={cn(widgetVariants({ size, design, variant, className }))}
//       {...props}
//     />
//   )
// )
// Widget.displayName = 'Widget'
// const WidgetHeader = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn('text-semibold flex flex-none justify-between', className)}
//     {...props}
//   />
// ))
// WidgetHeader.displayName = 'WidgetHeader'
// const WidgetTitle = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLHeadingElement>
// >(({ className, ...props }, ref) => (
//   <h5
//     ref={ref}
//     className={cn('leading-none font-semibold tracking-tight', className)}
//     {...props}
//   />
// ))
// WidgetTitle.displayName = 'WidgetTitle'
// const WidgetContent = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div ref={ref} className={cn('flex flex-1', className)} {...props} />
// ))
// WidgetContent.displayName = 'WidgetContent'
// const WidgetFooter = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn('flex flex-none items-center justify-between', className)}
//     {...props}
//   />
// ))
// WidgetFooter.displayName = 'WidgetFooter'
// export {
//   Widget,
//   WidgetHeader,
//   WidgetTitle,
//   WidgetContent,
//   WidgetFooter,
//   widgetVariants
// }
import * as React from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

import { Surface, cn } from '@vezham/react/v3'

const widgetVariants = tv({
  base: 'border-default-200 relative flex flex-col rounded-3xl border border-2 whitespace-nowrap shadow-md',
  variants: {
    size: {
      sm: 'size-36',
      md: 'h-36 w-64',
      lg: 'size-64'
    },
    design: {
      default: 'p-6',
      mumbai: 'p-4'
    },
    variant: {
      default: 'text-foreground',
      secondary: 'bg-secondary text-secondary-foreground'
    }
  },
  defaultVariants: {
    size: 'sm',
    design: 'default',
    variant: 'default'
  }
})

export interface WidgetProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetVariants> {
  asChild?: boolean
}

const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, size, design, variant, ...props }, ref) => (
    <Surface
      variant="transparent"
      ref={ref}
      className={cn(widgetVariants({ size, design, variant }), className)}
      {...props}
    />
  )
)

Widget.displayName = 'Widget'

const WidgetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-semibold flex flex-none justify-between', className)}
    {...props}
  />
))

WidgetHeader.displayName = 'WidgetHeader'

const WidgetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('leading-none font-semibold tracking-tight', className)}
    {...props}
  />
))

WidgetTitle.displayName = 'WidgetTitle'

const WidgetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-1', className)} {...props} />
))

WidgetContent.displayName = 'WidgetContent'

const WidgetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-none items-center justify-between', className)}
    {...props}
  />
))

WidgetFooter.displayName = 'WidgetFooter'

export {
  Widget,
  WidgetHeader,
  WidgetTitle,
  WidgetContent,
  WidgetFooter,
  widgetVariants
}
