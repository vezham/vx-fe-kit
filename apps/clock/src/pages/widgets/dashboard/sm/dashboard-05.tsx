import {
  GitBranchIcon,
  GitCommitHorizontalIcon,
  ShieldCheckIcon
} from 'lucide-react'

import { Button, Link } from '@vezham/react/v2'
import { Label, Tooltip } from '@vezham/react/v3'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '../../../../components/ui/avatar'
import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

export default function DashboardSM05() {
  return (
    <Widget className="gap-2.5" design="mumbai">
      <WidgetHeader className="flex items-center">
        <div className="flex items-center justify-start gap-2">
          <Avatar className="size-6">
            <AvatarImage
              className="border-4 border-black"
              src="https://github.com/wigggle-ui.png"
              alt="@wigggle-ui"
            />
            <AvatarFallback>WUI</AvatarFallback>
          </Avatar>
          <WidgetTitle className="text-sm font-medium">wigggle-ui</WidgetTitle>
        </div>
        <Tooltip delay={300}>
          <Tooltip.Trigger>
            <div className="bg-success size-2.5 animate-pulse rounded-full" />
          </Tooltip.Trigger>
          <Tooltip.Content className="text-foreground px-2 py-1 text-sm">
            Running
          </Tooltip.Content>
        </Tooltip>
      </WidgetHeader>
      <WidgetContent className="w-full flex-col items-start justify-start gap-2">
        <div className="flex w-max items-center justify-center gap-2">
          <GitCommitHorizontalIcon className="stroke-muted-foreground size-5" />
          <Label className="text-sm">chore: nextjs v16</Label>
        </div>
        <div className="flex w-max items-center justify-center gap-2">
          <GitBranchIcon className="stroke-muted-foreground size-5" />
          <Label className="-mt-1.5 text-sm">prod</Label>
        </div>
        <div className="flex w-max items-center justify-center gap-2">
          <ShieldCheckIcon className="size-5 stroke-green-500" />
          <Label className="text-sm">Firewall Active</Label>
        </div>
      </WidgetContent>
      <WidgetFooter>
        <Button
          className="hover:bg-content2 w-full"
          variant="bordered"
          size="sm"
          asChild>
          <Link
            className="text-foreground"
            href="https://github.com/wigggle-ui/ui">
            Visit
          </Link>
        </Button>
      </WidgetFooter>
    </Widget>
  )
}
