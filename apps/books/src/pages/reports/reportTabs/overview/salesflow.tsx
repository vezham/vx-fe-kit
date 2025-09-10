/* eslint-disable @nx/enforce-module-boundaries */
import { Card, cn, Select, SelectItem } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

// Types
type TimeRange = 'last-2-weeks' | 'last-month' | 'last-quarter'

type KpiStat = {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'neutral' | 'negative'
}

type ChartDataPoint = {
  day: string
  value: number
}

type SalesData = {
  title: string
  timeRanges: Record<
    TimeRange,
    {
      kpiStats: KpiStat[]
      chartData: ChartDataPoint[]
    }
  >
}

// Sample data
const salesData: SalesData = {
  title: 'Sales Performance',
  timeRanges: {
    'last-2-weeks': {
      kpiStats: [
        {
          title: 'Weekly Sales',
          value: '$28,441',
          change: '3.3%',
          changeType: 'positive'
        },
        {
          title: 'Daily Sales',
          value: '$4,063',
          change: '3.3%',
          changeType: 'positive'
        },
        {
          title: 'Total Sales',
          value: '278',
          change: '3.3%',
          changeType: 'positive'
        }
      ],
      chartData: [
        { day: '01', value: 62 },
        { day: '02', value: 52 },
        { day: '03', value: 41 },
        { day: '04', value: 75 },
        { day: '05', value: 48 },
        { day: '06', value: 22 },
        { day: '07', value: 63 },
        { day: '08', value: 33 },
        { day: '09', value: 35 },
        { day: '10', value: 42 },
        { day: '11', value: 12 },
        { day: '12', value: 64 },
        { day: '13', value: 54 },
        { day: '14', value: 45 }
      ]
    },
    'last-month': {
      kpiStats: [
        {
          title: 'Monthly Sales',
          value: '$112,874',
          change: '5.2%',
          changeType: 'positive'
        },
        {
          title: 'Daily Sales',
          value: '$3,762',
          change: '2.1%',
          changeType: 'positive'
        },
        {
          title: 'Total Sales',
          value: '1,245',
          change: '4.7%',
          changeType: 'positive'
        }
      ],
      chartData: [
        { day: '01', value: 58 },
        { day: '05', value: 62 },
        { day: '10', value: 45 },
        { day: '15', value: 78 },
        { day: '20', value: 56 },
        { day: '25', value: 67 },
        { day: '30', value: 72 }
      ]
    },
    'last-quarter': {
      kpiStats: [
        {
          title: 'Quarterly Sales',
          value: '$342,128',
          change: '8.7%',
          changeType: 'positive'
        },
        {
          title: 'Monthly Sales',
          value: '$114,043',
          change: '1.2%',
          changeType: 'negative'
        },
        {
          title: 'Total Sales',
          value: '3,842',
          change: '6.5%',
          changeType: 'positive'
        }
      ],
      chartData: [
        { day: 'Jan', value: 85 },
        { day: 'Feb', value: 72 },
        { day: 'Mar', value: 93 }
      ]
    }
  }
}

const SalesPerformanceCard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] =
    React.useState<TimeRange>('last-2-weeks')

  const timeRangeLabels: Record<TimeRange, string> = {
    'last-2-weeks': 'Last 2 weeks',
    'last-month': 'Last month',
    'last-quarter': 'Last quarter'
  }

  const currentData = salesData.timeRanges[selectedTimeRange]

  const handleTimeRangeChange = (keys: Set<React.Key> | 'all') => {
    if (keys !== 'all' && keys.size > 0) {
      const selectedKey = Array.from(keys)[0] as TimeRange
      setSelectedTimeRange(selectedKey)
    }
  }

  return (
    <Card className="border-default-200 mt-4 border shadow-none">
      <div className="flex flex-col p-4 pb-0">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-default-900 text-xl font-semibold">
            {salesData.title}
          </h2>
          <div className="flex items-center gap-x-2">
            <Select
              aria-label="Time Range"
              selectedKeys={[selectedTimeRange]}
              onSelectionChange={handleTimeRangeChange}
              classNames={{
                trigger: 'min-w-[150px] bg-gray-50 border-none',
                value: 'text-default-700'
              }}>
              {Object.entries(timeRangeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </Select>
            {/* <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <Icon icon="lucide:more-horizontal" width={18} height={18} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                itemClasses={{
                  title: 'text-tiny'
                }}
                variant="flat">
                <DropdownItem key="download">Download Report</DropdownItem>
                <DropdownItem key="share">Share</DropdownItem>
                <DropdownItem key="print">Print</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </div>
        </div>

        {/* KPI Stats */}
        <div className="mb-6 grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
          {currentData.kpiStats.map((stat, index) => (
            <div key={index} className="mx-auto flex flex-col">
              <div className="flex items-center gap-3">
                <h3 className="text-default-900 text-3xl font-semibold">
                  {stat.value}
                </h3>
                <div
                  className={cn(
                    'flex items-center text-sm font-medium',
                    stat.changeType === 'positive'
                      ? 'text-success'
                      : stat.changeType === 'negative'
                        ? 'text-danger'
                        : 'text-warning'
                  )}>
                  <Icon
                    icon={
                      stat.changeType === 'positive'
                        ? 'lucide:trending-up'
                        : stat.changeType === 'negative'
                          ? 'lucide:trending-down'
                          : 'lucide:minus'
                    }
                    className="mr-1"
                    width={16}
                    height={16}
                  />
                  {stat.change}
                </div>
              </div>
              <span className="text-default-500 text-sm">{stat.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={currentData.chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 12 }}
              domain={[0, 'dataMax + 10']}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background rounded-medium border-default-200 border p-3 shadow-md">
                      <p className="text-default-700 mb-1 font-medium">
                        Day {label}
                      </p>
                      <p className="text-primary font-semibold">
                        {payload[0].value} sales
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="value"
              fill="hsl(var(--heroui-primary-500))"
              radius={[4, 4, 0, 0]}
              barSize={20}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default SalesPerformanceCard

// 'use client'

// /* eslint-disable @nx/enforce-module-boundaries */
// import React from 'react'
// import {
//   Card,
//   Button,
//   Select,
//   SelectItem,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   cn,
//   type CardProps
// } from '@heroui/react'
// import { Icon } from '@iconify/react'
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts'

// // Types
// type TimeRange = 'last-2-weeks' | 'last-month' | 'last-quarter'

// type KpiStat = {
//   title: string
//   value: string
//   change: string
//   changeType: 'positive' | 'neutral' | 'negative'
// }

// type ChartDataPoint = {
//   day: string
//   value: number
// }

// type SalesData = {
//   title: string
//   timeRanges: Record<
//     TimeRange,
//     {
//       kpiStats: KpiStat[]
//       chartData: ChartDataPoint[]
//     }
//   >
// }

// // Sample data
// const salesData: SalesData = {
//   title: 'Sales Performance',
//   timeRanges: {
//     'last-2-weeks': {
//       kpiStats: [
//         {
//           title: 'Weekly Sales',
//           value: '$28,441',
//           change: '3.3%',
//           changeType: 'positive'
//         },
//         {
//           title: 'Daily Sales',
//           value: '$4,063',
//           change: '3.3%',
//           changeType: 'positive'
//         },
//         {
//           title: 'Total Sales',
//           value: '278',
//           change: '3.3%',
//           changeType: 'positive'
//         }
//       ],
//       chartData: [
//         { day: '01', value: 62 },
//         { day: '02', value: 52 },
//         { day: '03', value: 41 },
//         { day: '04', value: 75 },
//         { day: '05', value: 48 },
//         { day: '06', value: 22 },
//         { day: '07', value: 63 },
//         { day: '08', value: 33 },
//         { day: '09', value: 35 },
//         { day: '10', value: 42 },
//         { day: '11', value: 12 },
//         { day: '12', value: 64 },
//         { day: '13', value: 54 },
//         { day: '14', value: 45 }
//       ]
//     },
//     'last-month': {
//       kpiStats: [
//         {
//           title: 'Monthly Sales',
//           value: '$112,874',
//           change: '5.2%',
//           changeType: 'positive'
//         },
//         {
//           title: 'Daily Sales',
//           value: '$3,762',
//           change: '2.1%',
//           changeType: 'positive'
//         },
//         {
//           title: 'Total Sales',
//           value: '1,245',
//           change: '4.7%',
//           changeType: 'positive'
//         }
//       ],
//       chartData: [
//         { day: '01', value: 58 },
//         { day: '05', value: 62 },
//         { day: '10', value: 45 },
//         { day: '15', value: 78 },
//         { day: '20', value: 56 },
//         { day: '25', value: 67 },
//         { day: '30', value: 72 }
//       ]
//     },
//     'last-quarter': {
//       kpiStats: [
//         {
//           title: 'Quarterly Sales',
//           value: '$342,128',
//           change: '8.7%',
//           changeType: 'positive'
//         },
//         {
//           title: 'Monthly Sales',
//           value: '$114,043',
//           change: '1.2%',
//           changeType: 'negative'
//         },
//         {
//           title: 'Total Sales',
//           value: '3,842',
//           change: '6.5%',
//           changeType: 'positive'
//         }
//       ],
//       chartData: [
//         { day: 'Jan', value: 85 },
//         { day: 'Feb', value: 72 },
//         { day: 'Mar', value: 93 }
//       ]
//     }
//   }
// }

// export default function SalesPerformanceCard() {
//   const [selectedTimeRange, setSelectedTimeRange] =
//     React.useState<TimeRange>('last-2-weeks')

//   const timeRangeLabels: Record<TimeRange, string> = {
//     'last-2-weeks': 'Last 2 weeks',
//     'last-month': 'Last month',
//     'last-quarter': 'Last quarter'
//   }

//   const currentData = salesData.timeRanges[selectedTimeRange]

//   return (
//     <Card className="border-default-200 h-[300px] border shadow-none">
//       <div className="flex flex-col gap-y-2 p-4">
//         {/* Header */}
//         <div className="flex items-center justify-between gap-x-2">
//           <h3 className="text-small text-default-500 font-medium">
//             {salesData.title}
//           </h3>
//           <div className="flex items-center gap-x-2">
//             <Select
//               aria-label="Time Range"
//               selectedKeys={[selectedTimeRange]}
//               onSelectionChange={keys => {
//                 if (keys !== 'all' && keys.size > 0) {
//                   const selectedKey = Array.from(keys)[0] as TimeRange
//                   setSelectedTimeRange(selectedKey)
//                 }
//               }}
//               classNames={{
//                 trigger: 'min-w-[120px] min-h-7 h-7',
//                 value: 'text-tiny text-default-500!',
//                 selectorIcon: 'text-default-500',
//                 popoverContent: 'min-w-[140px]'
//               }}
//               size="sm">
//               {Object.entries(timeRangeLabels).map(([key, label]) => (
//                 <SelectItem key={key}>{label}</SelectItem>
//               ))}
//             </Select>

//             {/* <Dropdown placement="bottom-end">
//               <DropdownTrigger>
//                 <Button isIconOnly radius="full" size="sm" variant="light">
//                   <Icon height={16} icon="solar:menu-dots-bold" width={16} />
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu itemClasses={{ title: 'text-tiny' }} variant="flat">
//                 <DropdownItem key="download">Download Report</DropdownItem>
//                 <DropdownItem key="share">Share</DropdownItem>
//                 <DropdownItem key="print">Print</DropdownItem>
//               </DropdownMenu>
//             </Dropdown> */}
//           </div>
//         </div>

//   {/* KPI Stats */}
//   <div className="grid grid-cols-3 gap-4">
//     {currentData.kpiStats.map((stat, index) => (
//       <div key={index} className="flex flex-col">
//         <div className='sm:flex gap-3'>
//           <span className="text-default-900 text-lg font-semibold">
//             {stat.value}
//           </span>
//           <span
//             className={cn(
//               'flex items-center text-xs font-medium',
//               stat.changeType === 'positive'
//                 ? 'text-success'
//                 : stat.changeType === 'negative'
//                   ? 'text-danger'
//                   : 'text-warning'
//             )}>
//             <Icon
//               icon={
//                 stat.changeType === 'positive'
//                   ? 'lucide:trending-up'
//                   : stat.changeType === 'negative'
//                     ? 'lucide:trending-down'
//                     : 'lucide:minus'
//               }
//               className="mr-1"
//               width={12}
//               height={12}
//             />
//             {stat.change}
//           </span>
//         </div>

//         <span className="text-default-500 text-tiny">{stat.title}</span>
//       </div>
//     ))}
//   </div>
// </div>

//       {/* Chart */}
//       <ResponsiveContainer
//         className="[&_.recharts-surface]:outline-hidden"
//         height="100%"
//         width="100%">
//         <BarChart
//           data={currentData.chartData}
//           margin={{ top: 10, right: 14, left: -8, bottom: 10 }}>
//           <XAxis
//             dataKey="day"
//             style={{ fontSize: 'var(--heroui-font-size-tiny)' }}
//             tickLine={false}
//           />
//           <YAxis
//             axisLine={false}
//             style={{ fontSize: 'var(--heroui-font-size-tiny)' }}
//             tickLine={false}
//           />
//           <Tooltip
//             content={({ active, payload, label }) => {
//               if (active && payload && payload.length) {
//                 return (
//                   <div className="rounded-medium bg-background text-tiny shadow-small flex flex-col gap-y-1 p-2">
//                     <span className="text-foreground font-medium">
//                       Day {label}
//                     </span>
//                     <span className="text-primary font-semibold">
//                       {payload[0].value} sales
//                     </span>
//                   </div>
//                 )
//               }
//               return null
//             }}
//             cursor={false}
//           />
//           <Bar
//             dataKey="value"
//             fill="hsl(var(--heroui-primary-500))"
//             radius={[4, 4, 0, 0]}
//             barSize={20}
//             animationDuration={600}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </Card>
//   )
// }
