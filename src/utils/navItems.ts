import type { NavItem } from '@/types/nav'

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Budgets',
    href: '/budgets',
  },
  {
    label: 'Transactions',
    href: '/transactions',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'About',
    href: '/about',
  },
]

export default NAV_ITEMS
export type { NavItem }
