import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import {
  Cell,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer
} from 'recharts'

import { Card, Progress, ScrollShadow } from '@vezham/react/v2'

import { AppView } from '../../../components/app-view'
import { activityData, healthMetrics, recentWorkouts } from './data'
import type { HealthAppProps } from './types'

export function HealthApp({ isOpen, onClose }: HealthAppProps) {
  return (
    <AppView isOpen={isOpen} onClose={onClose} title="Health">
      <ScrollShadow className="h-full">
        <div className="flex flex-col gap-4 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex h-44 justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                barSize={8}
                data={activityData}
                startAngle={90}
                endAngle={-270}>
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background={{ fill: 'rgb(31, 41, 55)' }}
                  dataKey="value"
                  cornerRadius={12}
                  fill="#fff">
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </RadialBar>

                <text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fill: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                  73%
                </text>

                <text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fill: 'rgb(156, 163, 175)',
                    fontSize: '12px'
                  }}>
                  Daily Goal
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="-mt-2 flex justify-around px-4">
            {activityData.map((activity, index) => (
              <motion.div
                key={activity.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center">
                <div
                  className="text-sm font-medium"
                  style={{ color: activity.fill }}>
                  {activity.value}%
                </div>
                <div className="text-xs text-gray-400">{activity.name}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {healthMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}>
                <Card className="bg-white/5 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <div className={`rounded-full p-1.5 bg-${metric.color}`}>
                      <Icon icon={metric.icon} className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-300">
                      {metric.label}
                    </span>
                  </div>

                  <div className="mb-2 text-lg font-semibold text-white">
                    {metric.value}
                  </div>

                  <Progress
                    value={metric.progress}
                    size="sm"
                    color={metric.color}
                    className="max-w-full"
                  />
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-2">
            <h4 className="mb-2 text-sm font-medium text-gray-400">
              Recent Workouts
            </h4>

            {recentWorkouts.map((workout, index) => (
              <motion.div
                key={workout.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-white/5">
                <Icon
                  icon={`lucide:${workout.name.toLowerCase()}`}
                  className="text-primary-500 h-5 w-5"
                />

                <div className="flex-1">
                  <p className="text-sm text-white">{workout.name}</p>
                  <p className="text-xs text-gray-400">
                    {workout.duration} • {workout.distance}
                  </p>
                </div>

                <Icon
                  icon="lucide:chevron-right"
                  className="h-4 w-4 text-gray-400"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollShadow>
    </AppView>
  )
}
