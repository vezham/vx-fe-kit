/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import * as React from 'react'

import type { Invoice } from '../utils/mockTodos'

export function InvoiceFields({
  invoice,
  disabled
}: {
  invoice: Invoice
  disabled?: boolean
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">
        <input
          name="title"
          defaultValue={invoice?.title}
          placeholder="Invoice Title"
          className="border-opacity-50 w-full rounded-sm border p-2"
          disabled={disabled}
        />
      </h2>
      <div>
        <textarea
          name="body"
          defaultValue={invoice?.body}
          rows={6}
          placeholder="Invoice Body..."
          className="border-opacity-50 w-full rounded-sm border p-2"
          disabled={disabled}
        />
      </div>
    </div>
  )
}
