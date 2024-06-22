'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	FaChartLine,
	FaClipboardList,
	FaHome,
	FaSignOutAlt,
} from 'react-icons/fa'
import { IoWalletSharp } from 'react-icons/io5'

const tabs = [
	{
		label: 'Overview',
		href: '/dashboard',
		icon: <FaHome />,
	},
	{
		label: 'Transactions',
		href: '/dashboard/transactions',
		icon: <FaClipboardList />,
	},
	{
		label: 'Wallets',
		href: '/dashboard/wallets',
		icon: <IoWalletSharp />,
	},
	{
		label: 'Reports',
		href: '/dashboard/reports',
		icon: <FaChartLine />,
	},
]

export function SidebarNav() {
	const pathname = usePathname()

	return (
		<nav className=''>
			<ul className='flex flex-col gap-4 mt-10'>
				{tabs.map(tab => (
					<li key={tab.label}>
						<Link
							href={tab.href}
							className={`border flex w-full px-4 py-2 items-center gap-2 text-lg rounded-lg hover:bg-gray-50 ${
								pathname === tab.href ? 'bg-gray-100' : ''
							}`}
						>
							{tab.icon}
							{tab.label}
						</Link>
					</li>
				))}
				<li>
					<button
						className='border flex w-full px-4 py-2 items-center gap-2 text-lg rounded-lg mt-6 hover:bg-gray-50'
						onClick={() => signOut()}
					>
						<FaSignOutAlt /> Sign Out
					</button>
				</li>
			</ul>
		</nav>
	)
}
