// import React from 'react'

// import { Button, Pagination } from '@vezham/react/v2'

// import {
//   ChevronLeftIcon,
//   ChevronRightIcon
// } from '@vx-oss/heroui-v2-shared-icons'

// import { BottomContentProps, useBottomContentProps } from './types'

// const BottomContent: React.FC<BottomContentProps> = originalProps => {
//   const {
//     getPaginationContainerProps,
//     getPaginationButtonContainerProps,
//     getPaginationButtonProps,
//     getPaginationIconProps,
//     getPaginationMobileIconProps,
//     getPaginationTextProps,
//     isFirstPage,
//     isLastPage
//   } = useBottomContentProps(originalProps)

//   return (
//     <div {...getPaginationContainerProps()}>
//       <div>
//         <Pagination
//           isCompact
//           showControls
//           size="sm"
//           page={originalProps.page}
//           total={originalProps.pages}
//           onChange={originalProps.onPaginationChange}
//         />
//       </div>
//       <div {...getPaginationButtonContainerProps()}>
//         <Button
//           isDisabled={isFirstPage}
//           size="sm"
//           variant="flat"
//           onPress={originalProps.onPreviousPage}
//           {...getPaginationButtonProps()}
//           startContent={<ChevronLeftIcon {...getPaginationIconProps()} />}>
//           <ChevronLeftIcon {...getPaginationMobileIconProps()} />
//           <span {...getPaginationTextProps()}>Previous</span>
//         </Button>

//         <Button
//           isDisabled={isLastPage}
//           size="sm"
//           variant="flat"
//           onPress={originalProps.onNextPage}
//           {...getPaginationButtonProps()}
//           endContent={<ChevronRightIcon {...getPaginationIconProps()} />}>
//           <ChevronRightIcon {...getPaginationMobileIconProps()} />
//           <span {...getPaginationTextProps()}>Next</span>
//         </Button>
//       </div>
//     </div>
//   )
// }

// BottomContent.displayName = 'BottomContent'
// export { BottomContent }
