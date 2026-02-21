import { CheckCircle2Icon, CircleIcon } from 'lucide-react'
import React from 'react'

import { Label } from '../../../../components/ui/label'
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'
import { cn } from '../../../../lib/utils'

type TodoType = {
  id: number
  task: string
  completed: boolean
}

const initialTodos = [
  { id: 1, task: 'Refactor code', completed: true },
  { id: 2, task: 'Review designs', completed: true },
  { id: 3, task: 'Testing', completed: false },
  { id: 4, task: 'Deployment', completed: false }
]

export default function ProductivitySM01() {
  const [todos, setTodos] = React.useState<TodoType[]>(initialTodos)

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
    <Widget className="gap-2" design="mumbai">
      <WidgetHeader className="justify-center">
        <WidgetTitle>Tasks</WidgetTitle>
      </WidgetHeader>
      <WidgetContent className="flex-col gap-1">
        {todos.map(todo => (
          <button
            className="w-full"
            onClick={() => handleToggle(todo.id)}
            key={todo.id}>
            <div className="hover:bg-muted group flex w-full items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm hover:cursor-pointer">
              {todo.completed ? (
                <CheckCircle2Icon className="size-4 text-green-700" />
              ) : (
                <CircleIcon className="text-muted-foreground size-4" />
              )}
              <Label
                className={cn(
                  'text-muted-foreground group-hover:cursor-pointer',
                  todo.completed && 'text-default-500/70 line-through'
                )}>
                {todo.task}
              </Label>
            </div>
          </button>
        ))}
      </WidgetContent>
    </Widget>
  )
}
