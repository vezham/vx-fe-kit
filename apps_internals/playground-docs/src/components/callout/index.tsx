import { Callout } from 'fumadocs-ui/components/callout'
import type { ComponentProps } from 'react'

export function CalloutPreview(
  props: Pick<ComponentProps<typeof Callout>, 'title' | 'type' | 'children'>
) {
  return (
    <div className="bg-fd-background rounded-md border p-3">
      <Callout {...props} />
    </div>
  )
}
