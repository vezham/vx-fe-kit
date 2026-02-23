import { Button } from '@vezham/react/v2'
import { Textarea } from '@vezham/react/v2'

import {
  Widget,
  WidgetContent,
  WidgetFooter
} from '../../../../components/ui/widget'

export default function DashboardSM06() {
  return (
    <Widget className="gap-3" design="mumbai">
      <WidgetContent className="w-full flex-col items-start justify-start gap-2">
        <Textarea
          classNames={{
            base: 'max-w-xs',
            input: ' min-h-[90px]'
          }}
          disableAnimation
          disableAutosize
          variant="bordered"
          placeholder="Type your message here."
        />
      </WidgetContent>
      <WidgetFooter>
        <Button
          className="bg-foreground text-background w-full hover:opacity-70"
          size="sm">
          Send Feedback
        </Button>
      </WidgetFooter>
    </Widget>
  )
}
