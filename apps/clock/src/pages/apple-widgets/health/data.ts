import type { ActivityData, HealthMetric } from './types'

export const healthMetrics: HealthMetric[] = [
  {
    icon: 'lucide:activity',
    label: 'Steps',
    value: '8,439',
    progress: 70,
    color: 'success'
  },
  {
    icon: 'lucide:flame',
    label: 'Calories',
    value: '487',
    progress: 65,
    color: 'warning'
  },
  {
    icon: 'lucide:timer',
    label: 'Exercise',
    value: '32 min',
    progress: 53,
    color: 'primary'
  },
  {
    icon: 'lucide:heart-pulse',
    label: 'Heart Rate',
    value: '72 BPM',
    progress: 100,
    color: 'danger'
  }
]

export const activityData: ActivityData[] = [
  {
    name: 'Move',
    value: 85,
    fill: 'rgb(239, 68, 68)',
    total: 100
  },
  {
    name: 'Exercise',
    value: 65,
    fill: 'rgb(34, 197, 94)',
    total: 100
  },
  {
    name: 'Stand',
    value: 45,
    fill: 'rgb(59, 130, 246)',
    total: 100
  }
]

export const recentWorkouts = [
  {
    name: 'Running',
    duration: '30 minutes',
    distance: '2.5 km'
  },
  {
    name: 'Cycling',
    duration: '30 minutes',
    distance: '2.5 km'
  },
  {
    name: 'Walking',
    duration: '30 minutes',
    distance: '2.5 km'
  }
]
