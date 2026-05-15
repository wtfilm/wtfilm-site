'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',         icon: '01', label: 'início' },
  { href: '/trabalhos', icon: '02', label: 'trabalhos' },
  { href: '/sobre',    icon: '03', label: 'sobre' },
  { href: '/contato',  icon: '04', label: 'contato' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="nav" aria-label="Principal">
      {links.map(({ href, icon, label }) => (
        <Link
          key={href}
          href={href}
          data-icon={icon}
          className={pathname === href ? 'active' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
