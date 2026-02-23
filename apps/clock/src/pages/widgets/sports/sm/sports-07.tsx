import * as React from 'react'

import { Image } from '@vezham/react/v2'
import { Label, cn } from '@vezham/react/v3'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../../components/ui/table'
import {
  Widget,
  WidgetContent,
  WidgetHeader
} from '../../../../components/ui/widget'

const scores = [
  {
    teamAbbr: 'GSW',
    teamName: 'Golden State Warriors',
    one_score: 27,
    two_score: 34,
    three_score: 33,
    four_score: 26,
    five_score: 17
  },
  {
    teamAbbr: 'DN',
    teamName: 'Denver Nuggets',
    one_score: 31,
    two_score: 39,
    three_score: 24,
    four_score: 26,
    five_score: 11
  }
]

const classes = {
  head: 'text-muted-foreground w-1 px-0.5 text-center',
  cell: 'w-1 px-0.5 text-center'
}

export default function Sports07() {
  return (
    <Widget design="mumbai">
      <WidgetHeader className="mt-1.5">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <Image
              className="size-8 rounded-full"
              src="https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Fgsw.png&w=48&q=75"
              alt="GSW"
              width={20}
              height={20}
            />
            <Label className="text-xl">131</Label>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xl">129</Label>
            <Image
              className="size-8 rounded-full"
              src="https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Fdn.png&w=48&q=75"
              alt="DN"
              width={20}
              height={20}
            />
          </div>
        </div>
      </WidgetHeader>
      <WidgetContent className="flex-col items-center justify-end gap-2">
        <Table>
          <TableHeader>
            <TableRow className="border-default-200 border-b text-xs">
              <TableHead className={cn(classes.head, 'w-1 text-start')}>
                Team
              </TableHead>
              <TableHead className={classes.head}>1</TableHead>
              <TableHead className={classes.head}>2</TableHead>
              <TableHead className={classes.head}>3</TableHead>
              <TableHead className={classes.head}>4</TableHead>
              <TableHead className={classes.head}>5</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.map((el, i) => (
              <TableRow
                key={i}
                className="border-default-200 border-b text-xs font-extralight">
                <TableCell
                  className={cn(classes.head, 'w-1 text-start text-white')}>
                  {el.teamAbbr}
                </TableCell>
                <TableCell className={classes.cell}>{el.one_score}</TableCell>
                <TableCell className={classes.cell}>{el.two_score}</TableCell>
                <TableCell className={classes.cell}>{el.three_score}</TableCell>
                <TableCell className={classes.cell}>{el.four_score}</TableCell>
                <TableCell className={classes.cell}>{el.five_score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WidgetContent>
    </Widget>
  )
}
