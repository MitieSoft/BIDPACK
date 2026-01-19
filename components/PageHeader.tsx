interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  actions?: React.ReactNode
}

export default function PageHeader({ title, subtitle, description, actions }: PageHeaderProps) {
  const displayText = description || subtitle
  
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
          {title}
        </h1>
        {displayText && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{displayText}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}


