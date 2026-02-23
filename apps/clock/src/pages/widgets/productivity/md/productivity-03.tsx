import { ChartNoAxesColumnIcon } from 'lucide-react'
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer
} from 'recharts'

import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

const chartData = [
  { name: 'Mockups', visitors: 55, fill: 'var(--productive)' },
  { name: 'Features', visitors: 70, fill: 'var(--vercel-yellow)' },
  { name: 'Testing', visitors: 85, fill: 'var(--destructive)' }
]

export default function ProductivityMD03() {
  return (
    <Widget size="md">
      <WidgetHeader className="w-full">
        <WidgetTitle className="flex items-center gap-2">
          <ChartNoAxesColumnIcon />
          <Label className="text-base font-normal">Weekly Progress</Label>
        </WidgetTitle>
      </WidgetHeader>
      <WidgetContent className="justify-between gap-4">
        <div className="w-full space-y-0">
          <ResponsiveContainer width="100%" height={150} className="-mt-1.5">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="30%"
              outerRadius="90%"
              data={chartData}
              startAngle={90}
              endAngle={450}>
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar dataKey="visitors" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-xs bg-green-600" />
            <div className="flex flex-col">
              <Label>55/100</Label>
              <Label className="text-muted text-xs font-normal">
                Design Mockups Completed
              </Label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-4 rounded-xs bg-yellow-400" />
            <div className="flex flex-col">
              <Label>70/100</Label>
              <Label className="text-muted text-xs font-normal">
                Features Developed
              </Label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-4 rounded-xs bg-red-500" />
            <div className="flex flex-col">
              <Label>85/100</Label>
              <Label className="text-muted text-xs font-normal">
                Test Cases Passed
              </Label>
            </div>
          </div>
        </div>
      </WidgetContent>
    </Widget>
  )
}
