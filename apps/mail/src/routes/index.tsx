import { createFileRoute, redirect } from '@tanstack/react-router'

import { DEFAULT_FOLDER_ID } from '../data/email'
import EmailShell from '../layout/email-shell'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: `/$folder`,
      params: {
        folder: DEFAULT_FOLDER_ID
      }
    })
  }
})
