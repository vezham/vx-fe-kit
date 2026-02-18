import { createFileRoute, useRouter } from '@tanstack/react-router'

import { InvoiceFields } from '../../../components/InvoiceFields'
import { Spinner } from '../../../components/Spinner'
import { useMutation } from '../../../hooks/useMutation'
import type { Invoice } from '../../../utils/mockTodos'
import { postInvoice } from '../../../utils/mockTodos'

export const Route = createFileRoute('/dashboard/invoices/')({
  component: InvoicesIndexComponent
})

function InvoicesIndexComponent() {
  const router = useRouter()

  const createInvoiceMutation = useMutation({
    fn: postInvoice,
    onSuccess: () => router.invalidate()
  })

  return (
    <>
      <div className="p-2">
        <form
          onSubmit={event => {
            event.preventDefault()
            event.stopPropagation()
            const formData = new FormData(event.target as HTMLFormElement)
            createInvoiceMutation.mutate({
              title: formData.get('title') as string,
              body: formData.get('body') as string
            })
          }}
          className="space-y-2">
          <div>Create a new Invoice:</div>
          <InvoiceFields invoice={{} as Invoice} />
          <div>
            <button
              className="rounded-sm bg-blue-500 p-2 font-black text-white uppercase disabled:opacity-50"
              disabled={createInvoiceMutation.status === 'pending'}>
              {createInvoiceMutation.status === 'pending' ? (
                <>
                  Creating <Spinner />
                </>
              ) : (
                'Create'
              )}
            </button>
          </div>
          {createInvoiceMutation.status === 'success' ? (
            <div className="inline-block animate-bounce rounded-sm bg-green-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Created!
            </div>
          ) : createInvoiceMutation.status === 'error' ? (
            <div className="inline-block animate-bounce rounded-sm bg-red-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Failed to create.
            </div>
          ) : null}
        </form>
      </div>
    </>
  )
}
