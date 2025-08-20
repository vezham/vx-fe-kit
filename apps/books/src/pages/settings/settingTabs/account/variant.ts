import { cn, type InputProps, type SelectProps } from '@heroui/react'

export const getInputProps = (
  isDarkmode?: boolean
): Pick<InputProps, 'labelPlacement' | 'classNames'> => {
  const dark = !!isDarkmode
  return {
    labelPlacement: 'outside' as const,
    classNames: {
      // label
      label: cn(
        'text-small font-medium',
        dark
          ? 'text-white group-data-[filled=true]:text-white group-data-[focus=true]:text-white'
          : 'text-black group-data-[filled=true]:text-black group-data-[focus=true]:text-black'
      ),

      // input wrapper (outer box)
      inputWrapper: cn(
        'rounded-medium transition-colors',
        dark
          ? [
              'bg-neutral-800',
              'group-data-[focus=true]:bg-neutral-800',
              'group-data-[focus-visible=true]:bg-neutral-800',
              'data-[hover=true]:bg-neutral-700'
            ]
          : [
              'bg-default-100',
              'group-data-[focus=true]:bg-default-100',
              'group-data-[focus-visible=true]:bg-default-100',
              'data-[hover=true]:bg-default-200'
            ]
      ),

      // actual input text
      input: cn(
        dark
          ? 'text-white group-data-[has-value=true]:text-white placeholder:text-gray-400'
          : 'text-black group-data-[has-value=true]:text-black placeholder:text-gray-500'
      )
    }
  }
}

export const getSelectProps = (
  isDarkmode?: boolean
): Pick<SelectProps, 'labelPlacement' | 'classNames'> => {
  const dark = !!isDarkmode
  return {
    labelPlacement: 'outside' as const,
    classNames: {
      // label
      label: cn(
        'text-small font-medium',
        dark
          ? 'text-white group-data-[filled=true]:text-white group-data-[focus=true]:text-white'
          : 'text-black group-data-[filled=true]:text-black group-data-[focus=true]:text-black'
      ),

      // trigger (select box)
      trigger: cn(
        'rounded-medium transition-colors',
        dark
          ? [
              'bg-neutral-800 text-white',
              'group-data-[focus=true]:bg-neutral-800 group-data-[focus=true]:text-white',
              'data-[focus-visible=true]:bg-neutral-800 data-[focus-visible=true]:text-white',
              'data-[hover=true]:bg-neutral-700'
            ]
          : [
              'bg-default-100 text-black',
              'group-data-[focus=true]:bg-default-100 group-data-[focus=true]:text-black',
              'data-[focus-visible=true]:bg-default-100 data-[focus-visible=true]:text-black',
              'data-[hover=true]:bg-default-200'
            ]
      ),

      // selected value inside trigger
      value: cn(
        dark
          ? 'text-white group-data-[has-value=true]:text-white'
          : 'text-black group-data-[has-value=true]:text-black'
      ),

      // dropdown popover
      popoverContent: cn(
        dark ? 'bg-neutral-800 text-white' : 'bg-white text-black'
      ),

      // listbox
      listbox: cn(dark ? 'bg-neutral-800 text-white' : 'bg-white text-black')
    }
  }
}
