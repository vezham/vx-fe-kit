import { VariantProps, tv } from '@vezham/react-utils'

const tva = tv({
    slots: {
        base: '',
        surface: 'w-full min-w-0',
        tabs: 'w-[250px] sm:w-auto',
        listContainer: 'w-full min-w-0',
        scrollContainer: 'scrollbar-hide w-full overflow-x-auto rounded-full',
        tabsList: 'flex w-max min-w-full whitespace-nowrap',
        tab: '',
        indicator: ''
    },
    variants: {
        variant: {
            default: '',
            compact: '',
            full: ''
        },
        size: {
            sm: '',
            md: '',
            lg: ''
        },
        placement: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
        placement: 'top'
    },
    compoundVariants: [
        {
            variant: 'compact',
            class: {
                tabs: 'w-[200px] sm:w-auto',
                tab: 'px-3 py-1 text-sm'
            }
        },
        {
            variant: 'full',
            class: {
                tabs: 'w-full',
                tabsList: 'w-full justify-center'
            }
        }
    ]
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
