import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import * as React from 'react'
import { z } from 'zod'

import { InvoiceFields } from '../../../../components/InvoiceFields'
import {
  invoiceQueryOptions,
  useUpdateInvoiceMutation
} from '../../../../utils/queryOptions'

export const Route = createFileRoute('/dashboard/invoices/$invoiceId/')({
  params: {
    parse: params => ({
      invoiceId: z.number().int().parse(Number(params.invoiceId))
    }),
    stringify: ({ invoiceId }) => ({ invoiceId: `${invoiceId}` })
  },
  validateSearch: search =>
    z
      .object({
        showNotes: z.boolean().optional(),
        notes: z.string().optional()
      })
      .parse(search),
  loader: opts =>
    opts.context.queryClient.ensureQueryData(
      invoiceQueryOptions(opts.params.invoiceId)
    ),
  component: InvoiceComponent
})

function InvoiceComponent() {
  const search = Route.useSearch()
  const params = Route.useParams()
  const navigate = useNavigate({ from: Route.fullPath })
  const invoiceQuery = useSuspenseQuery(invoiceQueryOptions(params.invoiceId))
  const invoice = invoiceQuery.data
  const updateInvoiceMutation = useUpdateInvoiceMutation(params.invoiceId)
  const [notes, setNotes] = React.useState(search.notes ?? '')

  React.useEffect(() => {
    navigate({
      search: old => ({
        ...old,
        notes: notes ? notes : undefined
      }),
      replace: true,
      params: true
    })
  }, [notes])

  return (
    <form
      key={invoice.id}
      onSubmit={event => {
        event.preventDefault()
        event.stopPropagation()
        const formData = new FormData(event.target as HTMLFormElement)
        updateInvoiceMutation.mutate({
          id: invoice.id,
          title: formData.get('title') as string,
          body: formData.get('body') as string
        })
      }}
      className="space-y-2 p-2">
      <InvoiceFields
        invoice={invoice}
        disabled={updateInvoiceMutation.status === 'pending'}
      />
      <div>
        <Link
          from={Route.fullPath}
          params={true}
          search={old => ({
            ...old,
            showNotes: old.showNotes ? undefined : true
          })}
          className="text-blue-700">
          {search.showNotes ? 'Close Notes' : 'Show Notes'}{' '}
        </Link>
        {search.showNotes ? (
          <>
            <div>
              <div className="h-2" />
              <textarea
                value={notes}
                onChange={e => {
                  setNotes(e.target.value)
                }}
                rows={5}
                className="w-full rounded-sm p-2 shadow-sm"
                placeholder="Write some notes here..."
              />
              <div className="text-xs italic">
                Notes are stored in the URL. Try copying the URL into a new tab!
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div>
        <button
          className="rounded-sm bg-blue-500 p-2 font-black text-white uppercase disabled:opacity-50"
          disabled={updateInvoiceMutation.status === 'pending'}>
          Save
        </button>
      </div>
      {updateInvoiceMutation.variables?.id === invoice.id ? (
        <div key={updateInvoiceMutation.submittedAt}>
          {updateInvoiceMutation.status === 'success' ? (
            <div className="inline-block animate-bounce rounded-sm bg-green-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Saved!
            </div>
          ) : updateInvoiceMutation.status === 'error' ? (
            <div className="inline-block animate-bounce rounded-sm bg-red-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Failed to save.
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  )
}
