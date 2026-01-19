export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-3 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex items-center justify-between">
        <span>© {new Date().getFullYear()} BidPack UK. All rights reserved.</span>
        <span className="hidden sm:inline">
          “We stop construction contractors from getting disqualified before scoring.”
        </span>
      </div>
    </footer>
  )
}


