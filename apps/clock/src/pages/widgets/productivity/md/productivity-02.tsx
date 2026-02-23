'use client'

import { CheckCircle2Icon, CircleIcon, ListIcon } from 'lucide-react'
import React from 'react'

import { Label, cn } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

type TodoType = {
  id: number
  task: string
  time: string
  completed: boolean
}

const initialTodos = [
  {
    id: 1,
    task: 'Daily Scrum Meeting',
    time: '9:00 AM to 9:30 AM',
    completed: true
  },
  {
    id: 2,
    task: 'Review mockup designs',
    time: '9:00 AM to 9:30 AM',
    completed: true
  },
  {
    id: 3,
    task: 'Client report prep',
    time: '9:00 AM to 9:30 AM',
    completed: false
  }
]

export default function ProductivityMD02() {
  const [todos, setTodos] = React.useState<TodoType[]>(initialTodos)
  const tasksDone = todos.filter(todo => todo.completed).length

  const handleToggle = (id: number) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
      return updatedTodos
    })
  }

  return (
    <Widget size="md">
      <WidgetContent className="flex items-center justify-center gap-4">
        <div className="flex h-full w-max flex-col items-start justify-between gap-3">
          <WidgetHeader className="w-full">
            <WidgetTitle>
              <ListIcon />
            </WidgetTitle>
          </WidgetHeader>
          <div className="flex flex-col">
            <Label className="text-5xl tracking-wide">{tasksDone}/3</Label>
            <Label className="text-muted text-lg font-normal">tasks done</Label>
          </div>
        </div>
        <div className="flex size-full flex-col justify-start">
          {todos.map(todo => (
            <button
              className="w-full"
              onClick={() => handleToggle(todo.id)}
              key={todo.id}>
              <div className="hover:bg-default-100 group flex size-full items-start justify-start gap-2 rounded-md px-2 py-1.5 text-start text-sm hover:cursor-pointer">
                {todo.completed ? (
                  <CheckCircle2Icon className="size-4 text-green-700" />
                ) : (
                  <CircleIcon className="text-muted-foreground size-4" />
                )}
                <div className="flex flex-col space-y-0">
                  <Label
                    className={cn(
                      'text-muted items-start group-hover:cursor-pointer',
                      todo.completed && 'text-muted line-through'
                    )}>
                    {todo.task}
                  </Label>
                  <Label className="text-muted text-xs font-normal">
                    {todo.time}
                  </Label>
                </div>
              </div>
            </button>
          ))}
        </div>
      </WidgetContent>
    </Widget>
  )
}
