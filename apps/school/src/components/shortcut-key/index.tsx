import { cn } from '@vezham/react-v3'

type ShortcutKeyProps = {
  className?: string
  shortcut: string
}

type ShortcutTooltipLabelProps = ShortcutKeyProps & {
  label: string
}

const shortcutGroupClassName =
  'inline-flex min-h-9 items-center gap-1 rounded-xl '

const keycapClassName =
  'inline-flex min-h-7 min-w-7 items-center justify-center rounded-lg border border-black/5 bg-[#f3f4f6] px-2 text-sm font-semibold leading-none text-[#111827] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.08),0_1px_2px_rgba(15,23,42,0.08)]'

export function ShortcutKey({ className, shortcut }: ShortcutKeyProps) {
  const keys = shortcut.split(/\s+/).filter(Boolean)

  return (
    <span
      aria-label={shortcut}
      className={cn(shortcutGroupClassName, className)}>
      {keys.map((key, index) => (
        <span key={`${key}-${index}`} className={keycapClassName}>
          {key}
        </span>
      ))}
    </span>
  )
}

export function ShortcutTooltipLabel({
  className,
  label,
  shortcut
}: ShortcutTooltipLabelProps) {
  return (
    <span
      className={cn('flex items-center gap-2 whitespace-nowrap', className)}>
      <span>{label}</span>
      <ShortcutKey shortcut={shortcut} />
    </span>
  )
}
