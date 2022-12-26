import Link from 'next/link'
import { BookBookmark } from 'phosphor-react'

const LINKS = [
  {
    href: '/',
    label: 'Home'
  },
  {
    href: '/courses',
    label: 'Courses'
  },
  {
    href: '/settings',
    label: 'Settings'
  }
]

export function Header () {
  return (
    <header className="flex items-center justify-between h-16 w-full px-2 sm:px-8 bg-slate-900">
      <h1 className="flex items-center gap-1 text-lg font-semibold">
        <BookBookmark size={20} className="text-green-400" weight="fill" />
        <span>
          Study-Tracker
        </span>
      </h1>
      <nav className="flex gap-3">
        {
          LINKS.map(({ href, label }) => (
            <Link href={href} key={label}>
              {label}
            </Link>
          ))
        }
      </nav>
    </header>
  )
}
