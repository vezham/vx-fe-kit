export const cardVariants = {
  wrapper: `
    border-small border-default-200 shadow-none p-3 gap-4
    /* Default (xs < 400px) */
   w-[164px] h-[164px]

    /* sm (sm < md) */
    sm:w-[300px] sm:h-[164px]

    /* md (≥768px) */
    md:w-[300px] md:h-[300px]

    /* lg (≥1024px) */
    lg:w-[628px] lg:h-[300px]
  `,
  alertWrapper: `
    flex flex-col items-center

    /* Default (xs < 400px) */
   w-[164px] h-[164px]

    /* sm (401px < md) */
    sm:w-[300px] sm:h-[164px]

    /* md (≥768px) */
    md:w-[300px] md:h-[300px]

    /* lg (≥1024px) */
    lg:w-[628px] lg:h-[300px]
  `,
  body: 'pb-1 h-full',
  titleWrapper: 'flex items-center justify-between',
  title: 'text-lg leading-7 font-bold',
  menuIcon: 'text-small rotate-90 text-gray-400',
  gridWrapper: 'flex justify-between mt-4',
  gridLabels: 'grid gap-2',
  gridValues: 'grid gap-2 text-end',
  paid: 'text-success text-base leading-6 font-medium',
  outstanding: 'text-danger text-base leading-6 font-medium',
  normal: 'text-base leading-6 font-medium',
  footer: 'border-default-200 items-center justify-between border-t text-end',
  footerLeft: 'flex items-center gap-2'
}
