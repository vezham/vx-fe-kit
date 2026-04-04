import { VariantProps, tv } from '@vezham/react-utils'

const tva = tv({
    slots: {
        base: '',
        surface: 'fixed right-10 bottom-24 z-50 flex flex-col gap-4 md:right-5 md:bottom-10 lg:static lg:right-auto lg:bottom-auto lg:z-auto lg:flex-row lg:bg-transparent',
        header:'flex items-center justify-between py-2',
        searchButton: 'hidden shadow-md md:flex',
        actionGroup: 'border-default-200 flex flex-col items-center overflow-hidden rounded-full border shadow-lg lg:flex-row',
        addButton: 'rounded-none',
        moreButton: 'rounded-none',
        leftSection: 'flex items-center gap-2',
        closeButton: '',
        actionButton: '',
        rightSection: 'flex items-center gap-3',
        counter: 'text-default-500 text-sm',
        prevButton: '',
        nextButton: ''
    },
    variants: {
        variant: {
            container: '',
            header: ''
        },
        position: {
            fixed: 'fixed',
            absolute: 'absolute',
            relative: 'relative',
            static: 'static'
        },
        spacing: {
            none: '',
            sm: 'gap-2',
            md: 'gap-4',
            lg: 'gap-6'
        }
    },
    defaultVariants: {
        variant: 'container',
        position: 'relative',
        spacing: 'md'
    }
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
