import { VariantProps, tv } from '@vezham/react-utils'

const tva = tv({
    slots: {
        base: '',
        container: '',
        contentWrapper: 'w-full flex-1',
        childrenContainer: ''
    },
    variants: {
        variant: {
            default: '',
            compact: '',
            expanded: ''
        },
        position: {
            left: '',
            right: '',
            top: '',
            bottom: ''
        },
        size: {
            sm: '',
            md: '',
            lg: ''
        }
    },
    defaultVariants: {
        variant: 'default',
        position: 'left',
        size: 'md'
    },
    compoundVariants: [
        {
            variant: 'compact',
            class: {
                container: 'w-16'
            }
        },
        {
            variant: 'expanded',
            class: {
                container: 'w-64'
            }
        },
        {
            position: 'left',
            class: {
                base: ''
            }
        },
        {
            position: 'right',
            class: {
                base: ''
            }
        }
    ]
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
