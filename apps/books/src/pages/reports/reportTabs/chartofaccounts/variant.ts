import { tv } from 'tailwind-variants'
import { FolderVariantProps } from './types'

export const folderVariants = tv({
  slots: {
    base: 'border-divider hover:bg-default-50 grid grid-cols-4 gap-4 border-b px-2 py-3'
  },
  variants: {
    isChild: {
      true: {
        base: 'pl-8'
      }
    }
  }
})

export const getFolderVariantProps = (isChild: boolean): FolderVariantProps => {
  return { isChild }
}
