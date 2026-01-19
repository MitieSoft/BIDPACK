interface ErrorMessageProps {
  title?: string
  message?: string
}

export function ErrorMessage({
  title = 'Something went wrong',
  message = 'Please try again or contact support if the problem persists.'
}: ErrorMessageProps) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-xs">{message}</p>
    </div>
  )
}


