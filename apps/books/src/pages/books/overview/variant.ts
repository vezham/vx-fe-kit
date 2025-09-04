// export const cardVariants = {
//   wrapper:
//     'border-small border-default-200 min-h-[255px] flex-1 p-3 shadow-none',
//   body: 'pb-1',
//   titleWrapper: 'flex items-center justify-between',
//   title: 'text-lg leading-7 font-bold',
//   menuIcon: 'text-small rotate-90 text-gray-400',
//   gridWrapper: 'flex justify-between',
//   gridLabels: 'grid gap-2',
//   gridValues: 'grid gap-2',
//   gridValues: 'grid gap-2 text-end',
//   paid: 'text-success text-base leading-6 font-medium',
//   outstanding: 'text-danger text-base leading-6 font-medium',
//   normal: 'text-base leading-6 font-medium',
//   footer: 'border-default-200 items-center justify-between border-t',
//   footer: 'border-default-200 items-center justify-between border-t text-end',
//   footerLeft: 'flex items-center gap-2'
// }

export const cardVariants = {
  wrapper: `
    border-small border-default-200 shadow-none p-3 gap-4
    size-52

    /* md (≥768px) */
    sm:w-[300px] md:h-[300px]

    /* lg (≥1024px) */
    lg:w-[628px] lg:h-[300px]
  `,
  alertWrapper: `
    flex flex-col items-center
  size-52

    /* md (≥768px) */
    sm:w-[300px] md:h-[300px]

    /* lg (≥1024px) */
    lg:w-[628px] lg:h-[300px]
  `,
  gridContainer: `
  mt-6 gap-4 flex flex-col flex-wrap sm:flex-nowrap

  /* md (≥768px): row */
  sm:flex-row
  /* lg (≥1024px): stack again */
  lg:flex-col
`,

  body: 'pb-1 h-full',
  titleWrapper: 'flex items-center justify-between',
  title: 'text-lg leading-7 font-bold',
  menuIcon: 'text-small  text-gray-400',
  gridWrapper: 'flex justify-between mt-4',
  gridLabels: 'grid gap-2',
  gridValues: 'grid gap-2 text-end',
  paid: 'text-success text-base leading-6 font-medium',
  outstanding: 'text-danger text-base leading-6 font-medium',
  normal: 'text-base leading-6 font-medium',
  footer: 'border-default-200 items-center justify-between border-t text-end',
  footerLeft: 'flex items-center gap-2'
}
