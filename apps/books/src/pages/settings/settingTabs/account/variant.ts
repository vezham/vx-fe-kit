import { cn, type InputProps, type SelectProps } from '@heroui/react'

export const getInputProps = (
  isDarkmode?: boolean
): Pick<InputProps, 'labelPlacement' | 'classNames'> => {
  const dark = !!isDarkmode
  return {
    // ensure literal type, not plain string
    labelPlacement: 'outside' as const,
    classNames: {
      label: cn(
        'text-small font-medium',
        dark
          ? 'text-white group-data-[filled=true]:text-white'
          : 'text-black group-data-[filled=true]:text-black'
      ),
      inputWrapper: cn(dark ? 'bg-neutral-800' : 'bg-default-100')
    }
  }
}

export const getSelectProps = (
  isDarkmode?: boolean
): Pick<SelectProps, 'labelPlacement' | 'classNames'> => {
  const dark = !!isDarkmode
  return {
    // literal type again
    labelPlacement: 'outside' as const,
    classNames: {
      label: cn(
        'text-small font-medium',
        dark
          ? 'text-white group-data-[filled=true]:text-white'
          : 'text-black group-data-[filled=true]:text-black'
      ),
      trigger: cn(dark ? 'bg-neutral-800' : 'bg-default-100')
    }
  }
}
