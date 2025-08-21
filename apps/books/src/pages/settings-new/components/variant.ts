export const iconSizeClasses = 'h-4.5 w-4.5'

// Status Badge Variants
export const statusChipClasses = {
  active:
    'rounded-md px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700',
  pending:
    'rounded-md px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700',
  inactive:
    'rounded-md px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700'
}

export const actionButtonClasses = 'flex justify-end gap-2'

export const getStatusColor = (isConnected: boolean) =>
  isConnected ? 'bg-primary-500' : 'bg-success-500'

export const getStatusText = (isConnected: boolean) =>
  isConnected ? 'Connected' : 'Available'

// 🔹 Card body wrapper
export const cardBodyClass = 'p-6'

export const headerWrapperClass = 'mb-4 flex justify-between'
export const headerLogoClass = 'ml-4 flex items-start justify-center text-2xl'

// 🔹 Footer section
export const footerWrapperClass =
  'mt-auto flex w-full items-center justify-between'
export const statusWrapperClass = 'flex items-center gap-2'
export const statusDotClass = 'h-2 w-2 rounded-full'

export const gridWrapperClass = 'grid gap-6 md:grid-cols-2'
