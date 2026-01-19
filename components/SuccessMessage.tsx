interface SuccessMessageProps {
  title?: string
  message?: string
}

export function SuccessMessage({
  title = 'Changes saved',
  message = 'Your updates have been applied successfully.'
}: SuccessMessageProps) {
  return (
    <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-300">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-xs">{message}</p>
    </div>
  )
}


